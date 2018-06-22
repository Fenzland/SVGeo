import Model, { $, } from '../../OvO/model/Model.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';
import Point from './Point.js';

export default class Mink2DViewport
{
	constructor()
	{
		this.area= new Model( { t:{ start:-8, end:8, }, x:{ start:new Complex( '-8i', ), end:new Complex( '8i', ), }, }, );
		this.resolution= new Model( 256, );
	}
	
	set( [ tStart, tEnd, ], [ xStart, xEnd, ], resolution, )
	{
		this.area.t.start=  tStart;
		this.area.t.end=    tEnd;
		this.area.x.start=  new Complex( xStart, );
		this.area.x.end=    new Complex( xEnd, );
		this.resolution.setValue( resolution, );
	}
	
	get areaWidth()
	{
		return $( ( e, s, )=> sub( e, s, ).i, this.area.x.end, this.area.x.start, );
	}
	
	get areaHeight()
	{
		return $( ( e, s, )=> e - s, this.area.t.end, this.area.t.start, );
	}
	
	get width()
	{
		return this.resolution;
	}
	
	get height()
	{
		return $( ( r, hwr, )=> r*hwr, this.resolution, this.HWRatio, );
	}
	
	get HWRatio()
	{
		return $( ( ah, aw, )=> ah/aw, this.areaHeight, this.areaWidth, );
	}
	
	get viewBox()
	{
		return $( ( w, h, )=> `0,0,${w},${h}`, this.width, this.height, );
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
			},
		}
	}
	
	renderCircle( circle, )
	{
		const boundaryPoint= ( t, x, sT, sX, )=> {
			return this.transformPoint( $(
				( r, oT, oX, t, x, )=> {
					
					if( r.r>0 )
						if( t - oT < r.r && t - oT > -r.r )
							t= sT*r.r
					
					if( r.i>0 )
						if( x.i - oX.i < r.i && x.i - oX.i > -r.i )
							x= mul( sX, r, )
					
					if( (t - oT)*(t - oT) - (x.i - oX.i)*(x.i - oX.i) > mul( r, r, ).r )
						return { t:sT*Math.sqrt( mul( r, r, ).r - - (x.i - oX.i)*(x.i - oX.i), ), x:x, }
					else
						return { t:t, x:mul( 'i', sX*Math.sqrt( (t - oT)*(t - oT) - mul( r, r, ).r, ), ), }
				},
				circle.r, circle.o.t, circle.o.x, t, x,
			), );
		}
		
		const TopLeft= boundaryPoint( this.area.t.end, this.area.x.start, 1, -1, );
		const TopRight= boundaryPoint( this.area.t.end, this.area.x.end, 1, 1, );
		const BottomLeft= boundaryPoint( this.area.t.start, this.area.x.start, -1, -1, );
		const BottomRight= boundaryPoint( this.area.t.start, this.area.x.end, -1, 1, );
		
		const apexes= [
			this.transformPoint( { t:$( ( oT, r, )=> oT - - r.r, circle.o.t, circle.r, ), x:$( ( oX, r, )=> mul( 'i', oX.i - - r.i, ), circle.o.x, circle.r, ), }, ),
			this.transformPoint( { t:$( ( oT, r, )=> oT - r.r, circle.o.t, circle.r, ), x:$( ( oX, r, )=> mul( 'i', oX.i - r.i, ), circle.o.x, circle.r, ), }, ),
		];
		
		return {
			type: 'path',
			data: {
				o: this.transformPoint( circle.o, ),
				a: this.transformPoint( new Point( circle.o.t - - circle.r.r, circle.o.x - - circle.r.i, ), ),
				b: Math.max( circle.r.r, circle.r.i, ),
				d: $(
					( r, a0_x, a0_y, a1_x, a1_y, TL_x, TL_y, TR_x, TR_y, BL_x, BL_y, BR_x, BR_y, )=> (
						r.r>0
						? [
							`M ${TL_x} ${TL_y}`,
							`Q ${TL_x - (TL_y - a0_y)} ${a0_y} ${a0_x} ${a0_y}`,
							`Q ${TR_x - (a0_y - TR_y)} ${a0_y} ${TR_x} ${TR_y}`,
							`M ${BL_x} ${BL_y}`,
							`Q ${BL_x - (a1_y - BL_y)} ${a1_y} ${a1_x} ${a1_y}`,
							`Q ${BR_x - (BR_y - a1_y)} ${a1_y} ${BR_x} ${BR_y}`,
						].join( ' ', )
						: [
							`M ${TL_x} ${TL_y}`,
							`Q ${a1_x} ${TL_y - (TL_x - a1_x)} ${a1_x} ${a1_y}`,
							`Q ${a1_x} ${BL_y - (a1_x - BL_x)} ${BL_x} ${BL_y}`,
							`M ${TR_x} ${TR_y}`,
							`Q ${a0_x} ${TR_y - (a0_x - TR_x)} ${a0_x} ${a0_y}`,
							`Q ${a0_x} ${BR_y - (BR_x - a0_x)} ${BR_x} ${BR_y}`,
						].join( ' ', )
					),
					circle.r, apexes[0].x, apexes[0].y, apexes[1].x, apexes[1].y, TopLeft.x, TopLeft.y, TopRight.x, TopRight.y, BottomLeft.x, BottomLeft.y, BottomRight.x, BottomRight.y,
				),
			},
		};
	}
}
