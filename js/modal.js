import { state } from "./state.js";
import { fetchMovieDetails } from "./api.js";

const modal = document.querySelector("#modal");
const content = document.querySelector("#modalContent");
const closeBtn = document.querySelector("#closeModal");

function lockBodyScroll() {
  document.body.classList.add("overflow-hidden");
}

function unlockBodyScroll() {
  document.body.classList.remove("overflow-hidden");
}

export async function openModal(id) {
  modal.classList.remove("hidden");
  lockBodyScroll()
  content.innerHTML = "Loading...";
  await fetchMovieDetails(id);
  renderModal();
}

function renderModal() {
  const m = state.selectedMovie;
  if (!m) return;

  const poster =
    m.Poster !== "N/A"
      ? m.Poster
      : "./assets/placeholder.png";

  content.innerHTML = `
    <img src="${poster}" class="w-48 mx-auto rounded" />
    <h2 class="text-xl font-bold mt-4">${m.Title}</h2>
    <p class="text-sm text-gray-400">${m.Year} • ${m.Genre}</p>
    <p class="mt-2">⭐ ${m.imdbRating}</p>
    <p class="mt-4 text-sm leading-relaxed">${m.Plot}</p>
  `;
}

function closeModal() {
  modal.classList.add("hidden");
  state.selectedMovie = null;
  unlockBodyScroll()
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});