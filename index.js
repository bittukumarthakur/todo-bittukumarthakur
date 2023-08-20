const setupTodo = (title) => {
  const taskList = new TaskList();
  const taskListView = new TaskListView(title);

  const taskListController = new controller(taskList, taskListView);
  taskListController.setup();
};

const todo = () => {
  const taskList = new TaskList("study");
  const taskLists = new TaskLists();
  taskLists.addTaskList(taskList);

  const task1 = new Task("buy milk");
  const task2 = new Task("buy tomato");
  taskLists.addTask("task-list-1", task1);
  taskLists.addTask("task-list-1", task2);

  taskLists.removeTask("task-list-1", "task-1");
  taskLists.toggleMark("task-list-1", "task-2");

  const data = taskLists.report();
  console.log(JSON.stringify(data));
};

const main = () => {
  setupTodo("Study");
  // setupTodo("work");

  todo();
};

window.onload = main;