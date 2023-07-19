const mark = (event) => {
  const element = event.target;
  element.classList.toggle("mark");
};

const createLiElement = (task) => {
  const newTask = document.createElement("li");
  newTask.innerText = task.description;
  return newTask;
};

const createTasksElement = (todoTasks) => {
  return todoTasks.map(createLiElement);
};

const render = (todoTasks) => {
  const list = document.querySelector("#task-list");
  const taskElements = createTasksElement(todoTasks);

  [...list.children].forEach(element => { element.remove(); });
  taskElements.forEach(element => { list.appendChild(element); });
};

const main = () => {
  const todoTasks = [];

  const addTaskButton = document.querySelector("#add-task-button");
  const taskDescription = document.querySelector("#task-description");
  const alphaOrderButton = document.querySelector("#alpha-order");

  const createTask = () => {
    const id = todoTasks.length + 1; // need to change;
    const description = taskDescription.value;
    const isMark = false;
    todoTasks.push({ description, isMark, id });
    render(todoTasks);
  };

  const renderAlphabetically = () => {
    todoTasks.sort((task1, task2) => { return task1.description.charCodeAt() - task2.description.charCodeAt(); });

    render(todoTasks);
  };

  addTaskButton.onclick = createTask;

  alphaOrderButton.onclick = renderAlphabetically;
};

window.onload = main;