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