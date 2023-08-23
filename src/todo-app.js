const express = require("express");
const app = express();

const addTaskList = (request, response) => {
  const { taskListController } = request.app.context;
  const { title } = request.body;
  taskListController.addTaskList(title);

  response.status(204);
  response.end();
};

const addTask = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskDescription } = request.body;
  taskListController.addTask(taskListId, taskDescription);

  response.status(204);
  response.end();
};

const removeTask = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskId } = request.body;
  taskListController.removeTask(taskListId, taskId);

  response.status(204);
  response.end();
};

const toggleTaskStatus = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskId } = request.body;
  taskListController.toggleStatusMark(taskListId, taskId);

  response.status(204);
  response.end();
};

const removeTaskList = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId } = request.body;
  taskListController.removeTaskList(taskListId);

  response.status(204);
  response.end();
};

const serveTaskListsDetail = (request, response) => {
  const { taskListController } = request.app.context;
  const taskListsDetail = taskListController.getTaskListsDetail();

  response.send(taskListsDetail);
};

app.use(express.json());
app.get("/task-lists", serveTaskListsDetail);
app.post("/task-lists", addTaskList);
app.post("/task-lists/tasks", addTask);
app.delete("/task-lists/tasks", removeTask);
app.delete("/task-lists", removeTaskList);
app.patch("/task-lists/tasks", toggleTaskStatus);
app.use(express.static("resources"));

module.exports = { app };