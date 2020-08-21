
const http = require("http");
//const art = require('./data');
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const Art = require('./models/arts');
const babel = require("@babel/core")



const app = express();

//set template engine
const handlebars = require('express-handlebars');
app.engine(".html", handlebars({extname: ".html", defaultLayout: false}));
app.set('view engine', 'html'); 



// configure express app
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // set location for static files

//to tell your server (using body parser) that you're sending information as if it was coming from a form
app.use(bodyParser.urlencoded({extended: true})); // parse form submission

//to tell your server (using body parser) that you're sending information in json
app.use(bodyParser.json());

app.use('/api', require("cors")());

app.use((err, req, res, next) => {
  console.log(err);
});

// Route handlers app.get()  app.post() error handlers app.use():

// send static file as response

// get a single item (REST api assignment)

app.get('/api/getItem', (req, res, next) => {
  const id = req.query.id;
  return Art.findOne({"_id": id.toObjectId()}).lean()
    .then((details) => {
      console.log(details)
        res.send(details);
    })
    .catch(err => next(err));
});

// get all items (REST api assignment)

app.get('/api/getAllItems', (req, res, next) => {
  return Art.find({}).lean()
    .then((arts) => {
      console.log(arts)
        res.send(arts);
    })
    .catch(err => next(err));
});

// delete item (REST api assignment)

app.get('/api/deleteItem', (req, res) => {
  const id = req.query.id;
  return Art.deleteOne({"_id": id.toObjectId()}).lean()
    .then((result) => {
      console.log(result)
      if (result.deletedCount === 1) {
      res.sendStatus(204).send();
      } else {
        res.sendStatus(400).send('Invalid ID Parameter');
      }
    })
    .catch(err => next(err));
 });

// update item (week 7/8 extra credit)

app.post('/api/updateItem', (req, res) => {
  const updatedItem = req.body;
  return Art.findByIdAndUpdate(updatedItem._id.toObjectId(), {"title": updatedItem.title, "artist": updatedItem.artist, "year": updatedItem.year, "materials": updatedItem.materials} )
    .then((result) => {
      console.log(result)
      if (result.title !== undefined) {
        res.send(result);
      } else {
        res.sendStatus(400).send('Item not added');
      }
    })
    .catch(err => next(err));
 });

// add item (REST api assignment)

 app.post('/api/addItem', (req, res, next) => {
  console.log(req.body)
  const newItem = req.body
  return Art.create({"title": newItem.title, "artist": newItem.artist, "year": newItem.year, "materials": newItem.materials})
    .then((result) => {
      console.log(result)
      if (result.title === newItem.title) {
      res.send('Item added');
      } else {
        res.sendStatus(400).send('Item not added');
      }
    })
    .catch(err => next(err));
 });
 
/* app.get('/', (req, res, next) => {
  Art.find((err, arts) => {
    if (err) return next (err);
    res.render('home_react', {art: JSON.stringify(arts)})
  })
    
}); */

 app.get('/', (req, res, next) => {
  return Art.find({}).lean()
    .then((arts) => {
      console.log(arts)
        res.render('home_react', { arts: JSON.stringify(arts) });
    })
    .catch(err => next(err));
}); 

String.prototype.toObjectId = function() {  var ObjectId = (require('mongoose').Types.ObjectId);  return new ObjectId(this.toString());};

app.get('/detail', (req, res, next) => {
  const id = req.query.id;
  return Art.findOne({"_id": id.toObjectId()}).lean()
    .then((details) => {
      console.log(details)
        res.render('detail', { id: id, details: details });
    })
    .catch(err => next(err));
});

app.get('/delete', (req, res) => {
  const id = req.query.id;
  return Art.deleteOne({"_id": id.toObjectId()}).lean()
    .then((result) => {
      console.log(result)
      if (result.deletedCount === 1) {
      res.send('Art item with ID ' + id + ' deleted');
      } else {
        res.send('No item with ID ' + id + ' available to delete')
      }
    })
    .catch(err => next(err));
 });
 
 // send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('This is the about page');
 });

//  // send dynamic page response
//  app.get('/detail', (req, res) => {
//   const id = parseInt(req.query.id);
//   const details = art.getDetail(id);
//   res.render('detail', {id: id, details: details});
// });

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
