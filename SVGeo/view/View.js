import Model, { $, } from 'https://oxo.fenzland.com/OmO/0.1/Model.js';
import SVG from 'https://oxo.fenzland.com/OvO/0.1/SVG.js';
import { IfNot, ForEach, } from 'https://oxo.fenzland.com/OvO/0.1/Ctrl.js';
import movement from './movement.js';
import Path from '../genaral/Path.js';
import Point from '../genaral/Point.js';

export default class View
{
	constructor()
	{
		this.items= new Model( [], );
	}
	
	view( ...args )
	{
		this.viewport.set( ...args, );
	}
	
	toHTML()
	{
		return '';
	}
	
	toDOM( document, )
	{
		const vdom= SVG.svg(
			{
				viewBox:this.viewport.viewBox,
				width:this.viewport.width,
				height:this.viewport.height,
			},
			this.render( this.items, ),
			movement( this.viewport, this.viewport, ),
		);
		
		return vdom.toDOM( document, );
	}
	
	show( ...items )
	{
		this.items.push( ...items, );
	}
	
	render( item, )
	{
		if( Array.isArray( item, ) )
			return ForEach( item, x=> this.render( x, ), );
		else
		if( item instanceof Model )
			return this.render( item.valueOf(), );
		else
		if( item instanceof Point )
			return this.renderPoint( item, );
		else
		if( item instanceof Path )
			return this.renderPath( item, );
		else
			return undefined;
		
	}
	
	renderPoint( point, )
	{
		if( Array.isArray( point, ) )
			return point.map( x=> this.renderPoint( x, ), );
		
		const stroke= this.viewport.stroke;
		const { x, y, }= this.viewport.transformPoint( point, );
		
		return IfNot( $(
			( x, y, w, h, )=> isNaN( x, ) || isNaN( y, ) || x<0 || y<0 || x>w || y>h,
			x, y, this.viewport.width, this.viewport.height,
		), ).then( m=> [
			SVG.circle(
				{
					cx:$( ( m, x, )=> m?-8:x, m, x, ),
					cy:$( ( m, y, )=> m?-8:y, m, y, ),
					r:point.options.free?stroke.$( x=> x*4.5, ):stroke.$( x=> x*2.5, ),
					fill:point.options.color||'hsla(0,0%,0%,1)',
				},
				(point.options.free? movement( point, this.viewport, ) : undefined),
				SVG.title( point.options.label, ),
			),
		], );
	}
	
	renderPath( path, )
	{
		const { type, data, }= this.viewport[`render${path.constructor.name}`]( path, );
		
		const stroke= this.viewport.stroke;
		
		const styles= {
			stroke: path.options.color||'hsla(0,100%,67%,1)',
			fill:'none',
			'stroke-dasharray': { dotted:stroke.$( x=> x*2, ), dashed:stroke.$( x=> x*4, ), }[path.options.dash]||'0',
			'stroke-width': stroke,
		};
		
		switch( type )
		{
			case 'line':
				
				styles['stroke-dashoffset']= $(
					( x0, y0, xO, yO, )=> -Math.sqrt( (xO - x0)*(xO - x0) - - (yO - y0)*(yO - y0), ),
					data.p0.x, data.p0.y, data.pO.x, data.pO.y,
				);
				
				return SVG.line(
					{
						x1: data.p0.x,
						y1: data.p0.y,
						x2: data.p1.x,
						y2: data.p1.y,
						...styles,
					},
					SVG.title( path.options.label, ),
				);
			
			case 'circle':
				return SVG.circle(
					{ cx:data.o.x, cy:data.o.y, r:data.r, ...styles, },
					SVG.title( path.options.label, ),
				);
			
			case 'path':
				return SVG.path(
					{ d:data.d, ...styles, },
					SVG.title( path.options.label, ),
				);
			
			default:
				return undefined;
		}
	}
}
