const main = () => {
  const view = new TaskListView();
  const taskListsFormatter = new TaskListsFormatter();
  const todoService = new TodoService(taskListsFormatter);
  const controller = new TaskListsController(view, todoService);
  controller.start();
};

window.onload = main;