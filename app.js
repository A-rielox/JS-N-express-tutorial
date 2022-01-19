const express = require('express');
const path = require('path');
const app = express();

// para q agarre todos los recursos q pide index.html de la carpeta public ( el archivo .css, .js, y el logo )
// static hace referencia a archivos q el server no tiene q modificar
app.use(express.static('./public'));

// como index.html tambien es static, se suele poner tambien en la carpeta public y no hacerlo de esta manera, sino q se aprovecha el hecho de q por default al hacer un get a '/' se pasa el archivo 'index.html' q este en public. y no se necesita poner un app.get('/',...)
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
