export default class Task {
  constructor(taskInput, difficulty) {
    this.taskInput = taskInput;
    this.difficulty = difficulty;
    this.done = false;
  }

  toggleDone() {
    this.done = !this.done;
  }
}
