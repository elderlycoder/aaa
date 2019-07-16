let express = require('express');
let app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mysql = require('mysql');
const con = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'aaa'

});
require('./routes')(app, {}); // это маршрутизация из статьи на habr

app.use(express.static('public')); // ? заставляем express работать с папкой public
app.set('view engine', 'pug');
app.listen(3000, function () {
   console.log('express start');
});

 //app.get('/', function(req, res){
//    var sql = "SELECT * FROM `mark`";
//     con.query(sql,  
//       function(err, result){
//          if(err) throw err;
//          console.log(result);

//          // let middle = JSON.parse(JSON.stringify(result));
//          // let marks = {};
//          // for (let i=0; i < middle.length; i++ ){
//          //    marks[middle[i]['id']] = middle[i];
//          // }
//          //console.log(marks);
//          res.render('main', {
//             foo: 4,
//             bar: 7,
//             marks: JSON.parse(JSON.stringify(result))
//          });

//       });
//  });

// con.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
// });
// app.get('/', function(req, res){
//       var sql = "INSERT INTO `mark` (`mark`) VALUES ( 'Test8' )";
//       con.query(sql,  function(err, result){
//       if(err) throw err;
//       console.log('Запись сделана');
//       });
//       res.send('555555');
//    });

// код для вывода списка сервисов
app.get('/services', function (req, res) { //путь в адресной строке 
   console.log(req.query);
   var sql = "SELECT * FROM `service`";
   con.query(sql,
      function (err, result) {
         if (err) throw err;
         console.log(result);

      res.render('services', { // название страницы в pug
            foo: 4,
            bar: 7,
            services: JSON.parse(JSON.stringify(result))
      });
   });
});
app.get("/addservice", function(req, res){ // при обращении по адресу /addservice
   res.render("addservice");  // Вывод шаблона представления
});

app.post("/addservice", urlencodedParser, function (req, res) {
         
   if(!req.body) return res.sendStatus(400);
   const name = req.body.name;
   const city = req.body.city;
   const adress = req.body.adress;
   const rezhim = req.body.rezhim;
   const email = req.body.email;
   const oper = req.body.raboty;
   console.log(req.body);
   // function getCheckedCheckBoxes() {
   //    let checkboxes = req.body.querySelectorAll('#raboty');
   //    let checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
   //    for (var i = 0; i < checkboxes.length; i++) {
   //       if (checkboxes[i].checked) {
   //          checkboxesChecked.push(checkboxes[i].value); // положим в массив выбранный
   //          alert(checkboxes[i].value); // делайте что нужно - это для наглядности
   //       }
   //    }
   //    return checkboxesChecked; // для использования в нужном месте
   //  }
   //  getCheckedCheckBoxes();
   // console.log(checkboxesChecked);
   
   con.query("INSERT INTO service (name, city, adress, rezhim, email, oper) VALUES (?,?,?,?,?,?)", [name, city, adress, rezhim, email, oper], function(err, data) {
     if(err) return console.log(err);
     res.redirect("/addservice"); // позже сменить адрес на страницу "поздрадляем, в письме ссылка для доступа в личный кабинет"
   });
});
// список предлагаемых услуг
app.get("/raboty", function(req, res){ // при обращении по адресу /addservice
   res.render("raboty");  // Вывод шаблона представления
});
// подключение страницы с описанием конкретной услуги
app.get("/raboty/diagnostika-toplivnoy-sistemy", function(req, res){ 
   res.render("raboty/diagnostika-toplivnoy-sistemy");
});