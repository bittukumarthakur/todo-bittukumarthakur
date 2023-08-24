const { Task } = require("./task");

class TaskList {
  #tasksWithId;
  #taskCount;
  #sortMethodName;
  #title;

  constructor(title) {
    this.#title = title;
    this.#tasksWithId = [];
    this.#taskCount = 0;
    this.#sortMethodName = "default";
  }

  getTitle() {
    return this.#title;
  }

  #generateId() {
    this.#taskCount++;
    const prefix = "task";
    return `${prefix}-${this.#taskCount}`;
  }

  addTask(task) {
    const id = this.#generateId();
    this.#tasksWithId.push({ id, task });
  }

  removeTask(taskId) {
    this.#tasksWithId = this.#tasksWithId.filter(({ id }) => id !== taskId);
  }

  #getTask(taskId) {
    const { task } = this.#tasksWithId.find(({ id }) => id === taskId);
    return task;
  }

  toggleMark(taskId) {
    const task = this.#getTask(taskId);
    task.toggleMark();
  }

  report() {
    return this.#tasksWithId.map(({ id, task }) => {
      const { description, isMarked } = task.getDetails();
      return { id, description, isMarked };
    });
  }

  load(taskListDetail) {
    this.#tasksWithId = taskListDetail.map(({ id, description, isMarked }) => {
      const task = new Task(description);
      this.#taskCount++;
      task.setStatusMark(isMarked);
      return { id, task };
    });
  }
};

module.exports = { TaskList };