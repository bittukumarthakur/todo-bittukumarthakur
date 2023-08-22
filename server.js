const http = require("node:http");
const fs = require("node:fs");
const { Router } = require("./src/router.js");
const { setupRoutes } = require("./src/setup-routes.js");
const { TaskLists } = require("./src/task-lists.js");
const { TodoStorage } = require("./src/todo-storage.js");

const PORT = 8000;
const logger = ({ url, method }) => console.log({ url, method });

const config = {
  PATHS: {
    HOME_PAGE: "./resources/page/index.html",
  }
};

const main = () => {
  const router = new Router();
  setupRoutes(router);
  const todoStorage = new TodoStorage(fs);
  const taskLists = new TaskLists();
  taskLists.load(todoStorage.get());

  const server = http.createServer((request, response) => {
    logger(request);
    request.context = { config, todoStorage, taskLists };
    router.handle(request, response);
  });

  server.listen(PORT, () => {
    console.log("Listening on:", PORT);
  });
};

main(); 