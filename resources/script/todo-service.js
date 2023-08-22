const request = (url, method, body, promise) => {
  const option = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  fetch(url, option).then(promise);
};

class TodoService {
  #taskLists;
  #todoStorage;

  constructor(tasklists, todoStorage) {
    this.#taskLists = tasklists;
    this.#todoStorage = todoStorage;
  }

  load() {
    const taskListsDetail = this.#todoStorage.getDetails();
    this.#taskLists.load(taskListsDetail);
  }

  saveTaskListsDetails() {
    this.#todoStorage.save(this.#taskLists.report());
  }

  addTaskList(title, render) {
    const taskList = new TaskList(title);
    this.#taskLists.addTaskList(taskList);
    this.saveTaskListsDetails();
    request("/task-lists", "POST", { title }, render);
  }

  addTask(taskListId, taskDescription, render) {
    const task = new Task(taskDescription);
    this.#taskLists.addTask(taskListId, task);
    this.saveTaskListsDetails();
    request("/task-lists/tasks", "POST", { taskListId, taskDescription }, render);
  }

  toggleStatusMark(taskListId, taskId, render) {
    this.#taskLists.toggleMark(taskListId, taskId);
    this.saveTaskListsDetails();
    request("/task-lists/tasks", "PATCH", { taskListId, taskId }, render);
  }

  removeTask(taskListId, taskId, render) {
    this.#taskLists.removeTask(taskListId, taskId);
    this.saveTaskListsDetails();
    request("/task-lists/tasks", "DELETE", { taskListId, taskId }, render);
  }

  changeSortMethod(taskListId, methodName, render) {
    this.#taskLists.sortBy(taskListId, methodName);
    this.saveTaskListsDetails();
    render();
    request("/task-lists", "PATCH", { taskListId, methodName }, render);
  }

  removeTaskList(taskListId, render) {
    this.#taskLists.removeTaskList(taskListId);
    this.saveTaskListsDetails();
    render();
    // request("/task-lists", "DELETE", { taskListId }, render);
  }

  getAll() {
    return this.#taskLists.report();
  }

}
