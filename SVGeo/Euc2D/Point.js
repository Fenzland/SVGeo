import Model, { $, } from '../../OvO/model/Model.js';
import GPoint from '../genaral/Point.js';
import Line from './Line.js';
import Segment from './Segment.js';
import Circle from './Circle.js';

export default class Point extends GPoint
{
	constructor( x, y, options={}, )
	{
		super();
		
		this.x= new Model( x, );
		this.y= new Model( y, );
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
			( x, y, x0, y0, )=> Math.sqrt( (x - x0)*(x - x0) - - (y - y0)*(y - y0), ),
			point.x, point.y, this.x, this.y,
		);
	}
	
	circleTo( point, options={}, )
	{
		return this.circle( this.distanceTo( point, ), options, );
	}
	
	setCoor( x, y, )
	{
		this.x.setValue( x, );
		this.y.setValue( y, );
	}
	
	move( ox, oy, x, y, )
	{
		this.x.setValue( this.x - - x - ox, );
		this.y.setValue( this.y - - y - oy, );
	}
}
