// movableData:
// isBlocked: function that allow to block the duplication

var CreJs = CreJs || {};

(function(){

	CreJs.Creanvas = CreJs.Creanvas || {};		
	
	CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
	
	CreJs.Creanvas.elementDecorators.push(
	{
		type: 'movable',
		applyTo: function(element, movableData)
		{
			var isMoving = false;
			var touchIdentifier = null;	
			var movingFrom = null;
			var isBlocked = movableData.isBlocked;
			
			element.startMoving = function(e)
			{				
				element.controller.log('Starting moving - identifier: ' + e.identifier);
				isMoving = true;
				movingFrom = element.controller.getCanvasXYFromClientXY(e);	
				touchIdentifier = e.identifier;
				if (element.isDroppable)
				{
					element.controller.log('Trigger drag - identifier: ' + e.identifier);
					element.controller.events.dispatch('drag', {moveEvent:e, element:element});
				}
			};
	
			element.moveCompleted = function(e)
			{
				element.controller.log('Completed move - identifier: ' + e.identifier);
				isMoving = false;
				movingFrom = null;
				if (element.isDroppable)
				{
					element.controller.log('Trigger drop - identifier: ' + e.identifier);
					element.controller.events.dispatch('drop', {moveEvent:e, element:element});
				}
			};
			
			var getTarget = function(e, touches)
			{
				if (touches)
				{
					for (var touch = 0; touch<touches.length; touch++)			
					{
						if (element.isPointInPath(touches[touch]))
						{
							return touches[touch];
						};			
					};		
				} else
				{
					if (element.isPointInPath(e))
					{
						return e;
					};
				}
				
				return null;
			};
			
			var getTargetMoving = function(e, touches)
			{
				if (touches)
				{
					element.controller.log('Number of touches to check: ' + touches.length + ', trying to find ' + touchIdentifier);
					for (var touch = 0; touch<touches.length; touch++)			
					{
						element.controller.log('identifier is ' + touches[touch].identifier);
						if (touches[touch].identifier == touchIdentifier)
						{
							element.controller.log('Hurra ! Moving touch: ' + touchIdentifier);
							return target = touches[touch];
						};			
						element.controller.log('No match for touchIdentifier in event touches');
					};		
				} else
				{
					return e;
				}
				
				return null;
			};

	
			var beginMove = function(e) {
	
				if (isBlocked && isBlocked()) 
					return;

				var target = getTarget(e, e.targetTouches);

				if (!target)
					return;
								
				element.startMoving(target);
			};
	
			element.controller.events.addEventListener({
				eventGroupType:'movable',
				eventId:'pointerDown', 
				handleEvent:beginMove,
				listenerId:element.id});
				
			var move = function(e) {
				if(!isMoving)
					return;

				if (isBlocked && isBlocked()) 
					return;

				element.controller.log('Checking Move event');
				var target = getTargetMoving(e, e.targetTouches);

				if (!target)
					return;
				
				element.controller.log('Moving -  identifier: ' + e.identifier);

				var canvasXY = element.controller.getCanvasXYFromClientXY(target);	
				element.x += canvasXY.x-movingFrom.x;
				element.y += canvasXY.y-movingFrom.y;
				movingFrom = canvasXY;	
				element.triggerRedraw();
			};	
	
			element.controller.events.addEventListener({
				eventGroupType:'movable',
				eventId:'pointerMove', 
				handleEvent:move,
				listenerId:element.id});
	
			var moveend = function(e) {
				if(!isMoving)
					return;

				if (isBlocked && isBlocked()) 
					return;

				element.controller.log('Checking End event');
				var target = getTargetMoving(e, e.changedTouches);

				if (!target)
					return;

				var canvasXY = element.controller.getCanvasXYFromClientXY(e);	
				element.x += canvasXY.x-movingFrom.x;
				element.y += canvasXY.y-movingFrom.y;
				element.moveCompleted(e);	
				touchIdentifier = null;
				element.triggerRedraw();
			};
	
			element.controller.events.addEventListener({
				eventGroupType:'movable',
				eventId:'pointerUp', 
				handleEvent:moveend,
				listenerId:element.id});
		}
	});
}());