class TaskListView {
  #todoPage;
  #inputBox;
  #addButton;
  #taskListContainer;
  #headingElement;
  #toggleMark;
  #selectElement;
  #removeTask;

  #tasklistInputBox;
  #addTaskListButton;

  constructor() {
    this.initialTemplate();
  };

  initialTemplate() {
    this.#tasklistInputBox = document.createElement("input");
    this.#tasklistInputBox.type = "text";
    this.#tasklistInputBox.placeholder = "Title of task list";
    this.#tasklistInputBox.classList.add("input-box");

    this.#addTaskListButton = document.createElement("input");
    this.#addTaskListButton.type = "button";
    this.#addTaskListButton.value = "Add";
    this.#addTaskListButton.classList.add("add-button");


    document.body.append(this.#tasklistInputBox, this.#addTaskListButton);
  }

  createTaskListTemplate(title) {
    // we need to move some where else.
    // use mapper to create this;
    this.#todoPage = document.createElement("div");
    this.#todoPage.classList.add("todoPage");

    this.#headingElement = document.createElement("h2");
    this.#headingElement.innerText = title;

    this.#inputBox = document.createElement("input");
    this.#inputBox.type = "text";
    this.#inputBox.placeholder = "Type your task here";
    this.#inputBox.classList.add("input-box");

    this.#addButton = document.createElement("input");
    this.#addButton.type = "button";
    this.#addButton.value = "Add";
    this.#addButton.classList.add("add-button");

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

  onclickAddTaskList(addTasklist) {
    this.#addTaskListButton.onclick = () => {
      const title = this.#tasklistInputBox.value;
      addTasklist(title);
    };

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
    console.log(JSON.stringify(tasksDetail));
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