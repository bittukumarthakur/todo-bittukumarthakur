class TaskList {
  #tasksWithId;
  #taskCount;
  #sortMethodName;

  constructor() {
    this.#tasksWithId = [];
    this.#taskCount = 0;
    this.#sortMethodName = "default";
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

  sortBy(methodName) {
    this.#sortMethodName = methodName;
  }

};
