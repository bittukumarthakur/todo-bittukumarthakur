 ## How i store the data.
todoTasks = [
  {description: "Buy eggs from supermarket.", isDone: false },
  {description: "Finish Code Of Conduct training on campus.", isDone: true },
  {description: "Fill timeSheet.", isDone: false },
];

On every event, redraw the whole list.

## pseudo Code

## model
### Task
const task = new Task("Fill timeSheet.");
task.toggleMark();
task.isDone() => true/false;
task.status => {description: "Fill timeSheet.", isDone: false };

### Task List
const todo = new TaskList();
todo.addTask(task);
todo.removeTask(taskId);
todo.toggle(id);
todo.sortTask(default); => it return the list;
todo.status();

## View
### Task List view;

const taskListView = new TaskListView(container);
taskListView.onClickTask(call toggleMark);
taskListView.onClickRemove(call removeTask function);
taskListView.render(data);

## Controller
const controller = new TaskListController(taskList, view);
controller.addTask(description);
controller.removeTask(taskId);
controller.toggleMark(taskId);
controller.render();

controller.start(); => {
 taskListView.onclickTask((event) => {
   controller.toggleMark(event.target.id);
   controller.render();
  });

 taskListView.onclickRemove(() => {
  taskList.remove(); 
  });

   addTaskButton.onclick = () => {
   const description = taskDescriptionBox.value; 
   const task = new Task(description);
   controller.addTask(task);
   controller.render();
  };

}

# Main

const main = () => {
  const taskListContainer = ............;
  const addTaskButton = ............;
  const taskDescriptionBox = ..........; 
  const sortMethodSelector = ........;

  const taskList = new taskList();
  const taskListView = View(taskListContainer);
  const controller = Controller(taskList, taskListView);

  controller.start();
};


where are you creating the taskElement ==> at that time connect the delete button to 
taskElement;
