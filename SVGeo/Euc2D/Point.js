import Line from './Line.js';
import Circle from './Circle.js';
import Model from '../../OvO/model/Model.js';

export default class Point
{
	constructor( x, y, options={}, space, )
	{
		this.x= new Model( x, );
		this.y= new Model( y, );
		this.options= options;
		this.space= space;
	}
	
	lineTo( to, options={}, )
	{
		const line= new Line( this, to, options, this.space, );
		
		this.space.paths.push( line, );
		
		return line;
	}
	
	circle( radius, options={}, )
	{
		const circle= new Circle( this, radius, options, this.space, );
		
		this.space.paths.push( circle, );
		
		return circle;
	}
	
	move( x, y, )
	{
		this.x.setValue( this.x - - x, );
		this.y.setValue( this.y - - y, );
	}
}
