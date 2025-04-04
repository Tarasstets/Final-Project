import {
  getTasksFromLocalStorage,
  setTasksInLocalStorage,
} from "./localStorage.js";

const list = document.querySelector(".todo__list");
let editingIndex = null;

export function displayTasks(tasks) {
  console.log("Displaying tasks:", tasks);
  list.innerHTML = ""; // Clear the list before displaying tasks
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo__item";
    li.innerHTML = `
      <span class="task-text">${task.taskInput}</span>
      <span class="difficulty">${task.difficulty}</span>
      <div class="todo__actions">
        <button class="todo__delete-btn" data-index="${index}">
        <img src="./src/img/delete.svg" alt="Delete" class="todo__delete-icon"
        </button>
        <button class="todo__edit-btn" data-index="${index}">
        <img src="./src/img/pencil.svg" alt="Delete" class="todo__edit-icon"
        </button>
        <button class="todo__done-btn" data-index="${index}">
        <img src="./src/img/done.svg" alt="Delete" class="todo__done-icon"
        </button>
      </div>
    `;
    list.appendChild(li);
  });
}

export function addTask(taskInput, difficulty) {
  console.log("Adding task:", taskInput, difficulty);
  if (!taskInput.trim()) {
    alert("Please, fill the main field");
    return;
  }

  const tasks = getTasksFromLocalStorage();
  tasks.push({ taskInput, difficulty });
  setTasksInLocalStorage(tasks);
  displayTasks(tasks);
}

const taskInput = document.getElementById("todo-input");
const difficultySelect = document.querySelector("select[name='priority']");
const addBtn = document.querySelector(".todo__submit-btn");

addBtn.addEventListener("click", () => {
  const taskInputValue = taskInput.value.trim();
  const difficultyValue = difficultySelect.value;
  addTask(taskInputValue, difficultyValue);
});

document.addEventListener("DOMContentLoaded", () => {
  const tasks = getTasksFromLocalStorage(); // Отримуємо завдання з localStorage
  displayTasks(tasks); // Відображаємо їх у списку
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__delete-icon")) {
    const index = event.target.getAttribute("data-index"); // Отримуємо індекс завдання
    const tasks = getTasksFromLocalStorage(); // Отримуємо список завдань
    tasks.splice(index, 1); // Видаляємо завдання з масиву
    setTasksInLocalStorage(tasks); // Оновлюємо LocalStorage
    displayTasks(tasks); // Оновлюємо список на сторінці
  }

  // DONE
  if (event.target.classList.contains("todo__done-icon")) {
    const taskItem = event.target.closest(".todo__item");
    const taskText = taskItem.querySelector(".task-text");
    const taskDifficulty = taskItem.querySelector(".difficulty");

    taskText.classList.toggle("task-done");
    taskDifficulty.classList.toggle("task-done");
  }
});

const modal = document.getElementById("edit-modal");
const modalInput = document.getElementById("edit-task-input");
const modalSelect = document.getElementById("edit-difficulty");
const modalSave = document.getElementById("modal-save");
const modalClose = document.getElementById("modal-close");

document.addEventListener("click", (event) => {
  // Відкриття модального вікна
  if (event.target.closest(".todo__edit-btn")) {
    const btn = event.target.closest(".todo__edit-btn");
    editingIndex = parseInt(btn.getAttribute("data-index"));
    const tasks = getTasksFromLocalStorage();
    const task = tasks[editingIndex];

    modalInput.value = task.taskInput;
    modalSelect.value = task.difficulty;

    modal.style.display = "flex";
  }

  // Закриття
  if (event.target === modal || event.target === modalClose) {
    modal.style.display = "none";
  }
});

// Збереження змін
modalSave.addEventListener("click", () => {
  const tasks = getTasksFromLocalStorage();

  if (editingIndex !== null && tasks[editingIndex]) {
    tasks[editingIndex].taskInput = modalInput.value;
    tasks[editingIndex].difficulty = modalSelect.value;

    setTasksInLocalStorage(tasks);
    displayTasks(tasks);

    modal.style.display = "none";
    editingIndex = null;
  }
});
