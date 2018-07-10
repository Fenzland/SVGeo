import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';
import PointOnCircle from './PointOnCircle.js';

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
			( r0, r1, o0x, o0y, o1x, o1y, )=> {
				const d= Math.sqrt( (o0x - o1x)*(o0x - o1x) - - (o0y - o1y)*(o0y - o1y), );
				const [ dr, sr, ]= [ Math.abs( r0 - r1, ), r0 - - r1, ];
				
				if( d===0 || d > sr || d < dr )
					return [];
				else
				if( d===sr || d===dr )
				{
					p0.valueOf().setCoor( (o1x - o0x)*r0/r - - o0x, (o1y - o0y)*r0/r - - o0y, );
					
					return [ p0, ];
				}
				else
				{
					const l= (r0*r0 - r1*r1 - - d*d)/(2*d);
					const h= Math.sqrt( r0*r0 - l*l, );
					
					p0.valueOf().setCoor( (o1x - o0x)*l/d - (o1y - o0y)*h/d - - o0x, (o1y - o0y)*l/d - - (o1x - o0x)*h/d - - o0y, );
					p1.valueOf().setCoor( (o1x - o0x)*l/d - - (o1y - o0y)*h/d - - o0x, (o1y - o0y)*l/d - (o1x - o0x)*h/d - - o0y, );
					
					return [ p0, p1, ];
				}
			},
			this.r, circle.r, this.o.x, this.o.y, circle.o.x, circle.o.y,
		);
	}
	
	point( u, options, )
	{
		return new PointOnCircle( this, u, options, );
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
