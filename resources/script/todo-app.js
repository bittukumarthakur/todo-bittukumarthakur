const main = () => {
  const tasklists = new TaskLists();
  const view = new TaskListView();
  const todoStorage = new TodoStorage();
  const todoService = new TodoService(tasklists, todoStorage);
  const controller = new TaskListsController(view, todoService);
  controller.start();
};

window.onload = main;