import Listener from '../../OvO/view/Listener.js';

export default function movement( target, viewport, )
{
	return new Listener( 'mousedown', function( e, ){
		
		if( e.target!==this )
			return;
		
		let [ oX, oY, ]= [ e.offsetX, e.offsetY, ];
		
		function move( e, )
		{
			viewport.moveTarget( target, e.offsetX - oX, oY - e.offsetY, );
			
			[ oX, oY, ]= [ e.offsetX, e.offsetY, ];
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
