const mark = (event) => {
  const element = event.target;
  element.classList.add("green");
};

const createTaskElement = (message) => {
  const newTask = document.createElement("li");
  newTask.innerText = message;
  return newTask;
};

const addTask = () => {
  const task = document.querySelector("#task-title");
  const list = document.querySelector("#list");

  const newTask = createTaskElement(task.value);
  list.appendChild(newTask);

  newTask.onclick = mark;
};

const main = () => {
  const addTaskElement = document.querySelector("#add-task");
  addTaskElement.onclick = addTask;
}

window.onload = main;