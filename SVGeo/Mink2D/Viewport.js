import Model, { $, } from '../../OvO/model/Model.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';
import Point from './Point.js';

export default class Mink2DViewport
{
	constructor()
	{
		this.area= new Model( { t:{ start:-8, end:8, }, x:{ start:new Complex( '-8i', ), end:new Complex( '8i', ), }, }, );
		this.resolution= new Model( 256, );
		this.stroke= new Model( 1, );
		
		this.areaWidth= $( ( e, s, )=> sub( e, s, ).i, this.area.x.end, this.area.x.start, );
		this.areaHeight= $( ( e, s, )=> e - s, this.area.t.end, this.area.t.start, );
		this.HWRatio= $( ( ah, aw, )=> ah/aw, this.areaHeight, this.areaWidth, );
		this.width= this.resolution;
		this.height= $( ( r, hwr, )=> r*hwr, this.resolution, this.HWRatio, );
		this.viewBox= $( ( w, h, )=> `0,0,${w},${h}`, this.width, this.height, );
	}
	
	set( [ tStart, tEnd, ], [ xStart, xEnd, ], resolution, stroke=1, )
	{
		this.area.t.start=  tStart;
		this.area.t.end=    tEnd;
		this.area.x.start=  new Complex( xStart, );
		this.area.x.end=    new Complex( xEnd, );
		this.resolution.setValue( resolution, );
		this.stroke.setValue( stroke, );
	}
	
	move( t, x, )
	{
		this.area.t.start= this.area.t.start - t;
		this.area.t.end= this.area.t.end - t;
		this.area.x.start= sub( this.area.x.start.valueOf(), x, );
		this.area.x.end= sub( this.area.x.end.valueOf(), x, );
	}
	
	moveTarget( target, x, y, )
	{
		target.move(
			y*this.areaHeight/this.height,
			mul( 'i', x*this.areaWidth/this.width, ),
		);
	}
	
	transformPoint( point, )
	{
		return new Model( {
			x: $( ( x, xSt, w, aw, )=> (x.i - xSt.i)*w/aw, point.x, this.area.x.start, this.width, this.areaWidth, ),
			y: $( ( y, yEn, w, aw, )=> (yEn - y)*w/aw, point.t, this.area.t.end, this.width, this.areaWidth, ),
		}, );
	}
	
	renderLine( line, )
	{
		const tXStart= line.tFx( this.area.x.start, );
		const tXEnd=   line.tFx( this.area.x.end, );
		const xTStart= line.xFt( this.area.t.start, );
		const xTEnd=   line.xFt( this.area.t.end, );
		
		const xL= $(
			( xTStart, xTEnd, xStart, )=> mul( 'i', Math.max( xStart.i, Math.min( xTStart.i, xTEnd.i, ), ), ),
			xTStart, xTEnd, this.area.x.start,
		);
		const xR= $(
			( xTStart, xTEnd,  xEnd, )=> mul( 'i', Math.min( xEnd.i, Math.max( xTStart.i, xTEnd.i, ), ), ),
			xTStart, xTEnd, this.area.x.end,
		);
		const tB= $(
			( tXStart, tXEnd, tStart, )=> Math.max( tStart, Math.min( tXStart, tXEnd, ), ),
			tXStart, tXEnd, this.area.t.start,
		);
		const tT= $(
			( tXStart, tXEnd,  tEnd, )=> Math.min( tEnd, Math.max( tXStart, tXEnd, ), ),
			tXStart, tXEnd, this.area.t.end,
		);
		const tL= $(
			( xTStart, xTEnd, tB, tT, )=> xTStart.i>xTEnd.i? tT : tB,
			xTStart, xTEnd, tB, tT,
		);
		const tR= $(
			( xTStart, xTEnd, tB, tT, )=> xTStart.i>xTEnd.i? tB : tT,
			xTStart, xTEnd, tB, tT,
		);
		
		return {
			type: 'line',
			data: {
				p0: this.transformPoint( { x:xL, t:tL, }, ),
				p1: this.transformPoint( { x:xR, t:tR, }, ),
				pO: this.transformPoint( line.p0, ),
			},
		}
	}
	
	renderCircle( circle, )
	{
		const boundaryPoint= ( t, x, sT, sX, )=> {
			return $(
				( r, oT, oX, t, x, )=> {
					
					if( r.r>0 )
						if( t - oT < r.r && t - oT > -r.r )
							t= sT*r.r - - oT;
					
					if( r.i>0 )
						if( x.i - oX.i < r.i && x.i - oX.i > -r.i )
							x= sum( mul( sX, r, ), oX, );
					
					if( (t - oT)*(t - oT) - (x.i - oX.i)*(x.i - oX.i) > mul( r, r, ).r )
						return { t:oT - - sT*Math.sqrt( Math.max( 0, mul( r, r, ).r - - (x.i - oX.i)*(x.i - oX.i), ), ), x:x, }
					else
						return { t:t, x:mul( 'i', oX.i - - sX*Math.sqrt( Math.max( 0, (t - oT)*(t - oT) - mul( r, r, ).r, ), ), ), }
				},
				circle.r, circle.o.t, circle.o.x, t, x,
			);
		}
		
		const TopLeft= boundaryPoint( this.area.t.end, this.area.x.start, 1, -1, );
		const TopRight= boundaryPoint( this.area.t.end, this.area.x.end, 1, 1, );
		const BottomLeft= boundaryPoint( this.area.t.start, this.area.x.start, -1, -1, );
		const BottomRight= boundaryPoint( this.area.t.start, this.area.x.end, -1, 1, );
		
		const apexes= [
			{ t:$( ( oT, r, )=> oT - - r.r, circle.o.t, circle.r, ), x:$( ( oX, r, )=> mul( 'i', oX.i - - r.i, ), circle.o.x, circle.r, ), },
			{ t:$( ( oT, r, )=> oT - r.r, circle.o.t, circle.r, ), x:$( ( oX, r, )=> mul( 'i', oX.i - r.i, ), circle.o.x, circle.r, ), },
		];
		
		function handle( corner, )
		{
			const t1= $( ( r, oT, oX, t0, x0, a0_t, a1_t, )=> ((r.r>0? t0>oT : x0.i>oX.i)? a0_t : a1_t), circle.r, circle.o.t, circle.o.x, corner.t, corner.x, apexes[0].t, apexes[1].t, );
			const x1= $( ( r, oT, oX, t0, x0, a0_x, a1_x, )=> ((r.r>0? t0>oT : x0.i>oX.i)? a0_x : a1_x), circle.r, circle.o.t, circle.o.x, corner.t, corner.x, apexes[0].x, apexes[1].x, );
			
			const h= $(
				( r, oT, oX, t0, x0, t1, x1, )=> {
					// const cos= Math.abs(t0*t1 - x0.i*x1.i)/Math.sqrt( (t0*t0 - x0.i*x0.i)*(t1*t1 - x1.i*x1.i), );
					const cos= ((t0 - oT)*(t1 - oT) - (x0.i - oX.i)*(x1.i - oX.i))/mul( r, r, ).r;
					const h_i= (4/3)*(Math.sqrt( -(1 - cos*cos), ) - Math.sqrt( -2*(1 - cos), ))/(1 - cos);
					const s= (t1 - t0)*(x1.i - x0.i)>0? 1 : -1;
					
					return (
						isNaN( h_i )
						? 0
						: mul( 'i', h_i, s, )
					);
				},
				circle.r, circle.o.t, circle.o.x, corner.t, corner.x, t1, x1,
			);
			
			
			return [
				{
					t: $( ( t, x, h, oX, )=> t - - mul( sub( x, oX, ), h, -1 ).r, corner.t, corner.x, h, circle.o.x, ),
					x: $( ( t, x, h, oT, )=> sum( x, mul( t - oT, h, ), ), corner.t, corner.x, h, circle.o.t, ),
				},
				{
					t: $( ( t, x, h, oX, )=> t - - mul( sub( x, oX, ), h, ).r, t1, x1, h, circle.o.x, ),
					x: $( ( t, x, h, oT, )=> sum( x, mul( t - oT, h, -1, ), ), t1, x1, h, circle.o.t, ),
				},
			];
		}
		
		const Handle_TL= handle( TopLeft, );
		const Handle_TR= handle( TopRight, );
		const Handle_BL= handle( BottomLeft, );
		const Handle_BR= handle( BottomRight, );
		
		const t_TopLeft= this.transformPoint( TopLeft, );
		const t_TopRight= this.transformPoint( TopRight, );
		const t_BottomLeft= this.transformPoint( BottomLeft, );
		const t_BottomRight= this.transformPoint( BottomRight, );
		const t_apexes= [
			this.transformPoint( apexes[0], ),
			this.transformPoint( apexes[1], ),
		];
		
		const t_Handle_TL= Handle_TL.map( x=> this.transformPoint( x, ), );
		const t_Handle_TR= Handle_TR.map( x=> this.transformPoint( x, ), );
		const t_Handle_BL= Handle_BL.map( x=> this.transformPoint( x, ), );
		const t_Handle_BR= Handle_BR.map( x=> this.transformPoint( x, ), );
		
		return {
			type: 'path',
			data: {
				d: $(
					(
						r, a0_x, a0_y, a1_x, a1_y,
						TL_x, TL_y, TR_x, TR_y, BL_x, BL_y, BR_x, BR_y,
						H_TL_0_x, H_TR_0_x, H_BL_0_x, H_BR_0_x,
						H_TL_0_y, H_TR_0_y, H_BL_0_y, H_BR_0_y,
						H_TL_1_x, H_TR_1_x, H_BL_1_x, H_BR_1_x,
						H_TL_1_y, H_TR_1_y, H_BL_1_y, H_BR_1_y,
					)=> (
						r.r>0
						? [
							`M ${TL_x} ${TL_y}`,
							`C ${H_TL_0_x} ${H_TL_0_y}  ${H_TL_1_x} ${H_TL_1_y}  ${a0_x} ${a0_y}`,
							`C ${H_TR_1_x} ${H_TR_1_y}  ${H_TR_0_x} ${H_TR_0_y}  ${TR_x} ${TR_y}`,
							`M ${BL_x} ${BL_y}`,
							`C ${H_BL_0_x} ${H_BL_0_y}  ${H_BL_1_x} ${H_BL_1_y}  ${a1_x} ${a1_y}`,
							`C ${H_BR_1_x} ${H_BR_1_y}  ${H_BR_0_x} ${H_BR_0_y}  ${BR_x} ${BR_y}`,
						].join( ' ', )
						: [
							`M ${TL_x} ${TL_y}`,
							`C ${H_TL_0_x} ${H_TL_0_y}  ${H_TL_1_x} ${H_TL_1_y}  ${a1_x} ${a1_y}`,
							`C ${H_BL_1_x} ${H_BL_1_y}  ${H_BL_0_x} ${H_BL_0_y}  ${BL_x} ${BL_y}`,
							`M ${TR_x} ${TR_y}`,
							`C ${H_TR_0_x} ${H_TR_0_y}  ${H_TR_1_x} ${H_TR_1_y}  ${a0_x} ${a0_y}`,
							`C ${H_BR_1_x} ${H_BR_1_y}  ${H_BR_0_x} ${H_BR_0_y}  ${BR_x} ${BR_y}`,
						].join( ' ', )
					),
					circle.r, t_apexes[0].x, t_apexes[0].y, t_apexes[1].x, t_apexes[1].y,
					t_TopLeft.x, t_TopLeft.y, t_TopRight.x, t_TopRight.y, t_BottomLeft.x, t_BottomLeft.y, t_BottomRight.x, t_BottomRight.y,
					t_Handle_TL[0].x, t_Handle_TR[0].x, t_Handle_BL[0].x, t_Handle_BR[0].x,
					t_Handle_TL[0].y, t_Handle_TR[0].y, t_Handle_BL[0].y, t_Handle_BR[0].y,
					t_Handle_TL[1].x, t_Handle_TR[1].x, t_Handle_BL[1].x, t_Handle_BR[1].x,
					t_Handle_TL[1].y, t_Handle_TR[1].y, t_Handle_BL[1].y, t_Handle_BR[1].y,
				),
			},
		};
	}
}
