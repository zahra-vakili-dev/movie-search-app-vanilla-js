import { state } from "./state.js";

const API_KEY = "c55d2d62";
const API_URL = "https://www.omdbapi.com/";

export async function fetchMovies() {
  try {
    state.loading = true;
    state.error = null;

    const params = new URLSearchParams({
      apikey: API_KEY,
      s: state.query,
      page: state.page,
    });

    if (state.type !== "all") params.append("type", state.type);
    if (state.year) params.append("y", state.year);

    const res = await fetch(`${API_URL}?${params}`);
    const data = await res.json();

    if (data.Response === "False") {
      state.movies = [];
      state.totalPages = 0;
      state.error = data.Error;
      return;
    }

    state.movies = data.Search;
    state.totalPages = Math.ceil(data.totalResults / 10);
  } catch {
    state.error = "Something went wrong. Please try again.";
  } finally {
    state.loading = false;
  }
}

export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await res.json();
  state.selectedMovie = data;
}