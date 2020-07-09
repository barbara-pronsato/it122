
const http = require("http");
const art = require('./data');

const displayArt = art.getAll();
 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("There are " + displayArt.length + " pieces of art for  my art pop-up: ");
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page:  Here is a little bit about me, I was born in Argentina, I have lived in Seattle for about 24 years and I am a designer');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);

// Console will print the message
console.log('Server running at http://127.0.0.1:3000/');
