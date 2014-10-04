var decorators = require("./Decorators");

var Element = function(controller, identificationData, imageData, positionData) {

	var element = this;

	element.id = controller.elements.length + 1; 

	this.controller = controller;
	this.cachedValues = [];
	this.clonerData = [];
	// this.elementEvents = this.elementEvents || new
	// CreJs.Creevents.EventContainer();

	setIdentification(element, identificationData[1]);
	setImage(element, imageData[1]);
	setPosition(element, positionData[1]);

	this.clonerData.push(identificationData);
	this.clonerData.push(imageData);
	this.clonerData.push(positionData);

	this.events = [];
	// element.controller.elementEvents.getEvent('deactivate').addListener(function(e)
	// { element.deactivate(); });
};

var setIdentification = function(element, identificationData) {
	element.elementName = identificationData;
};

var setImage = function(element, imageData) {
	var width = imageData["width"];
	var height = imageData["height"];

	element.top = imageData["top"] == 0 ? 0 : imageData["top"] || (-height / 2);
	element.left = imageData["left"] == 0 ? 0 : imageData["left"]
			|| (-width / 2);
	element.bottom = imageData["bottom"] == 0 ? 0 : imageData["bottom"]
			|| (element.top + height);
	element.right = imageData["right"] == 0 ? 0 : imageData["right"]
			|| (element.left + width);
	element.elementWidth = width || (element.right - element.left);
	element.elementHeight = height || (element.bottom - element.top);

	// scaling decorator ?? => should be
	element.update('elementScaleX', imageData["scaleX"] || 1);
	element.update('elementScale', imageData["scaleY"] || 1);

	element.update('typeName', imageData["typeName"]);
};

var setPosition = function(element, position) {
	// position prop
	element.update('elementX', position["x"] || 0);
	element.update('elementY', position["y"] || 0);
	element.update('elementZ', position["z"] || 0);
	element.update('elementAngle', position["angle"] || 0);
};

Element.prototype.update = function(field, value) {
	this.toUpdate = this.toUpdate || {
		id : this.id
	};
	this.toUpdate[field] = this[field] = value;
};

Element.prototype.fullUpdate = function() {
	this.toUpdate = this.toUpdate || { id : this.id };
	this.toUpdate.elementX = this.elementX;
	this.toUpdate.elementY = this.elementY;
	this.toUpdate.elementZ = this.elementZ;
	this.toUpdate.elementScaleX = this.elementScaleX;
	this.toUpdate.elementScaleY = this.elementScaleY;
	this.toUpdate.elementAngle = this.elementAngle;
	this.toUpdate.typeName = this.typeName;
};

Element.prototype.applyElementDecorator = function(decoratorType,
		decoratorSettings) {
	// console.log("applyElementDecorator: " + decoratorType);

	var decorator = decorators[decoratorType];

	if (decorator) {
		this.clonerData.push([ decoratorType, decoratorSettings ]);
		decorator.applyTo(this, decoratorSettings);
	} else {
		console.log("applyElementDecorator: Not found: " + decoratorType);
	}
};

/*
 * creanvas.Element.prototype.getCacheableValue = function(cacheKey, currentKey,
 * getData) { if (this.cachedValues[cacheKey] && this.cachedValues[cacheKey].key ==
 * currentKey) { return this.cachedValues[cacheKey].value; } var newValue =
 * getData.call(this); this.cachedValues[cacheKey] = {key:currentKey,
 * value:newValue}; return newValue; };
 */

// unpractical syntax... ignore is unnatural here TODO
Element.prototype.cloneElement = function(ignoreDecorators) {
	// console.log("cloneElement : start cloning");

	var elementsToApply = ignoreDecorators ? this.clonerData
			.filter(function(d) {
				return ignoreDecorators.every(function(toIgnore) {
					return toIgnore != d[0];
				});
			}) : this.clonerData;

	// console.log("cloneElement: apply " + elementsToApply.length + " stuff");

	var clone = this.controller.addElement.apply(this.controller,
			elementsToApply);
	clone.update('elementZ', this.elementZ + 1);
	return clone;
};

/*
 * creanvas.Element.prototype.canHandleEvent = function(eventId) { // click,
 * pointerDown, always stopped by top element, even if not handled return
 * eventId == 'click' || eventId == 'pointerDown' ||
 * this.elementEvents.hasEvent(eventId); };
 */

Element.prototype.applyElementDecorators = function() {
	var element = this;

	var newDecorators = [].slice.apply(arguments);

	newDecorators.forEach(function(decoratorArgument) {
		element.applyElementDecorator(decoratorArgument[0],
				decoratorArgument[1]);
	});
};

Element.prototype.triggerEvent = function(eventData) {
	var bubble = true

	this.events.filter(function(e) {
		return e.eventId == eventData.eventId
	}).forEach(function(e) {
		if (e.action) {
			bubble = e.action(eventData) && bubble;
		}
	});

	return bubble;
};

Element.prototype.addEventListener = function(eventId, action) {
	var id = this.events.length + 1;
	this.events.push({
		eventId : eventId,
		action : action,
		id : id
	});
	return id;
};

Element.prototype.removeEventListener = function(id) {
	this.events.filter(function(e) {
		return e.id == id
	}).forEach(function(e) {
		e.action = null;
	});
};

exports.Element = Element;