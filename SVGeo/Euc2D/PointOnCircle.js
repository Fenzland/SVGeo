import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Circle from './Circle.js';
import Complex from '../support/Complex.js';

export default class PointOnCircle extends GPoint
{
	constructor( circle, u, options={}, )
	{
		super();
		
		this.circle= circle;
		
		this.u= new Model( u, );
		this.x= $(
			( u, ox, r, )=> ox - - r*Math.cos( u, ),
			this.u, circle.o.x, circle.r,
		);
		this.y= $(
			( u, oy, r, )=> oy - - r*Math.sin( u, ),
			this.u, circle.o.y, circle.r,
		);
		this.options= options;
	}
	
	setCoor( u, )
	{
		this.u.setValue( u, );
	}
	
	move( ox, oy, x, y, )
	{
		const Ox= this.circle.o.x.valueOf();
		const Oy= this.circle.o.y.valueOf();
		
		this.u.setValue( new Complex( x - Ox, y - Oy, ).arg, );
	}
}
