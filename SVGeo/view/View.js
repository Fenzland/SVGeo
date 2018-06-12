import SVG from '../../OvO/view/SVG.js';
import movement from './movement.js';

export default class View
{
	constructor()
	{
		this.points= [];
		this.paths= [];
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
			...this.paths.map( x=> this.renderPath( x, ), ),
			...this.points.map( x=> this.renderPoint( x, ), ),
			movement( this.viewport, this.viewport, ),
		);
		
		return vdom.toDOM( document, );
	}
	
	renderPoint( point, )
	{
		const { x, y, }= this.viewport.transformPoint( point, );
		
		return SVG.circle(
			{ cx:x, cy:y, r:2.25, },
			(point.options.free? movement( point, this.viewport, ) : undefined),
		);
	}
	
	renderPath()
	{
		
	}
}
