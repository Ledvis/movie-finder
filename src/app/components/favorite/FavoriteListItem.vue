<style scoped>
.box {
  height: 90px;
  padding: 10px;
}

.favorite-item__details {
  float: left;
  width: 250px;
  padding: 10px;
}

.favorite-item__image img {
  float: right;
  height: 70px;
}

.favorite-item__modify {
  cursor: pointer;
  margin: 0 1px;
}
</style>

<template>
  <div class="box">
    <div class="favorite-item__details">
      <p class="is-inline">
        <router-link v-bind:to="`/movies/${item.id}`">{{item.title}}</router-link>
      </p>
      <div>
        <span class="favorite-item--price has-text-primary has-text-weight-bold"></span>
        <span>
          <i class="fa fa-arrow-circle-up favorite-item__modify"  v-on:click="changeItemPosition({item, shift: -1})"></i>
          <i class="fa fa-arrow-circle-down favorite-item__modify" v-on:click="changeItemPosition({item, shift: 1})"></i>
        </span>
      </div>
    </div>
    <div class="favorite-item__image">
      <img v-bind:src="(`https://image.tmdb.org/t/p/w500/${item.poster_path}`)" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FavoriteListItem",
  props: ["item"],
  computed: {
    ...mapActions(["favoriteItemsQuantity"])
  },
  methods: {
    changeItemPosition(positionObj) {
      this.$store.dispatch("changeItemPosition", positionObj);
    }
  }
};
</script>
