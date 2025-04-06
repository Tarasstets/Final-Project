export function displayRandomSlogan() {
  const slogans = [
    "HAVE A NICE DAY",
    "MAKE IT HAPPEN",
    "YOU GOT THIS!",
    "STAY PRODUCTIVE",
    "KEEP MOVING FORWARD",
    "ONE TASK AT A TIME",
    "TODAY IS YOUR DAY",
    "FOCUS & FINISH",
    "BE YOUR BEST SELF",
  ];

  const sloganElement = document.querySelector(".page__slogan-text");
  const randomIndex = Math.floor(Math.random() * slogans.length);
  sloganElement.textContent = slogans[randomIndex];
}
