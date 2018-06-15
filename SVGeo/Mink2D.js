import Space from './genaral/Space.js';
import Viewport from './Mink2D/Viewport.js';
import Point from './Mink2D/Point.js';

export default class Mink2D extends Space
{
	constructor()
	{
		super();
		
		this.viewport= new Viewport();
	}
	
	point( x, y, options, )
	{
		return new Point( x, y, options, );
	}
}
