const arrayMove = require("array-move");

const state = {
  favoriteItems: []
};

const mutations = {
  ADD_FAVORITE_ITEM(state, payload) {
    state.favoriteItems.push(payload);
  },
  REMOVE_FAVORITE_ITEM(state, payload) {
    state.favoriteItems.splice(payload, 1);
  },
  GET_FAVORITE_ITEMS(state, payload) {
    state.favoriteItems = payload;
  },
  UPDATE_FAVORITE_ITEMS(state, payload) {
    state.favoriteItems = payload;
  }
};

const actions = {
  addFavoriteItem({ commit }, cartItem) {
    const itemIndex = state.favoriteItems.findIndex(item => {
      return item.id === cartItem.id;
    });

    if (itemIndex !== -1) {
      commit("REMOVE_FAVORITE_ITEM", itemIndex);
      localStorage.favoriteItems = JSON.stringify(state.favoriteItems);
    } else {
      cartItem.favorite = true;
      commit("ADD_FAVORITE_ITEM", cartItem);
      localStorage.favoriteItems = JSON.stringify(state.favoriteItems);
    }
  },
  getFavoriteItems({ commit }) {
    commit(
      "GET_FAVORITE_ITEMS",
      JSON.parse(localStorage.favoriteItems || "[]")
    );
  },
  removeAllFavoriteItems({ commit }) {
    commit("UPDATE_FAVORITE_ITEMS", []);
    localStorage.removeItem("favoriteItems");
  },
  changeItemPosition({ commit }, { item, shift }) {
    const position = state.favoriteItems.indexOf(item);
    const shiftedItemsArr = arrayMove(
      state.favoriteItems,
      position,
      position + shift
    );
    commit("UPDATE_FAVORITE_ITEMS", shiftedItemsArr);
    localStorage.favoriteItems = JSON.stringify(shiftedItemsArr);
  }
};

const getters = {
  favoriteItemsQuantity: state => state.favoriteItems.length,
  favoriteItems: state => state.favoriteItems,
  isFavorite: state => id => {
    return state.favoriteItems.find(item => {
      if (item.id === id && item.favorite === true) {
        return item;
      }
    });
  },
  favoriteMovieItem: state => id => {
    const arr = JSON.parse(localStorage.favoriteItems);
    return arr.find(item => {
      if (item.id === id) {
        return item;
      }
    });
  }
};

const store = {
  state,
  mutations,
  actions,
  getters
};

export default store;
