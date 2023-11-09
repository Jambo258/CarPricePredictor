const unknownRoute = (req, res, next) => {
  res.status(404).send({ error: "Unknown Route" });
  next();
};

const loggerMiddleware = (req, res, next) => {
  const date = new Date().toLocaleString();
  console.log({
    date: date,
    method: req.method,
    originalUrl: req.originalUrl,
    reqBody: req.body,
  });
  next();
};


export default {unknownRoute, loggerMiddleware}
