
export default class Path
{
	cross( path, )
	{
		const crossPoints= this[`cross${path.constructor.name}`]( path, );
		
		return crossPoints;
	}
}
