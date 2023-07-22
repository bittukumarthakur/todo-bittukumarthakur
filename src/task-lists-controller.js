class TaskListsController {
  #taskListController;
  #taskListView;

  constructor(taskListController, taskListView) {
    this.#taskListController = taskListController;
    this.#taskListView = taskListView;
  }

  render() {
    const taskListDetails = this.#taskListController.report();
    this.#taskListView.render(taskListDetails);
    console.log(taskListDetails);
  }

  #attachListener(taskList) {
    // add onclick to taskList
  }

  start() {
    this.render();
  }

};
