var CreJs = CreJs || {};

(function(){
	var creevents = CreJs.Creevents = CreJs.Creevents || {};		
	
	creevents.EventContainer = function(logger)
	{	
		var writeToLog = logger;
		
		this.log = function(logData){
			if (!writeToLog )
				return;

			writeToLog(logData);
		};

		var container = this;
		var events = {};		
		var eventIds = [];		
		
		var addEvent = function(eventId)
		{
			eventIds.push(eventId);
			events[eventId] = new creevents.Event(eventId, writeToLog);											
		};
		
		this.addEventListener = function(listenerData)
		{
			if (!events[listenerData.eventId])
			{
				addEvent(listenerData.eventId);
			}
			return events[listenerData.eventId].addEventListener(listenerData);
		};
						
		this.dispatch = function(eventId, eventData)
		{
			if (eventId != 'pointerMove' && eventId != 'draw')
				this.log('dispatching ' + eventId);
			if (events[eventId])
			{
				events[eventId].dispatch(eventData);
			}
		};
	
		this.removeEventListener = function(listenerData)
		{
			if (events[listenerData.eventId])
			{
				events[listenerData.eventId].removeEventListener(listenerData);
			}
			else
			{
				eventIds.forEach(function(eventId){ events[eventId].removeEventListener(listenerData);});
			}
		};

		var eventsToHandle = [];
		
		this.registerControlEvent = function (control, controlEventId, customEventId, preventDefault)
		{
			if (!events[customEventId])
			{
				addEvent(customEventId);
			}
						
			control.addEventListener(
					controlEventId,					
				function(event)
				{
					if (preventDefault)
						event.preventDefault();

//					container.log('control event: ' + controlEventId);
					
					container.log('Forwarded control event: ' + controlEventId + ', now: ' + Date.now());

					eventsToHandle.push({
						id:customEventId,
						event:
							{
							clientX:event.changedTouches?event.changedTouches[0].clientX:event.clientX,
									clientY:event.changedTouches?event.changedTouches[0].clientY:event.clientY
							}

						});

					container.log('Forwarded completed control event: ' + controlEventId + ', now: ' + Date.now());
				});
		};
		
		setInterval(
				function()
				{
					if (eventsToHandle.length>0)
					{
						var toHandle = eventsToHandle.shift();
						container.log('handling control event: ' + toHandle.id + '\n');
						container.dispatch(toHandle.id, toHandle.event);
					}
				},
				5);

	};
}());