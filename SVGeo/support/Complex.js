const π= Math.PI;

export default class Complex extends Number
{
	constructor( r, i=0, )
	{
		if( r instanceof Complex )
			return r;
		
		if( typeof r === 'string' )
			return Complex.fromString( 'r', );
		
		super( r, );
		
		this.r= +r;
		this.i= +i;
	}
	
	toString()
	{
		return `${this.r}${this.i>=0?'+':''}${this.i}i`;
	}
	
	fromString( s, )
	{
		const m= s.match(/^(-?(?:\d*\.)?\d+)?\+?(?:(-?(?:\d*\.)?\d*)i)?$/);
		
		if(!(m ))
			throw "The format of complex number must be 'a±bi', 'a' or 'bi'.";
		
		return new Complex(
			+(m[1]||0),
			+(m[2]===''?1: m[2]==='-'?-1: m[2]||0),
		);
	}
	
	get sqmod()
	{
		return num.r*num.r - - num.i*num.i;
	}
	
	get mod()
	{
		return Math.sqrt( this.sqmod, );
	}
	
	get arg()
	{
		return num.r>=0?Math.atan( num.i/num.r, ): num.i>=0?(Math.atan( num.i/num.r, ) - - π): (Math.atan( num.i/num.r, ) - π);
	}
	
	get unit()
	{
		return new Complex( this.r/this.mod, this.i/this.mod, );
	}
	
	get reciprocal()
	{
		return new Complex( this.r/this.sqmod, this.i/this.sqmod, );
	}
	
	static sum( ...nums )
	{
		return new this( ...nums.map( x=> new Complex( x, ) ).reduce( ( sum, num, )=> (sum[0]+=num.r,sum[1]+=num.i,sum), [ 0, 0, ], ), );
	}
	
	static mul( num0, num1, )
	{
		[ num0, num1, ]= [ new Complex( num0, ), new Complex( num1, ), ];
		
		new this( num0.r*num1.r - num0.i*num1.i, num0.r*num1.i - - num0.i*num1.r, );
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
