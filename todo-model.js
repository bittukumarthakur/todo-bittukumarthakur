class Task {
  #description
  #mark

  constructor(description) {
    this.#description = description;
    this.#mark = false;
  }

  markToggle() {
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

class TodoList {
  #tasks
  #taskCount

  constructor() {
    this.#tasks = {};
    this.#taskCount = 0;
  }

  #generateId() {
    this.#taskCount += 1;
    const prefix = "task";
    return `${prefix}-${this.#taskCount}`;
  }

  addTask(task) {
    const id = this.#generateId();
    this.#tasks[id] = task;
    return id;
  }

  markToggle(taskId) {
    const task = this.#tasks[taskId];
    task.markToggle();
  }

  getTasksDetails() {
    const tasksWithId = Object.entries(this.#tasks);

    return tasksWithId.map(([id, task]) => {
      const { description, isMark } = task.getDetails();
      return { id, description, isMark };
    });
  }
};

class TodoListViewer {
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

  #clearContainer() {
    const elements = [...this.#container.children];
    elements.forEach(element => element.remove());
  }

  render(tasksDetail) {
    this.#clearContainer();

    tasksDetail.forEach((taskDetail) => {
      const taskElement = this.#createElement(taskDetail);
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

  render() {
    const todoListDetails = this.#todoList.getTasksDetails();
    this.#todoListViewer.render(todoListDetails);
    console.log(todoListDetails);
  }
};


const main = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  const taskDescription = document.querySelector("#task-description");
  const taskListContainer = document.querySelector("#task-list");

  const todoList = new TodoList();
  const todoListViewer = new TodoListViewer(taskListContainer);
  const controller = new Controller(todoList, todoListViewer);

  addTaskButton.onclick = () => {
    const task = new Task(taskDescription.value);
    controller.addTask(task);
    controller.render();
  };

  taskListContainer.onclick = (event) => {
    const element = event.target;
    todoList.markToggle(element.id);
    controller.render();

    console.log(event.target.id);
  };


};

window.onload = main;