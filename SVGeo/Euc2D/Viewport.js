import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';

export default class Euc2DViewport
{
	constructor()
	{
		this.area= new Model( { x:{ start:-8, end:8, }, y:{ start:-8, end:8, }, }, );
		this.resolution= new Model( 256, );
		this.stroke= new Model( 1, );
		
		this.areaWidth= $( ( e, s, )=> e - s, this.area.x.end, this.area.x.start, );
		this.areaHeight= $( ( e, s, )=> e - s, this.area.y.end, this.area.y.start, );
		this.HWRatio= $( ( ah, aw, )=> ah/aw, this.areaHeight, this.areaWidth, );
		this.width= this.resolution;
		this.height= $( ( r, hwr, )=> r*hwr, this.resolution, this.HWRatio, );
		this.viewBox= $( ( w, h, )=> `0,0,${w},${h}`, this.width, this.height, );
	}
	
	set( [ xStart, xEnd, ], [ yStart, yEnd, ], resolution, stroke=1, )
	{
		this.area.x.start=  xStart;
		this.area.x.end=    xEnd;
		this.area.y.start=  yStart;
		this.area.y.end=    yEnd;
		this.resolution.setValue( resolution, );
		this.stroke.setValue( stroke, );
	}
	
	move( ox, oy, x, y, )
	{
		this.area.x.start= this.area.x.start - x - - ox;
		this.area.x.end= this.area.x.end - x - - ox;
		this.area.y.start= this.area.y.start - y - - oy;
		this.area.y.end= this.area.y.end - y - - oy;
	}
	
	moveTarget( target, ox, oy, x, y, )
	{
		const xSt= this.area.x.start.valueOf();
		const yEn= this.area.y.end.valueOf();
		const aw= this.areaWidth.valueOf();
		const w= this.width.valueOf();
		const ah= this.areaHeight.valueOf();
		const h= this.height.valueOf();
		
		target.move(
			xSt - - ox*aw/w,
			yEn - oy*ah/h,
			xSt - - x*aw/w,
			yEn - y*ah/h,
		);
	}
	
	transformPoint( point, )
	{
		return new Model( {
			x: $( ( x, xSt, w, aw, )=> (x - xSt)*w/aw, point.x, this.area.x.start, this.width, this.areaWidth, ),
			y: $( ( y, yEn, w, aw, )=> (yEn - y)*w/aw, point.y, this.area.y.end, this.width, this.areaWidth, ),
		}, );
	}
	
	renderLine( line, )
	{
		const yXStart= line.yFx( this.area.x.start, );
		const yXEnd=   line.yFx( this.area.x.end, );
		const xYStart= line.xFy( this.area.y.start, );
		const xYEnd=   line.xFy( this.area.y.end, );
		
		const xL= $(
			( xYStart, xYEnd, xStart, )=> Math.max( xStart, Math.min( xYStart, xYEnd, ), ),
			xYStart, xYEnd, this.area.x.start,
		);
		const xR= $(
			( xYStart, xYEnd,  xEnd, )=> Math.min( xEnd, Math.max( xYStart, xYEnd, ), ),
			xYStart, xYEnd, this.area.x.end,
		);
		const yB= $(
			( yXStart, yXEnd, yStart, )=> Math.max( yStart, Math.min( yXStart, yXEnd, ), ),
			yXStart, yXEnd, this.area.y.start,
		);
		const yT= $(
			( yXStart, yXEnd,  yEnd, )=> Math.min( yEnd, Math.max( yXStart, yXEnd, ), ),
			yXStart, yXEnd, this.area.y.end,
		);
		const yL= $(
			( xYStart, xYEnd, yB, yT, )=> xYStart>xYEnd? yT : yB,
			xYStart, xYEnd, yB, yT,
		);
		const yR= $(
			( xYStart, xYEnd, yB, yT, )=> xYStart>xYEnd? yB : yT,
			xYStart, xYEnd, yB, yT,
		);
		
		return {
			type: 'line',
			data: {
				p0: this.transformPoint( { x:xL, y:yL, }, ),
				p1: this.transformPoint( { x:xR, y:yR, }, ),
				pO: this.transformPoint( line.p0, ),
			},
		}
	}
	
	renderSegment( segment, )
	{
		return {
			type: 'line',
			data: {
				p1: this.transformPoint( segment.p1, ),
				p0: this.transformPoint( segment.p0, ),
				pO: this.transformPoint( segment.p0, ),
			},
		}
	}
	
	renderCircle( circle, )
	{
		return {
			type: 'circle',
			data: {
				o: this.transformPoint( circle.o, ),
				r: $( ( r, w, aw )=> r*w/aw, circle.r, this.width, this.areaWidth, ),
			},
		};
	}
}
