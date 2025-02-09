const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".cards");

function dragStart(event) {
  event.currentTarget.classList.add("is-dragging");
}

function dragEnd(event) {
  event.currentTarget.classList.remove("is-dragging");
  event.currentTarget.classList.remove("over");
}

function dragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("over");
}

function drop(event) {
  event.preventDefault();
  const currentCard = document.querySelector(".is-dragging");
  const currentColumn = document.querySelector(".over");
  event.currentTarget.appendChild(currentCard);
  currentColumn.classList.remove("over");
}

function dragEnter(event) {
  event.currentTarget.classList.add("over");
}

function dragLeave(event) {
  event.currentTarget.classList.remove("over");
}

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
});

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", drop);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
});
