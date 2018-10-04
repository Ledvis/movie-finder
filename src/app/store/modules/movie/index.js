import axios from "axios";

const state = {
  movies: [],
  genres: [],
  TOKEN: "d8cddbe535b2380383617e2ec77b290c"
};

const mutations = {
  LOAD_MOVIES(state, payload) {
    state.movies = payload;
  },
  LOAD_GENRES(state, payload) {
    state.genres = payload;
  }
};

const actions = {
  getMovies({ commit }) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          state.TOKEN
        }&language=en-US&page=1`
      )
      .then(response => {
        commit("LOAD_MOVIES", response.data.results);
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
  movieItemFromId: state => id => state.movies.find(movie => movie.id === id)
};

const store = {
  state,
  mutations,
  actions,
  getters
};

export default store;
