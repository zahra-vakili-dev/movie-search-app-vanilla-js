import { state } from "./state.js";
import { fetchMovies } from "./api.js";
import { renderUI } from "./ui.js";

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const pageText = document.querySelector("#page");
const pagination = document.querySelector("#pagination");

export function renderPagination() {
  if (state.totalPages <= 1) {
    pagination.classList.add("hidden");
    return;
  }

  pagination.classList.remove("hidden");
  pageText.textContent = `${state.page} / ${state.totalPages}`;
  prevBtn.disabled = state.page === 1;
  nextBtn.disabled = state.page === state.totalPages;
}

prevBtn.addEventListener("click", async () => {
  if (state.page > 1) {
    state.page--;
    await fetchMovies();
    renderUI();
    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", async () => {
  if (state.page < state.totalPages) {
    state.page++;
    await fetchMovies();
    renderUI();
    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});