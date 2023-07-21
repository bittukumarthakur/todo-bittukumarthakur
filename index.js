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

class TaskListView {
  #todoPage;
  #inputBox;
  #addButton;
  #taskListContainer;
  #title;
  #headingElement;
  #toggleMark;
  #selectElement;
  #removeTask;

  constructor(title) {
    this.#title = title;
  };

  createInitialTemplate() {
    // we need to move some where else.
    // use mapper to create this;
    this.#todoPage = document.createElement("div");
    this.#todoPage.classList.add("todoPage");

    this.#headingElement = document.createElement("h2");
    this.#headingElement.innerText = this.#title;

    this.#inputBox = document.createElement("input");
    this.#inputBox.type = "text";
    this.#inputBox.placeholder = "Type your task here";
    this.#inputBox.classList.add("input-box");

    this.#addButton = document.createElement("input");
    this.#addButton.type = "button";
    this.#addButton.value = "Add";
    this.#addButton.id = "add-button";

    this.#selectElement = document.createElement("select");
    this.#selectElement.id = "select-sort-method";


    const defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.innerText = "Default";

    // check name here.
    const alphabeticallyOption = document.createElement("option");
    alphabeticallyOption.value = "alphabetically";
    alphabeticallyOption.innerText = "Alphabetically";

    const groupOption = document.createElement("option");
    groupOption.value = "group";
    groupOption.innerText = "Group";

    this.#selectElement.appendChild(defaultOption);
    this.#selectElement.appendChild(alphabeticallyOption);
    this.#selectElement.appendChild(groupOption);

    this.#taskListContainer = document.createElement("ol");

    this.#todoPage.appendChild(this.#headingElement);
    this.#todoPage.appendChild(this.#inputBox);
    this.#todoPage.appendChild(this.#addButton);
    this.#todoPage.appendChild(this.#selectElement);
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

  onclickAdd(addTask) {
    this.#addButton.onclick = () => {
      const description = this.#inputBox.value;
      addTask(description);
    };
  }

  onclickTask(toggleMark) {
    this.#toggleMark = toggleMark;
  }

  onChangeSortMethod(setSortMethod) {
    this.#selectElement.onchange = setSortMethod;
  }

  onclickRemove(removeTask) {
    this.#removeTask = removeTask;
  }

  #createRemoveButton() {
    const removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.value = "X";
    removeButton.classList.add("remove-Button");
    return removeButton;
  }

  render(tasksDetail) {
    this.#clearTaskListContainer();

    tasksDetail.forEach((taskDetail) => {
      const taskElement = this.#createElement(taskDetail);
      const removeButton = this.#createRemoveButton();
      taskElement.appendChild(removeButton);
      removeButton.onclick = (event) => {
        event.stopPropagation();
        this.#removeTask(taskDetail.id);
      };
      taskElement.onclick = this.#toggleMark;

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
    this.#taskListView.render(tasksDetail);
  }

  start() {
    this.#taskListView.createInitialTemplate();

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
};

const setupTodo = (title) => {
  const taskList = new TaskList();
  const taskListView = new TaskListView(title);
  const taskListController = new TaskListController(taskList, taskListView);
  taskListController.start();
};

const main = () => {
  setupTodo("Study");
  // setupTodo("work");
};

window.onload = main;