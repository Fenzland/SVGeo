import Euc2D from '../SVGeo/Euc2D.js';

const canvas= new Euc2D();

canvas.view( [ -16, 16, ], [ -16, 16, ], 512, );

const p_O= canvas.point( 0, 0, { label:'O', }, );
const p_A= canvas.point( 1, 1, { label:'A', free:true, }, );

const l_1= p_O.lineTo( p_A, { label:'l1', hidden:true, }, );
const O_0= p_O.circle( 8, );

// const c_1= l_1.cross( O_0, );

export default canvas;
