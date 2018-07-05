import Page from '../OvO/view/Page.js';
import HTML, { header, footer, section, article, main, div, h1, h2, p, small, a, figure, figcaption, } from '../OvO/view/HTML.js';
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
					div(
						{ class:'flexible-line', },
						figure(
							euc2D,
							figcaption( 'Euclidean 2D space', )
						),
						figure(
							mink2D,
							figcaption( 'Minkowski 2D space', )
						),
					),
					p(
						' ',
					),
				),
			),
		];
	},
	
}, );
