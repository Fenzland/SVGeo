import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';
import PointOnLine from './PointOnLine.js';
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
	
	crossLine( line, options={}, )
	{
		
		return new Point(
			$(
				( t0_0, x0_0, t0_1, x0_1, t1_0, x1_0, t1_1, x1_1, )=> (
					t0_1==t0_0? t0_0*(x0_1.i - x0_0.i)/(x0_1.i - x0_0.i) :
					t1_1==t1_0? t1_0*(x1_1.i - x1_0.i)/(x1_1.i - x1_0.i) :
					(
						(t0_0*(x0_1.i - x0_0.i)/(t0_1 - t0_0) - t1_0*(x1_1.i - x1_0.i)/(t1_1 - t1_0) - x0_0.i - - x1_0.i)
					/
						((x0_1.i - x0_0.i)/(t0_1 - t0_0) - (x1_1.i - x1_0.i)/(t1_1 - t1_0))
					)
				),
				this.p0.t, this.p0.x, this.p1.t, this.p1.x, line.p0.t, line.p0.x, line.p1.t, line.p1.x, 
			),
			$(
				( t0_0, x0_0, t0_1, x0_1, t1_0, x1_0, t1_1, x1_1, )=> (
					x0_1==x0_0? mul( x0_0, (t0_1 - t0_0)/(t0_1 - t0_0), ) :
					x1_1==x1_0? mul( x1_0, (t1_1 - t1_0)/(t1_1 - t1_0), ) :
					mul(
						(x0_0.i*(t0_1 - t0_0)/(x0_1.i - x0_0.i) - x1_0.i*(t1_1 - t1_0)/(x1_1.i - x1_0.i) - t0_0 - - t1_0),
						1/((t0_1 - t0_0)/(x0_1.i - x0_0.i) - (t1_1 - t1_0)/(x1_1.i - x1_0.i)),
						'i',
					)
				),
				this.p0.t, this.p0.x, this.p1.t, this.p1.x, line.p0.t, line.p0.x, line.p1.t, line.p1.x, 
			),
			options,
		);
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
				
				points[0].valueOf().setCoor( footT - R*(t0 - t1), sub( footX, mul( R, sub( x0, x1, ), ), ), );
				points[1].valueOf().setCoor( footT - R*(t1 - t0), sub( footX, mul( R, sub( x1, x0, ), ), ), );
				
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
	
	perpendicular( point, options={}, )
	{
		const other= new Point(
			$(
				( t, x, t0, x0, t1, x1, )=> t - (x1.i - x0.i),
				point.t, point.x, this.p0.t, this.p0.x, this.p1.t, this.p1.x,
			),
			$(
				( t, x, t0, x0, t1, x1, )=> sub( x, mul( 'i', t1 - t0, ), ),
				point.t, point.x, this.p0.t, this.p0.x, this.p1.t, this.p1.x,
			),
		);
		
		return new Line( point, other, options, );
	}
	
	parallelism( point, options={}, )
	{
		const other= new Point(
			$(
				( t, x, t0, x0, t1, x1, )=> t - - (t1 - t0),
				point.t, point.x, this.p0.t, this.p0.x, this.p1.t, this.p1.x,
			),
			$(
				( t, x, t0, x0, t1, x1, )=> sum( x, x1, mul( -1, x0, ), ),
				point.t, point.x, this.p0.t, this.p0.x, this.p1.t, this.p1.x,
			),
		);
		
		return new Line( point, other, options, );
	}
	
	point( u, options, )
	{
		return new PointOnLine( this, u, options, );
	}
}

function isNoI( number, )
{
	return isNaN( number, ) || !isFinite( number, )
}
