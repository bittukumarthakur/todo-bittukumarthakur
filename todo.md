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
  `` controller.addTask(task);
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

## taskList-manager/controller/
- it will handle multiple taskList;
taskListController.addTaskList(taskList);
taskListController.report(); => it will give all the data.

## input Controller
- it will control the input and output;
io.render();
io.start(); => it will attach the listener;

## model
- task
- taskList
- taskLists
- taskListsController


## client and server;
{url: "/", method:"Get"} => home page(no data);
{url: "/taskList": "Get"} => return task list data, => i will add that data to home page;
{url: "/taskList": "Post" } => it will send task detail, => return new task, that i will add to taskList;

## flow 
localhost:8000/ => it will serve a home page of todo/taskList;
i will request for task list data => {tak1,task2,task3};
render that task list data to home-page;

# on click addTask
i will send a task data to server => {url: "/taskList": "Post" } => return new task data;
then i will add that task to todo;

# grouping 
it will handled by client side;

---------------------------------------------------------------------

# Contract
task-lists --> task-list --> task

## Home page
client: GET / HTTP/1.1 <== Todo home page;
server: 200 ok ==> browser will render home page;
body: {
  home page html
  }

## fetch Task-lists data
client: GET /task-lists HTTP/1.1 <== fetching task-lists data;
server: 200 Ok ==> browser take data and display it by modifying view;
body: { task lists data}

## ADD Task-list
client: POST /task-lists HTTP/1.1 <== add task list;
body: {
  taskListTitle: "taskList-1"
  } 

server: 201 created ==> browser will create task list;
body: {
  taskListID: "taskList#1"
  }

## Add Task
client: POST /task-lists/tasks HTTP/1.1 <== add task;
body: {
  taskListID: taskList#1,
 taskDescription: "learn html" 
}

server: 201 created ==> browser will create task and add to task list;
body: {
  taskListID: taskList#1
  task: {taskId: task#1, description: "learn html" }
  }

## Delete Task
client: DELETE /task-lists/tasks HTTP/1.1 <== delete task;
body: {
  taskListID: taskList#1,
  taskId: task#1
}

200 ok ==> browser will request for updated data;

## Toggle task status;
client: PATCH /task-lists/tasks HTTP/1.1 <==  task;
body: {
  taskListID: taskList#1,
  taskId: task#1,
  isDone: true
}

204 No Content ==> then browser will request for details; 

## Sorting methods;
client: PATCH /task-lists HTTP/1.1 <== sort by group;
body: {
  taskListID: taskList#1,
  sortMethod: "group"
}

204 No Content ==> then browser will sort the data; 


## taskList 
{
  taskListId: "taskList",
  taskListId: "taskList",
  taskListId: "taskList",
}

## sorting 

## client side 
sortMethods: {
task-list-1: "time",
task-list-2: "alpha",
}

## from server 
taskListDetails: [
  {
    "taskListId": "task-list-1",
    "title": "office",
    "taskListDetail": [
      {
        "id": "task-1",
        "description": "learn js",
        "isMarked": false
      }
    ]
  }
]

## todo
change status code 204 to 201; add task and add task list;
