class TaskLists {
  #taskLists;
  #taskListCount;

  constructor() {
    this.#taskLists = [];
    this.#taskListCount = 0;
  }

  #generateId() {
    this.#taskListCount++;
    const prefix = "task-list";
    return `${prefix}-${this.#taskListCount}`;
  }

  addTaskList(taskList) {
    const taskListId = this.#generateId();
    this.#taskLists.push({ taskListId, taskList });
  }

  #getTaskList(id) {
    const { taskList } = this.#taskLists.find(({ taskListId }) => taskListId === id);
    return taskList;
  }

  addTask(taskListId, task) {
    const taskList = this.#getTaskList(taskListId);
    taskList.addTask(task);
  }

  removeTask(taskListId, taskId) {
    const taskList = this.#getTaskList(taskListId);
    taskList.removeTask(taskId);
  }

  toggleMark(taskListId, taskId) {
    const taskList = this.#getTaskList(taskListId);
    taskList.toggleMark(taskId);
  }

  sortBy(taskListId, methodName) {
    const taskList = this.#getTaskList(taskListId);
    taskList.sortBy(methodName);
  }

  report() {
    return this.#taskLists.map(({ taskListId, taskList }) => {
      const taskListDetail = taskList.report();
      const title = taskList.getTitle();
      const sortMethodName = taskList.getSortMethodName();
      return { taskListId, title, sortMethodName, taskListDetail };
    });
  };

  load(taskListsDetail) {
    this.#taskLists = taskListsDetail.map(({ taskListId, title, taskListDetail, sortMethodName }) => {
      const taskList = new TaskList(title);
      taskList.load(taskListDetail, sortMethodName);
      return { taskListId, taskList };
    });
  }

}
