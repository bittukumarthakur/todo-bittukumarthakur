const http = require("node:http");
const { Router } = require("./src/router");
const { setupRoutes } = require("./src/setup-routes.js");

const PORT = 8000;
const logger = ({ url, method }) => console.log({ url, method });

const config = {
  PATHS: {
    HOME_PAGE: "./index.html",
  }
};

const main = () => {
  const router = new Router();
  setupRoutes(router);

  const server = http.createServer((request, response) => {
    logger(request);
    request.context = { config };
    router.handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 