
const addTaskList = (request, response) => {
  const { taskListController } = request.app.context;
  const { title } = request.body;
  taskListController.addTaskList(title);

  response.status(204);
  response.end();
};

const addTask = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskDescription } = request.body;
  taskListController.addTask(taskListId, taskDescription);

  response.status(204);
  response.end();
};

const removeTask = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskId } = request.body;
  taskListController.removeTask(taskListId, taskId);

  response.status(204);
  response.end();
};

const toggleTaskStatus = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId, taskId } = request.body;
  taskListController.toggleStatusMark(taskListId, taskId);

  response.status(204);
  response.end();
};

const removeTaskList = (request, response) => {
  const { taskListController } = request.app.context;
  const { taskListId } = request.body;
  taskListController.removeTaskList(taskListId);

  response.status(204);
  response.end();
};

const serveTaskListsDetail = (request, response) => {
  const { taskListController } = request.app.context;
  const taskListsDetail = taskListController.getTaskListsDetail();

  response.send(taskListsDetail);
};


module.exports = {
  addTask,
  removeTask,
  addTaskList,
  removeTaskList,
  toggleTaskStatus,
  serveTaskListsDetail,
};