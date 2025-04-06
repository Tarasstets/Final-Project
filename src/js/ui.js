import ToDoList from "./toDoList.js";

export default class UI {
  constructor(todoList) {
    this.todoList = todoList;
    this.taskInput = document.getElementById("todo-input");
    this.difficultySelect = document.querySelector("select[name='priority']");
    this.addBtn = document.querySelector(".todo__submit-btn");
    this.modal = document.getElementById("edit-modal");
    this.modalInput = document.getElementById("edit-task-input");
    this.modalSelect = document.getElementById("edit-difficulty");
    this.modalSave = document.getElementById("modal-save");
    this.modalClose = document.getElementById("modal-close");

    this.addEventListeners();

    this.taskInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.addTask();
      }
    });
  }

  addEventListeners() {
    this.addBtn.addEventListener("click", () => this.addTask());
    document.addEventListener("click", (event) =>
      this.handleTaskActions(event)
    );
    this.modalSave.addEventListener("click", () => this.saveEditedTask());
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.filterTasks(btn));
    });
  }

  render() {
    this.todoList.displayTasks();
  }

  addTask() {
    const taskInputValue = this.taskInput.value.trim();
    const difficultyValue = this.difficultySelect.value;

    if (taskInputValue) {
      this.todoList.addTask(taskInputValue, difficultyValue);
      this.taskInput.value = "";
      this.render();
    }
  }

  handleTaskActions(event) {
    if (event.target.classList.contains("todo__delete-icon")) {
      const index = event.target.getAttribute("data-index");
      this.todoList.deleteTask(index);
    }

    if (event.target.closest(".todo__done-btn")) {
      const btn = event.target.closest(".todo__done-btn");
      const index = btn.getAttribute("data-index");
      this.todoList.toggleTaskDone(index);
    }

    if (event.target.closest(".todo__edit-btn")) {
      const btn = event.target.closest(".todo__edit-btn");
      const index = btn.getAttribute("data-index");
      const task = this.todoList.tasks[index];

      this.editingIndex = index;
      this.modalInput.value = task.taskInput;
      this.modalSelect.value = task.difficulty;

      this.modal.style.display = "flex";
    }

    if (event.target === this.modal || event.target === this.modalClose) {
      this.modal.style.display = "none";
    }
  }

  saveEditedTask() {
    const index = this.editingIndex;
    if (index !== null) {
      const newTaskInput = this.modalInput.value;
      const newDifficulty = this.modalSelect.value;
      this.todoList.editTask(index, newTaskInput, newDifficulty);
      this.modal.style.display = "none";
    }
  }

  filterTasks(btn) {
    const status = btn.getAttribute("data-status");
    const difficulty = btn.getAttribute("data-difficulty");

    this.todoList.setFilters(status, difficulty);
  }
}
