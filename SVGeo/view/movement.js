import Listener from 'https://oxo.fenzland.com/OvO/0.1/Listener.js';

export default function movement( target, viewport, )
{
	return new Listener( 'mousedown', function( e, ){
		
		if( e.target!==this )
			return;
		
		const [ oX, oY, ]= [ e.offsetX, e.offsetY, ];
		
		let [ cX, cY, ]= [ e.clientX, e.clientY, ];
		let [ sX, sY, ]= [ document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop, ];
		
		const [ dX, dY, ]= [ cX - - sX - oX, cY - - sY - oY, ];
		
		function move( e, )
		{
			viewport.moveTarget( target, cX - - sX - dX, cY - - sY - dY, e.clientX - - sX - dX, e.clientY - - sY - dY, );
			
			[ cX, cY, ]= [ e.clientX, e.clientY, ];
		}
		
		function scroll( e, )
		{
			viewport.moveTarget( target, cX - - sX - dX, cY - - sY - dY, cX - - document.scrollingElement.scrollLeft - dX, cY - - document.scrollingElement.scrollTop - dY, );
			
			[ sX, sY, ]= [ document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop, ];
		}
		
		function stop( e, )
		{
			move( e, )
			
			document.removeEventListener( 'mousemove', move, )
			
			document.removeEventListener( 'scroll', scroll, )
			
			document.removeEventListener( 'mouseup', stop, )
		}
		
		document.addEventListener( 'mousemove', move, )
		
		document.addEventListener( 'scroll', scroll, )
		
		document.addEventListener( 'mouseup', stop, )
	}, );
}
