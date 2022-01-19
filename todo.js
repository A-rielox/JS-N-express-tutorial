//                         sin express
//=============================================================
const http = require('http');

// la callback-fcn se ejecuta cada q el user hits el server, acupa "res.write()" en lugar de "res.end()" q tambien jalaria, "res.write()" para pasar el body
const server = http.createServer((req, res) => {
   const url = req.url;
   // home page
   if (url === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>home page</h1>');
      res.end();
   }
   //about page
   else if (url === '/about') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write('<h1>about page</h1>');
      res.end();
   }
   // 404
   else {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write('<h1>page not found</h1>');
      res.end();
   }
});

server.listen(5000);

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////
