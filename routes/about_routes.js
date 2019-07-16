module.exports = function(app, db) {
   app.get('/about', (req, res) => {
     // Здесь будем создавать заметку.
     res.send('Hello about');
   });
 };