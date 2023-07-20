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

  toggleMark(taskId) {
    const task = this.#tasks[taskId];
    task.toggleMark();
  }

  getTasksDetails() {
    const tasksWithId = Object.entries(this.#tasks);

    return tasksWithId.map(([id, task]) => {
      const { description, isMark } = task.getDetails();
      return { id, description, isMark };
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

  toggleMark(taskId) {
    this.#todoList.toggleMark(taskId);
  }

  render(sortMethod) {
    const todoListDetails = this.#todoList.getTasksDetails();

    if (sortMethod.alphabetically) {
      todoListDetails.sort((a, b) => {
        return a.description > b.description ? 1 : -1;
      });
    };

    this.#todoListViewer.render(todoListDetails);
  }
};

const main = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  const taskDescription = document.querySelector("#task-description");
  const taskListContainer = document.querySelector("#task-list");
  const sortButton = document.querySelector("#sort-alphabetically");
  const sortMethod = { alphabetically: false };

  const todoList = new TaskList();
  const todoListViewer = new TaskListView(taskListContainer);
  const controller = new Controller(todoList, todoListViewer);

  const addTask = () => {
    const task = new Task(taskDescription.value);
    controller.addTask(task);
    controller.render(sortMethod);
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
};

window.onload = main;

// // some controller
//  todoTasksView.onNewTask((taskDescription) => {
//    this.todo.addTask(taskDescription);
//    todoTasksView.updateTasks(this.todo.getTasks());
//  });