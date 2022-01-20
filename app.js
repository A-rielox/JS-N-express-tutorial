//
//                         middleware
//=============================================================
// middleware en otro archivo y ocupandolo en todas las rutas

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
