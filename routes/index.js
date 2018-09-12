import Router from '../OvO/routing/Router.js';
import { resolve, } from '../OvO/support/path.js';

const router= new Router();

router.pageDir= resolve( '../pages', );
router.basePath= resolve( '..', );

router.route( 'home', '/', 'index', );
router.route( 'equilateral-triangle', '/demos/equilateral-triangle', );
router.route( 'angular-bisector', '/demos/angular-bisector', );
router.route( 'tangent-line-of-circle', '/demos/tangent-line-of-circle', );

export default router;
