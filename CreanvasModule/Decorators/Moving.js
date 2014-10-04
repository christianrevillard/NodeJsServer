var vector = require('../Vector');

var applyTo = function(element, elementMoving)
{	

	console.log('Applying moving');

	var vx = elementMoving["vx"];
	var vy = elementMoving["vy"];
	var ax = elementMoving["ax"];
	var ay = elementMoving["ay"];
	var omega = elementMoving["rotationSpeed"];


	var lastUpdated, currentTime, dt, rollbackData;
	
	element.movingSpeed = new vector.Vector( vx || 0, vy || 0);
	element.movingAcceleration = new vector.Vector( ax || 0, ay || 0);
	element.omega = omega || 0;

	console.log('moving: ' + element.movingSpeed.x + element.movingSpeed.y + element.omega);

	lastUpdated = element.controller.getTime();

	setInterval(function() {
		
		currentTime = element.controller.getTime();
		dt = currentTime - lastUpdated;

		if (dt < 0.001)
			return;

		lastUpdated = currentTime;

		element.movingSpeed.x += element.movingAcceleration.x * dt;
		element.movingSpeed.y += element.movingAcceleration.y * dt;

		if (element.movingSpeed.x == 0 &&
				element.movingSpeed.y == 0 &&
				element.omega == 0 &&
				(!element.elementScaleSpeed ||(
				element.elementScaleSpeed.x == 0 && element.elementScaleSpeed.y==0						
				)))
		{
			return;
		}
		
		/*
		rollbackData = {
				elementX:element.elementX, 
				elementY:element.elementY, 
				elementAngle:element.elementAngle,
				elementScaleX:element.elementScaleX,
				elementScaleY:element.elementScaleY};*/

		element.update('elementX', element.elementX + element.movingSpeed.x * dt);
		element.update('elementY', element.elementY + element.movingSpeed.y * dt);				

		var newAngle = element.elementAngle + element.omega * dt;
		while (newAngle > Math.PI)
			newAngle-= 2* Math.PI
		while (newAngle < -Math.PI)
			newAngle+= 2* Math.PI
		element.update('elementAngle', newAngle );

		if (element.elementScaleSpeed)
		{
			element.update('elementScaleX', element.elementScaleX + element.elementScaleSpeed.x * dt);	
			element.update('elementScaleY', element.elementScaleY + element.elementScaleSpeed.y * dt);	
		}

		/*
		var preMoveOk = true;

		if (element.preMove)
		{						
			element.preMove.forEach(
				function(preMoveFunction)
				{
					if (!preMoveOk)
						return;
					
					if (!preMoveFunction.call(element))
					{
						preMoveOk = false;
					}
				}
			);
		}
								
		if (!preMoveOk) {
			element.elementX = rollbackData.elementX;
			element.elementY = rollbackData.elementY;
			element.elementAngle = rollbackData.elementAngle;						
			element.elementScaleX = rollbackData.elementScaleX;	
			element.elementScaleY = rollbackData.elementScaleY;
		}
		else
		{
			element.update('elementX');
			element.update('elementY');
			element.update('elementAngle');
			element.update('elementScaleY');
			element.update('elementScaleX');
		}*/
	}, 20);
		
};

exports.applyTo = applyTo;