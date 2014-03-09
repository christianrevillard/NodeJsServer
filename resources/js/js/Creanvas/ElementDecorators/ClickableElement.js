var CreJs = CreJs || {};

(function(){
	CreJs.Creanvas = CreJs.Creanvas || {};		
	
	CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
	
	CreJs.Creanvas.elementDecorators.push(
	{
		type: 'clickable',
		applyTo: function(element, clickData)
		{	
			element.controller.events.addEventListener(
			{
				enventGroupType :'clickable',
				eventId: 'click', 
				listenerId : element.id,
				handleEvent: function(e){
					if (element.isPointInPath(e))
					{
						element.controller.log('click event on ' + element.id);

						clickData.onclick.call(element);						

						element.triggerRedraw();
					}					
				}
			});
		}
	});
}());
