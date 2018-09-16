import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';
import Line from './Line.js';
import Segment from './Segment.js';
import Circle from './Circle.js';
import GPoint from '../genaral/Point.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';

export default class Point extends GPoint
{
	constructor( t, x, options={}, )
	{
		super();
		
		this.t= new Model( t, );
		this.x= new Model( x, ).$( x=> new Complex( x, ), );
		this.options= options;
	}
	
	lineTo( to, options={}, )
	{
		return new Line( this, to, options, );
	}
	
	segmentTo( to, options={}, )
	{
		return new Segment( this, to, options, );
	}
	
	circle( radius, options={}, )
	{
		return new Circle( this, radius, options, );
	}
	
	distanceTo( point, )
	{
		return $(
			( t, x, t0, x0, )=> sum( (t - t0)*(t - t0), mul( sub( x, x0 ), sub( x, x0 ), ), ).sqrt(),
			point.t, point.x, this.t, this.x,
		);
	}
	
	circleTo( point, options={}, )
	{
		return this.circle( this.distanceTo( point, ), options, );
	}
	
	setCoor( t, x, )
	{
		this.t.setValue( t, );
		this.x.setValue( new Complex( x, ), );
	}
	
	move( ot, ox,  t, x, )
	{
		this.t.setValue( this.t - - t - ot, );
		this.x.setValue( sum( this.x.valueOf(), x, mul( -1, ox, ), ), );
	}
}
