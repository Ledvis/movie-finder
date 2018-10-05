import axios from "axios";

const state = {
  movies: [],
  genres: [],
  TOKEN: "d8cddbe535b2380383617e2ec77b290c",
  page: 1,
  loading: false
};

const mutations = {
  LOAD_MOVIES(state, payload) {
    state.movies = [...state.movies, ...payload];
  },
  LOAD_GENRES(state, payload) {
    state.genres = payload;
  },
  LOGIN_PENDING(state) {
    state.loading = true;
  },
  LOGIN_SUCCESS(state) {
    state.loading = false;
  }
};

const actions = {
  getMovies({ commit }) {
    commit("LOGIN_PENDING");
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          state.TOKEN
        }&language=en-US&page=${state.page++}`
      )
      .then(response => {
        commit("LOAD_MOVIES", response.data.results);
        commit("LOGIN_SUCCESS");
      });
  },
  getGenres({ commit }) {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          state.TOKEN
        }&language=en-US`
      )
      .then(response => {
        commit("LOAD_GENRES", response.data.genres);
      });
  }
};

const getters = {
  movies: state => state.movies,
  moviesQuantity: state => state.movies.length,
  genres: state => state.genres,
  TOKEN: state => state.TOKEN,
  movieItemFromId: state => id => state.movies.find(movie => movie.id === id)
};

const store = {
  state,
  mutations,
  actions,
  getters
};

export default store;
