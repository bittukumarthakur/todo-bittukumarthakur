const logger = (request, response, next) => {
  const { path, method } = request;
  console.log({ path, method });
  next();
};

module.exports = { logger };