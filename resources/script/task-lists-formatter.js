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

  #sortBy(methodName, taskList) {
    const sortMethods = {
      group: (taskA) => taskA.isMarked === true ? 0 : -1,
      alphabetically: (taskA, taskB) =>
        taskA.description > taskB.description ? 0 : -1,
      default: () => 0
    };

    const method = sortMethods[methodName];
    return taskList.toSorted(method);
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