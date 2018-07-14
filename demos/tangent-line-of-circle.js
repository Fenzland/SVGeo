import Euc2D from '../SVGeo/Euc2D.js';
import Mink2D from '../SVGeo/Mink2D.js';

export const inEuc2D= new Euc2D();
{
	inEuc2D.view( [ -16, 16, ], [ -16, 16, ], 512, 1.5, );
	
	const A= inEuc2D.point( -4, 3, { label:'A', free:true, color:'hsla(40,100%,50%,1)', }, );
	const circle= inEuc2D.point( 0, 0, ).circleTo( A, );
	const B= circle.point( 0, { label:'B', free:true, color:'blue', }, );
	const radiusLine= circle.o.lineTo( B, { color:'hsla(0,100%,80%,0.25)', }, );
	
	const tangent= radiusLine.perpendicular( B, );
	
	inEuc2D.show( radiusLine, circle, tangent, A, B, );
}

export const inMink2D= new Mink2D();
{
	inMink2D.view( [ -16, 16, ], [ '-16i', '16i', ], 512, 1.25, );
	
	const A= inMink2D.point( 4, '3i', { label:'A', free:true, color:'hsla(40,100%,50%,1)', }, );
	const circle= inMink2D.point( 0, 0, ).circleTo( A, );
	const B= circle.point( circle.r.$( x=>x.arg, ), { label:'B', free:true, color:'blue', }, );
	const radiusLine= circle.o.lineTo( B, { color:'hsla(0,100%,80%,0.25)', }, );
	
	const tangent= radiusLine.perpendicular( B, );
	
	inMink2D.show( radiusLine, circle, tangent, A, B, );
}
