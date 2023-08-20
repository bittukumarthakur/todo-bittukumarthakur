class TodoStorage {
  constructor() {
  }

  getDetails() {
    return JSON.parse(localStorage.getItem("todo")) || [];
  }

  save(data) {
    console.log(">>", data);
    localStorage.setItem("todo", JSON.stringify(data));
  }
}