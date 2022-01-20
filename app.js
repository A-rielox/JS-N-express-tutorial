//
//                         xxx
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
