var TEST = true;
var DEBUG = true;
var CreJs = CreJs || {};
CreJs.Creanvas = CreJs.Creanvas || {};
CreJs.CreanvasNodeClient = CreJs.CreanvasNodeClient || {};
window["CreJs"] = CreJs;
CreJs["Creanvas"] = CreJs.Creanvas;
CreJs["CreanvasNodeClient"] = CreJs.CreanvasNodeClient;
if (TEST) {
  CreJs.Test = CreJs.Test || {};
  CreJs["Test"] = CreJs.Test;
}
;(function() {
  var core = CreJs.Core = CreJs.Core || {};
  core.Vector = function(x, y, z) {
    var vector = this;
    this.vectorX = x;
    this.vectorY = y;
    this.vectorZ = z || 0;
    this.draw = function(context, x, y, color) {
      context.lineWidth = 5;
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + 100 * vector.vectorX, y + 100 * vector.vectorY);
      context.stroke();
      context.lineWidth = 1;
      context.strokeStyle = "#000";
    };
    this.getCoordinates = function(unitVectors) {
      return{u:core.scalarProduct(vector, unitVectors.u), v:core.scalarProduct(vector, unitVectors.v), w:core.scalarProduct(vector, unitVectors.w)};
    };
    this.setCoordinates = function(unitVectors, u, v, w) {
      w = w || 0;
      vector.vectorX = u * unitVectors.u.vectorX + v * unitVectors.v.vectorX + w * unitVectors.w.vectorX;
      vector.vectorY = u * unitVectors.u.vectorY + v * unitVectors.v.vectorY + w * unitVectors.w.vectorY;
      vector.vectorZ = u * unitVectors.u.vectorZ + v * unitVectors.v.vectorZ + w * unitVectors.w.vectorZ;
    };
  };
  Object.defineProperty(core.Vector.prototype, "x", {get:function() {
    return this.vectorX;
  }, set:function(y) {
    this.vectorX = y;
  }});
  Object.defineProperty(core.Vector.prototype, "y", {get:function() {
    return this.vectorY;
  }, set:function(y) {
    this.vectorY = y;
  }});
  Object.defineProperty(core.Vector.prototype, "z", {get:function() {
    return this.vectorZ;
  }, set:function(y) {
    this.vectorZ = y;
  }});
  core.getUnitVectors = function(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var longueur = Math.sqrt(dx * dx + dy * dy);
    return{u:new core.Vector(dx / longueur, dy / longueur, 0), v:new core.Vector(-dy / longueur, dx / longueur, 0), w:new core.Vector(0, 0, 0)};
  };
  core.drawUnitVectors = function(context, x, y, unitVectors, color) {
    context.lineWidth = 5;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 100 * unitVectors.u.vectorX, y + 100 * unitVectors.u.vectorY);
    context.moveTo(x, y);
    context.lineTo(x + 50 * unitVectors.v.vectorX, y + 50 * unitVectors.v.vectorY);
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "#000";
  };
  core.drawCoordinateVector = function(context, x, y, unitVectors, ux, vx, color) {
    context.lineWidth = 5;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 100 * ux * unitVectors.u.vectorX, y + 100 * ux * unitVectors.u.vectorY);
    context.lineTo(x + 100 * ux * unitVectors.u.vectorX + 100 * vx * unitVectors.v.vectorX, y + 100 * ux * unitVectors.u.vectorY + 100 * vx * unitVectors.v.vectorY);
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "#000";
  };
  core.scalarProduct = function(v1, v2) {
    return v1.vectorX * v2.vectorX + v1.vectorY * v2.vectorY;
  };
  core.vectorProduct = function(v1, v2) {
    return new core.Vector(v1.vectorY * v2.vectorZ - v1.vectorZ * v2.vectorY, v1.vectorZ * v2.vectorX - v1.vectorX * v2.vectorZ, v1.vectorX * v2.vectorY - v1.vectorY * v2.vectorX);
  };
  CreJs["Core"] = CreJs.Core;
  CreJs.Core["Vector"] = CreJs.Core.Vector;
})();
if (TEST) {
  (function() {
    var core = CreJs.Test.Core = CreJs.Test.Core || {};
    core["test_Vector_constructor"] = function() {
      var x = 1, y = 2, z = 3;
      var vector = new CreJs.Core.Vector(x, y, z);
      if (vector.vectorX != x) {
        return "FAILED! vector.x: Expected " + x + ", was " + vector.vectorX;
      }
      if (vector.vectorY != y) {
        return "FAILED! vector.y: Expected " + y + ", was " + vector.vectorY;
      }
      if (vector.vectorZ != z) {
        return "FAILED! vector.z: Expected " + z + ", was " + vector.vectorZ;
      }
      return "OK";
    };
  })();
}
;(function() {
  CreJs.Creanvas.CollisionSolver = function(controller) {
    var findCollisionPoint = function(element, other) {
      var clientRectElement, clientRectOther, clientRectIntersection, imageAfter, edges;
      clientRectElement = element.getClientRect();
      clientRectOther = other.getClientRect();
      clientRectIntersection = {left:Math.max(clientRectElement.leftInPoints, clientRectOther.leftInPoints) - 1, right:Math.min(clientRectElement.rightInPoints, clientRectOther.rightInPoints) + 1, top:Math.max(clientRectElement.topInPoints, clientRectOther.topInPoints) - 1, bottom:Math.min(clientRectElement.bottomInPoints, clientRectOther.bottomInPoints) + 1};
      clientRectIntersection.width = clientRectIntersection.right - clientRectIntersection.left;
      clientRectIntersection.height = clientRectIntersection.bottom - clientRectIntersection.top;
      if (clientRectIntersection.width <= 0 || clientRectIntersection.height <= 0) {
        return;
      }
      var collisionImage = element.collisionContext.getImageData(0, 0, element.widthInPoints, element.heightInPoints);
      element.collisionContext.scale(1 / (element.elementScaleX || 1), 1 / (element.elementScaleY || 1));
      element.collisionContext.rotate(-(element.elementAngle || 0));
      element.collisionContext.translate(other.elementX * element.controller.lengthScale - element.elementX * element.controller.lengthScale, other.elementY * element.controller.lengthScale - element.elementY * element.controller.lengthScale);
      element.collisionContext.rotate(other.elementAngle || 0);
      element.collisionContext.scale(other.elementScaleX || 1, other.elementScaleY || 1);
      element.collisionContext.globalCompositeOperation = "destination-out";
      element.collisionContext.drawImage(other.collidedContext.canvas, 0, 0, other.widthInPoints, other.heightInPoints, other.leftInPoints, other.topInPoints, other.widthInPoints, other.heightInPoints);
      element.collisionContext.scale(1 / (other.elementScaleX || 1), 1 / (other.elementScaleY || 1));
      element.collisionContext.rotate(-other.elementAngle || 0);
      element.collisionContext.translate(-other.elementX * element.controller.lengthScale + element.elementX * element.controller.lengthScale, -other.elementY * element.controller.lengthScale + element.elementY * element.controller.lengthScale);
      element.collisionContext.rotate(element.elementAngle || 0);
      element.collisionContext.scale(element.elementScaleX || 1, element.elementScaleY || 1);
      imageAfter = element.collisionContext.getImageData(0, 0, element.widthInPoints, element.heightInPoints);
      element.collisionContext.globalCompositeOperation = "source-over";
      element.collisionContext.putImageData(collisionImage, 0, 0);
      edges = [];
      element.edges.forEach(function(edgePoint) {
        if (imageAfter.data[edgePoint.y * element.widthInPoints * 4 + edgePoint.x * 4 + 3] < 90) {
          edges.push(edgePoint);
        }
      });
      if (edges.length < 2) {
        return null;
      }
      var d, dmax = 0;
      var theMax = {i:0, j:edges.length - 1};
      for (var i = 1;i < edges.length;i++) {
        for (var j = i + 1;j < edges.length;j++) {
          var dx = edges[i].x - edges[j].x;
          var dy = edges[i].y - edges[j].y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d > dmax) {
            dmax = d;
            theMax.i = i;
            theMax.j = j;
          }
        }
      }
      var point1 = element.getWebappXY(edges[theMax.i].x + element.left, edges[theMax.i].y + element.topInPoints);
      var point2 = element.getWebappXY(edges[theMax.j].x + element.left, edges[theMax.j].y + element.topInPoints);
      if (point1.x == point2.x && point1.y == point2.y) {
        return null;
      }
      return{x:(point1.x + point2.x) / 2, y:(point1.y + point2.y) / 2, vectors:CreJs.Core.getUnitVectors(point1.x, point1.y, point2.x, point2.y)};
    };
    var updateAfterCollision = function(element, other, collisionPoint) {
      var colVectors, speedElement, speedOther, localSpeedElement, localSpeedOther, centerCollisionElement, l1, centerCollisionOther, l2;
      colVectors = collisionPoint.vectors;
      centerCollisionElement = new CreJs.Core.Vector(collisionPoint.x - element.elementX, collisionPoint.y - element.elementY);
      l1 = CreJs.Core.vectorProduct(centerCollisionElement, colVectors.v).z;
      centerCollisionOther = new CreJs.Core.Vector(collisionPoint.x - other.elementX, collisionPoint.y - other.elementY);
      l2 = CreJs.Core.vectorProduct(centerCollisionOther, colVectors.v).z;
      var elementRot = CreJs.Core.vectorProduct(centerCollisionElement, colVectors.v);
      var otherRot = CreJs.Core.vectorProduct(centerCollisionOther, colVectors.v);
      speedElement = new CreJs.Core.Vector(element.movingSpeed.x, element.movingSpeed.y);
      speedOther = new CreJs.Core.Vector(other.movingSpeed.x, other.movingSpeed.y);
      if (element.elementScaleSpeed) {
        speedElement.x += centerCollisionElement.x * element.elementScaleSpeed.x;
        speedElement.y += centerCollisionElement.y * element.elementScaleSpeed.y;
      }
      if (other.elementScaleSpeed) {
        speedOther.x += centerCollisionOther.x * other.elementScaleSpeed.x;
        speedOther.y += centerCollisionOther.y * other.elementScaleSpeed.y;
      }
      localSpeedElement = speedElement.getCoordinates(colVectors);
      localSpeedOther = speedOther.getCoordinates(colVectors);
      var elementMass = element.fixedPoint ? Infinity : element.elementMass;
      var otherMass = other.fixedPoint ? Infinity : other.elementMass;
      var elementMOI = element.fixed ? Infinity : element.getMomentOfInertia();
      var otherMOI = other.fixed ? Infinity : other.getMomentOfInertia();
      var F = element.collisionCoefficient * other.collisionCoefficient * 2 * (localSpeedOther.v - localSpeedElement.v + other.omega * otherRot.z - element.omega * elementRot.z) / (1 / otherMass + 1 / elementMass + otherRot.z * otherRot.z / otherMOI + elementRot.z * elementRot.z / elementMOI);
      element.movingSpeed.x += F / elementMass * colVectors.v.x;
      element.movingSpeed.y += F / elementMass * colVectors.v.y;
      other.movingSpeed.x -= F / otherMass * colVectors.v.x;
      other.movingSpeed.y -= F / otherMass * colVectors.v.y;
      element.omega += F * l1 / elementMOI;
      other.omega -= F * l2 / otherMOI;
    };
    var getCollidableElements = function() {
      return controller.elements.filter(function(e) {
        return e.isSolid;
      });
    };
    this.solveCollision = function(element) {
      var toCheck = getCollidableElements();
      var others, center, collisionPoint, other = null;
      center = element.getCenter();
      others = toCheck.filter(function(other) {
        var otherCenter;
        if (other.elementId === element.elementId || !other.movingSpeed.x && !other.movingSpeed.y && !element.movingSpeed.x && !element.movingSpeed.y && !other.elementScaleSpeed && !element.elementScaleSpeed && !element.omega && !other.omega) {
          return false;
        }
        otherCenter = other.getCenter();
        if (Math.sqrt((center.x - otherCenter.x) * (center.x - otherCenter.x) + (center.y - otherCenter.y) * (center.y - otherCenter.y)) > element.getRadius() + other.getRadius()) {
          return false;
        }
        return true;
      });
      if (others.length == 0) {
        return true;
      }
      collisionPoint = null;
      others.forEach(function(checkCollisionWith) {
        if (collisionPoint) {
          return;
        }
        collisionPoint = findCollisionPoint(element, checkCollisionWith);
        if (collisionPoint) {
          other = checkCollisionWith;
        }
      });
      if (!collisionPoint) {
        return true;
      }
      updateAfterCollision(element, other, collisionPoint);
      element.elementEvents.getEvent("collision").dispatch({element:other, collisionPoint:collisionPoint});
      other.elementEvents.getEvent("collision").dispatch({element:element, collisionPoint:collisionPoint});
      return false;
    };
  };
})();
(function() {
  var creanvas = CreJs.Creanvas;
  creanvas.Controller = function(controllerData) {
    var controller = this;
    var canvas = controllerData["canvas"];
    this.logger = controllerData["log"];
    this.lengthScale = controllerData["lengthScale"] || canvas.height / controllerData["realHeight"] || canvas.width / controllerData["realWidth"] || 1;
    timeScale = controllerData["timeScale"] || 1;
    var time = 0;
    setInterval(function() {
      time += 10 * timeScale / 1E3;
    }, 10);
    this.getTime = function() {
      return time;
    };
    if (DEBUG) {
      this.logMessage("Starting controller");
    }
    controller.needRedraw = true;
    controller.isDrawing = false;
    controller.refreshTime = controllerData["controller.refreshTime"] || creanvas.Controller.DEFAULT_REFRESH_TIME;
    controller.elements = [];
    controller.elementEvents = new CreJs.Creevents.EventContainer;
    controller.context = canvas.getContext("2d");
    controller.context.setTransform(1, 0, 0, 1, 0, 0);
    registerCanvasEvents.call(controller);
    addBackground.call(controller, controllerData["drawBackground"], controllerData["backgroundStyle"]);
    startController.call(controller);
  };
  var registerCanvasEvents = function() {
    this.registerCanvasPointerEvent("click", "click");
    this.registerCanvasPointerEvent("mousedown", "pointerDown");
    this.registerCanvasPointerEvent("touchstart", "pointerDown");
    this.registerTouchIdentifierEvent("mousemove", "pointerMove");
    this.registerTouchIdentifierEvent("touchmove", "pointerMove");
    this.registerTouchIdentifierEvent("mouseup", "pointerUp");
    this.registerTouchIdentifierEvent("touchend", "pointerUp");
  };
  var addBackground = function(drawBackground, backgroundStyle) {
    var controller = this;
    if (DEBUG) {
      controller.logMessage("Adding background");
    }
    controller.add(["name", "background"], ["image", {"left":0, "top":0, "width":controller.context.canvas.width / controller.lengthScale, "height":controller.context.canvas.height / controller.lengthScale, "draw":drawBackground || function(context) {
      context.fillStyle = backgroundStyle || creanvas.Controller.DEFAULT_BACKGROUND_COLOUR;
      context.fillRect(0, 0, controller.context.canvas.width / controller.lengthScale, controller.context.canvas.height / controller.lengthScale);
    }}], ["position", {"z":-Infinity}]);
  };
  var startController = function() {
    var controller = this;
    setInterval(function() {
      if (controller.needRedraw && !controller.isDrawing) {
        controller.isDrawing = true;
        controller.elements.sort(function(a, b) {
          return(a.elementZ || 0) - (b.elementZ || 0);
        }).forEach(function(element) {
          draw.call(controller, element);
        });
        controller.isDrawing = false;
      } else {
        if (DEBUG) {
          controller.logMessage("No redraw");
        }
      }
    }, controller.refreshTime);
  };
  var draw = function(element) {
    var controller = this;
    controller.context.translate(element.elementX * controller.lengthScale, element.elementY * controller.lengthScale);
    controller.context.rotate(element.elementAngle || 0);
    controller.context.scale(element.elementScaleX || 1, element.elementScaleY || 1);
    controller.context.drawImage(element.temporaryRenderingContext.canvas, 0, 0, element.widthInPoints, element.heightInPoints, element.leftInPoints, element.topInPoints, element.widthInPoints, element.heightInPoints);
    controller.context.scale(1 / (element.elementScaleX || 1), 1 / element.elementScaleY || 1);
    controller.context.rotate(-(element.elementAngle || 0));
    controller.context.translate(-element.elementX * controller.lengthScale, -element.elementY * controller.lengthScale);
  };
  creanvas.Controller.prototype.logMessage = function(logData) {
    if (this.logger) {
      this.logger(logData);
    }
  };
  creanvas.Controller.prototype.triggerPointedElementEvent = function(eventId, event) {
    var hit = false;
    this.elements.filter(function(e) {
      return e.canHandleEvent(eventId);
    }).sort(function(a, b) {
      return b.elementZ || 0 - a.elementZ || 0;
    }).forEach(function(element) {
      if (hit) {
        return;
      }
      if (element.hit(event.x, event.y)) {
        element.elementEvents.getEvent(eventId).dispatch(event);
        hit = true;
      }
    });
  };
  creanvas.Controller.prototype.triggerElementEventByIdentifier = function(eventId, event) {
    this.elements.forEach(function(element) {
      if (element.touchIdentifier == event.touchIdentifier) {
        element.elementEvents.getEvent(eventId).dispatch(event);
      }
    });
  };
  creanvas.Controller.prototype.registerCanvasPointerEvent = function(controlEventId, customEventId) {
    var controller = this;
    controller.context.canvas.addEventListener(controlEventId, function(event) {
      setTimeout(function() {
        var triggerEvent = function(clientXY, touchIdentifier) {
          if (DEBUG) {
            controller.logMessage("Canvas event " + controlEventId + " with touchIdentifier " + touchIdentifier);
          }
          var eventData = controller.getWebappXYFromClientXY(clientXY);
          eventData.touchIdentifier = touchIdentifier;
          controller.triggerPointedElementEvent(customEventId, eventData);
        };
        if (event.changedTouches) {
          for (var i = 0;i < event.changedTouches.length;i++) {
            triggerEvent(event.changedTouches[i], event.changedTouches[i].identifier);
          }
        } else {
          triggerEvent(event, -1);
        }
      });
    });
  };
  creanvas.Controller.prototype.registerTouchIdentifierEvent = function(controlEventId, customEventId) {
    var controller = this;
    this.context.canvas.addEventListener(controlEventId, function(event) {
      setTimeout(function() {
        var triggerEvent = function(clientXY, touchIdentifier) {
          if (DEBUG) {
            controller.logMessage("Canvas event " + controlEventId + " with touchIdentifier " + touchIdentifier);
          }
          var eventData = controller.getWebappXYFromClientXY(clientXY);
          eventData.touchIdentifier = touchIdentifier;
          controller.triggerElementEventByIdentifier(customEventId, eventData);
        };
        if (event.changedTouches) {
          for (var i = 0;i < event.changedTouches.length;i++) {
            triggerEvent(event.changedTouches[i], event.changedTouches[i].identifier);
          }
        } else {
          triggerEvent(event, -1);
        }
      });
    });
  };
  creanvas.Controller.prototype.stopController = function() {
    this.elementEvents.getEvent("deactivate").dispatch();
    this.elements = [];
  };
  creanvas.Controller.prototype.triggerRedraw = function() {
    this.needRedraw = true;
  };
  creanvas.Controller.prototype.getWebappXYFromClientXY = function(clientXY) {
    var boundings = this.context.canvas.getBoundingClientRect();
    var xy = {x:(clientXY.clientX - boundings.left) * this.context.canvas.width / boundings.width / this.lengthScale, y:(clientXY.clientY - boundings.top) * this.context.canvas.height / boundings.height / this.lengthScale};
    if (DEBUG) {
      this.logMessage("ClientXY: (" + clientXY.clientX + "," + clientXY.clientY + ") - WebAppXY: (" + xy.x + "," + xy.y + ")");
    }
    return xy;
  };
  creanvas.Controller.prototype.add = function() {
    var controller = this;
    if (DEBUG) {
      controller.logMessage("Controller.addElement: Adding element - args:" + arguments.length);
    }
    var args = [].slice.call(arguments);
    var identificationData = args.filter(function(arg) {
      return arg && arg[0] == "name";
    })[0] || ["name", "Unknown"];
    var imageData = args.filter(function(arg) {
      return arg && arg[0] == "image";
    })[0];
    var positionData = args.filter(function(arg) {
      return arg && arg[0] == "position";
    })[0];
    var element = new CreJs.Creanvas.Element(controller, identificationData, imageData, positionData);
    element.elementId = controller.elements.length == 0 ? 0 : controller.elements[controller.elements.length - 1].elementId + 1;
    var decoratorArguments = args.filter(function(arg) {
      return arg && arg[0] != "name" && arg[0] != "position" && arg[0] != "image";
    });
    if (decoratorArguments.length > 0 && CreJs.Creanvas.elementDecorators) {
      if (DEBUG) {
        element.debug("New element", "apply " + decoratorArguments.length + " decorators");
      }
      element.applyElementDecorators.apply(element, decoratorArguments);
    }
    controller.elements.push(element);
    return element;
  };
  creanvas.Controller.DEFAULT_REFRESH_TIME = 50;
  creanvas.Controller.DEFAULT_BACKGROUND_COLOUR = "#FFF";
  creanvas["Controller"] = creanvas.Controller;
  creanvas.Controller.prototype["addElement"] = creanvas.Controller.prototype.add;
  creanvas.Controller.prototype["redraw"] = creanvas.Controller.prototype.triggerRedraw;
  creanvas.Controller.prototype["stop"] = creanvas.Controller.prototype.stopController;
})();
(function() {
  var creanvas = CreJs.Creanvas;
  creanvas.Element = function(controller, identificationData, imageData, positionData) {
    var element = this;
    this.controller = controller;
    this.cachedValues = [];
    this.clonerData = [];
    this.elementEvents = this.elementEvents || new CreJs.Creevents.EventContainer;
    setIdentification(element, identificationData[1]);
    setImage(element, imageData[1]);
    setPosition(element, positionData[1]);
    this.clonerData.push(identificationData);
    this.clonerData.push(imageData);
    this.clonerData.push(positionData);
    element.controller.elementEvents.getEvent("deactivate").addListener(function(e) {
      element.deactivate();
    });
  };
  var setIdentification = function(element, identificationData) {
    element.elementName = identificationData;
  };
  var setImage = function(element, imageData) {
    var width = imageData["width"];
    var height = imageData["height"];
    element.top = imageData["top"] == 0 ? 0 : imageData["top"] || -height / 2;
    element.left = imageData["left"] == 0 ? 0 : imageData["left"] || -width / 2;
    element.bottom = imageData["bottom"] == 0 ? 0 : imageData["bottom"] || element.top + height;
    element.right = imageData["right"] == 0 ? 0 : imageData["right"] || element.left + width;
    element.elementWidth = width || element.right - element.left;
    element.elementHeight = height || element.bottom - element.top;
    element.topInPoints = Math.round(element.top * element.controller.lengthScale);
    element.leftInPoints = Math.round(element.left * element.controller.lengthScale);
    element.bottomInPoints = Math.round(element.bottom * element.controller.lengthScale);
    element.rightInPoints = Math.round(element.right * element.controller.lengthScale);
    element.widthInPoints = Math.round(element.elementWidth * element.controller.lengthScale);
    element.heightInPoints = Math.round(element.elementHeight * element.controller.lengthScale);
    var canvas = element.controller.context.canvas;
    var tempCanvas = canvas.ownerDocument.createElement("canvas");
    element.temporaryRenderingContext = tempCanvas.getContext("2d");
    element.elementScaleX = imageData["scaleX"] || 1;
    element.elementScaleY = imageData["scaleY"] || 1;
    if (imageData["rawImage"]) {
      element.elementImage = imageData["rawImage"];
      element.temporaryRenderingContext.putImageData(element.elementImage, 0, 0);
    } else {
      var draw = imageData["draw"];
      tempCanvas.width = element.widthInPoints;
      tempCanvas.height = element.heightInPoints;
      element.temporaryRenderingContext.beginPath();
      element.temporaryRenderingContext.translate(-element.leftInPoints, -element.topInPoints);
      element.temporaryRenderingContext.scale(element.controller.lengthScale, element.controller.lengthScale);
      draw.call(element, element.temporaryRenderingContext);
      element.elementImage = element.temporaryRenderingContext.getImageData(0, 0, element.widthInPoints, element.heightInPoints);
    }
  };
  var setPosition = function(element, position) {
    element.elementX = position["x"] || 0;
    element.elementY = position["y"] || 0;
    element.elementZ = position["z"] || 0;
    element.elementAngle = position["angle"] || 0;
  };
  creanvas.Element.prototype.hit = function(pointerX, pointerY) {
    var imageXY = this.getElementXY(pointerX, pointerY);
    var imageX = imageXY.x - this.leftInPoints;
    var imageY = imageXY.y - this.topInPoints;
    return imageX >= 0 && imageX <= this.widthInPoints && imageY >= 0 && imageY <= this.heightInPoints && this.elementImage.data[4 * imageY * this.widthInPoints + 4 * imageX + 3] > 0;
  };
  creanvas.Element.prototype.applyElementDecorator = function(decoratorType, decoratorSettings) {
    if (DEBUG) {
      this.debug("applyElementDecorator", decoratorType);
    }
    var decorator = CreJs.Creanvas.elementDecorators[decoratorType];
    if (decorator) {
      this.clonerData.push([decoratorType, decoratorSettings]);
      decorator.applyTo(this, decoratorSettings);
    } else {
      if (DEBUG) {
        this.debug("applyElementDecorator", "Not found: " + decoratorType);
      }
    }
  };
  creanvas.Element.prototype.getCacheableValue = function(cacheKey, currentKey, getData) {
    if (this.cachedValues[cacheKey] && this.cachedValues[cacheKey].key == currentKey) {
      return this.cachedValues[cacheKey].value;
    }
    var newValue = getData.call(this);
    this.cachedValues[cacheKey] = {key:currentKey, value:newValue};
    return newValue;
  };
  creanvas.Element.prototype.cloneElement = function(ignoreDecorators) {
    if (DEBUG) {
      this.debug("cloneElement", "start cloning");
    }
    var elementsToApply = ignoreDecorators ? this.clonerData.filter(function(d) {
      return ignoreDecorators.every(function(toIgnore) {
        return toIgnore != d[0];
      });
    }) : this.clonerData;
    if (DEBUG) {
      this.debug("cloneElement", "apply " + elementsToApply.length + " stuff");
    }
    return this.controller.add.apply(this.controller, elementsToApply);
  };
  creanvas.Element.prototype.canHandleEvent = function(eventId) {
    return eventId == "click" || eventId == "pointerDown" || this.elementEvents.hasEvent(eventId);
  };
  creanvas.Element.prototype.deactivate = function() {
    this.temporaryRenderingContext = null;
  };
  creanvas.Element.prototype.triggerRedraw = function() {
    this.controller.triggerRedraw();
  };
  creanvas.Element.prototype.getWebappXY = function(imageX, imageY) {
    return{x:this.elementX + (imageX * this.elementScaleX * Math.cos(this.elementAngle) - imageY * this.elementScaleY * Math.sin(this.elementAngle)) / this.controller.lengthScale, y:this.elementY + (imageX * this.elementScaleX * Math.sin(this.elementAngle) + imageY * this.elementScaleY * Math.cos(this.elementAngle)) / this.controller.lengthScale};
  };
  creanvas.Element.prototype.getElementXY = function(webAppX, webAppY) {
    return{x:Math.round(((webAppX - this.elementX) * this.controller.lengthScale * Math.cos(this.elementAngle) + (webAppY - this.elementY) * this.controller.lengthScale * Math.sin(this.elementAngle)) / this.elementScaleX), y:Math.round(((webAppY - this.elementY) * this.controller.lengthScale * Math.cos(this.elementAngle) - (webAppX - this.elementX) * this.controller.lengthScale * Math.sin(this.elementAngle)) / this.elementScaleY)};
  };
  creanvas.Element.prototype.getCenter = function() {
    return this.getWebappXY(this.leftInPoints + this.widthInPoints / 2, this.topInPoints + this.heightInPoints / 2);
  };
  creanvas.Element.prototype.getClientCorners = function() {
    var element = this;
    return this.getCacheableValue("getClientCorners", element.elementX + "" + element.elementY + "" + element.elementAngle + "" + element.elementScaleX + "" + element.elementScaleX, function() {
      var corners = [];
      corners.push({x:element.leftInPoints, y:element.topInPoints});
      corners.push({x:element.rightInPoints, y:element.topInPoints});
      corners.push({x:element.rightInPoints, y:element.bottomInPoints});
      corners.push({x:element.leftInPoints, y:element.bottomInPoints});
      return corners.map(function(point) {
        return element.getWebappXY(point.x, point.y);
      });
    });
  };
  creanvas.Element.prototype.getClientRect = function() {
    var element = this;
    return this.getCacheableValue("getClientRect", element.elementX + "" + element.elementY + "" + element.elementAngle + "" + element.elementScaleX + "" + element.elementScaleX, function() {
      var clientCorners = element.getClientCorners();
      return{top:clientCorners.reduce(function(a, b) {
        return Math.min(a, b.y);
      }, Infinity), bottom:clientCorners.reduce(function(a, b) {
        return Math.max(a, b.y);
      }, -Infinity), left:clientCorners.reduce(function(a, b) {
        return Math.min(a, b.x);
      }, Infinity), right:clientCorners.reduce(function(a, b) {
        return Math.max(a, b.x);
      }, -Infinity)};
    });
  };
  creanvas.Element.prototype.applyElementDecorators = function() {
    var element = this;
    var newDecorators = [].slice.apply(arguments);
    newDecorators.forEach(function(decoratorArgument) {
      element.applyElementDecorator(decoratorArgument[0], decoratorArgument[1]);
    });
  };
  if (DEBUG) {
    creanvas.Element.prototype.debug = function(source, message) {
      this.controller.logMessage("Element." + source + ": " + message + ". Element: " + this.elementName + "/" + this.elementId);
    };
  }
  creanvas.Element.prototype["clone"] = creanvas.Element.prototype.cloneElement;
  creanvas.Element.prototype["applyDecorator"] = creanvas.Element.prototype.applyElementDecorator;
  creanvas.Element.prototype["applyDecorators"] = creanvas.Element.prototype.applyElementDecorators;
  Object.defineProperty(creanvas.Element.prototype, "width", {get:function() {
    return this.elementWidth;
  }, set:function(y) {
    this.elementWidth = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "height", {get:function() {
    return this.elementHeight;
  }, set:function(y) {
    this.elementHeight = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "scaleX", {get:function() {
    return this.elementScaleX;
  }, set:function(y) {
    this.elementScaleX = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "scaleY", {get:function() {
    return this.elementScaleY;
  }, set:function(y) {
    this.elementScaleY = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "x", {get:function() {
    return this.elementX;
  }, set:function(y) {
    this.elementX = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "y", {get:function() {
    return this.elementY;
  }, set:function(y) {
    this.elementY = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "z", {get:function() {
    return this.elementZ;
  }, set:function(y) {
    this.elementZ = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "angle", {get:function() {
    return this.elementAngle;
  }, set:function(y) {
    this.elementAngle = y;
  }});
  Object.defineProperty(creanvas.Element.prototype, "name", {get:function() {
    return this.elementName;
  }});
  Object.defineProperty(creanvas.Element.prototype, "id", {get:function() {
    return this.elementId;
  }});
  Object.defineProperty(creanvas.Element.prototype, "image", {get:function() {
    return this.elementImage;
  }});
  Object.defineProperty(creanvas.Element.prototype, "events", {get:function() {
    return this.elementEvents;
  }});
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["clickable"] = {applyTo:function(element, clickData) {
    var isPointerDown = false;
    var ondown = clickData["ondown"];
    var onup = clickData["onup"];
    var onclick = clickData["onclick"];
    this.touchIdentifier = null;
    if (onclick) {
      var onClick = function(e) {
        if (DEBUG) {
          element.debug("Clickable", "onclick");
        }
        onclick.call(element, e);
        element.triggerRedraw();
      };
      element.elementEvents.getEvent("click").addListener(onClick);
    }
    if (ondown) {
      var onDown = function(e) {
        if (DEBUG) {
          element.debug("Clickable", "onDown: Identifier: " + e.touchIdentifier);
        }
        element.touchIdentifier = e.touchIdentifier;
        isPointerDown = true;
        ondown.call(element, event);
        element.triggerRedraw();
      };
      element.elementEvents.getEvent("pointerDown").addListener(onDown);
    }
    if (onup) {
      var onUp = function(e) {
        if (!isPointerDown) {
          return;
        }
        if (element.touchIdentifier != e.touchIdentifier) {
          return;
        }
        if (DEBUG) {
          element.debug("Clickable", "onUp: Identifier: " + e.touchIdentifier);
        }
        isPointerDown = false;
        onup.call(element, event);
        element.triggerRedraw();
      };
      element.elementEvents.getEvent("pointerUp").addListener(onUp);
    }
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["customTimer"] = {applyTo:function(element, customTimerData) {
    setInterval(function() {
      customTimerData["action"].call(element);
    }, customTimerData["time"]);
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["droppable"] = {applyTo:function(element, droppableData) {
    element.isDroppable = true;
    element.elementDropZone = droppableData["dropZone"];
    if (DEBUG) {
      element.debug("droppable.applyTo", "Now droppable");
    }
    Object.defineProperty(element, "dropZone", {get:function() {
      return this.elementDropZone;
    }, set:function(y) {
      this.elementDropZone = y;
    }});
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["dropzone"] = {applyTo:function(element, dropzoneData) {
    var availableSpots = dropzoneData["availableSpots"];
    var dropX = dropzoneData["dropX"];
    var dropY = dropzoneData["dropY"];
    element.droppedElementsList = [];
    var drop = function(e) {
      if (availableSpots <= 0) {
        return;
      }
      if (DEBUG) {
        element.debug("dropzone.drop", "dropping: " + e.droppedElement.id);
      }
      availableSpots--;
      e.droppedElement.x = dropX || element.elementX;
      e.droppedElement.y = dropY || element.elementY;
      e.droppedElement.dropZone = element;
      element.droppedElementsList.push(e.droppedElement);
      e.droppedElement.elementEvents.getEvent("dropped").dispatch({dropZone:element, droppedElement:e.droppedElement});
      element.elementEvents.getEvent("droppedIn").dispatch({"dropZone":element, "droppedElement":e.droppedElement});
      element.triggerRedraw();
    };
    element.elementEvents.getEvent("drop").addListener(drop);
    element.drag = function(draggedElement) {
      if (DEBUG) {
        element.debug("dropzone.drag", "dragging  " + draggedElement.id);
      }
      draggedElement.dropZone = null;
      availableSpots++;
      element.droppedElementsList.splice(element.droppedElementsList.indexOf(draggedElement), 1);
      element.triggerRedraw();
    };
    Object.defineProperty(element, "droppedElements", {get:function() {
      return element.droppedElementsList;
    }});
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["duplicable"] = {applyTo:function(element, duplicableData) {
    var isBlocked = duplicableData["isBlocked"];
    var generatorCount = duplicableData["generatorCount"] || Infinity;
    if (DEBUG) {
      element.debug("duplicable.applyTo", "generatorCount is " + generatorCount);
    }
    var requiresTouch = false;
    var makeCopy = function(e) {
      if (e.touchIdentifier >= 0) {
        requiresTouch = true;
      }
      if (requiresTouch && e.touchIdentifier < 0) {
        return;
      }
      if (isBlocked && isBlocked()) {
        return;
      }
      if (DEBUG) {
        element.debug("duplicable.makeCopy", "GeneratorCount was: " + generatorCount);
      }
      if (generatorCount <= 0) {
        return;
      }
      generatorCount--;
      if (DEBUG) {
        element.debug("duplicable.makeCopy", "GeneratorCount is now: " + generatorCount);
      }
      var copy = element.cloneElement(["duplicable"]);
      copy.elementName += " (duplicate)";
      copy.applyElementDecorator("movable", {isBlocked:isBlocked});
      copy.startMoving(e);
      element.triggerRedraw();
    };
    element.elementEvents.getEvent("pointerDown").addListener(makeCopy);
  }};
})();
(function() {
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas["elementDecorators"] = CreJs.Creanvas.elementDecorators;
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["movable"] = {applyTo:function(element, movableData) {
    var isMoving = false;
    this.touchIdentifier = null;
    var movingFrom = null;
    var isBlocked = movableData.isBlocked;
    element.startMoving = function(e) {
      if (DEBUG) {
        element.debug("movable.startMoving", "identifier: " + e.touchIdentifier);
      }
      isMoving = true;
      element.touchIdentifier = e.touchIdentifier;
      movingFrom = {x:e.x, y:e.y};
      if (element.dropZone) {
        element.dropZone.drag(element);
        element.dropZone = null;
      }
    };
    element.moveCompleted = function(e) {
      if (DEBUG) {
        element.debug("movable.moveCompleted", "identifier: " + e.touchIdentifier);
      }
      isMoving = false;
      movingFrom = null;
      if (element.isDroppable) {
        if (DEBUG) {
          element.debug("movable.moveCompleted", "trigger drop - identifier: " + e.touchIdentifier);
        }
        element.controller.triggerPointedElementEvent("drop", {x:e.x, y:e.y, droppedElement:element});
      }
    };
    var beginMove = function(e) {
      if (isBlocked && isBlocked()) {
        return;
      }
      element.startMoving(e);
    };
    element.elementEvents.getEvent("pointerDown").addListener(beginMove);
    var isMovingLogged = false;
    var move = function(e) {
      if (!isMoving) {
        return;
      }
      if (isBlocked && isBlocked()) {
        return;
      }
      if (!isMovingLogged) {
        isMovingLogged = true;
        if (DEBUG) {
          element.debug("movable.move", "identifier: " + element.touchIdentifier);
        }
      }
      element.elementX += e.x - movingFrom.x;
      element.elementY += e.y - movingFrom.y;
      movingFrom = {x:e.x, y:e.y};
      element.triggerRedraw();
    };
    element.elementEvents.getEvent("pointerMove").addListener(move);
    var moveend = function(e) {
      if (!isMoving) {
        return;
      }
      if (isBlocked && isBlocked()) {
        return;
      }
      if (DEBUG) {
        element.debug("movable.moveend", "identifier: " + element.touchIdentifier);
      }
      element.elementX += e.x - movingFrom.x;
      element.elementY += e.y - movingFrom.y;
      element.moveCompleted(e);
      element.touchIdentifier = null;
      isMovingLogged = false;
      element.triggerRedraw();
    };
    element.elementEvents.getEvent("pointerUp").addListener(moveend);
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["moving"] = {type:"moving", applyTo:function(element, elementMoving) {
    var vx = elementMoving["vx"];
    var vy = elementMoving["vy"];
    var ax = elementMoving["ax"];
    var ay = elementMoving["ay"];
    var omega = elementMoving["rotationSpeed"];
    if (DEBUG) {
      element.debug("moving", "applyTo");
    }
    var lastUpdated, currentTime, dt, rollbackData;
    element.movingSpeed = new CreJs.Core.Vector(vx || 0, vy || 0);
    element.movingAcceleration = new CreJs.Core.Vector(ax || 0, ay || 0);
    element.omega = omega || 0;
    lastUpdated = element.controller.getTime();
    setInterval(function() {
      currentTime = element.controller.getTime();
      dt = currentTime - lastUpdated;
      if (dt < .001) {
        return;
      }
      lastUpdated = currentTime;
      element.movingSpeed.x += element.movingAcceleration.x * dt;
      element.movingSpeed.y += element.movingAcceleration.y * dt;
      if (element.movingSpeed.x == 0 && element.movingSpeed.y == 0 && element.omega == 0 && (!element.elementScaleSpeed || element.elementScaleSpeed.x == 0 && element.elementScaleSpeed.y == 0)) {
        return;
      }
      rollbackData = {elementX:element.elementX, elementY:element.elementY, elementAngle:element.elementAngle, elementScaleX:element.elementScaleX, elementScaleY:element.elementScaleY};
      element.elementX += element.movingSpeed.x * dt;
      element.elementY += element.movingSpeed.y * dt;
      element.elementAngle += element.omega * dt;
      if (element.elementScaleSpeed) {
        element.elementScaleX += element.elementScaleSpeed.x * dt;
        element.elementScaleY += element.elementScaleSpeed.y * dt;
      }
      var preMoveOk = true;
      if (element.preMove) {
        element.preMove.forEach(function(preMoveFunction) {
          if (!preMoveOk) {
            return;
          }
          if (!preMoveFunction.call(element)) {
            preMoveOk = false;
          }
        });
      }
      if (!preMoveOk) {
        element.elementX = rollbackData.elementX;
        element.elementY = rollbackData.elementY;
        element.elementAngle = rollbackData.elementAngle;
        element.elementScaleX = rollbackData.elementScaleX;
        element.elementScaleY = rollbackData.elementScaleY;
      }
    }, 20);
    Object.defineProperty(element, "speed", {get:function() {
      return this.movingSpeed;
    }, set:function(y) {
      this.movingSpeed = y;
    }});
    Object.defineProperty(element, "acceleration", {get:function() {
      return this.movingAcceleration;
    }, set:function(y) {
      this.movingAcceleration = y;
    }});
    Object.defineProperty(element, "rotationSpeed", {get:function() {
      return this.omega;
    }, set:function(y) {
      this.omega = y;
    }});
    Object.defineProperty(element, "scaleSpeed", {get:function() {
      return this.elementScaleSpeed;
    }, set:function(y) {
      this.elementScaleSpeed = y;
    }});
  }};
})();
var CreJs = CreJs || {};
(function() {
  CreJs.Creanvas = CreJs.Creanvas || {};
  CreJs.Creanvas.elementDecorators = CreJs.Creanvas.elementDecorators || [];
  CreJs.Creanvas.elementDecorators["solid"] = {applyTo:function(element, solidData) {
    element.isSolid = true;
    element.elementMass = solidData["mass"] || 1;
    var onCollision = solidData["onCollision"];
    var collisionCoefficient = solidData["coefficient"];
    element.fixed = solidData["fixed"] || false;
    element.fixedPoint = element.fixed || solidData["fixedPoint"] || false;
    element.controller.collisionSolver = element.controller.collisionSolver || new CreJs.Creanvas.CollisionSolver(element.controller);
    element.collisionCoefficient = !collisionCoefficient && collisionCoefficient !== 0 ? 1 : collisionCoefficient;
    element.movingSpeed = element.movingSpeed || new CreJs.Core.Vector(0, 0);
    element.movingAcceleration = element.movingAcceleration || new CreJs.Core.Vector(0, 0);
    element.omega = element.omega || 0;
    element.elementEvents.getEvent("collision").addListener(function(collisionEvent) {
      if (onCollision) {
        onCollision.call(element, collisionEvent);
      }
    });
    element.preMove = this.preMove || [];
    element.preMove.push(function() {
      return element.controller.collisionSolver.solveCollision(element);
    });
    createCollidedContext.call(element);
    createCollisionContext.call(element);
    element.getMomentOfInertia = function() {
      return element.elementMass / 12 * (element.widthInPoints * element.elementScaleX * element.widthInPoints * element.elementScaleX + element.heightInPoints * element.elementScaleY * element.heightInPoints * element.elementScaleY);
    };
    element.getRadius = function() {
      return this.getCacheableValue("getRadius", element.elementWidth + "" + element.elementHeight + "" + element.elementScaleX + "" + element.elementScaleY, function() {
        return Math.sqrt(this.elementWidth * this.elementWidth * this.elementScaleX * this.elementScaleX + this.elementHeight * this.elementHeight * this.elementScaleY * this.elementScaleY) / 2;
      });
    };
    Object.defineProperty(element, "mass", {get:function() {
      return this.elementMass;
    }, set:function(y) {
      this.elementMass = y;
    }});
  }};
  var createCollidedContext = function() {
    var element = this;
    var canvas = element.controller.context.canvas;
    var tempCollidedCanvas = canvas.ownerDocument.createElement("canvas");
    tempCollidedCanvas.width = element.widthInPoints;
    tempCollidedCanvas.height = element.heightInPoints;
    element.collidedContext = tempCollidedCanvas.getContext("2d");
    element.collidedContext.putImageData(element.elementImage, 0, 0);
    element.collidedContext.globalCompositeOperation = "source-atop";
    element.collidedContext.fillStyle = "#000";
    element.collidedContext.fillRect(0, 0, element.widthInPoints, element.heightInPoints);
  };
  var createCollisionContext = function() {
    var element = this;
    var canvas = element.controller.context.canvas;
    var tempCollisionCanvas = canvas.ownerDocument.createElement("canvas");
    tempCollisionCanvas.width = element.widthInPoints;
    tempCollisionCanvas.height = element.heightInPoints;
    element.collisionContext = tempCollisionCanvas.getContext("2d");
    element.collisionContext.globalCompositeOperation = "source-over";
    element.collisionContext.drawImage(element.collidedContext.canvas, 0, 0);
    var collisionImageOld = element.collisionContext.getImageData(0, 0, element.widthInPoints, element.heightInPoints);
    var collisionImageNew = element.collisionContext.createImageData(element.widthInPoints, element.heightInPoints);
    element.edges = [];
    for (var imageX = 0;imageX < element.widthInPoints;imageX++) {
      for (var imageY = 0;imageY < element.heightInPoints;imageY++) {
        if (collisionImageOld.data[imageY * element.widthInPoints * 4 + imageX * 4 + 3] < 200) {
          continue;
        }
        var edge = false;
        for (var i = -1;i < 2;i++) {
          for (var j = -1;j < 2;j++) {
            if (imageY + i < 0 || imageX + j < 0 || imageY + i > element.heightInPoints - 1 || imageX + i > element.elementWidth - 1 || collisionImageOld.data[(imageY + i) * element.elementWidth * 4 + (imageX + j) * 4 + 3] < 100) {
              edge = true;
              i = 2;
              j = 2;
            }
          }
        }
        var fillValue = 255;
        element.collisionContext.putImageData(collisionImageNew, 0, 0);
        if (edge) {
          element.edges.push({x:imageX, y:imageY});
          collisionImageNew.data[imageY * element.widthInPoints * 4 + imageX * 4] = 0;
          collisionImageNew.data[imageY * element.widthInPoints * 4 + imageX * 4 + 1] = 0;
          collisionImageNew.data[imageY * element.widthInPoints * 4 + imageX * 4 + 2] = 0;
          collisionImageNew.data[imageY * element.widthInPoints * 4 + imageX * 4 + 3] = fillValue;
        }
      }
    }
    element.collisionContext.putImageData(collisionImageNew, 0, 0);
    element.collisionContext.translate(-element.leftInPoints, -element.topInPoints);
  };
})();
(function() {
  var creevents = CreJs.Creevents = CreJs.Creevents || {};
  creevents.Event = function(eventId) {
    this.eventId = eventId;
    var nextHandlerId = 0;
    var eventHandlers = [];
    var logger = new CreJs.Crelog.Logger;
    this.dispatch = function(eventData, callback) {
      var count = eventHandlers.length;
      eventHandlers.forEach(function(handler) {
        setTimeout(function() {
          if (DEBUG) {
            if (eventData && eventData.eventId != "pointerMove") {
              logger.logMessage("Handling " + eventData.eventId);
            }
          }
          handler.handleEvent(eventData);
          count--;
          if (count == 0 && callback) {
            callback();
          }
        });
      });
    };
    this.addListener = function(handleEvent, rank) {
      var handlerId = nextHandlerId++;
      eventHandlers.push({handlerId:handlerId, handleEvent:handleEvent, rank:rank});
      eventHandlers = eventHandlers.sort(function(a, b) {
        return(a.rank || Infinity) - (b.rank || Infinity);
      });
      return handlerId;
    };
    this.removeListener = function(handlerId) {
      eventHandlers = eventHandlers.filter(function(registered) {
        return registered.handlerId != handlerId;
      });
    };
    this["addEventListener"] = this.addListener;
    this["removeEventListener"] = this.removeListener;
    this["dispatch"] = this.dispatch;
  };
  CreJs["Creevents"] = creevents;
  creevents["Event"] = creevents.Event;
})();
(function() {
  var creevents = CreJs.Creevents = CreJs.Creevents || {};
  creevents.EventContainer = function() {
    var container = this;
    var events = {};
    container.hasEvent = function(eventId) {
      return events[eventId] != undefined;
    };
    container.getEvent = function(eventId) {
      if (!events[eventId]) {
        events[eventId] = new creevents.Event(eventId);
      }
      return events[eventId];
    };
    container["getEvent"] = container.getEvent;
  };
  creevents["EventContainer"] = creevents.EventContainer;
})();
(function() {
  var isLogging = true;
  var log = CreJs.Crelog = CreJs.Crelog || {};
  log.Logger = function() {
    this.logMessage = function(logData) {
      if (!isLogging) {
        return;
      }
      console.log(logData);
    };
  };
  CreJs["Crelog"] = log;
  log["Logger"] = log.Logger;
  log.Logger["log"] = log.Logger.logMessage;
})();
(function() {
  var creanvas = CreJs.CreanvasNodeClient;
  creanvas.NodeJsController = function(controllerData) {
    var controller = this;
    var canvas = controllerData["canvas"];
    this.logger = controllerData["log"];
    this.lengthScale = controllerData["lengthScale"] || canvas.height / controllerData["realHeight"] || canvas.width / controllerData["realWidth"] || 1;
    timeScale = controllerData["timeScale"] || 1;
    this.nodeSocket = controllerData["nodeSocket"];
    this.drawingMethods = [];
    controller.needRedraw = true;
    controller.isDrawing = false;
    if (DEBUG) {
      this.logMessage("Starting controller");
    }
    controller.refreshTime = controllerData["controller.refreshTime"] || creanvas.NodeJsController.DEFAULT_REFRESH_TIME;
    controller.elements = [];
    controller.elementEvents = new CreJs.Creevents.EventContainer;
    controller.context = canvas.getContext("2d");
    controller.context.setTransform(1, 0, 0, 1, 0, 0);
    registerCanvasEvents.call(controller);
    addBackground.call(controller, controllerData["drawBackground"], controllerData["backgroundStyle"]);
    startController.call(controller);
    this.nodeSocket.on("update", function(msg) {
      var data = JSON.parse(msg);
      data.forEach(function(updated) {
        var el = controller.elements.filter(function(e) {
          return e.id == updated.id;
        })[0];
        el.x = updated.x;
        el.y = updated.y;
      });
      (new CreJs.Crelog.Logger).logMessage("MOVED:" + msg);
    });
    this.nodeSocket.on("addElement", function(msg) {
      var data = JSON.parse(msg);
      controller.add(["name", data.name], ["image", {"left":data.left, "top":data.top, "width":data.width, "height":data.height, "draw":controller.drawingMethods.filter(function(e) {
        return e.elementType == data.elementType;
      })[0].draw}], ["position", {"x":data.x, "y":data.y, "z":data.z}]);
    });
  };
  var registerCanvasEvents = function() {
    this.registerCanvasPointerEvent("click", "click");
    this.registerCanvasPointerEvent("mousedown", "pointerDown");
    this.registerCanvasPointerEvent("touchstart", "pointerDown");
    this.registerTouchIdentifierEvent("mousemove", "pointerMove");
    this.registerTouchIdentifierEvent("touchmove", "pointerMove");
    this.registerTouchIdentifierEvent("mouseup", "pointerUp");
    this.registerTouchIdentifierEvent("touchend", "pointerUp");
  };
  var addBackground = function(drawBackground, backgroundStyle) {
    var controller = this;
    if (DEBUG) {
      controller.logMessage("Adding background");
    }
    controller.add(["name", "background"], ["image", {"left":0, "top":0, "width":controller.context.canvas.width / controller.lengthScale, "height":controller.context.canvas.height / controller.lengthScale, "draw":drawBackground || function(context) {
      context.fillStyle = backgroundStyle || creanvas.NodeJsController.DEFAULT_BACKGROUND_COLOUR;
      context.fillRect(0, 0, controller.context.canvas.width / controller.lengthScale, controller.context.canvas.height / controller.lengthScale);
    }}], ["position", {"z":-Infinity}]);
  };
  var startController = function() {
    var controller = this;
    setInterval(function() {
      if (controller.needRedraw && !controller.isDrawing) {
        controller.isDrawing = true;
        controller.elements.sort(function(a, b) {
          return(a.elementZ || 0) - (b.elementZ || 0);
        }).forEach(function(element) {
          element.drawMyself();
        });
        controller.isDrawing = false;
      } else {
        if (DEBUG) {
          controller.logMessage("No redraw");
        }
      }
    }, controller.refreshTime);
  };
  creanvas.NodeJsController.prototype.logMessage = function(logData) {
    if (this.logger) {
      this.logger(logData);
    }
  };
  creanvas.NodeJsController.prototype.triggerPointedElementEvent = function(eventId, event) {
    var controller = this;
    var hit = false;
    this.elements.filter(function(e) {
      return e.canHandleEvent(eventId);
    }).sort(function(a, b) {
      return b.elementZ || 0 - a.elementZ || 0;
    }).forEach(function(element) {
      if (hit) {
        return;
      }
      if (element.hit(event.x, event.y)) {
        controller.nodeSocket.emit("dispatchEvent", JSON.stringify({"element":element.id, "event":eventId, "touchIdentifier":event.touchIdentifier}));
        element.elementEvents.getEvent(eventId).dispatch(event);
        hit = true;
      }
    });
  };
  creanvas.NodeJsController.prototype.triggerElementEventByIdentifier = function(eventId, event) {
    this.elements.forEach(function(element) {
      if (element.touchIdentifier == event.touchIdentifier) {
        controller.nodeSocket.emit("dispatchEvent", JSON.stringify({"element":element.id, "event":eventId}));
        element.elementEvents.getEvent(eventId).dispatch(event);
      }
    });
  };
  creanvas.NodeJsController.prototype.registerCanvasPointerEvent = function(controlEventId, customEventId) {
    var controller = this;
    controller.context.canvas.addEventListener(controlEventId, function(event) {
      setTimeout(function() {
        var triggerEvent = function(clientXY, touchIdentifier) {
          if (DEBUG) {
            controller.logMessage("Canvas event " + controlEventId + " with touchIdentifier " + touchIdentifier);
          }
          var eventData = controller.getCanvasXYFromClientXY(clientXY);
          eventData.touchIdentifier = touchIdentifier;
          controller.triggerPointedElementEvent(customEventId, eventData);
        };
        if (event.changedTouches) {
          for (var i = 0;i < event.changedTouches.length;i++) {
            triggerEvent(event.changedTouches[i], event.changedTouches[i].identifier);
          }
        } else {
          triggerEvent(event, -1);
        }
      });
    });
  };
  creanvas.NodeJsController.prototype.registerTouchIdentifierEvent = function(controlEventId, customEventId) {
    var controller = this;
    this.context.canvas.addEventListener(controlEventId, function(event) {
      setTimeout(function() {
        var triggerEvent = function(clientXY, touchIdentifier) {
          if (DEBUG) {
            controller.logMessage("Canvas event " + controlEventId + " with touchIdentifier " + touchIdentifier);
          }
          var eventData = controller.getCanvasXYFromClientXY(clientXY);
          eventData.touchIdentifier = touchIdentifier;
          controller.triggerElementEventByIdentifier(customEventId, eventData);
        };
        if (event.changedTouches) {
          for (var i = 0;i < event.changedTouches.length;i++) {
            controller.nodeSocket.emit("dispatchEvent", JSON.stringify({"touchIdentifier":event.changedTouches[i].identifier, "event":customEventId, "x":event.changedTouches[i].x, "y":event.changedTouches[i].y}));
            triggerEvent(event.changedTouches[i], event.changedTouches[i].identifier);
          }
        } else {
          controller.nodeSocket.emit("dispatchEvent", JSON.stringify({"touchIdentifier":-1, "event":customEventId, "x":event.x, "y":event.y}));
          triggerEvent(event, -1);
        }
      });
    });
  };
  creanvas.NodeJsController.prototype.stopController = function() {
    this.elementEvents.getEvent("deactivate").dispatch();
    this.elements = [];
  };
  creanvas.NodeJsController.prototype.triggerRedraw = function() {
    this.needRedraw = true;
  };
  creanvas.NodeJsController.prototype.getCanvasXYFromClientXY = function(clientXY) {
    var boundings = this.context.canvas.getBoundingClientRect();
    var xy = {x:(clientXY.clientX - boundings.left) * this.context.canvas.width / boundings.width, y:(clientXY.clientY - boundings.top) * this.context.canvas.height / boundings.height};
    if (DEBUG) {
      this.logMessage("ClientXY: (" + clientXY.clientX + "," + clientXY.clientY + ") - CanvasXY: (" + xy.x + "," + xy.y + ")");
    }
    return xy;
  };
  creanvas.NodeJsController.prototype.addElementDrawing = function(elementType, draw) {
    this.drawingMethods.push({elementType:elementType, draw:draw});
  };
  creanvas.NodeJsController.prototype.add = function() {
    var controller = this;
    if (DEBUG) {
      controller.logMessage("Controller.addElement: Adding element - args:" + arguments.length);
    }
    var args = [].slice.call(arguments);
    var identificationData = args.filter(function(arg) {
      return arg && arg[0] == "name";
    })[0] || ["name", "Unknown"];
    var imageData = args.filter(function(arg) {
      return arg && arg[0] == "image";
    })[0];
    var positionData = args.filter(function(arg) {
      return arg && arg[0] == "position";
    })[0];
    var element = new CreJs.CreanvasNodeClient.NodeJsElement(controller, identificationData, imageData, positionData);
    element.elementId = controller.elements.length == 0 ? 0 : controller.elements[controller.elements.length - 1].elementId + 1;
    controller.nodeSocket.emit("registerElement", JSON.stringify({"id":element.id, "x":element.x, "y":element.y}));
    var decoratorArguments = args.filter(function(arg) {
      return arg && arg[0] != "name" && arg[0] != "position" && arg[0] != "image";
    });
    if (decoratorArguments.length > 0 && CreJs.Creanvas.elementDecorators) {
      if (DEBUG) {
        element.debug("New element", "apply " + decoratorArguments.length + " decorators");
      }
      decoratorArguments.forEach(function(decoratorArgument) {
        controller.nodeSocket.emit("decorate", JSON.stringify({"element":element.id, "decorator":decoratorArgument[0], "arguments":decoratorArgument[1]}));
      });
    }
    controller.elements.push(element);
    return element;
  };
  creanvas.NodeJsController.DEFAULT_REFRESH_TIME = 50;
  creanvas.NodeJsController.DEFAULT_BACKGROUND_COLOUR = "#FFF";
  creanvas["NodeJsController"] = creanvas.NodeJsController;
  creanvas.NodeJsController.prototype["addElement"] = creanvas.NodeJsController.prototype.add;
  creanvas.NodeJsController.prototype["redraw"] = creanvas.NodeJsController.prototype.triggerRedraw;
  creanvas.NodeJsController.prototype["stop"] = creanvas.NodeJsController.prototype.stopController;
})();
(function() {
  var creanvas = CreJs.CreanvasNodeClient;
  creanvas.NodeJsElement = function(controller, identificationData, imageData, positionData) {
    var element = this;
    this.controller = controller;
    this.cachedValues = [];
    this.clonerData = [];
    this.elementEvents = this.elementEvents || new CreJs.Creevents.EventContainer;
    setIdentification(element, identificationData[1]);
    setImage(element, imageData[1]);
    setPosition(element, positionData[1]);
    this.clonerData.push(identificationData);
    this.clonerData.push(imageData);
    this.clonerData.push(positionData);
    element.controller.elementEvents.getEvent("deactivate").addListener(function(e) {
      element.deactivate();
    });
    this.drawMyself = function() {
      var element = this;
      element.controller.context.scale(element.controller.lengthScale, element.controller.lengthScale);
      element.controller.context.translate(element.elementX, element.elementY);
      element.controller.context.rotate(element.elementAngle || 0);
      element.controller.context.scale(element.elementScaleX || 1, element.elementScaleY || 1);
      controller.context.beginPath();
      element.draw(controller.context);
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
    };
    this.drawMyEdges = function() {
      var element = this;
      if (element.edges && element.edges.length > 0) {
        element.controller.context.scale(element.controller.lengthScale, element.controller.lengthScale);
        element.controller.context.translate(element.elementX, element.elementY);
        element.controller.context.rotate(element.elementAngle || 0);
        element.controller.context.scale(element.elementScaleX || 1, element.elementScaleY || 1);
        element.controller.context.beginPath();
        var current = element.edges[0];
        element.controller.context.moveTo(current.x, current.y);
        for (var i = 1;i < element.edges.length;i++) {
          current = element.edges[i];
          element.controller.context.lineTo(current.x, current.y);
        }
        element.controller.context.closePath();
      }
      controller.context.setTransform(1, 0, 0, 1, 0, 0);
    };
  };
  var setIdentification = function(element, identificationData) {
    element.elementName = identificationData;
  };
  var setImage = function(element, imageData) {
    var width = imageData["width"];
    var height = imageData["height"];
    element.top = imageData["top"] == 0 ? 0 : imageData["top"] || -height / 2;
    element.left = imageData["left"] == 0 ? 0 : imageData["left"] || -width / 2;
    element.bottom = imageData["bottom"] == 0 ? 0 : imageData["bottom"] || element.top + height;
    element.right = imageData["right"] == 0 ? 0 : imageData["right"] || element.left + width;
    element.elementWidth = width || element.right - element.left;
    element.elementHeight = height || element.bottom - element.top;
    element.topInPoints = Math.round(element.top * element.controller.lengthScale);
    element.leftInPoints = Math.round(element.left * element.controller.lengthScale);
    element.bottomInPoints = Math.round(element.bottom * element.controller.lengthScale);
    element.rightInPoints = Math.round(element.right * element.controller.lengthScale);
    element.widthInPoints = Math.round(element.elementWidth * element.controller.lengthScale);
    element.heightInPoints = Math.round(element.elementHeight * element.controller.lengthScale);
    element.elementScaleX = imageData["scaleX"] || 1;
    element.elementScaleY = imageData["scaleY"] || 1;
    element.draw = imageData["draw"];
    var tempCanvas = element.controller.context.canvas.ownerDocument.createElement("canvas");
    element.temporaryRenderingContext = tempCanvas.getContext("2d");
    element.controller.context.canvas.ownerDocument.body.appendChild(tempCanvas);
    var stuff = 50;
    tempCanvas.width = stuff;
    tempCanvas.height = stuff;
    element.temporaryRenderingContext.beginPath();
    element.temporaryRenderingContext.translate(-stuff * element.left / element.width, -stuff * element.top / element.height);
    element.temporaryRenderingContext.scale(stuff / element.width, stuff / element.height);
    element.draw.call(element, element.temporaryRenderingContext);
    var stuffImage = element.temporaryRenderingContext.getImageData(0, 0, stuff, stuff);
    element.edges = [];
    var startEdge = null;
    var transparencyLimit = 1;
    var imageX = null;
    var imageY = null;
    var currentEdge = null;
    var checkPoint = function(x, y, edge) {
      if (stuffImage.data[y * stuff * 4 + x * 4 + 3] < transparencyLimit) {
        return false;
      }
      var match = false;
      if (edge == "top") {
        match = y == 0 || stuffImage.data[(y - 1) * stuff * 4 + x * 4 + 3] < transparencyLimit;
        dx = .5;
        dy = 0;
      }
      if (edge == "left") {
        match = x == 0 || stuffImage.data[y * stuff * 4 + (x - 1) * 4 + 3] < transparencyLimit;
        dx = 0;
        dy = .5;
      }
      if (edge == "right") {
        match = x == stuff - 1 || stuffImage.data[y * stuff * 4 + (x + 1) * 4 + 3] < transparencyLimit;
        dx = 1;
        dy = .5;
      }
      if (edge == "bottom") {
        match = y == stuff - 1 || stuffImage.data[(y + 1) * stuff * 4 + x * 4 + 3] < transparencyLimit;
        dx = .5;
        dy = 1;
      }
      if (!match) {
        return;
      }
      element.edges.push({x:(x + dx) * element.width / stuff + element.left, y:(y + dy) * element.height / stuff + element.top});
      imageX = x;
      imageY = y;
      currentEdge = edge;
      return true;
    };
    for (var forX = 0;forX < stuff;forX++) {
      for (var forY = 0;forY < stuff;forY++) {
        if (checkPoint(forX, forY, "top")) {
          startEdge = {x:imageX, y:imageY};
          forX = stuff;
          forY = stuff;
        }
      }
    }
    if (startEdge) {
      do {
        if (currentEdge == "top") {
          if (imageX < stuff - 1 && imageY > 0 && checkPoint(imageX + 1, imageY - 1, "left")) {
            continue;
          }
          if (imageX < stuff - 1 && checkPoint(imageX + 1, imageY, "top")) {
            continue;
          }
          if (checkPoint(imageX, imageY, "right")) {
            continue;
          }
        } else {
          if (currentEdge == "right") {
            if (imageX < stuff - 1 && imageY < stuff - 1 && checkPoint(imageX + 1, imageY + 1, "top")) {
              continue;
            }
            if (imageY < stuff - 1 && checkPoint(imageX, imageY + 1, "right")) {
              continue;
            }
            if (checkPoint(imageX, imageY, "bottom")) {
              continue;
            }
          } else {
            if (currentEdge == "bottom") {
              if (imageX > 0 && imageY < stuff - 1 && checkPoint(imageX - 1, imageY + 1, "right")) {
                continue;
              }
              if (imageX > 0 && checkPoint(imageX - 1, imageY, "bottom")) {
                continue;
              }
              if (checkPoint(imageX, imageY, "left")) {
                continue;
              }
            } else {
              if (currentEdge == "left") {
                if (imageX > 0 && imageY > 0 && checkPoint(imageX - 1, imageY - 1, "bottom")) {
                  continue;
                }
                if (imageY > 0 && checkPoint(imageX, imageY - 1, "left")) {
                  continue;
                }
                if (checkPoint(imageX, imageY, "top")) {
                  continue;
                }
              }
            }
          }
        }
      } while (imageX != startEdge.x || imageY != startEdge.y);
    }
  };
  var setPosition = function(element, position) {
    element.elementX = position["x"] || 0;
    element.elementY = position["y"] || 0;
    element.elementZ = position["z"] || 0;
    element.elementAngle = position["angle"] || 0;
  };
  creanvas.NodeJsElement.prototype.hit = function(pointerX, pointerY) {
    if (!this.edges) {
      return false;
    }
    this.drawMyEdges();
    return this.controller.context.isPointInPath(pointerX, pointerY);
  };
  creanvas.NodeJsElement.prototype.applyElementDecorator = function(decoratorType, decoratorSettings) {
    if (DEBUG) {
      this.debug("applyElementDecorator", decoratorType);
    }
    var decorator = CreJs.Creanvas.elementDecorators[decoratorType];
    if (decorator) {
      this.clonerData.push([decoratorType, decoratorSettings]);
      decorator.applyTo(this, decoratorSettings);
    } else {
      if (DEBUG) {
        this.debug("applyElementDecorator", "Not found: " + decoratorType);
      }
    }
  };
  creanvas.NodeJsElement.prototype.getCacheableValue = function(cacheKey, currentKey, getData) {
    if (this.cachedValues[cacheKey] && this.cachedValues[cacheKey].key == currentKey) {
      return this.cachedValues[cacheKey].value;
    }
    var newValue = getData.call(this);
    this.cachedValues[cacheKey] = {key:currentKey, value:newValue};
    return newValue;
  };
  creanvas.NodeJsElement.prototype.cloneElement = function(ignoreDecorators) {
    if (DEBUG) {
      this.debug("cloneElement", "start cloning");
    }
    var elementsToApply = ignoreDecorators ? this.clonerData.filter(function(d) {
      return ignoreDecorators.every(function(toIgnore) {
        return toIgnore != d[0];
      });
    }) : this.clonerData;
    if (DEBUG) {
      this.debug("cloneElement", "apply " + elementsToApply.length + " stuff");
    }
    return this.controller.add.apply(this.controller, elementsToApply);
  };
  creanvas.NodeJsElement.prototype.canHandleEvent = function(eventId) {
    return eventId == "click" || eventId == "pointerDown" || this.elementEvents.hasEvent(eventId);
  };
  creanvas.NodeJsElement.prototype.deactivate = function() {
    this.temporaryRenderingContext = null;
  };
  creanvas.NodeJsElement.prototype.triggerRedraw = function() {
    this.controller.triggerRedraw();
  };
  creanvas.NodeJsElement.prototype.getWebappXY = function(imageX, imageY) {
    return{x:this.elementX + (imageX * this.elementScaleX * Math.cos(this.elementAngle) - imageY * this.elementScaleY * Math.sin(this.elementAngle)) / this.controller.lengthScale, y:this.elementY + (imageX * this.elementScaleX * Math.sin(this.elementAngle) + imageY * this.elementScaleY * Math.cos(this.elementAngle)) / this.controller.lengthScale};
  };
  creanvas.NodeJsElement.prototype.getElementXY = function(webAppX, webAppY) {
    return{x:Math.round(((webAppX - this.elementX) * this.controller.lengthScale * Math.cos(this.elementAngle) + (webAppY - this.elementY) * this.controller.lengthScale * Math.sin(this.elementAngle)) / this.elementScaleX), y:Math.round(((webAppY - this.elementY) * this.controller.lengthScale * Math.cos(this.elementAngle) - (webAppX - this.elementX) * this.controller.lengthScale * Math.sin(this.elementAngle)) / this.elementScaleY)};
  };
  creanvas.NodeJsElement.prototype.getCenter = function() {
    return this.getWebappXY(this.leftInPoints + this.widthInPoints / 2, this.topInPoints + this.heightInPoints / 2);
  };
  creanvas.NodeJsElement.prototype.getClientCorners = function() {
    var element = this;
    return this.getCacheableValue("getClientCorners", element.elementX + "" + element.elementY + "" + element.elementAngle + "" + element.elementScaleX + "" + element.elementScaleX, function() {
      var corners = [];
      corners.push({x:element.leftInPoints, y:element.topInPoints});
      corners.push({x:element.rightInPoints, y:element.topInPoints});
      corners.push({x:element.rightInPoints, y:element.bottomInPoints});
      corners.push({x:element.leftInPoints, y:element.bottomInPoints});
      return corners.map(function(point) {
        return element.getWebappXY(point.x, point.y);
      });
    });
  };
  creanvas.NodeJsElement.prototype.getClientRect = function() {
    var element = this;
    return this.getCacheableValue("getClientRect", element.elementX + "" + element.elementY + "" + element.elementAngle + "" + element.elementScaleX + "" + element.elementScaleX, function() {
      var clientCorners = element.getClientCorners();
      return{top:clientCorners.reduce(function(a, b) {
        return Math.min(a, b.y);
      }, Infinity), bottom:clientCorners.reduce(function(a, b) {
        return Math.max(a, b.y);
      }, -Infinity), left:clientCorners.reduce(function(a, b) {
        return Math.min(a, b.x);
      }, Infinity), right:clientCorners.reduce(function(a, b) {
        return Math.max(a, b.x);
      }, -Infinity)};
    });
  };
  creanvas.NodeJsElement.prototype.applyElementDecorators = function() {
    var element = this;
    var newDecorators = [].slice.apply(arguments);
    newDecorators.forEach(function(decoratorArgument) {
      element.applyElementDecorator(decoratorArgument[0], decoratorArgument[1]);
    });
  };
  if (DEBUG) {
    creanvas.NodeJsElement.prototype.debug = function(source, message) {
      this.controller.logMessage("Element." + source + ": " + message + ". Element: " + this.elementName + "/" + this.elementId);
    };
  }
  creanvas.NodeJsElement.prototype["clone"] = creanvas.NodeJsElement.prototype.cloneElement;
  creanvas.NodeJsElement.prototype["applyDecorator"] = creanvas.NodeJsElement.prototype.applyElementDecorator;
  creanvas.NodeJsElement.prototype["applyDecorators"] = creanvas.NodeJsElement.prototype.applyElementDecorators;
  Object.defineProperty(creanvas.NodeJsElement.prototype, "width", {get:function() {
    return this.elementWidth;
  }, set:function(y) {
    this.elementWidth = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "height", {get:function() {
    return this.elementHeight;
  }, set:function(y) {
    this.elementHeight = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "scaleX", {get:function() {
    return this.elementScaleX;
  }, set:function(y) {
    this.elementScaleX = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "scaleY", {get:function() {
    return this.elementScaleY;
  }, set:function(y) {
    this.elementScaleY = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "x", {get:function() {
    return this.elementX;
  }, set:function(y) {
    this.elementX = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "y", {get:function() {
    return this.elementY;
  }, set:function(y) {
    this.elementY = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "z", {get:function() {
    return this.elementZ;
  }, set:function(y) {
    this.elementZ = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "angle", {get:function() {
    return this.elementAngle;
  }, set:function(y) {
    this.elementAngle = y;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "name", {get:function() {
    return this.elementName;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "id", {get:function() {
    return this.elementId;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "image", {get:function() {
    return this.elementImage;
  }});
  Object.defineProperty(creanvas.NodeJsElement.prototype, "events", {get:function() {
    return this.elementEvents;
  }});
})();
