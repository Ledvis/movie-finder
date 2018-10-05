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
  margin-top: 20px;
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

.fa-arrow-left {
  float: left;
  cursor: pointer;
}

.fa-arrow-left:hover {
  color: rgb(0, 209, 178);
}
</style>

<template>
  <div id="favorite">
    <div class="favorite--header has-text-centered">
      <i class="fa fa-2x fa-arrow-left" v-on:click="$router.go(-1)"></i>
      <i class="fa fa-2x fa-bookmark"></i>
    </div>
    <p class="favorite-empty-text has-text-centered" v-if="favoriteItems.length === 0">
      Add some items to the favorite list!
    </p>
    <ul>
      <li class="favorite-item" v-for="favoriteItem in favoriteItems" v-bind:key="favoriteItem.id">
        <FavoriteListItem v-bind:item="favoriteItem"/>
      </li>
      <div class="favorite-details">
        <p>Total Quantity:
          <span class="has-text-weight-bold">{{favoriteItemsQuantity}}</span>
        </p>
        <button class="favorite-remove-all--text" v-on:click="removeAllFavoriteItems" v-bind:disabled="favoriteItems.length === 0">
          <i class="fa fa-trash"></i>Remove all
        </button>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FavoriteListItem from "./FavoriteListItem";

export default {
  name: "FavoriteList",
  components: {
    FavoriteListItem
  },
  computed: {
    ...mapGetters(["favoriteItems", "favoriteItemsQuantity"])
  },
  methods: {
    ...mapActions(["removeAllFavoriteItems"])
  }
};
</script>
