import Router from '../OvO/routing/Router.js';
import { resolveHere, } from '../OvO/support/path.js';

const router= new Router();

router.pageDir= resolveHere( '../pages', );
router.basePath= resolveHere( '..', );

router.route( 'home', '/', 'index', );
router.route( 'equilateral-triangle', '/demos/equilateral-triangle', );
router.route( 'angular-bisector', '/demos/angular-bisector', );

export default router;
