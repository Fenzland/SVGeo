import Model, { $, } from '../../OvO/model/Model.js';

export default class Euc2DViewport
{
	constructor()
	{
		this.area= new Model( { x:{ start:-8, end:8, }, y:{ start:-8, end:8, }, }, );
		this.resolution= new Model( 256, );
	}
	
	set( [ xStart, xEnd, ], [ yStart, yEnd, ], resolution, )
	{
		this.area.x.start=  xStart;
		this.area.x.end=    xEnd;
		this.area.y.start=  yStart;
		this.area.y.end=    yEnd;
		this.resolution.setValue( resolution, );
	}
	
	get areaWidth()
	{
		return $( ( e, s, )=> e - s, this.area.x.end, this.area.x.start, );
	}
	
	get areaHeight()
	{
		return $( ( e, s, )=> e - s, this.area.y.end, this.area.y.start, );
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
	
	move( x, y, )
	{
		this.area.x.start= this.area.x.start - x;
		this.area.x.end= this.area.x.end - x;
		this.area.y.start= this.area.y.start - y;
		this.area.y.end= this.area.y.end - y;
	}
	
	moveTarget( target, x, y, )
	{
		target.move(
			x*this.areaWidth/this.width,
			y*this.areaHeight/this.height,
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