const main = () => {
  const todo = new TaskLists();
  const view = new TaskListView();
  const controller = new TaskListsController(todo, view);
  controller.start();
};

window.onload = main;