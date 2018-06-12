import Listener from '../../OvO/view/Listener.js';

export default function movement( target, viewport, )
{
	return new Listener( 'mousedown', function( e, ){
		
		if( e.target!==this )
			return;
		
		let [ oX, oY, ]= [ e.screenX, e.screenY, ];
		
		function move( e, )
		{
			viewport.moveTarget( target, e.screenX - oX, oY - e.screenY, );
			
			[ oX, oY, ]= [ e.screenX, e.screenY, ];
		}
		
		function stop()
		{
			document.removeEventListener( 'mousemove', move, )
			
			document.removeEventListener( 'mouseup', stop, )
		}
		
		document.addEventListener( 'mousemove', move, )
		
		document.addEventListener( 'mouseup', stop, )
	}, );
}
