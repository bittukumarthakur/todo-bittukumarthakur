const { it, describe } = require("node:test");
const { deepStrictEqual } = require("assert");
const { TaskLists } = require("../../src/models/task-lists");
const { TaskList } = require("../../src/models/task-list");
const { Task } = require("../../src/models/task");

// eslint-disable-next-line max-lines-per-function
describe("taskLists", () => {
  it("should give details of task lists", () => {
    const taskLists = new TaskLists();

    deepStrictEqual([], taskLists.report());
  });

  it("should add taskList", () => {
    const taskLists = new TaskLists();
    const taskList = new TaskList("Office work");
    const taskListsDetail = [
      {
        taskListDetail: [],
        taskListId: 'task-list-1',
        title: "Office work"
      }
    ];

    taskLists.addTaskList(taskList);

    deepStrictEqual(taskListsDetail, taskLists.report());
  });

  it("should add task to a specific taskList", () => {
    const taskLists = new TaskLists();
    const taskList = new TaskList("Office work");
    const task = new Task("buy laptop");
    const taskListsDetail = [
      {
        taskListId: "task-list-1",
        title: "Office work",
        taskListDetail: [
          {
            description: "buy laptop",
            id: "task-1",
            isMarked: false
          }
        ]
      }
    ];

    taskLists.addTaskList(taskList);
    taskLists.addTask("task-list-1", task);

    deepStrictEqual(taskListsDetail, taskLists.report());
  });

  it("should toggle task status of a specific taskList", () => {
    const taskLists = new TaskLists();
    const taskList = new TaskList("Office work");
    const task = new Task("buy laptop");
    const taskListsDetail = [
      {
        taskListId: "task-list-1",
        title: "Office work",
        taskListDetail: [
          {
            description: "buy laptop",
            id: "task-1",
            isMarked: true
          }
        ]
      }
    ];

    taskLists.addTaskList(taskList);
    taskLists.addTask("task-list-1", task);
    taskLists.toggleMark("task-list-1", 'task-1');

    deepStrictEqual(taskListsDetail, taskLists.report());
  });

  it("should remove a task from a specific taskList", () => {
    const taskLists = new TaskLists();
    const taskList = new TaskList("Office work");
    const task = new Task("buy laptop");
    const taskListsDetail = [
      {
        taskListId: "task-list-1",
        title: "Office work",
        taskListDetail: []
      }
    ];

    taskLists.addTaskList(taskList);
    taskLists.addTask("task-list-1", task);
    taskLists.removeTask("task-list-1", "task-1");

    deepStrictEqual(taskListsDetail, taskLists.report());
  });

  it("should remove a taskList", () => {
    const taskLists = new TaskLists();
    const taskList = new TaskList("Office work");
    const task = new Task("buy laptop");
    const taskListsDetail = [];

    taskLists.addTaskList(taskList);
    taskLists.addTask("task-list-1", task);
    taskLists.removeTaskList("task-list-1");

    deepStrictEqual(taskListsDetail, taskLists.report());
  });
});