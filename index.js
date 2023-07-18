const addTask = () => {
  const todoListElement = document.querySelector("#todo-list");
  const task = document.querySelector("add-task");
  const taskElement = document.createElement("li");
  taskElement.innerText = task.value;

  todoListElement.appendChild(taskElement);
};

const main = () => {
  const submitButton = document.querySelector("#submit");
  submitButton.onclick = addTask;

}

window.onload = main;