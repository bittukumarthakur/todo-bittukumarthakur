class Task {
  #description
  #mark

  constructor(description) {
    this.#description = description;
    this.#mark = false;
  }

  toggleMark() {
    this.#mark = !this.#mark
  }

  isMark() {
    return this.#mark;
  }

  getDetails() {
    const description = this.#description;
    const isMark = this.#mark;
    return { description, isMark };
  }
};

class TaskList {
  #tasks
  #taskCount
  #ids

  constructor() {
    this.#tasks = {};
    this.#taskCount = 0;
    this.#ids = [];
  }

  #generateId() {
    this.#taskCount += 1;
    const prefix = "task";
    return `${prefix}-${this.#taskCount}`;
  }

  addTask(task) {
    const id = this.#generateId();
    this.#ids.push(id);
    this.#tasks[id] = task;
    return id;
  }

  deleteTask(taskId) {
    delete this.#tasks[taskId];
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

class TaskListView {
  #container
  constructor(container) {
    this.#container = container;
  }

  #createElement({ id, description, isMark }) {
    const element = document.createElement("li");
    element.innerText = description;
    element.id = id;

    if (isMark) element.classList.add("mark");
    return element;
  }

  #createDeleteButton({ id }) {
    const element = document.createElement("input");
    element.type = "button";
    element.value = "delete";
    element.id = `delete-${id}`;
    return element;
  }

  #clearContainer() {
    const elements = [...this.#container.children];
    elements.forEach(element => element.remove());
  }

  render(tasksDetail) {
    this.#clearContainer();

    tasksDetail.forEach((taskDetail) => {
      const taskElement = this.#createElement(taskDetail);
      const del = this.#createDeleteButton(taskDetail);
      taskElement.appendChild(del);
      this.#container.appendChild(taskElement);
    });
  }
};

class Controller {
  #todoList
  #todoListViewer

  constructor(todoList, todoListViewer) {
    this.#todoList = todoList;
    this.#todoListViewer = todoListViewer;
  }

  addTask(task) {
    this.#todoList.addTask(task);
  }

  toggleMark(taskId) {
    this.#todoList.toggleMark(taskId);
  }

  render(sortMethod) {
    if (sortMethod.alphabetically) {
      this.#todoListViewer.render(this.#todoList.getSortedTaskDetails());
      return;
    };

    this.#todoListViewer.render(this.#todoList.getTasksDetails());
  }
};

const main = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  const taskDescription = document.querySelector("#task-description");
  const taskListContainer = document.querySelector("#task-list");
  const sortButton = document.querySelector("#sort-alphabetically");
  const selectMethod = document.querySelector("#select-method");

  const sortMethod = { alphabetically: false };

  const todoList = new TaskList();
  const todoListViewer = new TaskListView(taskListContainer);
  const controller = new Controller(todoList, todoListViewer);

  const addTask = () => {
    const description = taskDescription.value;
    const task = new Task(description);
    controller.addTask(task);
    controller.render(sortMethod);

    taskDescription.value = "";
  };

  const toggleMark = (event) => {
    const taskElement = event.target;
    controller.toggleMark(taskElement.id);
    controller.render(sortMethod);
  };

  const sortAlphabetically = () => {
    sortMethod.alphabetically = !sortMethod.alphabetically;
    controller.render(sortMethod);
  };

  addTaskButton.onclick = addTask;
  taskListContainer.onclick = toggleMark
  sortButton.onclick = sortAlphabetically;

  selectMethod.onchange = (event) => {
    console.log(event.target.value);
  };
};

window.onload = main;

// // some controller
//  todoTasksView.onNewTask((taskDescription) => {
//    this.todo.addTask(taskDescription);
//    todoTasksView.updateTasks(this.todo.getTasks());
//  });