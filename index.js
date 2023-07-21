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
  #tasksWithId;
  #taskCount;

  constructor() {
    this.#tasksWithId = [];
    this.#taskCount = 0;
  }

  #generateId() {
    this.#taskCount++;
    const prefix = "task";
    return `${prefix}-${this.#taskCount}`;
  }

  addTask(description) {
    const task = new Task(description);
    const id = this.#generateId();
    this.#tasksWithId.push({ id, task });
  }

  deleteTask(taskId) {
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
    return this.#tasksWithId.map(({ id, task }) => {
      const { description, isMarked } = task.getDetails();
      return { id, description, isMarked };
    });
  }

  #groupByDone() {
    const tasks = this.report();
    return tasks.toSorted((a, b) => a.isMark === true ? 1 : -1);
  }

  #sortByAlphabetically() {
    const tasks = this.report();
    return tasks.toSorted((a, b) => a.description > b.description ? 1 : -1);
  }

  sortBy(methodName) {
    // we need to change switch case;
    switch (methodName) {
      case "group": return this.#groupByDone();
      case "alphabetically": return this.#sortByAlphabetically();
      default: return this.report();
    };
  }

};

class TaskListView {
  #todoPage;
  #inputBox;
  #addButton;
  #taskListContainer;
  #title;
  #headingElement;

  constructor(title) {
    this.#title = title
  };

  createInitialTemplate() {
    // we need to move some where else.
    this.#todoPage = document.createElement("div");
    this.#todoPage.classList.add("todoPage");

    this.#headingElement = document.createElement("h2");
    this.#headingElement.innerText = this.#title;

    this.#inputBox = document.createElement("input")
    this.#inputBox.type = "text";
    this.#inputBox.placeholder = "Type your task here";
    this.#inputBox.id = "input-box"

    this.#addButton = document.createElement("input");
    this.#addButton.type = "button";
    this.#addButton.value = "Add";
    this.#addButton.id = "add-button";

    this.#taskListContainer = document.createElement("ol");

    this.#todoPage.appendChild(this.#headingElement);
    this.#todoPage.appendChild(this.#inputBox);
    this.#todoPage.appendChild(this.#addButton);
    this.#todoPage.appendChild(this.#taskListContainer);

    document.body.appendChild(this.#todoPage);
  }

  #createElement({ id, description, isMarked }) {
    const element = document.createElement("li");
    element.innerText = description;
    element.id = id;

    if (isMarked) element.classList.add("mark");
    return element;
  }

  #clearTaskListContainer() {
    const elements = [...this.#taskListContainer.children];
    elements.forEach(element => element.remove());
  }

  onclickAdd(createTask) {
    this.#addButton.onclick = () => {
      const description = this.#inputBox.value;
      createTask(description);
    };
  }

  render(tasksDetail) {
    this.#clearTaskListContainer();

    tasksDetail.forEach((taskDetail) => {
      const taskElement = this.#createElement(taskDetail);
      this.#taskListContainer.appendChild(taskElement);
    });
  }

};

class TaskListController {
  #taskList;
  #taskListView;

  constructor(taskList, taskListView) {
    this.#taskList = taskList;
    this.#taskListView = taskListView;
  }

  render() {
    const tasksDetail = this.#taskList.report();
    console.log(tasksDetail);
    this.#taskListView.render(tasksDetail);
  }

  start() {
    this.#taskListView.createInitialTemplate();

    this.#taskListView.onclickAdd((description) => {
      this.#taskList.addTask(description);
      this.render();
    });
  }
};

const setupTodo = (title) => {
  const taskList = new TaskList();
  const taskListView = new TaskListView(title);
  const taskListController = new TaskListController(taskList, taskListView);
  taskListController.start();
};

const main = () => {
  setupTodo("study");

};

window.onload = main;