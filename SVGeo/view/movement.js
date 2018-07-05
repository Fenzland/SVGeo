import Listener from '../../OvO/view/Listener.js';

export default function movement( target, viewport, )
{
	return new Listener( 'mousedown', function( e, ){
		
		if( e.target!==this )
			return;
		
		let [ cX, cY, ]= [ e.clientX, e.clientY, ];
		let [ sX, sY, ]= [ document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop, ];
		
		function move( e, )
		{
			viewport.moveTarget( target, e.clientX - cX, cY - e.clientY, );
			
			[ cX, cY, ]= [ e.clientX, e.clientY, ];
		}
		
		function scroll( e, )
		{
			viewport.moveTarget( target, document.scrollingElement.scrollLeft - sX, sY - document.scrollingElement.scrollTop, );
			
			[ sX, sY, ]= [ document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop, ];
		}
		
		function stop()
		{
			document.removeEventListener( 'mousemove', move, )
			
			document.removeEventListener( 'scroll', scroll, )
			
			document.removeEventListener( 'mouseup', stop, )
		}
		
		document.addEventListener( 'mousemove', move, )
		
		document.addEventListener( 'scroll', scroll, )
		
		document.addEventListener( 'mouseup', stop, )
	}, );
}
