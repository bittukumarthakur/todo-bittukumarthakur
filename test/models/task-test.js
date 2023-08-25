/* eslint-disable max-lines-per-function */
const { it, describe } = require("node:test");
const { deepStrictEqual, ok } = require("assert");
const { Task } = require("../../src/models/task");

describe("task", () => {
  it("should give task status", () => {
    const task = new Task("buy tomato");

    ok(!task.isMarked());
  });

  it("should mark task status as done", () => {
    const task = new Task("buy tomato");
    task.setStatusMark(true);

    ok(task.isMarked());
  });

  it("should toggle task status", () => {
    const task = new Task("buy tomato");
    task.toggleMark();

    ok(task.isMarked());
  });

  it("should give task details", () => {
    const task = new Task("buy tomato");
    const taskDetails = {
      description: "buy tomato",
      isMarked: false
    };

    deepStrictEqual(taskDetails, task.getDetails());
  });

});