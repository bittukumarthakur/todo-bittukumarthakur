/* eslint-disable max-lines-per-function */
class TaskListView {
  #taskListInputBox;
  #addTaskListButton;
  #taskListsContainer;
  #addTask;
  #toggleMark;
  #removeTask;
  #changeSortMethod;
  #removeTaskList;

  constructor() {
  };

  initialTemplate() {
    this.#taskListInputBox = document.createElement("input");
    this.#taskListInputBox.type = "text";
    this.#taskListInputBox.placeholder = "Title of task list";
    this.#taskListInputBox.classList.add("input-box");

    this.#addTaskListButton = document.createElement("input");
    this.#addTaskListButton.type = "button";
    this.#addTaskListButton.value = "Add";
    this.#addTaskListButton.classList.add("add-button");

    this.#taskListsContainer = document.createElement("div");
    this.#taskListsContainer.id = "task-lists-container";
    document.body.append(this.#taskListInputBox, this.#addTaskListButton, this.#taskListsContainer);
  }

  onclickAddTaskList(addTasklist) {
    this.#addTaskListButton.onclick = () => {
      const title = this.#taskListInputBox.value;
      this.#taskListInputBox.value = "";
      addTasklist(title);
    };
  }

  onChangeSortMethod(changeSortMethod) {
    this.#changeSortMethod = changeSortMethod;
  }

  onclickRemoveTask(removeTask) {
    this.#removeTask = removeTask;
  }

  onclickToggleMark(toggleMark) {
    this.#toggleMark = toggleMark;
  };

  onclickAddTask(addTask) {
    this.#addTask = addTask;
  }

  onclickRemoveTaskList(removeTaskList) {
    this.#removeTaskList = removeTaskList;
  }

  #clearTaskListContainer() {
    const elements = [...this.#taskListsContainer.children];
    elements.forEach(element => element.remove());
  }

  #createRemoveButton() {
    const removeButton = document.createElement("input");
    removeButton.type = "button";
    removeButton.value = "X";
    removeButton.classList.add("remove-Button");
    return removeButton;
  }

  #createTitleElement(title) {
    const element = document.createElement("h2");
    element.innerText = title;
    return element;
  }

  #createSelectElement(sortMethodName) {
    const selectElement = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.innerText = "Default";

    const alphabeticallyOption = document.createElement("option");
    alphabeticallyOption.value = "alphabetically";
    alphabeticallyOption.innerText = "Alphabetically";

    const groupOption = document.createElement("option");
    groupOption.value = "group";
    groupOption.innerText = "Group";

    selectElement.append(defaultOption, alphabeticallyOption, groupOption);
    const sortMethod = [defaultOption, alphabeticallyOption, groupOption]
      .find((sort) => sort.value === sortMethodName);

    sortMethod.setAttribute("selected", "");
    return selectElement;
  }

  #createAddTaskInputBox(taskListId, sortMethodName) {
    const addTaskInputBox = document.createElement("input");
    addTaskInputBox.type = "text";
    addTaskInputBox.id = `${taskListId}`; // id;
    addTaskInputBox.placeholder = "Task description";
    addTaskInputBox.classList.add("input-box");

    const addTaskButton = document.createElement("input");
    addTaskButton.type = "button";
    addTaskButton.value = "Add";
    addTaskButton.classList.add("add-button");

    const removeTaskListButton = this.#createRemoveButton();
    removeTaskListButton.onclick = () => this.#removeTaskList(taskListId);

    addTaskButton.onclick = () => {
      const description = addTaskInputBox.value;
      this.#addTask(taskListId, description);
    };

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");
    const selectElement = this.#createSelectElement(sortMethodName);
    selectElement.onchange = (event) => this.#changeSortMethod(taskListId, event.target.value);
    wrapper.append(addTaskInputBox, addTaskButton, selectElement, removeTaskListButton);

    return wrapper;
  }

  #createTaskElements(taskListId, taskListDetail) {
    return taskListDetail.map(({ id: taskId, description, isMarked }) => {
      const taskElement = document.createElement("p");
      const removeButton = this.#createRemoveButton();
      const wrapper = document.createElement("div");

      wrapper.classList.add("task");
      taskElement.innerText = description;
      taskElement.id = `${taskListId}/${taskId}`;
      taskElement.onclick = () => this.#toggleMark(taskListId, taskId);
      removeButton.onclick = () => this.#removeTask(taskListId, taskId);

      if (isMarked) taskElement.classList.add("mark");
      wrapper.append(taskElement, removeButton);
      return wrapper;
    });
  }

  #createTaskListElement(taskList) {
    const { taskListId, title, taskListDetail, sortMethodName } = taskList;
    const taskListContainer = document.createElement("div");
    const titleElement = this.#createTitleElement(title);
    const taskListInputBox = this.#createAddTaskInputBox(taskListId, sortMethodName);
    const taskElements = this.#createTaskElements(taskListId, taskListDetail);

    taskListContainer.append(titleElement, taskListInputBox, ...taskElements);
    this.#taskListsContainer.append(taskListContainer);
  }

  render(taskLists) {
    this.#clearTaskListContainer();
    taskLists.forEach((taskList) => this.#createTaskListElement(taskList));
  }

};