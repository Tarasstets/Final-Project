import ToDoList from "./toDoList.js";
import UI from "./ui.js";
import updateClock from "./clock.js";
import { displayRandomSlogan } from "./slogan.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = new ToDoList();
  const ui = new UI(todoList);

  ui.render();

  setInterval(updateClock, 1000);
  displayRandomSlogan();
});
