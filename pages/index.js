import Page from '../OvO/view/Page.js';
import HTML, { header, footer, section, article, main, div, h1, h2, p, small, a, } from '../OvO/view/HTML.js';
import demo from '../demos/index.js';

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
					demo,
				),
			),
		];
	},
	
}, );
