//
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

//
//                         con express
//=============================================================
const express = require('express');
const app = express(); // equivale a crear el server

// la callback-fcn se ejecuta cada q el user haga un GET request a '/'
app.get('/', (req, res) => {
   console.log('user hit the resource');
   res.status(200).send('Home Page');
});

app.get('/about', (req, res) => {
   res.status(200).send('About Page');
});

app.all('*', (req, res) => {
   res.status(404).send('<h1>resource not found</h1>');
});

//la callback-fcn se ejecuta cuando se instancia el servidor
app.listen(5000, () => {
   console.log('server is listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//                         sirviendo lo q tengo en /public
//=============================================================
const express = require('express');
const app = express();
const path = require('path');

// para q agarre todos los recursos q pide index.html de la carpeta public ( el archivo .css, .js, y el logo )
// static hace referencia a archivos q el server no tiene q modificar
app.use(express.static('./public'));

// ⭐⭐ como index.html tambien es static, se suele poner tambien en la carpeta public y no hacerlo de esta manera, sino q se aprovecha el hecho de q por default al hacer un get a '/' se pasa el archivo 'index.html' q este en public. y no se necesita poner un app.get('/',...)
// app.get('/', (req, res) => {
//    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// });

app.all('*', (req, res) => {
   res.status(404).send('resource not found');
});

app.listen(5000, () => {
   console.log('server is listening on port 5000...');
});

// __dirname -> da el path absoluto al lugar donde está ocupado
// el resolve va a juntar todas las partes y escribe el path usando el separador del sistema
