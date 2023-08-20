class controller {
  #taskList;
  #taskListView;
  #taskLists;
  #taskListCount;

  constructor(taskList, taskListView) {
    this.#taskList = taskList;
    this.#taskListView = taskListView;
    this.#taskLists = [];
    this.#taskListCount = 0;
  }

  #generateId() {
    this.#taskListCount++;
    const prefix = "task-list";
    return `${prefix}-${this.#taskListCount}`;
  }

  render() {
    const tasksDetail = this.#taskList.report();
    this.#taskListView.render(tasksDetail);
  }

  attachListener(title) {

    this.#taskListView.onclickAdd((description) => {
      const task = new Task(description);
      this.#taskList.addTask(task);
      this.render();
    });

    this.#taskListView.onclickTask((event) => {
      const taskElement = event.target;
      this.#taskList.toggleMark(taskElement.id);
      this.render();
    });

    this.#taskListView.onChangeSortMethod((event) => {
      const methodName = event.target.value;
      this.#taskList.sortBy(methodName);
      this.render();
    });

    this.#taskListView.onclickRemove((taskId) => {
      this.#taskList.removeTask(taskId);
      this.render();
    });
  }

  addTaskList(title) {
    const taskList = new TaskList(title);
    this.#taskLists[title] = taskList;
    this.#taskListView.createTaskListTemplate(title);
    this.attachListener(title);
  }

  setup() {
    this.#taskListView.onclickAddTaskList((title) => {
      this.addTaskList(title);
      console.log(title);
    });
  }

};

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
    console.log(taskListId);
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

  report() {
    return this.#taskLists.map(({ taskListId, taskList }) => {
      const taskListDetail = taskList.report();
      const title = taskList.getTitle();
      return { taskListId, title, taskListDetail };
    });
  };

}
