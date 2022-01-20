//
//                   otto ( ejemplo )
//=============================================================

const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data 💠
app.use(express.urlencoded({ extended: false }));

// parse json 💥
app.use(express.json());

app.get('/api/people', (req, res) => {
   res.status(200).json({ success: true, data: people });
});

//   👇
app.post('/api/people', (req, res) => {
   const { name } = req.body;
   console.log(req.body); // { name: 'pepi' }

   if (!name) {
      return res.status(400).json({
         success: false,
         msg: 'please provide name value',
      });
   }

   res.status(201).json({ success: true, person: name });
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

// 💥
// en este caso, información de la form se maneja con javascript y el "Content-Type: application/json;charset=UTF-8" en el Request Headers es json, x eso, para acceder a la info (( igual q hicimos en 💠, donde la form se manejava directo con el html y el content-type era "Content-Type: application/x-www-form-urlencoded" )) tenemos q correr este para meter la info en el "req.body"

// EN RESUMEN:
// PARA METER EN EL REQ.BODY LA INFO DE LA FORM:
//    SI SE MANDA DIRECTO CON EL HTML DE LA FORM:
//       HAY Q USAR "app.use(express.urlencoded({ extended: false }));" 💠
//
//    SI SE MANEJA CON JAVASCRIPT:
//       "app.use(express.json());" 💥

// 💠
// para tener acceso a la data de la form
// ⭐⭐ hace parse a la data y la pone en "req.body"
// => donde se hace el POST request, voy a encontrar la data en req.body
// { extended: false } un parametro para el método de parse, q ya practicamente todos ocupan este
