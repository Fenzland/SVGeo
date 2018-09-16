import HTML, { header, footer, section, article, main, div, h1, h2, h3, p, small, a, figure, figcaption, } from 'https://oxo.fenzland.com/OvO/0.1/HTML.js';
import { inEuc2D, inMink2D, } from '../demos/angular-bisector.js';

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
					figcaption( 'angular bisector in Euclidean 2D space', ),
				),
				h3( 'In Minkowski 2D space', ),
				figure(
					inMink2D,
					figcaption( 'angular bisector in Minkowski 2D space', ),
				),
			),
		),
	];
};
