var applyTo = function(element, droppableData)
{
	element.isDroppable = true;
	element.dropZone = droppableData["dropZone"];
}

exports.applyTo = applyTo;