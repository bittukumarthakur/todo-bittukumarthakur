class TodoService {
  #taskLists;
  #todoStorage;

  constructor(tasklists, todoStorage) {
    this.#taskLists = tasklists;
    this.#todoStorage = todoStorage;
  }

  load() {
    this.#taskLists.load(this.#todoStorage.getDetails());
  }

  saveTaskListsDetails() {
    this.#todoStorage.save(this.#taskLists.report());
  }

  addTaskList(title) {
    const taskList = new TaskList(title);
    this.#taskLists.addTaskList(taskList);
    this.saveTaskListsDetails();

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    };

    fetch("/task-lists/tasks", option);
  }

  addTask(taskListId, taskDescription) {
    const task = new Task(taskDescription);
    this.#taskLists.addTask(taskListId, task);
    this.saveTaskListsDetails();

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListId, taskDescription })
    };

    fetch("/task-lists/tasks", option);
  }

  toggleStatusMark(taskListId, taskId) {
    this.#taskLists.toggleMark(taskListId, taskId);
    this.saveTaskListsDetails();

    const option = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListId, taskId })
    };

    fetch("/task-lists/tasks", option);
  }

  removeTask(taskListId, taskId) {
    this.#taskLists.removeTask(taskListId, taskId);
    this.saveTaskListsDetails();

    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListId, taskId })
    };

    fetch("/task-lists/tasks", option);
  }

  changeSortMethod(taskListId, methodName) {
    this.#taskLists.sortBy(taskListId, methodName);
    this.saveTaskListsDetails();

    const option = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListId, methodName })
    };

    fetch("/task-lists", option);
  }

  removeTaskList(taskListId) {
    this.#taskLists.removeTaskList(taskListId);
    this.saveTaskListsDetails();

    const option = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskListId })
    };

    fetch("/task-lists", option);
  }

  getAll() {
    return this.#taskLists.report();
  }

}