const { it, describe } = require("node:test");
const { strictEqual, deepStrictEqual } = require("assert");
const { TaskList } = require("../../src/models/task-list");
const { Task } = require("../../src/models/task");

describe("taskList", () => {
  it("should give taskList title", () => {
    const taskList = new TaskList("Office work");

    strictEqual("Office work", taskList.getTitle());
  });

  it("should give taskList details", () => {
    const taskList = new TaskList("Office work");

    deepStrictEqual([], taskList.report());
  });

  it("should add a task in taskList", () => {
    const taskList = new TaskList("Office work");
    const task = new Task("learn new stuff");
    const taskListDetail = [
      {
        "id": "task-1",
        "description": "learn new stuff",
        "isMarked": false
      }];

    taskList.addTask(task);

    deepStrictEqual(taskListDetail, taskList.report());
  });

  it("should toggle the task status", () => {
    const taskList = new TaskList("Office work");
    const task = new Task("learn new stuff");
    const taskListDetail = [
      {
        "id": "task-1",
        "description": "learn new stuff",
        "isMarked": true
      }];

    taskList.addTask(task);
    taskList.toggleMark("task-1");

    deepStrictEqual(taskListDetail, taskList.report());
  });

  it("should remove a task from taskList", () => {
    const taskList = new TaskList("Office work");
    const task = new Task("learn new stuff");

    taskList.addTask(task);
    taskList.removeTask("task-1");

    deepStrictEqual([], taskList.report());
  });
});