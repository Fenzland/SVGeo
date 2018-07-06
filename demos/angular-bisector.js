import Euc2D from '../SVGeo/Euc2D.js';
import Mink2D from '../SVGeo/Mink2D.js';

export const inEuc2D= new Euc2D();
{
	inEuc2D.view( [ -16, 16, ], [ -16, 16, ], 512, 1.5, );
	
	const p_A= inEuc2D.point( -4, 2, { label:'A', free:true, color:'hsla(180,100%,40%,1)' }, );
	const p_B= inEuc2D.point( 0, 0, { label:'B', free:true, color:'hsla(210,100%,40%,1)' }, );
	const p_C= inEuc2D.point( 3, 3, { label:'B', free:true, color:'hsla(240,100%,40%,1)' }, );
	
	const l_AB= p_A.lineTo( p_B, { color:'hsla(180,100%,40%,1)', }, );
	const l_AC= p_A.lineTo( p_C, { color:'hsla(180,100%,40%,1)', }, );
	
	const O_A= p_A.circleTo( p_B, { color:'hsla(120,100%,60%,0.2)', }, );
	const p_D= O_A.cross( l_AC, { color:'hsla(120,100%,60%,0.2)', }, )[1].valueOf();
	const l_BD= p_B.lineTo( p_D, { color:'hsla(120,100%,60%,0.2)', }, );
	const target= l_BD.parallelism( p_A, { color:'hsla(0,100%,50%,1)', }, );
	
	inEuc2D.show( l_AB, l_AC, O_A, l_BD, target, p_A, p_B, p_C, p_D, );
}

export const inMink2D= new Mink2D();
{
	inMink2D.view( [ -16, 16, ], [ '-16i', '16i', ], 512, 1.25, );
	
	const p_A= inMink2D.point( -4, '2i', { label:'A', free:true, color:'hsla(180,100%,40%,1)' }, );
	const p_B= inMink2D.point( 0, 0, { label:'B', free:true, color:'hsla(210,100%,40%,1)' }, );
	const p_C= inMink2D.point( 3, '3i', { label:'B', free:true, color:'hsla(240,100%,40%,1)' }, );
	
	const l_AB= p_A.lineTo( p_B, { color:'hsla(180,100%,40%,1)', }, );
	const l_AC= p_A.lineTo( p_C, { color:'hsla(180,100%,40%,1)', }, );
	
	const O_A= p_A.circleTo( p_B, { color:'hsla(120,100%,60%,0.2)', }, );
	const p_D= O_A.cross( l_AC, { color:'hsla(120,100%,60%,0.2)', }, )[1].valueOf();
	const l_BD= p_B.lineTo( p_D, { color:'hsla(120,100%,60%,0.2)', }, );
	const target= l_BD.parallelism( p_A, { color:'hsla(0,100%,50%,1)', }, );
	
	inMink2D.show( l_AB, l_AC, O_A, l_BD, target, p_A, p_B, p_C, p_D, );
}
