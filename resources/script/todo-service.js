const request = (url, method, body, promise) => {
  const option = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  fetch(url, option).then(promise);
};

class TodoService {
  #taskListsFormatter;

  constructor(taskListsFormatter) {
    this.#taskListsFormatter = taskListsFormatter;
  }

  addTaskList(title, render) {
    request("/task-lists", "POST", { title }, render);
  }

  addTask(taskListId, taskDescription, render) {
    request("/task-lists/tasks", "POST", { taskListId, taskDescription }, render);
  }

  toggleStatusMark(taskListId, taskId, render) {
    request("/task-lists/tasks", "PATCH", { taskListId, taskId }, render);
  }

  removeTask(taskListId, taskId, render) {
    request("/task-lists/tasks", "DELETE", { taskListId, taskId }, render);
  }

  changeSortMethod(taskListId, methodName, render) {
    this.#taskListsFormatter.addSortMethod(taskListId, methodName);
    render();
  }

  removeTaskList(taskListId, render) {
    request("/task-lists", "DELETE", { taskListId }, render);
  }

  getTaskListsDetail(render) {
    fetch("/task-lists")
      .then((res) => res.json())
      .then((taskLists) => {
        this.#taskListsFormatter.setTaskLists(taskLists);
        render(this.#taskListsFormatter.getTaskLists());
      });
  }
}
