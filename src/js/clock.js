export default function updateClock() {
  const clock = document.querySelector(".todo__time");
  const now = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateStr = now.toLocaleDateString("uk", options);
  const timeStr = now.toLocaleTimeString("uk");

  clock.querySelector(".todo__time").innerHTML = `${dateStr}, ${timeStr}`;
}
