import Euc2D from '../SVGeo/Euc2D.js';

const canvas= new Euc2D();

canvas.view( [ -16, 16, ], [ -16, 16, ], 768, 1.5, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( 1, 1, { label:'A', free:true, color:'hsla(180,100%,40%,1)' }, );
const p_B= canvas.point( 3, 3, { label:'B', free:true, color:'hsla(210,100%,40%,1)' }, );

const l_1= p_A.lineTo( p_B, { label:'l1', dash:'dashed', }, );
const O_0= p_O.circle( 8, { color:'burlywood', dash:'dotted', }, );

const foot= l_1.foot( p_O, { color:'yellow', }, );

const c_1= l_1.cross( O_0, { color:'green', }, );

canvas.show( l_1, O_0, c_1, foot, p_O, p_A, p_B, );

export default canvas;
