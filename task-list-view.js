class TaskListView {
  #todoPage;
  #inputBox;
  #addButton;
  #taskListContainer;

  constructor() {
    // we need to move some where else.
    this.#todoPage = document.createElement("div");
    this.#todoPage.classList.add("todoPage");

    this.#inputBox = document.createElement("input")
    this.#inputBox.type = "text";
    this.#inputBox.placeholder = "Type your task here";

    this.#addButton = document.createElement("input");
    this.#addButton.type = "button";
    this.#addButton.value = "Add";

    this.#taskListContainer = document.createElement("ol");

    this.#todoPage.appendChild(this.#inputBox);
    this.#todoPage.appendChild(this.#addButton);
    this.#todoPage.appendChild(this.#taskListContainer);

    document.appendChild(this.#todoPage);
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

  render(tasksDetail) {
    this.#clearTaskListContainer();

    tasksDetail.forEach((taskDetail) => {
      const taskElement = this.#createElement(taskDetail);
      this.#taskListContainer.appendChild(taskElement);
    });
  }

};
