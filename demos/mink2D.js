import Mink2D from '../SVGeo/Mink2D.js';

const canvas= new Mink2D();

canvas.view( [ -16, 16, ], [ '-16i', '16i', ], 768, 1.25, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( -4., '-5i', { label:'A', free:true, color:'hsla(180,100%,40%,1)', }, );
const p_B= canvas.point( 3, '2i', { label:'B', free:true, color:'hsla(210,100%,40%,1)', }, );

const l_1= p_A.lineTo( p_B, { label:'l1', }, );
const O_0= p_O.circle( 0, { color:'hsla(0,100%,50%,1)', }, );
const O_1= p_O.circle( 2, { color:'hsla(10,100%,50%,1)', }, );
const O_2= p_O.circle( 4, { color:'hsla(20,100%,50%,1)', }, );
const O_3= p_O.circle( 6, { color:'hsla(30,100%,50%,1)', }, );
const O_4= p_O.circle( 8, { color:'hsla(40,100%,50%,1)', }, );
const O_5= p_O.circle( 10, { color:'hsla(50,100%,50%,1)', }, );
const O_6= p_O.circle( 12, { color:'hsla(60,100%,50%,1)', }, );
const O_7= p_O.circle( 14, { color:'hsla(70,100%,50%,1)', }, );
const O_1i= p_O.circle( '2i', { color:'hsla(-10,100%,50%,1)', }, );
const O_2i= p_O.circle( '4i', { color:'hsla(-20,100%,50%,1)', }, );
const O_3i= p_O.circle( '6i', { color:'hsla(-30,100%,50%,1)', }, );
const O_4i= p_O.circle( '8i', { color:'hsla(-40,100%,50%,1)', }, );
const O_5i= p_O.circle( '10i', { color:'hsla(-50,100%,50%,1)', }, );
const O_6i= p_O.circle( '12i', { color:'hsla(-60,100%,50%,1)', }, );
const O_7i= p_O.circle( '14i', { color:'hsla(-70,100%,50%,1)', }, );

const foot= l_1.foot( p_O, { color:'yellow', }, );

const c_1= l_1.cross( O_4, );

canvas.show(
	l_1,
	O_0, O_1, O_2, O_3, O_4, O_5, O_6, O_7, O_1i, O_2i, O_3i, O_4i, O_5i, O_6i, O_7i,
	p_O, p_A, p_B,
	foot, c_1,
);

export default canvas;
