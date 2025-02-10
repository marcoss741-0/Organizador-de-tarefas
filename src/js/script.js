const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".cards");
const addButton = document.querySelectorAll(".add-button");
const modal = document.querySelector(".modal");

let tkn = "teste";
let desc = "teste";
let tgn = ["teste", "teste2"];

function setCard(e) {
  modal.style.display = "flex";
  const form = document.querySelector("#cardForm");
  const cancelButton = document.querySelector(".cancel");

  const closeModal = (e) => {
    modal.style.display = "none";
    form.reset();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Pega os valores do form
    const dados = new FormData(form);

    tkn = dados.get("titulo") || "";
    desc = dados.get("descricao") || "";

    const tagsValue = dados.get("tags");
    tgn = tagsValue
      ? tagsValue
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
      : [];

    //cria o card e adiciona na coluna recebendo os valores do form
    const column =
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".cards"
      );

    const card = document.createElement("div");
    card.classList.add("card");
    card.draggable = true;
    card.innerHTML = `


    <h3>${tkn}</h3>
    <p>${desc}</p>
    <div class="tags">
      ${tgn.map((tgn) => `<span>${tgn}</span>`).join("")}
    </div>
  `;

    column.appendChild(card);

    // Adiciona os eventos de drag and drop no novo card
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);

    closeModal();
  });

  cancelButton.addEventListener("click", closeModal);
}

addButton.forEach((button) => {
  button.addEventListener("click", setCard);
});

//funções de drag and drop

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
