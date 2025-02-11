import { dragStart, dragEnd } from "./drag&drop.js";

function setCard(e) {
  // Guarda a referência do botão clicado
  const clickedButton = e.target;
  const floatingBox = document.querySelector(".floating-box");
  const form = document.querySelector("#cardForm");

  // Pega as coordenadas do botão clicado
  const buttonRect = clickedButton.getBoundingClientRect();

  // Posiciona o floatingBox
  floatingBox.style.position = "absolute";

  // Calcula a posição considerando o scroll
  const topPosition = buttonRect.bottom + window.scrollY;
  const leftPosition = buttonRect.left - 400 + window.scrollX;

  // Aplica as posições
  floatingBox.style.top = `${topPosition + 10}px`; // 10px de espaço do botão
  floatingBox.style.left = `${leftPosition}px`;

  // Verifica se o floatingBox vai sair da tela
  const floatingBoxRect = floatingBox.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Ajusta se estiver saindo pela direita
  if (leftPosition + floatingBoxRect.width > windowWidth) {
    floatingBox.style.left = `${windowWidth - floatingBoxRect.width - 20}px`;
  }

  // Ajusta se estiver saindo por baixo
  if (topPosition + floatingBoxRect.height > windowHeight) {
    floatingBox.style.top = `${
      buttonRect.top + window.scrollY - floatingBoxRect.height - 10
    }px`;
  }

  // Corrigindo a seleção da coluna
  const columnContainer = clickedButton.closest(".to-do, .in-progress, .done");
  const column = columnContainer.querySelector(".cards");

  const closeModal = () => {
    floatingBox.classList.remove("active");
    setTimeout(() => {
      floatingBox.style.display = "none";
      updatedForm.reset();
    }, 300);
  };

  // Remove todos os event listeners anteriores do form
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  // Atualiza a referência do form
  const updatedForm = document.querySelector("#cardForm");

  updatedForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(updatedForm);

    let tkn = formData.get("title") || "";
    let desc = formData.get("description") || "";
    let tgn = [];

    const tagsValue = formData.get("tags");
    tgn = tagsValue
      ? tagsValue
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "")
          .filter(Boolean)
      : [];

    if (tkn.trim()) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.draggable = true;
      card.innerHTML = `
        <h3>${tkn}</h3>
        <p>${desc}</p>
        <div class="tags">
          ${
            tgn.length > 0
              ? tgn.map((tag) => `<span>${tag}</span>`).join("")
              : ""
          }
        </div>
      `;

      // Adiciona na coluna correta
      column.appendChild(card);
      card.addEventListener("dragstart", dragStart);
      card.addEventListener("dragend", dragEnd);

      // Limpa o formulário imediatamente após adicionar o card
      updatedForm.reset();
    }

    closeModal();
  });

  // Mostra o floatingBox
  floatingBox.style.display = "block";
  setTimeout(() => floatingBox.classList.add("active"), 100);

  // Atualiza o listener do botão cancelar
  const newCancelButton = document.querySelector(".cancel");
  newCancelButton.addEventListener("click", closeModal);
  document
    .getElementById("closeFloatingBox")
    .addEventListener("click", closeModal);
}

// Adiciona o evento aos botões
document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", setCard);
});
