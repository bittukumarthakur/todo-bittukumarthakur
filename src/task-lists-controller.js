class TaskListsController {
  #taskLists;
  #taskListsView;

  constructor(taskLists, taskListsView) {
    this.#taskLists = taskLists;
    this.#taskListsView = taskListsView;
  }

  render() {
    const taskListsDetail = this.#taskLists.report();
    this.#taskListsView.render(taskListsDetail);
    console.log(taskListsDetail);
  }

  attachListener(taskList) {

    this.#taskListsView.onclickAdd((description) => {
      const task = new Task(description);
      taskList.addTask(task);
      this.render();
    });

    this.#taskListsView.onclickTask((event) => {
      const taskElement = event.target;
      taskList.toggleMark(taskElement.id);
      this.render();
    });

    this.#taskListsView.onChangeSortMethod((event) => {
      const methodName = event.target.value;
      taskList.sortBy(methodName);
      this.render();
    });

    this.#taskListsView.onclickRemove((taskId) => {
      taskList.removeTask(taskId);
      this.render();
    });
  }

  addTasklist() {
    const taskList = new TaskList();
    this.#taskLists.addTask(taskList);
    this.attachListener(taskList);
    this.render();
  };

  start() {
    this.#taskListsView.createInitialTemplate();
    this.render();
  }

};
