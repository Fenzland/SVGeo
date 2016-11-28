(
	mod=>{
		// AMD
		if( 'function'==(typeof define) && define.amd )
		{
			return define( [], mod );
		}

		// CommonJS
		if( 'object'==(typeof exports) && 'object'==(typeof module) )
		{
			module.exports= mod();
			return;
		}

		// Other
		(window||this).SVGeo= mod();
	}
)(
	(_=>{
		"use strict";

		class Viewport
		{
			constructor( width, height )
			{
				_(this,{
					dom: createSVGElement( 'svg', { viewBox:`0 0 ${width} ${height}`, width, height, } ),

					scene: undefined,
				});
			}

			show( scene, ...args )
			{
				_(this).scene= scene;

				_(scene).showIn( this, args );
			}

			showIn( dom )
			{
				dom.appendChild( _(this).dom );
			}
		}

		class Element
		{
			constructor()
			{
				_(this,{

					dependencies: [],

					dependedBy( dependency )
					{
						this.dependencies.push(dependency);
					},
				});
			}
		}

		class None extends Element
		{
			// 當寫法沒有錯誤，而元素無法被構建時(如對不相交的對象*取交點)，便得到此類對象，由此類對象參與定義的對象都爲此類對象     *平行線並不屬於此類，平行線的交點在無窮遠
		}

		class Element_0D extends Element
		{
			//
		}

		class Element_1D extends Element
		{
			//
		}

		class Element_2D extends Element
		{
			//
		}

		class Element_3D extends Element
		{
			//
		}

		class Point extends Element_0D
		{
			constructor( coordinates )
			{
				super();
			}
		}

		class Line extends Element_1D
		{
			constructor( pointA, pointB )
			{
				super();
			}
		}

		class Segment extends Element_1D
		{
			constructor( pointA, pointB )
			{
				super();

				pointA.dependedBy(this),pointB.dependedBy(this);
			}
		}

		class Circle extends Element_1D
		{
			constructor()
			{
				super();
			}
		}

		class Arc extends Element_1D
		{
			constructor()
			{
				super();
			}
		}

		class Polygon extends Element_1D
		{
			constructor()
			{
				super();
			}
		}

		class Path extends Element_1D
		{
			constructor()
			{
				super();
			}
		}

		class Plane extends Element_2D
		{
			constructor()
			{
				super();
			}
		}

		class Surface extends Element_2D
		{
			constructor()
			{
				super();
			}
		}

		class Vector
		{
			constructor()
			{
				//
			}
		}

		class Scene
		{
			constructor()
			{
				_(this,{

					elements: [],

					add( element )
					{
						this.elements.push(element);
					},

					showIn( viewport, args )
					{
						this.setViewport( viewport, ...args );

						this.elements.forEach( element=>{
							this.draw(element);
						} );
					},

					draw( element )
					{
						//
					},
				})
			}

			line( pointA, pointB )
			{
				_(this).add( new Line( pointA, pointB ) );
			}
		}

		class Scene_2D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport, scale ){
					this.viewport= viewport;

					// 生成一個判斷點是否在區域內的閉包，用於判斷點是否需要繪製
					// 生成方形邊界 element，用於截取直線，並以線段的方式顯示，（同理，截取圓變爲圓弧）
				}
			}

			point( x, y )
			{
				_(this).add( new Point([ x, y, ]) );
			}
		}

		class Scene_1_1D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport, scale ){
					this.viewport= viewport;
				}
			}

			point( t, x )
			{
				_(this).add( new Point([ t, x, ]) );
			}
		}

		class Scene_3D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport, camera ){
					this.viewport= viewport;

					// 邊界形狀應爲方錐形
				}
			}

			point( x, y, z )
			{
				_(this).add( new Point([ x, y, z, ]) );
			}
		}

		class Scene_1_2D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport ){
					this.viewport= viewport;
				}
			}

			point( t, x, y )
			{
				_(this).add( new Point([ t, x, y, ]) );
			}
		}

		class Scene_4D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport ){
					this.viewport= viewport;
				}
			}

			point( w, x, y, z )
			{
				_(this).add( new Point([ w, x, y, z, ]) );
			}
		}

		class Scene_1_3D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport ){
					this.viewport= viewport;
				}
			}

			point( t, x, y, z )
			{
				_(this).add( new Point([ t, x, y, z, ]) );
			}
		}

		class Scene_2_2D extends Scene
		{
			constructor()
			{
				super();

				_(this).setViewport= function( viewport ){
					this.viewport= viewport;
				}
			}

			point( s, t, x, y )
			{
				_(this).add( new Point([ s, t, x, y, ]) );
			}
		}

		return ()=>({ Viewport, Scene_2D, Scene_3D, Scene_4D, });

		function createSVGElement( name, attributes )
		{
			const element= document.createElementNS( 'http://www.w3.org/2000/svg', name );

			for( name in attributes )
			{
				switch( name )
				{
					default:
					{
						element.setAttribute( name, attributes[name] );
					}
					break;

					case 'children':
					{
						attributes[name].forEach( x=> element.appendChild(x) );
					}
					break;

					case 'parent':
					{
						attributes[name].appendChild(element);
					}
					break;
				}
			}

			return element;
		}
	})(
		(()=>{"use strict";const privateHanles=new WeakMap(); return ( object, defaultObject={} )=> (privateHanles.has(object) ? privateHanles : privateHanles.set(object,defaultObject)).get(object);})()
	)
);

function z(data) {
	console.log(data);
	return data;
}
