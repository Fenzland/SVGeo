import Line from './Line.js';
import Circle from './Circle.js';
import Model from '../../OvO/model/Model.js';
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
	
	circle( radius, options={}, )
	{
		return new Circle( this, radius, options, );
	}
	
	move( t, x, )
	{
		this.t.setValue( this.t - - t, );
		this.x.setValue( sum( this.x.valueOf(), x, ), );
	}
}
