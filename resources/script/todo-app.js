const main = () => {
  const view = new TaskListView();
  const todoService = new TodoService();
  const controller = new TaskListsController(view, todoService);
  controller.start();
};

window.onload = main;