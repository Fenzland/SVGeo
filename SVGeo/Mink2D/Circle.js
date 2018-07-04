import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Complex, { sum, mul, sub, div, log, cos, equ, } from '../support/Complex.js';
import Point from './Point.js';

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
		const [ p0, p1, ]= [
			new Model( new Point( 0, 0, options, ), ),
			new Model( new Point( 0, 0, options, ), ),
		];
		
		return $(
			( r0, r1, o0t, o0x, o1t, o1x, )=> {
				if( o0t===o1t && equ( o0x, o1x, ) )
					return [];
				
				const D= (o0t - o1t)*(o0t - o1t) - (o0x.i - o1x.i)*(o0x.i - o1x.i);
				const d= D<0? mul( 'i', Math.sqrt( -D, ), ) : mul( 1, Math.sqrt( D, ), );
				
				if( D===0 )
				{
					const [ o0u, o0v, o1u, o1v, ]= [ o0t - o0x.i, o0t - - o0x.i, o1t - o1x.i, o1t - - o1x.i, ];
					
					const [ R0, R1, ]= [ mul( r0, r0, ).r, mul( r1, r1, ).r, ]
					
					if( o0v===o1v )
					{
						const v= (R1 - R0)/(o0u - o1u);
						const u= (R0 - - v*o0u)/(v - o0v);
						
						p0.valueOf().setCoor( (u + v)/2, div( u - v, '-2i', ), );
						
						return [ p0, ];
					}
					else
					if( o0u===o1u )
					{
						const u= (R1 - R0)/(o0v - o1v);
						const v= (R0 - - u*o0v)/(u - o0u);
						
						p0.valueOf().setCoor( (u + v)/2, div( u - v, '-2i', ), );
						
						return [ p0, ];
					}
					else
						return [];
				}
				else
				{
					const [ dr, sr, ]= [ sub( r0, r1, ), sum( r0, r1, ), ];
					
					if( mul( d, sr, ).r!=0 && d.mod < sr.mod && d.mod > dr.mod )
						return [];
					
					const l= div( sum( mul( r0, r0, ), mul( -1,r1,r1, ), D, ), mul( 2, d, ), );
					const H= sub( mul( r0, r0, ), mul( l, l, ), );
					const h= H<0? mul( 'i', Math.sqrt( -H, ), ) : mul( 1, Math.sqrt( H, ), );
					
					const t0= sub( div( mul( o1t - o0t, l, ), d, ), div( mul( sub( o1x, o0x, ), h, ), d, ), ).r - - o0t;
					const t1= sum( div( mul( o1t - o0t, l, ), d, ), div( mul( sub( o1x, o0x, ), h, ), d, ), ).r - - o0t;
					
					const x0= sum( sum( div( mul( sub( o1x, o0x, ), l, ), d, ), div( mul( o1t - o0t, h, ), d, ), ), o0x, );
					const x1= sum( sub( div( mul( sub( o1x, o0x, ), l, ), d, ), div( mul( o1t - o0t, h, ), d, ), ), o0x, );
					
					p0.valueOf().setCoor( t0, x0, );
					p1.valueOf().setCoor( t1, x1, );
					
					return [ p0, p1, ];
				}
			},
			this.r, circle.r, this.o.t, this.o.x, circle.o.t, circle.o.x,
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
