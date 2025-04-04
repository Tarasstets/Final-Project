import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./localStorage.js";

class Task {
  constructor(taskInput, difficulty) {
    this.taskInput = taskInput;
    this.difficulty = difficulty;
    this.done = false;
  }

  toggleDone() {
    this.done = !this.done;
  }
}

class ToDoList {
  constructor() {
    this.tasks = this.loadTasks();
    this.statusFilter = "all";
    this.difficultyFilter = "all";
  }

  loadTasks() {
    return getTasksFromLocalStorage() || [];
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
    this.displayTasks();
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

      li.innerHTML = `
        <span class="task-text ${doneClass}">${task.taskInput}</span>
        <span class="difficulty ${doneClass}">${task.difficulty}</span>
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

document.addEventListener("DOMContentLoaded", () => {
  const todoList = new ToDoList();
  todoList.displayTasks();

  const taskInput = document.getElementById("todo-input");
  const difficultySelect = document.querySelector("select[name='priority']");
  const addBtn = document.querySelector(".todo__submit-btn");

  addBtn.addEventListener("click", () => {
    const taskInputValue = taskInput.value.trim();
    const difficultyValue = difficultySelect.value;
    todoList.addTask(taskInputValue, difficultyValue);
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo__delete-icon")) {
      const index = event.target.getAttribute("data-index");
      todoList.deleteTask(index);
    }

    if (event.target.classList.contains("todo__done-icon")) {
      const index = event.target.getAttribute("data-index");
      todoList.toggleTaskDone(index);
    }
  });

  const modal = document.getElementById("edit-modal");
  const modalInput = document.getElementById("edit-task-input");
  const modalSelect = document.getElementById("edit-difficulty");
  const modalSave = document.getElementById("modal-save");
  const modalClose = document.getElementById("modal-close");

  document.addEventListener("click", (event) => {
    if (event.target.closest(".todo__edit-btn")) {
      const btn = event.target.closest(".todo__edit-btn");
      const index = btn.getAttribute("data-index");
      const task = todoList.tasks[index];

      modalInput.value = task.taskInput;
      modalSelect.value = task.difficulty;

      modal.style.display = "flex";
    }

    if (event.target === modal || event.target === modalClose) {
      modal.style.display = "none";
    }
  });

  modalSave.addEventListener("click", () => {
    const index = editingIndex;
    if (index !== null) {
      const newTaskInput = modalInput.value;
      const newDifficulty = modalSelect.value;
      todoList.editTask(index, newTaskInput, newDifficulty);
      modal.style.display = "none";
    }
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const status = btn.getAttribute("data-status");
      const difficulty = btn.getAttribute("data-difficulty");

      todoList.setFilters(status, difficulty);
    });
  });
});
