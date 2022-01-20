// si el user pone un query-string => se autoriza, si no, nel prro
const authorize = (req, res, next) => {
   const { user } = req.query;

   if (user === 'arielox') {
      req.user = { name: 'arielox', id: 3 };
      // al crear la propiedad user en "req" => puedo acceder a ella en el resto de las rutas o donde quiera ( con req.user )
      next();
   } else {
      res.status(401).send('Unauthorized');
      // estoy mandando la respuesta y x lo tanto terminando el ciclo, x eso no necesito en next() al final
   }
};

module.exports = authorize;
