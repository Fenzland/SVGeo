import HTML, { header, footer, section, article, main, div, h1, h2, h3, p, small, a, figure, figcaption, } from '../OvO/view/HTML.js';
import { inEuc2D, inMink2D, } from '../demos/tangent-line-of-circle.js';

export function render()
{
	return [
		
		HTML.title( 'Home - SVGeo', ),
		
		header(
			h1( 'SVGeo', ),
		),
		main(
			article(
				h3( 'In Euclidean 2D space', ),
				figure(
					inEuc2D,
					figcaption( 'tangent line of circle in Euclidean 2D space', ),
				),
				h3( 'In Minkowski 2D space', ),
				figure(
					inMink2D,
					figcaption( 'tangent line of circle in Minkowski 2D space', ),
				),
			),
		),
	];
};
