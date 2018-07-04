const π= Math.PI;

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
		return `${(!this.r && this.i)?'':this.r}${this.r && this.i>0?'+':''}${this.i?`${this.i}i`:''}`;
	}
	
	valueOf()
	{
		return this.toString();
	}
	
	static fromString( s, )
	{
		const m= s.match(/^(-?(?:\d*\.)?\d+)??\+?(?:(-?(?:\d*\.)?\d*)i)?$/);
		
		if(!(m ))
			throw new Error( `The format of complex number must be 'a±bi', 'a' or 'bi'. '${s}' is invalid.` );
		
		return new this(
			+(m[1]||0),
			+(m[2]===''?1: m[2]==='-'?-1: m[2]||0),
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
		
		return new this( num.mod, num.arg, );
	}
	
	static cos( num, )
	{
		num= new Complex( num, );
		
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
		num= new Complex( num, );
		
		return this.mul(
			this.sum(
				this.exp( this.mul( 'i', num, ), ),
				this.mul( -1, this.exp( this.mul( '-i', num, ), ), )
			),
			'-0.5i',
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
