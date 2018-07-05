import Euc2D from '../SVGeo/Euc2D.js';

const canvas= new Euc2D();

canvas.view( [ -16, 16, ], [ -16, 16, ], 768, 1.5, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( 1, 3, { label:'A', free:true, color:'hsla(180,100%,40%,1)' }, );
const p_B= canvas.point( 3, 3, { label:'B', free:true, color:'hsla(210,100%,40%,1)' }, );
const p_C= canvas.point( -2, 4, { label:'C', free:true, color:'hsla(160,100%,40%,1)' }, );

const l_1= p_A.lineTo( p_B, { label:'l1', dash:'dashed', }, );
const l_2= p_O.lineTo( p_C, { label:'l2', }, );
const O_0= p_O.circle( 8, { color:'burlywood', dash:'dotted', }, );
const O_1= p_A.circle( 6, { color:'aquamarine', }, );

const foot= l_1.foot( p_O, { color:'yellow', }, );

const c_1= l_1.cross( O_0, { color:'green', }, );
const c_2= l_1.cross( l_2, { color:'green', }, );
const c_3= O_0.cross( O_1, { color:'green', }, );

const pl_1= l_1.point( -1, { color:'red', free:true, }, );

const T_1= l_1.perpendicular( p_O, );
const L_1= l_1.parallelism( p_O, );

canvas.show( l_1, l_2, T_1, L_1, O_0, O_1, c_1, c_2, c_3, foot, p_O, p_A, p_B, p_C, pl_1, );

export default canvas;
