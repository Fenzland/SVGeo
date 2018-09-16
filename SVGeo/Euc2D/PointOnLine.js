import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Circle from './Circle.js';

export default class PointOnLine extends GPoint
{
	constructor( line, u, options={}, )
	{
		super();
		
		this.line= line;
		
		this.u= new Model( u, );
		this.x= $(
			( u, x0, x1, )=> x0 - - (x1 - x0)*u,
			this.u, line.p0.x, line.p1.x,
		);
		this.y= $(
			( u, y0, y1, )=> y0 - - (y1 - y0)*u,
			this.u, line.p0.y, line.p1.y,
		);
		this.options= options;
	}
	
	setCoor( u, )
	{
		this.u.setValue( u, );
	}
	
	move( ox, oy, x, y, )
	{
		const x0= this.line.p0.x.valueOf();
		const y0= this.line.p0.y.valueOf();
		const x1= this.line.p1.x.valueOf();
		const y1= this.line.p1.y.valueOf();
		
		const du= ((x - ox)*(x1 - x0) - - (y - - oy)*(y1 - y0))/((x1 - x0)*(x1 - x0) - - (y1 - y0)*(y1 - y0));
		
		this.u.setValue( this.u.valueOf() - - du, );
	}
}
