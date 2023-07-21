class TaskListView {
  #container;

  constructor(container) {
    this.#container = container;
  }

  #createElement({ id, description, isMarked }) {
    const element = document.createElement("li");
    element.innerText = description;
    element.id = id;

    if (isMarked) element.classList.add("mark");
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
