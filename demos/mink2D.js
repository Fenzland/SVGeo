import Mink2D from '../SVGeo/Mink2D.js';

const canvas= new Mink2D();

canvas.view( [ -16, 16, ], [ '-16i', '16i', ], 512, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( 1, 'i', { label:'A', free:true, }, );
const p_B= canvas.point( 3, '3i', { label:'B', free:true, }, );

const l_1= p_A.lineTo( p_B, { label:'l1', hidden:true, }, );
const O_0= p_O.circle( 0, );
const O_1= p_O.circle( 2, );
const O_2= p_O.circle( 4, );
const O_3= p_O.circle( 6, );
const O_4= p_O.circle( 8, );
const O_5= p_O.circle( 10, );
const O_6= p_O.circle( 12, );
const O_7= p_O.circle( 14, );
const O_1i= p_O.circle( '2i', );
const O_2i= p_O.circle( '4i', );
const O_3i= p_O.circle( '6i', );
const O_4i= p_O.circle( '8i', );
const O_5i= p_O.circle( '10i', );
const O_6i= p_O.circle( '12i', );
const O_7i= p_O.circle( '14i', );

// const foot= l_1.foot( p_O, );

// const c_1= l_1.cross( O_0, );

canvas.show(
	l_1,
	O_0, O_1, O_2, O_3, O_4, O_5, O_6, O_7, O_1i, O_2i, O_3i, O_4i, O_5i, O_6i, O_7i,
	p_O, p_A, p_B,
);

export default canvas;
