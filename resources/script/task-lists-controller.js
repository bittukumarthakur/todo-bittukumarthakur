class TaskListsController {
  #taskLists;
  #taskListsView;
  #todoStorage;

  constructor(taskLists, taskListsView, todoStorage) {
    this.#taskLists = taskLists;
    this.#taskListsView = taskListsView;
    this.#todoStorage = todoStorage;
  }

  #fetchTodoDetails() {
    const option = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListTitle: title })
    };

    fetch("/task-lists", option);
  }

  render() {
    const taskListsDetail = this.#taskLists.report();
    this.#taskListsView.render(taskListsDetail);
    this.#todoStorage.save(taskListsDetail);
  }

  #attachListener() {
    this.#taskListsView.onclickAddTaskList((title) => {
      const taskList = new TaskList(title);
      this.#taskLists.addTaskList(taskList);
      this.render();

      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListTitle: title })
      };

      fetch("/task-lists", option);
    });

    this.#taskListsView.onclickAddTask((taskListId, taskDescription) => {
      const task = new Task(taskDescription);
      this.#taskLists.addTask(taskListId, task);
      this.render();

      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListId, taskDescription })
      };

      fetch("/task-lists/tasks", option);
    });

    this.#taskListsView.onclickToggleMark((taskListId, taskId) => {
      this.#taskLists.toggleMark(taskListId, taskId);
      this.render();

      const option = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListId, taskId })
      };

      fetch("/task-lists/tasks", option);
    });

    this.#taskListsView.onclickRemoveTask((taskListId, taskId) => {
      this.#taskLists.removeTask(taskListId, taskId);
      this.render();

      const option = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListId, taskId })
      };

      fetch("/task-lists/tasks", option);
    });

    this.#taskListsView.onChangeSortMethod((taskListId, methodName) => {
      this.#taskLists.sortBy(taskListId, methodName);
      this.render();

      const option = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListId, methodName })
      };

      fetch("/task-lists", option);
    });

    this.#taskListsView.onclickRemoveTaskList((taskListId) => {
      this.#taskLists.removeTaskList(taskListId);
      this.render();

      const option = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskListId })
      };

      fetch("/task-lists", option);
    });
  }

  loadTaskLists(taskListsDetail) {
    this.#taskLists.load(taskListsDetail);
  }

  start() {
    this.loadTaskLists(this.#todoStorage.getDetails());
    this.#taskListsView.initialTemplate();
    this.#attachListener();
    this.render();
  }
};
