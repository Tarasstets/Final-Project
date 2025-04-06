import Task from "./task.js";
import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./localStorage.js";

export default class ToDoList {
  constructor() {
    this.tasks = this.loadTasks();
    this.statusFilter = "all";
    this.difficultyFilter = "all";
  }

  loadTasks() {
    const savedTasks = getTasksFromLocalStorage() || [];
    return savedTasks.map((task) =>
      Object.assign(new Task(task.taskInput, task.difficulty), {
        done: task.done,
      })
    );
  }

  saveTasks() {
    setTasksInLocalStorage(this.tasks);
  }

  addTask(taskInput, difficulty) {
    if (!taskInput.trim()) {
      alert("Please, fill the main field");
      return;
    }

    const newTask = new Task(taskInput, difficulty);
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.displayTasks();
  }

  toggleTaskDone(index) {
    this.tasks[index].toggleDone();
    this.saveTasks();
    this.displayTasks();
  }

  filterTasks() {
    return this.tasks.filter((task) => {
      const isDone = task.done === true;

      if (this.statusFilter === "in-progress" && isDone) return false;
      if (this.statusFilter === "done" && !isDone) return false;
      if (
        this.difficultyFilter !== "all" &&
        task.difficulty !== this.difficultyFilter
      )
        return false;

      return true;
    });
  }

  displayTasks() {
    const list = document.querySelector(".todo__list");
    list.innerHTML = "";

    this.filterTasks().forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "todo__item";

      const doneClass = task.done ? "task-done" : "";
      const difficultyClass =
        task.difficulty === "Easy"
          ? "easy"
          : task.difficulty === "Medium"
          ? "medium"
          : "hard";

      li.innerHTML = `
        <span class="task-text ${doneClass}">${task.taskInput}</span>
        <span class="difficulty ${doneClass}">(${task.difficulty})</span>
        <div class="todo__actions">
          <button class="todo__delete-btn" data-index="${index}">
            <img src="./src/img/delete.svg" alt="Delete" class="todo__delete-icon" data-index="${index}">
          </button>
          <button class="todo__edit-btn" data-index="${index}">
            <img src="./src/img/pencil.svg" alt="Edit" class="todo__edit-icon" data-index="${index}">
          </button>
          <button class="todo__done-btn" data-index="${index}">
            <img src="./src/img/done.svg" alt="Done" class="todo__done-icon" data-index="${index}">
          </button>
        </div>
      `;

      list.appendChild(li);
    });
  }

  editTask(index, newTaskInput, newDifficulty) {
    this.tasks[index].taskInput = newTaskInput;
    this.tasks[index].difficulty = newDifficulty;
    this.saveTasks();
    this.displayTasks();
  }

  setFilters(status, difficulty) {
    if (status !== null) this.statusFilter = status;
    if (difficulty !== null) this.difficultyFilter = difficulty;
    this.displayTasks();
  }
}
