const express = require("express");

const {
  logger,
  serveTaskListsDetail,
  addTaskList,
  addTask,
  removeTask,
  removeTaskList,
  toggleTaskStatus,
} = require("./handlers");

const createTodoApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.get("/task-lists", serveTaskListsDetail);
  app.post("/task-lists", addTaskList);
  app.post("/task-lists/tasks", addTask);
  app.delete("/task-lists/tasks", removeTask);
  app.delete("/task-lists", removeTaskList);
  app.patch("/task-lists/tasks", toggleTaskStatus);
  app.use(express.static("resources"));

  return app;
};

module.exports = { createTodoApp };