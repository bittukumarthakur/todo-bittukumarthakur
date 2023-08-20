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
    const sortMethod = {
      group: (taskA) => taskA.isMarked === true ? 0 : -1,
      alphabetically: (taskA, taskB) =>
        taskA.description > taskB.description ? 1 : -1,
      default: () => 0
    };
    const reportDetails = this.#tasksWithId.map(({ id, task }) => {
      const { description, isMarked } = task.getDetails();
      return { id, description, isMarked };
    });

    return reportDetails.toSorted(sortMethod[this.#sortMethodName]);
  }

  getSortMethodName() {
    return this.#sortMethodName;
  }

  sortBy(methodName) {
    this.#sortMethodName = methodName;
  }

  load(taskListDetail, sortMethodName) {
    this.#tasksWithId = taskListDetail.map(({ id, description, isMarked }) => {
      const task = new Task(description);
      task.setStatusMark(isMarked);
      this.sortBy(sortMethodName);
      return { id, task };
    });
  }
};