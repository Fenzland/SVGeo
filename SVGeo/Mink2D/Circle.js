import Model from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';

export default class Circle extends Path
{
	constructor( center, radius, options={}, )
	{
		super();
		
		radius= new Complex( radius, );
		
		if( radius.r!==0 && radius.i!==0 )
			throw new Error( `The radius of circle must be a real or a pure imarginary number, '${radius}' is invalid.`, );
		
		this.center= center;
		this.radius= new Model( radius, );
		this.options= options;
	}
	
	crossLine( line, options={}, )
	{
		return line.crossCircle( this, options, );
	}
	
	crossCircle( circle, options={}, )
	{
		
	}
	
	get o()
	{
		return this.center;
	}
	
	get r()
	{
		return this.radius;
	}
}
