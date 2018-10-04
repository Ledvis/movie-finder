const state = {
  favoriteItems: []
};

const mutations = {
  ADD_FAVORITE_ITEM(state, payload) {
    payload.favorite = true;
    state.favoriteItems.push(payload);
  },
  REMOVE_FAVORITE_ITEM(state, payload) {
    state.favoriteItems.splice(payload, 1);
  },
  GET_FAVORITE_ITEMS(state, payload) {
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
      commit("ADD_FAVORITE_ITEM", cartItem);
      localStorage.favoriteItems = JSON.stringify(state.favoriteItems);
    }
  },
  getFavoriteItems({ commit }) {
    commit(
      "GET_FAVORITE_ITEMS",
      JSON.parse(localStorage.favoriteItems || "[]")
    );
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
  }
};

const store = {
  state,
  mutations,
  actions,
  getters
};

export default store;
