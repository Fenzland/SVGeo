import Model, { $, } from '../../OvO/model/Model.js';
import Path from '../genaral/Path.js';
import Point from './Point.js';
import PointOnLine from './PointOnLine.js';

export default class Segment extends Path
{
	constructor( p0, p1, options={}, )
	{
		super();
		
		this.p0= p0;
		this.p1= p1;
		this.options= options;
	}
}
