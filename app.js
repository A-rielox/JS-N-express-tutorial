//
//                   otto ( ejemplo )
//                 PUT - DELETE + postman
//=============================================================

/*
const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parse form data 💠
app.use(express.urlencoded({ extended: false }));

// parse form json 💥
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

// probando postman
app.post('/api/postman/people', (req, res) => {
   const { name } = req.body;

   if (!name) {
      return res.status(400).json({
         success: false,
         msg: 'please provide a name value',
      });
   }

   res.status(201).json({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
   console.log(req.body); // { name: 'hola' }
   const { name } = req.body;

   if (name) {
      return res.status(200).send(`Welcome ${name} `);
   }

   res.status(401).send('Please Provide Credentials');
});

// 📌 PUT para modificar
// la convención es hacerlo con un route parameters
// recordar el req.params se saca altiro, el req.body hay q usar 💠 ó 💥 de arriba
app.put('/api/people/:id', (req, res) => {
   const { id } = req.params;
   const { name } = req.body;

   const person = people.find(person => person.id === Number(id));

   if (!person) {
      return res.status(404).json({
         success: false,
         msg: `We could not find any person with id: ${id}`,
      });
   }

   const newPerson = people.map(person => {
      if (person.id === Number(id)) {
         person.name = name;
      }
      return person;
   });

   res.status(200).json({ success: true, data: newPerson });
});

// 📌 DELETE la misma convencion q con PUT y el setup es muy similar, pero no se espera algo en el body
app.delete('/api/people/:id', (req, res) => {
   const person = people.find(person => person.id === Number(req.params.id));

   if (!person) {
      return res.status(404).json({
         success: false,
         msg: `We could not find any person with id: ${req.params.id}`,
      });
   }

   const newPeople = people.filter(
      person => person.id !== Number(req.params.id)
   );
   return res.status(200).json({ success: true, data: newPeople });
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
//
// 💠
// para tener acceso a la data de la form
// ⭐⭐ hace parse a la data y la pone en "req.body"
// => donde se hace el POST request, voy a encontrar la data en req.body
// { extended: false } un parametro para el método de parse, q ya practicamente todos ocupan este
*/

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
