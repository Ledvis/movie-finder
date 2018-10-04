import axios from "axios";

const state = {
  token: null,
  loading: false
};

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  LOGIN_PENDING(state) {
    state.loading = true;
  },
  LOGIN_SUCCESS(state) {
    state.loading = false;
  }
};

const actions = {
  login({ commit }) {
    commit("LOGIN_PENDING");
    return new Promise(resolve => {
      const token = "d8cddbe535b2380383617e2ec77b290c";
      localStorage.setItem("token", token);
      commit("SET_TOKEN", token);
      commit("LOGIN_SUCCESS");
      resolve();
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      localStorage.removeItem("token");
      commit("SET_TOKEN", null);
      resolve();
    });
  }
};

const getters = {
  token: state => state.token,
  loading: state => state.loading
};

const store = {
  state,
  mutations,
  actions,
  getters
};

export default store;
