import Euc2D from '../SVGeo/Euc2D.js';

export const inEuc2D= new Euc2D();

inEuc2D.view( [ -16, 16, ], [ -16, 16, ], 512, 1.5, );

const p_A= inEuc2D.point( -1, 0, { label:'A', free:true, color:'hsla(180,100%,40%,1)' }, );
const p_B= inEuc2D.point( 3, 3, { label:'B', free:true, color:'hsla(210,100%,40%,1)' }, );

const O_A= p_A.circleTo( p_B, { color:'hsla(120,100%,60%,0.1)', }, );
const O_B= p_B.circleTo( p_A, { color:'hsla(120,100%,60%,0.1)', }, );

const p_C= O_A.cross( O_B, )[0].valueOf();

const s_AB= p_A.segmentTo( p_B, { color:'hsla(180,100%,40%,1)', }, );
const s_BC= p_B.segmentTo( p_C, { color:'hsla(180,100%,40%,1)', }, );
const s_CA= p_C.segmentTo( p_A, { color:'hsla(180,100%,40%,1)', }, );

inEuc2D.show( O_A, O_B, s_AB, s_BC, s_CA, p_A, p_B, p_C, );
