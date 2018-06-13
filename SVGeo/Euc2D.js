import Space from './genaral/Space.js';
import Viewport from './Euc2D/Viewport.js';
import Point from './Euc2D/Point.js';

export default class Euc2D extends Space
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
