'use strict;'

var server = require("./creServer/server");
var resourceFileHandler = require("./creServer/resourceFileHandler");
var addDefaultHandlers = require('./creServer/defaultHandlers').addDefaultHandlers;

exports.server = server;
exports.fileHandler = resourceFileHandler;
exports.addDefaultHandlers = addDefaultHandlers;