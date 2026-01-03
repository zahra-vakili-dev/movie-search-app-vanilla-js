import { state } from "./state.js";
import { fetchMovies } from "./api.js";
import { renderUI } from "./ui.js";
import { renderPagination } from "./pagination.js";

const searchInput = document.querySelector("#search");
const typeSelect = document.querySelector("#type");
const yearInput = document.querySelector("#year");

let timer;

searchInput.addEventListener("input", e => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    state.query = e.target.value.trim();
    state.page = 1;

    if (!state.query) {
      state.movies = [];
      state.totalPages = 0;
      renderUI();
      renderPagination();
      return;
    }

    await fetchMovies();
    renderUI();
    renderPagination();
  }, 500);
});

typeSelect.addEventListener("change", async () => {
  state.type = typeSelect.value;
  state.page = 1;

  if (state.query) {
    await fetchMovies();
    renderUI();
    renderPagination();
  }
});

yearInput.addEventListener("input", () => {
  state.year = yearInput.value;
  state.page = 1;
});