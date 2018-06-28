
export default class Path
{
	cross( path, options={}, )
	{
		const crossPoints= this[`cross${path.constructor.name}`]( path, options, );
		
		return crossPoints;
	}
}
