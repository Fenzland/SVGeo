import Model from '../../OvO/model/Model.js';
import SVG from '../../OvO/view/SVG.js';
import { ForEach, } from '../../OvO/view/Ctrl.js';
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
				xmlns:'http://www.w3.org/2000/svg',
				version:'1.1',
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
		
		const { x, y, }= this.viewport.transformPoint( point, );
		
		return SVG.circle(
			{ cx:x, cy:y, r:3.5, },
			(point.options.free? movement( point, this.viewport, ) : undefined),
		);
	}
	
	renderPath( path, )
	{
		const { type, data, }= this.viewport[`render${path.constructor.name}`]( path, );
		
		switch( type )
		{
			case 'line':
				return SVG.line(
					{
						x1: data.p0.x,
						y1: data.p0.y,
						x2: data.p1.x,
						y2: data.p1.y,
						stroke: 'red',
					},
				);
			
			case 'circle':
				return SVG.circle(
					{ cx:data.o.x, cy:data.o.y, r:data.r, stroke:'red', fill:'none', },
				);
			
			default:
				return undefined;
		}
	}
}
