class TaskListsController {
  #taskListsView;
  #todoService;

  constructor(taskListsView, todoService) {
    this.#taskListsView = taskListsView;
    this.#todoService = todoService;
  }

  #render() {
    this.#todoService.getTaskListsDetail((taskListsDetail) => {
      this.#taskListsView.render(taskListsDetail);
    });
  }

  #attachListeners() {
    this.#taskListsView.onclickAddTaskList((title) => {
      this.#todoService.addTaskList(title, () => this.#render());
    });

    this.#taskListsView.onclickAddTask((taskListId, taskDescription) => {
      this.#todoService.addTask(taskListId, taskDescription, () => this.#render());
    });

    this.#taskListsView.onclickToggleMark((taskListId, taskId) => {
      this.#todoService.toggleStatusMark(taskListId, taskId, () => this.#render());
    });

    this.#taskListsView.onclickRemoveTask((taskListId, taskId) => {
      this.#todoService.removeTask(taskListId, taskId, () => this.#render());
    });

    this.#taskListsView.onChangeSortMethod((taskListId, methodName) => {
      this.#todoService.changeSortMethod(taskListId, methodName, () => this.#render());
    });

    this.#taskListsView.onclickRemoveTaskList((taskListId) => {
      this.#todoService.removeTaskList(taskListId, () => this.#render());
    });
  }

  start() {
    this.#taskListsView.initialTemplate();
    this.#attachListeners();
    this.#render();
  }
};
