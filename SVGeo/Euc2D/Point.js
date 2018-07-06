import Model from '../../OvO/model/Model.js';
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
	
	setCoor( x, y, )
	{
		this.x.setValue( x, );
		this.y.setValue( y, );
	}
	
	move( x, y, )
	{
		this.x.setValue( this.x - - x, );
		this.y.setValue( this.y - - y, );
	}
}
