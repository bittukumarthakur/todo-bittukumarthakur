const addTask = () => {
  const task = document.querySelector("#task-title");
  const list = document.querySelector("#list");
  const newTask = document.createElement("li");
  newTask.innerText = task.value;
  list.appendChild(newTask);
};

const main = () => {
  const addTaskElement = document.querySelector("#add-task");
  addTaskElement.onclick = addTask;
}

window.onload = main;