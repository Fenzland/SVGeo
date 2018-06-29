import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';

export default class Line extends Path
{
	constructor( p0, p1, options={}, )
	{
		super();
		
		this.p0= p0;
		this.p1= p1;
		this.options= options;
	}
	
	yFx( x, )
	{
		return $(
			( x, x0, y0, x1, y1, )=> (x - x0)*(y1 - y0)/(x1 - x0) - - y0,
			x, this.p0.x, this.p0.y, this.p1.x, this.p1.y,
		);
	}
	
	xFy( y, )
	{
		return $(
			( y, y0, x0, y1, x1, )=> (y - y0)*(x1 - x0)/(y1 - y0) - - x0,
			y, this.p0.y, this.p0.x, this.p1.y, this.p1.x,
		);
	}
	
	crossLine( line, )
	{
		
	}
	
	crossCircle( circle, options={}, )
	{
		const d= this.distanceTo( circle.center, );
		const foot= this.foot( circle.center, );
		
		const points= [
			new Model( new Point( 0, 0, options, ), ),
			new Model( new Point( 0, 0, options, ), ),
		];
		
		return $(
			( d, r, footX, footY, y0, x0, y1, x1, )=> {
				if( d > r )
					return [];
				else
				if( d == r )
					return [ foot, ];
				
				const R= Math.sqrt( (r*r - d*d)/((x1 - x0)*(x1 - x0) - - (y1 - y0)*(y1 - y0)), );
				
				points[0].valueOf().setCoor( footX - R*(x1 - x0), footY - R*(y1 - y0), );
				points[1].valueOf().setCoor( footX - R*(x0 - x1), footY - R*(y0 - y1), );
				
				return points;
			},
			d, circle.r, foot.valueOf().x, foot.valueOf().y, this.p0.y, this.p0.x, this.p1.y, this.p1.x,
		);
	}
	
	distanceTo( point, )
	{
		return $(
			( x, y, xFy, yFx, )=> (
				isNoI( xFy, )?Math.abs( y - yFx, ):
				isNoI( yFx, )?Math.abs( x - xFy, ):
				(x - xFy)===0?0:
				(x - xFy)*(y - yFx)/Math.sqrt( ((x - xFy)*(x - xFy) - - (y - yFx)*(y - yFx)), )
			),
			point.x, point.y, this.xFy( point.y, ), this.yFx( point.x, ),
		);
	}
	
	foot( point, options={}, )
	{
		const x= $(
			( x, y, xFy, yFx, )=> {
				const dx= x - xFy;
				const dy= y - yFx;
				const R= dx*dy/(dx*dx - - dy*dy);
				
				return dx===0?x: isNoI( xFy, )?x: isNoI( yFx, )?xFy: x - dy*R;
			},
			point.x, point.y, this.xFy( point.y, ), this.yFx( point.x, ),
		);
		
		const y= $(
			( x, y, xFy, yFx, )=> {
				const dx= x - xFy;
				const dy= y - yFx;
				const R= dx*dy/(dx*dx - - dy*dy);
				
				return dy===0?y: isNoI( xFy, )?yFx: isNoI( yFx, )?y: y - dx*R;
			},
			point.x, point.y, this.xFy( point.y, ), this.yFx( point.x, ),
		);
		
		return new Point( x, y, options, );
	}
}

function isNoI( number, )
{
	return isNaN( number, ) || !isFinite( number, )
}
