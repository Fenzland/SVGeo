import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';

export default class Circle extends Path
{
	constructor( center, radius, options={}, )
	{
		super();
		
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
		const [ p0, p1, ]= [
			new Model( new Point( 0, 0, options, ), ),
			new Model( new Point( 0, 0, options, ), ),
		];
		
		return $(
			( r0, r1, c0x, c0y, c1x, c1y, )=> {
				const d= Math.sqrt( (c0x - c1x)*(c0x - c1x) - - (c0y - c1y)*(c0y - c1y), );
				const [ dr, sr, ]= [ Math.abs( r0 - r1, ), r0 - - r1, ];
				
				if( d===0 || d > sr || d < dr )
					return [];
				else
				if( d===sr || d===dr )
				{
					p0.valueOf().setCoor( (c1x - c0x)*r0/r - - c0x, (c1y - c0y)*r0/r - - c0y, );
					
					return [ p0, ];
				}
				else
				{
					const l= (r0*r0 -r1*r1 - - d*d)/(2*d);
					const h= Math.sqrt( r0*r0 - l*l, );
					
					p0.valueOf().setCoor( (c1x - c0x)*l/d - (c1y - c0y)*h/d - - c0x, (c1y - c0y)*l/d - - (c1x - c0x)*h/d - - c0y, );
					p1.valueOf().setCoor( (c1x - c0x)*l/d - - (c1y - c0y)*h/d - - c0x, (c1y - c0y)*l/d - (c1x - c0x)*h/d - - c0y, );
					
					return [ p0, p1, ];
				}
			},
			this.r, circle.r, this.o.x, this.o.y, circle.o.x, circle.o.y,
		);
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
