import Router from '../OvO/routing/Router.js';

const router= new Router( '..', '../pages', );

router.route( 'home', '/', 'index', );
router.route( 'equilateral-triangle', '/demos/equilateral-triangle', );
router.route( 'angular-bisector', '/demos/angular-bisector', );
router.route( 'tangent-line-of-circle', '/demos/tangent-line-of-circle', );
router.route( {
	home: { path: '/', page: 'index', },
	equilateral_triangle: '/demos/equilateral-triangle',
	angular_bisector: '/demos/angular-bisector',
	tangent_line_of_circle: '/demos/tangent-line-of-circle',
}, );

export default router;
