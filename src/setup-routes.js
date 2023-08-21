const fs = require("node:fs");
const { TaskList } = require("./task-list");

const MIME_TYPE = {
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  pdf: "application/pdf",
  css: "text/css",
  js: "text/javascript",
  json: "application/json"
};

const getContentHeaders = (extensionType) => ({ "Content-Type": MIME_TYPE[extensionType] });

const HEADERS = {
  html: getContentHeaders("html"),
  ico: getContentHeaders("ico"),
  jpg: getContentHeaders("jpg"),
  jpeg: getContentHeaders("jpeg"),
  gif: getContentHeaders("gif"),
  css: getContentHeaders("css"),
  js: getContentHeaders("js"),
  json: getContentHeaders("json"),
  pdf: { ...getContentHeaders("pdf"), "Content-Disposition": "attachment" }
};

const getHeaders = (filepath) => {
  const extension = filepath.split(".").at(-1);
  return HEADERS[extension];
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

const createTaskList = (request, response) => {
  const { taskLists } = request.context;
  const { title } = JSON.parse(request.body);
  const taskList = new TaskList(title);
  taskLists.addTaskList(taskList);

  response.writeHead(204);
  response.end();
};

const addTask = (request, response) => {
  const { todoData } = request.context;
  todoData.push(JSON.parse(request.body));
  response.writeHead(204);
  response.end();
};

const deleteTask = (request, response) => {
  const { todoData } = request.context;
  todoData.push(JSON.parse(request.body));
  response.writeHead(204);
  response.end();
};

const toggleTaskStatus = (request, response) => {
  const { todoData } = request.context;
  todoData.push(JSON.parse(request.body));
  response.writeHead(204);
  response.end();
};

const serveTaskListsDetail = (request, response) => {
  const { taskLists } = request.context;
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(taskLists.report()));
};

const setupRoutes = (router) => {
  router.fallback(defaultHandler);
  router.route("/", "GET", serveHomePage);
  router.route("/task-lists", "GET", serveTaskListsDetail);
  router.route("/task-lists", "POST", createTaskList);
  router.route("/task-lists/tasks", "POST", addTask);
  router.route("/task-lists/tasks", "DELETE", deleteTask);
  router.route("/task-lists/tasks", "PATCH", toggleTaskStatus);

};

module.exports = { setupRoutes };