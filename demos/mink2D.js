import Mink2D from '../SVGeo/Mink2D.js';

const canvas= new Mink2D();

canvas.view( [ -16, 16, ], [ '-16i', '16i', ], 768, 1.25, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( -4., '-5i', { label:'A', free:true, color:'hsla(180,100%,40%,1)', }, );
const p_B= canvas.point( 3, '2i', { label:'B', free:true, color:'hsla(210,100%,40%,1)', }, );
const p_C= canvas.point( 4, '-4i', { label:'C', free:true, color:'hsla(160,100%,40%,1)' }, );

const l_1= p_A.lineTo( p_B, { label:'l1', }, );
const l_2= p_O.lineTo( p_C, { label:'l2', }, );

const O_0= p_O.circle( 0, { color:'hsla(0,100%,50%,0.25)', }, );
const O_1= p_O.circle( 2, { color:'hsla(10,100%,50%,0.25)', }, );
const O_2= p_O.circle( 4, { color:'hsla(20,100%,50%,1)', }, );
const O_3= p_O.circle( 6, { color:'hsla(30,100%,50%,0.25)', }, );
const O_4= p_O.circle( 8, { color:'hsla(40,100%,50%,0.25)', }, );
const O_5= p_O.circle( 10, { color:'hsla(50,100%,50%,0.25)', }, );
const O_6= p_O.circle( 12, { color:'hsla(60,100%,50%,0.25)', }, );
const O_7= p_O.circle( 14, { color:'hsla(70,100%,50%,0.25)', }, );
const O_1i= p_O.circle( '2i', { color:'hsla(-10,100%,50%,0.25)', }, );
const O_2i= p_O.circle( '4i', { color:'hsla(-20,100%,50%,0.25)', }, );
const O_3i= p_O.circle( '6i', { color:'hsla(-30,100%,50%,0.25)', }, );
const O_4i= p_O.circle( '8i', { color:'hsla(-40,100%,50%,0.25)', }, );
const O_5i= p_O.circle( '10i', { color:'hsla(-50,100%,50%,0.25)', }, );
const O_6i= p_O.circle( '12i', { color:'hsla(-60,100%,50%,0.25)', }, );
const O_7i= p_O.circle( '14i', { color:'hsla(-70,100%,50%,0.25)', }, );

const O_C1= p_C.circle( 4, );
const O_C0= p_C.circle( 0, );
const O_Ci= p_C.circle( '4i', );

const foot= l_1.foot( p_O, { color:'yellow', }, );

const c_1= l_1.cross( O_4, );
const c_2= l_1.cross( l_2, { color:'green', }, );

const c1O_0= O_C1.cross( O_0, { color:'hsla(0,100%,50%,0.25)', }, );
const c1O_1= O_C1.cross( O_1, { color:'hsla(10,100%,50%,0.25)', }, );
const c1O_2= O_C1.cross( O_2, { color:'hsla(20,100%,50%,1)', }, );
const c1O_3= O_C1.cross( O_3, { color:'hsla(30,100%,50%,0.25)', }, );
const c1O_4= O_C1.cross( O_4, { color:'hsla(40,100%,50%,0.25)', }, );
const c1O_5= O_C1.cross( O_5, { color:'hsla(50,100%,50%,0.25)', }, );
const c1O_6= O_C1.cross( O_6, { color:'hsla(60,100%,50%,0.25)', }, );
const c1O_7= O_C1.cross( O_7, { color:'hsla(70,100%,50%,0.25)', }, );
const c1O_1i= O_C1.cross( O_1i, { color:'hsla(-10,100%,50%,0.25)', }, );
const c1O_2i= O_C1.cross( O_2i, { color:'hsla(-20,100%,50%,0.25)', }, );
const c1O_3i= O_C1.cross( O_3i, { color:'hsla(-30,100%,50%,0.25)', }, );
const c1O_4i= O_C1.cross( O_4i, { color:'hsla(-40,100%,50%,0.25)', }, );
const c1O_5i= O_C1.cross( O_5i, { color:'hsla(-50,100%,50%,0.25)', }, );
const c1O_6i= O_C1.cross( O_6i, { color:'hsla(-60,100%,50%,0.25)', }, );
const c1O_7i= O_C1.cross( O_7i, { color:'hsla(-70,100%,50%,0.25)', }, );
const c0O_0= O_C0.cross( O_0, { color:'hsla(0,100%,50%,0.25)', }, );
const c0O_1= O_C0.cross( O_1, { color:'hsla(10,100%,50%,0.25)', }, );
const c0O_2= O_C0.cross( O_2, { color:'hsla(20,100%,50%,1)', }, );
const c0O_3= O_C0.cross( O_3, { color:'hsla(30,100%,50%,0.25)', }, );
const c0O_4= O_C0.cross( O_4, { color:'hsla(40,100%,50%,0.25)', }, );
const c0O_5= O_C0.cross( O_5, { color:'hsla(50,100%,50%,0.25)', }, );
const c0O_6= O_C0.cross( O_6, { color:'hsla(60,100%,50%,0.25)', }, );
const c0O_7= O_C0.cross( O_7, { color:'hsla(70,100%,50%,0.25)', }, );
const c0O_1i= O_C0.cross( O_1i, { color:'hsla(-10,100%,50%,0.25)', }, );
const c0O_2i= O_C0.cross( O_2i, { color:'hsla(-20,100%,50%,0.25)', }, );
const c0O_3i= O_C0.cross( O_3i, { color:'hsla(-30,100%,50%,0.25)', }, );
const c0O_4i= O_C0.cross( O_4i, { color:'hsla(-40,100%,50%,0.25)', }, );
const c0O_5i= O_C0.cross( O_5i, { color:'hsla(-50,100%,50%,0.25)', }, );
const c0O_6i= O_C0.cross( O_6i, { color:'hsla(-60,100%,50%,0.25)', }, );
const c0O_7i= O_C0.cross( O_7i, { color:'hsla(-70,100%,50%,0.25)', }, );
const ciO_0= O_Ci.cross( O_0, { color:'hsla(0,100%,50%,0.25)', }, );
const ciO_1= O_Ci.cross( O_1, { color:'hsla(10,100%,50%,0.25)', }, );
const ciO_2= O_Ci.cross( O_2, { color:'hsla(20,100%,50%,1)', }, );
const ciO_3= O_Ci.cross( O_3, { color:'hsla(30,100%,50%,0.25)', }, );
const ciO_4= O_Ci.cross( O_4, { color:'hsla(40,100%,50%,0.25)', }, );
const ciO_5= O_Ci.cross( O_5, { color:'hsla(50,100%,50%,0.25)', }, );
const ciO_6= O_Ci.cross( O_6, { color:'hsla(60,100%,50%,0.25)', }, );
const ciO_7= O_Ci.cross( O_7, { color:'hsla(70,100%,50%,0.25)', }, );
const ciO_1i= O_Ci.cross( O_1i, { color:'hsla(-10,100%,50%,0.25)', }, );
const ciO_2i= O_Ci.cross( O_2i, { color:'hsla(-20,100%,50%,0.25)', }, );
const ciO_3i= O_Ci.cross( O_3i, { color:'hsla(-30,100%,50%,0.25)', }, );
const ciO_4i= O_Ci.cross( O_4i, { color:'hsla(-40,100%,50%,0.25)', }, );
const ciO_5i= O_Ci.cross( O_5i, { color:'hsla(-50,100%,50%,0.25)', }, );
const ciO_6i= O_Ci.cross( O_6i, { color:'hsla(-60,100%,50%,0.25)', }, );
const ciO_7i= O_Ci.cross( O_7i, { color:'hsla(-70,100%,50%,0.25)', }, );

const T_1= l_1.perpendicular( p_O, );
const L_1= l_1.parallelism( p_O, );

canvas.show(
	l_1, l_2,
	O_0, O_1, O_2, O_3, O_4, O_5, O_6, O_7, O_1i, O_2i, O_3i, O_4i, O_5i, O_6i, O_7i,
	T_1, L_1,
	foot, c_1, c_2,
	c1O_0, c1O_1, c1O_2, c1O_3, c1O_4, c1O_5, c1O_6, c1O_7, c1O_1i, c1O_2i, c1O_3i, c1O_4i, c1O_5i, c1O_6i, c1O_7i,
	c0O_0, c0O_1, c0O_2, c0O_3, c0O_4, c0O_5, c0O_6, c0O_7, c0O_1i, c0O_2i, c0O_3i, c0O_4i, c0O_5i, c0O_6i, c0O_7i,
	ciO_0, ciO_1, ciO_2, ciO_3, ciO_4, ciO_5, ciO_6, ciO_7, ciO_1i, ciO_2i, ciO_3i, ciO_4i, ciO_5i, ciO_6i, ciO_7i,
	p_O, p_A, p_B, p_C,
);

export default canvas;
