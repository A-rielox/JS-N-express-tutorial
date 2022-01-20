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
//               sirviendo lo q tengo en /public
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

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//                         API q entrega data
//=============================================================
const express = require('express');
const app = express();

const { products } = require('./data');

app.get('/', (req, res) => {
   res.json(products);
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//            limitando lo q se manda de los products
//=============================================================
const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
   res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});
app.get('/api/products', (req, res) => {
   // dejando fuera la descripcion y precio
   const newProducts = products.map(product => {
      const { id, name, image } = product;

      return { id, name, image };
   });

   res.json(newProducts);
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//     route parameters ( manda un producto en específico )
//=============================================================
const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
   res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

// dejando fuera la descripcion y precio
app.get('/api/products', (req, res) => {
   const newProducts = products.map(product => {
      const { id, name, image } = product;

      return { id, name, image };
   });

   res.json(newProducts);
});

// filtrando por producto
app.get('/api/products/:productID', (req, res) => {
   console.log(req.params); // { productID: '1' }
   const { productID: id } = req.params;

   const singleProduct = products.find(product => {
      return product.id === Number(id);
   });

   // x si ingresan una id q no tiene sentido
   if (!singleProduct) {
      return res.status(404).send('Product not found');
   }

   return res.json(singleProduct);
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

// en el url paso "http://localhost:5000/api/products/1"
// en req.params esta "{ productID: '1' }"

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//          query string params o url params
//=============================================================
const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
   res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

// dejando fuera la descripcion y precio
app.get('/api/products', (req, res) => {
   const newProducts = products.map(product => {
      const { id, name, image } = product;

      return { id, name, image };
   });

   res.json(newProducts);
});

// filtrando por producto
app.get('/api/products/:productID', (req, res) => {
   console.log(req.params); // { productID: '1' }
   const { productID: id } = req.params;

   const singleProduct = products.find(product => {
      return product.id === Number(id);
   });

   // x si ingresan una id q no tiene sentido
   if (!singleProduct) {
      return res.status(404).send('Product not found');
   }

   return res.json(singleProduct);
});

//                                     👇
// meto http://localhost:5000/api/v1/query?search=a&limit=2
app.get('/api/v1/query', (req, res) => {
   console.log(req.query); // { search: 'a', limit: '2' }
   const { search, limit } = req.query;

   let sortedProducts = [...products];
   if (search) {
      sortedProducts = sortedProducts.filter(product => {
         return product.name.startsWith(search);
      });
   }
   if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit));
   }
   // si el filtro devuelve nada ( como prod q empieze con x )
   if (sortedProducts.length < 1) {
      return res.status(200).send('No products matched your search');
   }

   return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

//
//                         middleware
//=============================================================
const express = require('express');
const app = express();

// req => middleware => res

// hay q poner el next, para pasar al sig middleware, a no ser q se termine el ciclo mandando la response
//      👇
const logger = (req, res, next) => {
   const method = req.method;
   const url = req.url;
   const time = new Date().getFullYear();
   console.log(method, url, time);

   next();
};

// se pone como  2do param y express le pasa el 'req', 'res' y 'next', de cada lado donde se cupa
//            👇
app.get('/', logger, (req, res) => {
   res.send('Home');
});

app.get('/about', logger, (req, res) => {
   res.send('About');
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////

// middleware en otro archivo y ocupandolo en todas las rutas
// ===============--> logger.js

const logger = (req, res, next) => {
   const method = req.method;
   const url = req.url;
   const time = new Date().getFullYear();
   console.log(method, url, time);

   next();
};

module.exports = logger;

// ===============--> app.js
const express = require('express');
const app = express();
const logger = require('./logger');

// para q se ocupe el logger en todas las rutas
app.use(logger);
// si se le pasa una ruta
// app.use('/api',logger);
// entonces solo se va a aplicar a las q empiecen así

app.get('/', (req, res) => {
   res.send('Home');
});

app.get('/about', (req, res) => {
   res.send('About');
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

/////////////////////////////    /////////////////////////////
//               ////////////////////////////               //
///////////////////////////// 🍑 /////////////////////////////
//               ////////////////////////////               //
/////////////////////////////    /////////////////////////////
