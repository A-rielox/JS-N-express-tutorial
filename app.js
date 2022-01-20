//
//                 ejemplo
//=============================================================

const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data 💠
app.use(express.urlencoded({ extended: false }));

app.get('/api/people', (req, res) => {
   res.status(200).json({ success: true, data: people });
});

app.post('/login', (req, res) => {
   console.log(req.body); // { name: 'hola' }
   const { name } = req.body;

   if (name) {
      return res.status(200).send(`Welcome ${name} `);
   }

   res.status(401).send('Please Provide Credentials');
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});

// 💠
// para tener acceso a la data de la form
// ⭐⭐ hace parse a la data y la pone en "req.body"
// => donde se hace el POST request, voy a encontrar la data en req.body
// { extended: false } un parametro para el método de parse, q ya practicamente todos ocupan este
