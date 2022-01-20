// hay q poner el next, para pasar al sig middleware, a no ser q se termine el ciclo mandando la response

const logger = (req, res, next) => {
   const method = req.method;
   const url = req.url;
   const time = new Date().getFullYear();
   console.log(method, url, time);

   next();
};

module.exports = logger;
