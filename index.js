const setupTodo = (title) => {
  const taskList = new TaskList();
  const taskListView = new TaskListView(title);
  const taskListController = new TaskLists(taskList, taskListView);
  taskListController.start();
};

const main = () => {
  setupTodo("Study");
  // setupTodo("work");
};

window.onload = main;