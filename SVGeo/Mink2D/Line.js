import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';
import Complex, { sum, mul, sub, div, } from '../support/Complex.js';

export default class Line extends Path
{
	constructor( p0, p1, options={}, )
	{
		super();
		
		this.p0= p0;
		this.p1= p1;
		this.options= options;
	}
	
	tFx( x, )
	{
		return $(
			( x, x0, t0, x1, t1, )=> (x.i - x0.i)*(t1 - t0)/(x1.i - x0.i) - - t0,
			x, this.p0.x, this.p0.t, this.p1.x, this.p1.t,
		);
	}
	
	xFt( t, )
	{
		return $(
			( t, t0, x0, t1, x1, )=> mul( 'i', (t - t0)*(x1.i - x0.i)/(t1 - t0) - - x0.i, ),
			t, this.p0.t, this.p0.x, this.p1.t, this.p1.x,
		);
	}
	
	crossLine( line, )
	{
		
	}
	
	crossCircle( circle, options={}, )
	{
		const d= this.distanceTo( circle.center, );
		const foot= this.foot( circle.center, );
		
		const points= [
			new Model( new Point( 0, 0, options, ), ),
			new Model( new Point( 0, 0, options, ), ),
		];
		
		return $(
			( d, r, footT, footX, x0, t0, x1, t1, )=> {
				if( (r.r>0 && d.r>0 && d.r<r.r) || (r.i>0 && d.i>0 && d.i<r.i) )
					return [];
				else
				if( d.r == r.r && d.i == r.i )
					return [ foot, ];
				else
				if( d.r===Infinity || d.r===-Infinity || d.i===Infinity || d.i===-Infinity )
					return [];
				
				const R= Math.sqrt( div( sub( mul( r, r, ), mul( d, d, ), ), sum( (t1 - t0)*(t1 - t0), mul( sub( x1, x0, ), sub( x1, x0, ), ), ), ).r, );
				
				points[0].valueOf().setCoor( footT - R*(t1 - t0), sub( footX, mul( R, sub( x1, x0, ), ), ), );
				points[1].valueOf().setCoor( footT - R*(t0 - t1), sub( footX, mul( R, sub( x0, x1, ), ), ), );
				
				return points;
			},
			d, circle.r, foot.valueOf().t, foot.valueOf().x, this.p0.x, this.p0.t, this.p1.x, this.p1.t,
		);
	}
	
	distanceTo( point, )
	{
		return $(
			( t, x, tFx, xFt, )=> {
				if( isNoI( tFx, ) )
					return mul( 'i', Math.abs( x.i - xFt.i, ), );
				if( isNoI( xFt.i, ) )
					return Math.abs( t - tFx, );
				if( (t - tFx)===0 )
					return 0;
				
				const dt= (t - tFx);
				const dx= sub( x, xFt, );
				const dr2= dt*dt - - mul( dx, dx, ).r;
				
				if( dr2>=0 )
					return new Complex( 0, Math.abs( mul( dt, dx, 1/Math.sqrt( dr2, ), ).i, ), );
				else
					return new Complex( Math.abs( mul( dt, dx, 1/Math.sqrt( -dr2, ), 'i', ).r, ), );
			},
			point.t, point.x, this.tFx( point.x, ), this.xFt( point.t, ),
		);
	}
	
	foot( point, options={}, )
	{
		const t= $(
			( t, x, tFx, xFt, )=> {
				const dt= t - tFx;
				const dx= sub( x, xFt, );
				const R= mul( dt, dx, 1/(dt*dt - - mul( dx, dx, ).r), );
				
				return dt===0?t: isNoI( tFx, )?t: isNoI( xFt.i, )?tFx: t - mul( dx, R, ).r;
			},
			point.t, point.x, this.tFx( point.x, ), this.xFt( point.t, ),
		);
		
		const x= $(
			( t, x, tFx, xFt, )=> {
				const dt= t - tFx;
				const dx= sub( x, xFt, );
				const R= mul( dt, dx, 1/(dt*dt - - mul( dx, dx, ).r), );
				
				return dx.i===0?x: isNoI( tFx, )?xFt: isNoI( xFt.i, )?x: sub( x, mul( dt, R, ), );
			},
			point.t, point.x, this.tFx( point.x, ), this.xFt( point.t, ),
		);
		
		return new Point( t, x, options, );
	}
}

function isNoI( number, )
{
	return isNaN( number, ) || !isFinite( number, )
}
