let count = 0;
let tasbih = 0;

const LIMIT = 100;  // counts per tasbih
const GOAL = 10;    // total tasbih goal

function increaseCount() {
  count++;

  if (count === LIMIT) {
    count = 0;
    tasbih++;

    if (tasbih === GOAL) {
      document.getElementById("goalMsg").innerText =
        "🎉 Spiritual Goal Achieved!";
    }
  }

  updateUI();
}

function resetAll() {
  count = 0;
  tasbih = 0;
  document.getElementById("goalMsg").innerText = "";
  updateUI();
}

function updateUI() {
  document.getElementById("count").innerText = count;
  document.getElementById("cycle").innerText = tasbih;
}
