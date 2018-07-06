import Page from '../OvO/view/Page.js';
import HTML, { header, footer, section, article, main, div, h1, h2, h3, p, small, a, figure, figcaption, } from '../OvO/view/HTML.js';
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
					p(
						'This is a library for drawing interactive geometry graphs with ECMAScript work on browsers. ',
						'SVGeo is powered by ',
						a( 'SVG', { href:'https://www.w3.org/Graphics/SVG/', target:'_blank', }, ),
						' and ',
						a( 'OvO', { href:'https://github.com/Fenzland/ovo.js', target:'_blank', }, ),
						'. So your browsers must support SVG and ES6 modules. ',
						'SVGeo is open-sourced licensed under the ',
						a( 'MIT license', { href:'https://opensource.org/licenses/MIT', target:'_blank', }, ),
						'. You can access the source codes on the ',
						a( 'GitHub', { href:'https://github.com/Fenzland/SVGeo', target:'_blank', }, ),
						'. ',
					),
					p(
						'Currently, we support Euclidean 2D space and Minkowski 2D space. ',
						'You can draw points, lines and circles in this two type of spaces. ',
						'Here are what you can do: Drawing a point with (x,y) or (t,x) coordinate; ',
						'Setting it as free point so that your visitors can drag it with their mouses; ',
						'Making a animation with setting coordinate of points; ',
						'Drawing a line with two points. ',
						'Drawing a circle with a center point and a radius; ',
						'Crossing two lines, two circles, or a line and a circle, and draw the intersection points; ',
						'Through a point and drawing a perpendicular line or parallel line of a particular line; ',
						'Coloring and styling elements .',
					),
					p(
						'Here are demos. ',
					),
					div(
						{ class:'flexible-line', },
						figure(
							euc2D,
							figcaption( 'Euclidean 2D space', ),
						),
						figure(
							mink2D,
							figcaption( 'Minkowski 2D space', ),
						),
					),
					h3( 'More demos', ),
					p(
						a( 'Create points', ),
					),
				),
			),
		];
	},
	
}, );
