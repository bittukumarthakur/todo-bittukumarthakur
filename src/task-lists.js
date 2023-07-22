class TaskLists {
  #taskList;
  #taskListView;
  #taskLists;
  #taskListCount;

  constructor(taskList, taskListView) {
    this.#taskList = taskList;
    this.#taskListView = taskListView;
    this.#taskLists = [];
    this.#taskListCount = 0;
  }

  #generateId() {
    this.#taskListCount++;
    const prefix = "task-list";
    return `${prefix}-${this.#taskListCount}`;
  }

  addTaskList(taskList) {
    const id = this.#generateId();
  }

  render() {
    const tasksDetail = this.#taskList.report();
    this.#taskListView.render(tasksDetail);
  }

  start() {
    this.#taskListView.createInitialTemplate();

    this.#taskListView.onclickAdd((description) => {
      const task = new Task(description);
      this.#taskList.addTask(task);
      this.render();
    });

    this.#taskListView.onclickTask((event) => {
      const taskElement = event.target;
      this.#taskList.toggleMark(taskElement.id);
      this.render();
    });

    this.#taskListView.onChangeSortMethod((event) => {
      const methodName = event.target.value;
      this.#taskList.sortBy(methodName);
      this.render();
    });

    this.#taskListView.onclickRemove((taskId) => {
      this.#taskList.removeTask(taskId);
      this.render();
    });
  }
};
