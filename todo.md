 ## How i store the data.
todoTasks = [
  {description: "Buy eggs from supermarket.", isDone: false },
  {description: "Finish Code Of Conduct training on campus.", isDone: true },
  {description: "Fill timeSheet.", isDone: false },
];

On every event, redraw the whole list.

## pseudo Code
const task = new Task("Fill timeSheet.");
task.toggleMark();
task.isDone() => true/false;
task.status => {description: "Fill timeSheet.", isDone: false };

const todo = new Todo();
const {id, description, status} = todo.addTask(task);
todo.toggle(id);
todo.status();

const view = new View(container);
view.render(todoTask);

const controller = new Controller(todo,view);

const main = () => {
  const todo = new Todo();

  addTaskButton.onclick = () => {
    const task = new Task("Fill timeSheet.");
    todo.addTask(task);
    const taskElement = getTaskElement(task.description);
    taskElement.onClick = (e) => {
      task.mark();
    }
    render(todo.status);
  };
};