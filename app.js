//
//                 multiple middleware fcns
//=============================================================

const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

// ⭐⭐ para ocupar todos los middlewares en todas las rutas ( se colocan en un array ), SE EJECUTAN EN EL ORDEN EN Q SE PONEN EN EL ARRAY
app.use([logger, authorize]);

app.get('/', (req, res) => {
   res.send('Home');
});

app.get('/about', (req, res) => {
   console.log(req.user);
   res.send('About');
});

app.listen(5000, () => {
   console.log('listening on port 5000...');
});
