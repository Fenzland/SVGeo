import Model, { $, } from '../../OvO/model/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Circle from './Circle.js';

export default class PointOnLine extends GPoint
{
	constructor( line, u, options={}, )
	{
		super();
		
		this.line= line;
		
		const r= $(
			( x0, y0, x1, y1, )=> Math.sqrt( (x1 - x0)*(x1 - x0) - - (y1 - y0)*(y1 - y0), ),
			line.p0.x, line.p0.y, line.p1.x, line.p1.y,
		);
		
		this.u= new Model( u, );
		this.x= $(
			( u, x0, x1, )=> x0 - - (x1 - x0)*u/r,
			this.u, line.p0.x, line.p1.x,
		);
		this.y= $(
			( u, y0, y1, )=> y0 - - (y1 - y0)*u/r,
			this.u, line.p0.y, line.p1.y,
		);
		this.options= options;
	}
	
	setCoor( u, )
	{
		this.u.setValue( u, );
	}
	
	move( x, y, )
	{
		const x0= this.line.p0.x.valueOf();
		const y0= this.line.p0.y.valueOf();
		const x1= this.line.p1.x.valueOf();
		const y1= this.line.p1.y.valueOf();
		
		const u= (x*(x1 - x0) - - y*(y1 - y0))/Math.sqrt( (x1 - x0)*(x1 - x0) - - (y1 - y0)*(y1 - y0), );
		
		this.u.setValue( this.u - - u, );
	}
}
