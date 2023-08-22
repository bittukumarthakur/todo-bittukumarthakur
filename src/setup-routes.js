const fs = require("node:fs");

const MIME_TYPE = {
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  css: "text/css",
  js: "text/javascript",
  json: "application/json"
};

const getContentHeaders = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const getHeaders = (filepath) => {
  const extension = filepath.split(".").at(-1);
  return getContentHeaders(extension);
};

const serveFile = (filepath, response) => {
  fs.readFile(filepath, (error, body) => {
    if (error) {
      response.statusCode = 404;
      response.end("Not Found");
      return;
    };

    response.writeHead(200, getHeaders(filepath));
    response.end(body);
  });
};

const defaultHandler = (request, response) => {
  const path = "./resources" + request.url;
  serveFile(path, response);
};

const serveHomePage = (request, response) => {
  const { config: { PATHS } } = request.context;
  serveFile(PATHS.HOME_PAGE, response);
};

const addTaskList = (request, response) => {
  const { taskListController } = request.context;
  const { title } = JSON.parse(request.body);
  taskListController.addTaskList(title);

  response.writeHead(204);
  response.end();
};

const addTask = (request, response) => {
  const { taskListController } = request.context;
  const { taskListId, taskDescription } = JSON.parse(request.body);
  taskListController.addTask(taskListId, taskDescription);

  response.writeHead(204);
  response.end();
};

const removeTask = (request, response) => {
  const { taskListController } = request.context;
  const { taskListId, taskId } = JSON.parse(request.body);
  taskListController.removeTask(taskListId, taskId);

  response.writeHead(204);
  response.end();
};

const toggleTaskStatus = (request, response) => {
  const { taskListController } = request.context;
  const { taskListId, taskId } = JSON.parse(request.body);
  taskListController.toggleStatusMark(taskListId, taskId);

  response.writeHead(204);
  response.end();
};

const removeTaskList = (request, response) => {
  const { taskListController } = request.context;
  const { taskListId } = JSON.parse(request.body);
  taskListController.removeTaskList(taskListId);

  response.writeHead(204);
  response.end();
};

const serveTaskListsDetail = (request, response) => {
  const { taskListController } = request.context;
  response.writeHead(200, { "Content-Type": "application/json" });
  const taskListsDetail = taskListController.getTaskListsDetail();
  response.end(JSON.stringify(taskListsDetail));
};

const setupRoutes = (router) => {
  router.fallback(defaultHandler);
  router.route("/", "GET", serveHomePage);
  router.route("/task-lists", "GET", serveTaskListsDetail);
  router.route("/task-lists", "POST", addTaskList);
  router.route("/task-lists/tasks", "POST", addTask);
  router.route("/task-lists/tasks", "DELETE", removeTask);
  router.route("/task-lists/tasks", "PATCH", toggleTaskStatus);
  router.route("/task-lists", "DELETE", removeTaskList);
};

module.exports = { setupRoutes };