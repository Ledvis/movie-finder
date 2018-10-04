<style scoped>
#favorite {
  height: 100%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.favorite-empty-text {
  padding: 10px 0;
}

.favorite--header {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 15px;
}

.favorite-item {
  padding: 10px 0;
}

.favorite-details {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.favorite-remove-all--text {
  cursor: pointer;
}

.favorite-remove-all--text .fa {
  padding-right: 5px;
}
</style>

<template>
  <div id="favorite">
    <div class="favorite--header has-text-centered">
      <i class="fa fa-2x fa-shopping-favorite"></i>
    </div>
    <p class="favorite-empty-text has-text-centered">
      Add some items to the favorite!
    </p>
    <ul>
      <li class="favorite-item" v-for="favoriteItem in favoriteItems" v-bind:key="favoriteItem.id">
        <FavoriteListItem v-bind:item="favoriteItem"/>
      </li>
      <div class="favorite-details">
        <p>Total Quantity:
          <span class="has-text-weight-bold">{{favoriteItemsQuantity}}</span>
        </p>
        <p class="favorite-remove-all--text">
          <i class="fa fa-trash"></i>Remove all
        </p>
      </div>
    </ul>
    <button class="button is-primary">
      Checkout (<span class="has-text-weight-bold">$</span>)
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FavoriteListItem from "./FavoriteListItem";

export default {
  name: "FavoriteList",
  components: {
    FavoriteListItem
  },
  computed: {
    ...mapGetters(["favoriteItems", "favoriteItemsQuantity"])
  }
};
</script>
