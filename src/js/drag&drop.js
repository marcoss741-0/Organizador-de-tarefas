const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".cards");

//funções de drag and drop

export function dragStart(e) {
  e.target.classList.add("is-dragging");
}

export function dragEnd(e) {
  e.target.classList.remove("is-dragging");
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

// Adiciona os listeners para as áreas que podem receber cards
document.querySelectorAll(".cards").forEach((cards) => {
  cards.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".is-dragging");
    const notDraggingCards = [
      ...cards.querySelectorAll(".card:not(.is-dragging)"),
    ];

    cards.classList.add("over");

    const nextCard = notDraggingCards.find((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterY = cardRect.top + cardRect.height / 2;
      return e.clientY < cardCenterY;
    });

    if (nextCard) {
      cards.insertBefore(dragging, nextCard);
    } else {
      cards.appendChild(dragging);
    }
  });

  cards.addEventListener("dragleave", () => {
    cards.classList.remove("over");
  });

  cards.addEventListener("drop", (e) => {
    e.preventDefault();
    cards.classList.remove("over");
  });
});

//exportando as funções para usar de forma externa
