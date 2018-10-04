import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login/index";
import movie from "./modules/movie/index";
import favorite from "./modules/favorite/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    movie,
    favorite
  }
});
