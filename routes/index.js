const aboutRoutes = require('./about_routes');
module.exports = function(app, db) {
  aboutRoutes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};