const express = require('express');
const router = express.Router(); // en lugar de "app = express()"
const {
   getPeople,
   createPerson,
   createPersonPostman,
   updatePerson,
   deletePerson,
} = require('../controllers/people');

// como en app.js tengo "app.use('/api/people', people);" => todas las rutas q se pidan empezando con '/api/people' las van a agarrar de acá, => x default, todas estas ya empiezan con '/api/people', X ESO EN LA RUTA QUITO ESTA PARTE Y  DEJO SOLO EL RESTO
// router.get('/', getPeople);
// router.post('/', createPerson);
// router.post('/postman', createPersonPostman);
// router.put('/:id', updatePerson);
// router.delete('/:id', deletePerson);

// otra forma de definir las rutas ( EL RESULTADO ES EL MISMO )
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
