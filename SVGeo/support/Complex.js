export const π= Math.PI;

export default class Complex extends Number
{
	constructor( r, i=0, )
	{
		if( r instanceof Complex )
			return r;
		
		if( typeof r === 'string' )
			return Complex.fromString( r, );
		
		super( r, );
		
		this.r= +r;
		this.i= +i;
	}
	
	toString()
	{
		return `${(!this.r && this.i)?'':this.r}${this.r && this.i>0?'+':''}${this.i?`${this.i===1?'':this.i===-1?'-':this.i}i`:''}`;
	}
	
	valueOf()
	{
		return this.toString();
	}
	
	static fromString( s, )
	{
		const m= s.match(/^(?:(-?(?:\d*\.)?\d+)??(π)?)??\+?(?:(-?(?:\d*\.)?\d*)(π)?i)?$/);
		
		if(!(m ))
			throw new Error( `The format of complex number must be 'a±bi', 'a' or 'bi'. '${s}' is invalid.` );
		
		return new this(
			+(m[1]||(m[2]?1:0))*(m[2]?π:1),
			+(m[3]===''?1: m[3]==='-'?-1: m[3]||0)*(m[4]?π:1),
		);
	}
	
	get sqmod()
	{
		return this.r*this.r - - this.i*this.i;
	}
	
	get mod()
	{
		return Math.sqrt( this.sqmod, );
	}
	
	get arg()
	{
		return this.r>=0?Math.atan( this.i/this.r, ): this.i>=0?(Math.atan( this.i/this.r, ) - - π): (Math.atan( this.i/this.r, ) - π);
	}
	
	get unit()
	{
		return new Complex( this.r/this.mod, this.i/this.mod, );
	}
	
	get rec()
	{
		if( this.r===0 && this.i===0 )
			return new Complex( Infinity, Infinity, );
		else
			return new Complex( this.r/this.sqmod, this.i/this.sqmod, );
	}
	
	sqrt()
	{
		if( this.r===0 && this.i===0 )
			return new (this.constructor)( 0, 0, );
		
		const sqmod= this.mod;
		const cos= Math.sqrt( (this.r/sqmod + 1)/2, );
		const mod= Math.sqrt( sqmod, );
		
		return new (this.constructor)( cos*mod, Math.sqrt( 1 - cos*cos, )*mod, );
	}
	
	static sum( ...nums )
	{
		return new this( ...nums.map( x=> new Complex( x, ) ).reduce( ( sum, num, )=> (sum[0]+=num.r,sum[1]+=num.i,sum), [ 0, 0, ], ), );
	}
	
	static mul( num0, num1, )
	{
		[ num0, num1, ]= [ new Complex( num0, ), new Complex( num1, ), ];
		
		let aa= num0.r*num1.r;
		let bb= num0.i*num1.i;
		let ab= num0.r*num1.i;
		let ba= num0.i*num1.r;
		
		if( isNaN( aa, ) && ( bb===Infinity || bb===-Infinity ) )
			aa= 0;
		if( isNaN( bb, ) && ( aa===Infinity || aa===-Infinity ) )
			bb= 0;
		if( isNaN( ab, ) && ( ba===Infinity || ba===-Infinity ) )
			ab= 0;
		if( isNaN( ba, ) && ( ab===Infinity || ab===-Infinity ) )
			ba= 0;
		
		return new this( aa - bb, ab - - ba, );
	}
	
	add( ...nums )
	{
		return this.constructor.sum( this, ...nums.map( x=> new Complex( x, ), ), );
	}
	
	mul( num, )
	{
		return this.constructor.mul( this, num, );
	}
	
	
	static exp( num, )
	{
		num= new Complex( num, );
		
		return this.mul( Math.exp( num.r, ), new Complex( Math.cos( num.i, ), Math.sin( num.i, ), ), );
	}
	
	static log( num, )
	{
		num= new Complex( num, );
		
		return new this( Math.log( num.mod, ), num.arg, );
	}
	
	static cos( num, )
	{
		return this.mul(
			this.sum(
				this.exp( this.mul( 'i', num, ), ),
				this.exp( this.mul( '-i', num, ), ),
			),
			1/2,
		);
	}
	
	static sin( num, )
	{
		return this.mul(
			this.sum(
				this.exp( this.mul( 'i', num, ), ),
				this.mul( -1, this.exp( this.mul( '-i', num, ), ), )
			),
			'-0.5i',
		);
	}
	
	static tan( num, )
	{
		return div( this.cos( num, ), this.sin( num, ), );
	}
	
	static acos( num, )
	{
		return this.mul( '-i', this.log( this.sum( num, sub( mul( num, num, ), 1, ).sqrt(), ), ), );
	}
	
	static asin( num, )
	{
		return this.mul( '-i', this.log( this.sum( this.mul( 'i', num, ), sub( 1, mul( num, num, ), ).sqrt(), ), ), );
	}
	
	static atan( num, )
	{
		return this.mul( '-0.5i', this.log( div( this.sum( 1, this.mul( 'i', num, ), ), sub( 1, this.mul( 'i', num, ), ), ), ), );
	}
	
	static equ( num0, num1, )
	{
		[ num0, num1, ]= [ new Complex( num0, ), new Complex( num1, ), ];
		
		return (
			(
				(num0.r===Infinity || num0.r===-Infinity || num0.i===Infinity || num0.i===-Infinity)
			&&
				(num1.r===Infinity || num1.r===-Infinity || num1.i===Infinity || num1.i===-Infinity)
			)
		||
			num0.r===num1.r && num0.i===num1.i
		);
	}
}

export function sum( ...nums )
{
	return Complex.sum( ...nums, );
}

export function mul( ...nums )
{
	return nums.reduce( ( x, y, )=> Complex.mul( x, y, ), 1, );
}

export function sub( x, y, )
{
	return Complex.sum( x, Complex.mul( y, -1, ), );
}

export function div( x, y, )
{
	return Complex.mul( x, new Complex( y, ).rec, );
}

export function neg( x, )
{
	return Complex.mul( x, -1, );
}

export function exp( num, )
{
	return Complex.exp( num, );
}

export function log( num, )
{
	return Complex.log( num, );
}

export function cos( num, )
{
	return Complex.cos( num, );
}

export function sin( num, )
{
	return Complex.sin( num, );
}

export function tan( num, )
{
	return Complex.tan( num, );
}

export function acos( num, )
{
	return Complex.acos( num, );
}

export function asin( num, )
{
	return Complex.asin( num, );
}

export function atan( num, )
{
	return Complex.atan( num, );
}

export function equ( num0, num1, )
{
	return Complex.equ( num0, num1, );
}
