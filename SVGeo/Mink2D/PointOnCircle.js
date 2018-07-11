import Model, { $, } from '../../OvO/model/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Circle from './Circle.js';
import Complex, { sum, mul, sub, div, cos, sin, atan, π, } from '../support/Complex.js';

export default class PointOnCircle extends GPoint
{
	constructor( circle, u, options={}, )
	{
		super();
		
		this.circle= circle;
		
		this.u= new Model( u, ).$( u=> new Complex( u, ), );
		this.t= $(
			( u, ot, r, )=> ot - - mul( r, cos( u, ), ).r,
			this.u, circle.o.t, circle.r,
		);
		this.x= $(
			( u, ox, r, )=> sum( ox, mul( r, sin( u, ), ), ),
			this.u, circle.o.x, circle.r,
		);
		this.options= options;
	}
	
	setCoor( u, )
	{
		this.u.setValue( u, );
	}
	
	move( ot, ox, t, x, )
	{
		const Ot= this.circle.o.t.valueOf();
		const Ox= this.circle.o.x.valueOf();
		const r= this.circle.r.valueOf();
		
		const tanθ= div( sub( x, Ox, ), t - Ot, );
		
		if( r.r>0 )
		{
			const u= atan( tanθ.sqmod>1?div( 1, tanθ, ):tanθ, );
			
			this.u.setValue( t>0? u : sum( π, u, ), );
		}
		else
		{
			const u= atan( tanθ.sqmod<1?div( 1, tanθ, ):tanθ, );
			
			this.u.setValue( x.i>0? u : sum( π, u, ), );
		}
	}
}
