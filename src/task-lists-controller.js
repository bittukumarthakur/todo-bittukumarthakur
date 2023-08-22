const { Task } = require("./task");
const { TaskList } = require("./task-list");

class TaskListController {
  #taskLists;
  #taskListsStorage;

  constructor(taskLists, taskListStorage) {
    this.#taskLists = taskLists;
    this.#taskListsStorage = taskListStorage;
  }

  addTaskList(title) {
    const taskList = new TaskList(title);
    this.#taskLists.addTaskList(taskList);
    this.#taskListsStorage.save(this.#taskLists.report());
  }

  addTask(taskListId, taskDescription) {
    const task = new Task(taskDescription);
    this.#taskLists.addTask(taskListId, task);
    this.#taskListsStorage.save(this.#taskLists.report());
  }

  toggleStatusMark(taskListId, taskId) {
    this.#taskLists.toggleMark(taskListId, taskId);
    this.#taskListsStorage.save(this.#taskLists.report());
  }

  removeTask(taskListId, taskId) {
    this.#taskLists.removeTask(taskListId, taskId);
    this.#taskListsStorage.save(this.#taskLists.report());
  }

  removeTaskList(taskListId) {
    this.#taskLists.removeTaskList(taskListId);
    this.#taskListsStorage.save(this.#taskLists.report());
  }

  getTaskListsDetail() {
    return this.#taskLists.report();
  }
}

module.exports = { TaskListController };
