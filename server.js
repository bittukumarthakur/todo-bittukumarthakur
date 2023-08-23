const fs = require("node:fs");
const { createTodoApp } = require("./src/todo-app");
const { TaskLists } = require("./src/task-lists.js");
const { TodoStorage } = require("./src/todo-storage.js");
const { TaskListController } = require("./src/task-lists-controller.js");

const PORT = 8000;

const main = () => {
  const todoStorage = new TodoStorage(fs);
  const taskLists = new TaskLists();
  const taskListController = new TaskListController(taskLists, todoStorage);
  taskLists.load(todoStorage.get());

  const app = createTodoApp();
  app.context = { taskListController };

  app.listen(PORT, () => console.log("Listening on port:", PORT));
};

main(); 