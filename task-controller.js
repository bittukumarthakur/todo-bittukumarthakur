class taskController {
  #taskList;
  #taskListView;

  constructor(taskList, taskListView) {
    this.#taskList = taskList;
    this.#taskListView = taskListView;
  }

  #addTask(description) {
    this.#taskList.addTask(description);
  }

  render() {
    const tasksDetail = taskList.report();
    this.#taskListView.render(tasksDetail);
  }

  start() {
    
  }
}