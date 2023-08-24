const express = require("express");
const { logger } = require("./middleware/logger");

const {
  addTask,
  removeTask,
  addTaskList,
  removeTaskList,
  toggleTaskStatus,
  serveTaskListsDetail,
} = require("./routes/routes");

const createTodoApp = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());

  app.get("/task-lists", serveTaskListsDetail);
  app.post("/task-lists", addTaskList);
  app.delete("/task-lists", removeTaskList);

  app.post("/task-lists/tasks", addTask);
  app.patch("/task-lists/tasks", toggleTaskStatus);
  app.delete("/task-lists/tasks", removeTask);

  app.use(express.static("public"));
  return app;
};

module.exports = { createTodoApp };