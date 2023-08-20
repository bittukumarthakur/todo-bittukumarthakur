const main = () => {
  const todo = new TaskLists();
  const view = new TaskListView();
  const todoStorage = new TodoStorage();
  const controller = new TaskListsController(todo, view, todoStorage);
  controller.start();
};

window.onload = main;