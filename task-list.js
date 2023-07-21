class Task {
  #description;
  #mark;

  constructor(description) {
    this.#description = description;
    this.#mark = false;
  }

  toggleMark() {
    this.#mark = !this.#mark;
  }

  isMarked() {
    return this.#mark;
  }

  getDetails() {
    const description = this.#description;
    const isMarked = this.#mark;
    return { description, isMarked };
  }
};

class TaskList {
  #tasks;
  #taskCount;
  #ids;

  constructor() {
    this.#tasks = [];
    this.#taskCount = 0;
    this.#ids = [];
  }

  #generateId() {
    this.#taskCount++;
    const prefix = "task";
    return `${prefix}-${this.#taskCount}`;
  }

  addTask(description) {
    const task = new Task(description);
    const id = this.#generateId();
    this.#tasks.push({ id, task });
  }

  deleteTask(taskId) {
    this.#tasks.filter(({ id }) => { return id !== taskId });

    this.#ids = this.#ids.filter((id) => id !== taskId);
  }

  toggleMark(taskId) {
    const task = this.#tasks[taskId];
    task.toggleMark();
  }

  groupByDone(tasks) {
    return tasks.toSorted((a, b) => {
      return a.isMark === true ? 1 : -1;
    });
  }

  getTasksDetails() {

    const data = this.#ids.map((id) => {
      const task = this.#tasks[id];
      const details = task.getDetails();
      return { id, ...details };
    });

    return this.groupByDone(data);
  }

  getSortedTaskDetails() {
    const tasksDetails = this.getTasksDetails();
    return tasksDetails.toSorted((a, b) => {
      return a.description > b.description ? 1 : -1;
    });
  }
};

