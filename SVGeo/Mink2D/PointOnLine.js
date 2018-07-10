import Model, { $, } from '../../OvO/model/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Circle from './Circle.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';

export default class PointOnLine extends GPoint
{
	constructor( line, u, options={}, )
	{
		super();
		
		this.line= line;
		
		this.r= $(
			( t0, x0, t1, x1, )=> sum( (t1 - t0)*(t1 - t0), mul( sub( x1, x0, ), sub( x1, x0, ), ), ).sqrt().r,
			line.p0.t, line.p0.x, line.p1.t, line.p1.x,
		);
		
		this.u= new Model( u, );
		this.t= $(
			( u, t0, t1, )=> t0 - - (t1 - t0)*u,
			this.u, line.p0.t, line.p1.t,
		);
		this.x= $(
			( u, x0, x1, )=> sum( x0, mul( sub( x1, x0, ), u, ), ),
			this.u, line.p0.x, line.p1.x,
		);
		this.options= options;
	}
	
	setCoor( u, )
	{
		this.u.setValue( u, );
	}
	
	move( t, x, )
	{
		const t0= this.line.p0.t.valueOf();
		const x0= this.line.p0.x.valueOf();
		const t1= this.line.p1.t.valueOf();
		const x1= this.line.p1.x.valueOf();
		
		const dt2= (t1 - t0)*(t1 - t0);
		const r2= sum( dt2, mul( sub( x1, x0, ), sub( x1, x0, ), ), ).r;
		
		let du;
		
		if( 9*Math.abs( r2, ) < dt2 )
			if( (t0 > t1)^(x0.i > x1.i) )
				du= (t - x.i)/((t1 - x1.i) - (t0 - x0.i));
			else
				du= (t - - x.i)/((t1 - - x1.i) - (t0 - - x0.i));
		else
			du= sum( t*(t1 - t0), mul( x, sub( x1, x0, ), ), ).r/r2;
		
		this.u.setValue( this.u.valueOf() - - du, );
	}
}
