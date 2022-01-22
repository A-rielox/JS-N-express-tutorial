//
//                   Express router
//=============================================================
// refactorizando lo anterior para ocupar express router

const express = require('express');
const app = express();
const people = require('./routes/people'); // 👈
const auth = require('./routes/auth'); // 👈

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse form json
app.use(express.json());

// @@@@@@@@@@@@ RUTAS @@@@@@@@@@@@
// esto define el comienzo del path para todas las rutas de './routes/people'
// en people puse las rutas q empiezan con '/api/people'
// 👇 para ocupar 'people' en las rutas q empiezan con '/api/people'
app.use('/api/people', people);

app.use('/login', auth);

// @@@@@@@@@@ FIN RUTAS @@@@@@@@@@

app.listen(5000, () => {
   console.log('listening on port 5000...');
});
   