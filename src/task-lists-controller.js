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
  }

  #attachListener() {
    this.#taskListsView.onclickAddTaskList((title) => {
      const taskList = new TaskList(title);
      this.#taskLists.addTaskList(taskList);
      this.render();
    });

    this.#taskListsView.onclickAddTask((taskListId, description) => {
      const task = new Task(description);
      this.#taskLists.addTask(taskListId, task);
      this.render();
    });

    this.#taskListsView.onclickToggleMark((taskListId, taskId) => {
      this.#taskLists.toggleMark(taskListId, taskId);
      this.render();
    });

    this.#taskListsView.onclickRemoveTask((taskListId, taskId) => {
      this.#taskLists.removeTask(taskListId, taskId);
      this.render();
    });

    this.#taskListsView.onChangeSortMethod((taskListId, methodName) => {
      this.#taskLists.sortBy(taskListId, methodName);
      console.log(taskListId, methodName);
      this.render();
    });
  }

  start() {
    this.#taskListsView.initialTemplate();
    this.#attachListener();
    this.render();
  }
};
