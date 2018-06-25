import Euc2D from '../SVGeo/Euc2D.js';

const canvas= new Euc2D();

canvas.view( [ -16, 16, ], [ -16, 16, ], 512, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( 1, 1, { label:'A', free:true, }, );
const p_B= canvas.point( 3, 3, { label:'B', free:true, }, );

const l_1= p_A.lineTo( p_B, { label:'l1', hidden:true, }, );
const O_0= p_O.circle( 8, );

const foot= l_1.foot( p_O, );

const c_1= l_1.cross( O_0, );

canvas.show( l_1, O_0, p_O, p_A, p_B, c_1, foot, );

export default canvas;
