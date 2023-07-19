const mark = (event) => {
  const element = event.target;
  element.classList.toggle("mark");
};

const createTaskElement = (message) => {
  const newTask = document.createElement("li");
  newTask.innerText = message;
  return newTask;
};

const addTask = (tasks) => {
  const taskDescription = document.querySelector("#task-description");

  const list = document.querySelector("#task-list");

  const newTask = createTaskElement(taskDescription.value);
  list.appendChild(newTask);

  newTask.onclick = mark;
};

const main = () => {
  const addTaskButton = document.querySelector("#add-task-button");

  addTaskButton.onclick = addTask;
};

window.onload = main;