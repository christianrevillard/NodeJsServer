var clientFileHandler = require("./clientFileHandler");

var addDefaultRoutes = function (routes) {
  
  var defaultRoute = routes.filter(function (route) { return route.route === '*' ;});
  
  return routes
  .filter(function (route) { return route.route !== '*'; })
  .concat(
    { route: '*/Client/*', handler: clientFileHandler()},
    { route: '/temp/*', handler: clientFileHandler() },
    { route: '/', handler: clientFileHandler('./Client/index.html') }
  )
  .concat(defaultRoute)
  .concat({ route: '*', handler: require("./pageNotFoundHandler") });
};;

exports.addDefaultRoutes = addDefaultRoutes;