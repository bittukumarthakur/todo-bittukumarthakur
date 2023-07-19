class Task {

  constructor(description) {
    this.description = description;
    this.mark = false;
  }

  markToggle() {
    this.mark = !this.mark
  }

  isMark() {
    return this.mark;
  }

  getDetails() {
    const description = this.description;
    const isMark = this.isMark;
    return { description, isMark };
  }
};

const main = () => {
  const addTaskButton = document.querySelector("#add-task-button");
  const taskDescription = document.querySelector("#task-description");

  addTaskButton.onclick = () => {
    const description = taskDescription.value;
    console.log(des)
    const task = new Task()
  }


};

window.onload = main;