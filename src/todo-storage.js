class TodoStorage {
  #fs;
  #filePath;

  constructor(fs) {
    this.#fs = fs;
    this.#filePath = "./resources/task-lists-detail.json";
  }

  save(todoDetails) {
    this.#fs.writeFileSync(this.#filePath, JSON.stringify(todoDetails, null, 2));
  }

  get() {
    try {
      return JSON.parse(this.#fs.readFileSync(this.#filePath, "utf-8"));
    } catch (error) {
      this.#fs.writeFileSync(this.#filePath, "[]");
      return [];
    };
  }
}

module.exports = { TodoStorage };