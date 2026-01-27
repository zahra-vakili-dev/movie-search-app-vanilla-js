import { state } from "./state.js";
import { openModal } from "./modal.js";

const grid = document.querySelector("#moviesGrid");
const message = document.querySelector("#message");

// rendering
export function renderUI() {
  if (state.loading) {
    grid.innerHTML = skeletons();
    message.textContent = "";
    return;
  }

  if (state.error) {
    grid.innerHTML = "";
    message.textContent = state.error;
    return;
  }

  if (state.movies.length === 0) {
    grid.innerHTML = "";
    message.textContent = "Search for a movie or series 🎬";
    return;
  }

  message.textContent = "";
  grid.innerHTML = state.movies.map(movieCard).join("");

  document.querySelectorAll("[data-id]").forEach(card => {
    card.addEventListener("click", () =>
      openModal(card.dataset.id)
    );
  });
}

// show movie cards
function movieCard(movie) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "./assets/placeholder.png";

  return `
    <div data-id="${movie.imdbID}"
      class="cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
      <img src="${poster}" class="w-full h-72 object-cover" />
      <div class="p-3">
        <h3 class="font-semibold">${movie.Title}</h3>
        <p class="text-sm text-gray-400">${movie.Year}</p>
      </div>
    </div>
  `;
}

// skelet of loadind
function skeletons() {
  return Array(10).fill(0).map(() => `
    <div class="bg-gray-700 h-80 rounded animate-pulse"></div>
  `).join("");
}
