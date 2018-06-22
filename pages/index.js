import Page from '../OvO/view/Page.js';
import HTML, { header, footer, section, article, main, div, h1, h2, p, small, a, } from '../OvO/view/HTML.js';
import euc2D from '../demos/euc2D.js';
import mink2D from '../demos/mink2D.js';

export default new Page( {
	
	name: 'home',
	
	render()
	{
		return [
			
			HTML.title( 'Home - SVGeo', ),
			
			header(
				h1( 'SVGeo', ),
			),
			main(
				article(
					mink2D,
				),
				article(
					euc2D,
				),
			),
		];
	},
	
}, );
