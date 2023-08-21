class Task {
  #description;
  #mark;

  constructor(description) {
    this.#description = description;
    this.#mark = false;
  }

  setStatusMark(mark) {
    this.#mark = mark;
  }

  toggleMark() {
    this.#mark = !this.#mark;
  }

  isMarked() {
    return this.#mark;
  }

  getDetails() {
    const description = this.#description;
    const isMarked = this.#mark;
    return { description, isMarked };
  }
};
