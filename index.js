
const http = require("http");
const art = require('./data');
const express = require("express");
const bodyParser = require("body-parser")

const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: false
}));

app.set('view engine', 'handlebars');

const displayArt = art.getAll();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submission

// Route handlers app.get()  app.post() error handlers app.use():

// send static file as response
app.get('/', (req, res) => {
  res.type('text/html');
  res.render('home', {art: displayArt});
 });
 
 // send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('This is the about page');
 });

 // send dynamic page response
 app.get('/detail', (req, res) => {
  const id = parseInt(req.query.id);
  const details = art.getDetail(id);
  res.render('detail', {id: id, details: details});
});

  // define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

 // Once defined, the web server can be started:
 app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });
 
// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   switch(path) {
//     case '/':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end("There are " + displayArt.length + " pieces of art for  my art pop-up: ");
//       break;
//     case '/about':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('About page:  Here is a little bit about me, I was born in Argentina, I have lived in Seattle for about 24 years and I am a designer');
//       break;
//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
//       break;
//     }
// }).listen(process.env.PORT || 3000);

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');
