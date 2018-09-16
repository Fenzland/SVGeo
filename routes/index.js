import Router from 'https://oxo.fenzland.com/OrO/master/Router.js';

const router= new Router();

router.route( {
	home: { path: '/', page: 'index', },
	equilateral_triangle: '/demos/equilateral-triangle',
	angular_bisector: '/demos/angular-bisector',
	tangent_line_of_circle: '/demos/tangent-line-of-circle',
}, );

export default router;
