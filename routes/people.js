const express = require('express');
const router = express.Router(); // en lugar de "app = express()"

let { people } = require('../data');

// como en app.js tengo "app.use('/api/people', people);" => todas las rutas q se pidan empezando con '/api/people' las van a agarrar de acá, => x default, todas estas ya empiezan con '/api/people', X ESO EN LA RUTA QUITO ESTA PARTE Y  DEJO SOLO EL RESTO
router.get('/', (req, res) => {
   res.status(200).json({ success: true, data: people });
});

router.post('/', (req, res) => {
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

router.post('/postman', (req, res) => {
   const { name } = req.body;

   if (!name) {
      return res.status(400).json({
         success: false,
         msg: 'please provide a name value',
      });
   }

   res.status(201).json({ success: true, data: [...people, name] });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;
