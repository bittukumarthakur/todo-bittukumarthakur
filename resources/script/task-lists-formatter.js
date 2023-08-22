class TaskListsFormatter {
  #taskListsSortType;
  #taskLists;

  constructor() {
    this.#taskListsSortType = {};
  }

  addSortMethod(taskListId, method) {
    this.#taskListsSortType[taskListId] = method;
  }

  setTaskLists(taskLists) {
    this.#taskLists = taskLists;
  }

  #groupTasks(tasks) {
    const markedTasks = tasks.filter(task => task.isMarked);
    const notMarkedTasks = tasks.filter(task => !task.isMarked);

    return [...notMarkedTasks, ...markedTasks];
  }

  #sortAlphabetically(tasks) {
    const method = (taskA, taskB) => taskA.description > taskB.description ? 0 : -1;

    return tasks.toSorted(method);
  }

  #sortBy(methodName, taskList) {
    const sortMethods = {
      group: this.#groupTasks,
      alphabetically: this.#sortAlphabetically,
      default: (taskList) => taskList
    };

    return sortMethods[methodName](taskList);
  }

  getTaskLists() {
    return this.#taskLists.map((taskList) => {
      const { taskListId, taskListDetail, title } = taskList;
      const sortMethodName = this.#taskListsSortType[taskListId] || "default";
      const sortedTaskListDetail = this.#sortBy(sortMethodName, taskListDetail);

      return { taskListId, title, sortMethodName, taskListDetail: sortedTaskListDetail };
    });
  }
}