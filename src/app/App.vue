<style>
html,
body {
  background: #f2f6fa;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}

.columns {
  flex-grow: 1;
  padding: 0 10px;
}

.column--align-center {
  margin: 0 auto;
}

.navigation-buttons {
  position: absolute;
  top: 5px;
  width: 99%;
  z-index: 99;
}

.navigation-buttons .button {
  margin: 0 2px;
}

.navigation-buttons .button .fa {
  padding-right: 5px;
}
</style>

<template>
  <div id="app">
    <div class="navigation-buttons" v-if="$route.path !== '/login'">
      <button class="button is-pulled-left" v-on:click="logout">
        <i class="fa fa-sign-out"></i>
        <span>Logout</span>
      </button>
      <div class="is-pulled-right">
        <a class="button" v-on:click="$router.push('/favorites')">
          <i class="fa fa-bookmark"></i><span>Favorites: {{favoriteItemsQuantity}}</span>
        </a>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-6 column--align-center">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    updateState() {
      this.$store.dispatch("getMovies");
      this.$store.dispatch("getGenres");
      this.$store.dispatch("getFavoriteItems");
    }
  },
  computed: {
    ...mapGetters(["favoriteItemsQuantity", "token"])
  },
  created() {
    const token = localStorage.getItem("token");

    if (token) {
      this.updateState();
    }
  },
  watch: {
    token() {
      if (this.token) {
        this.updateState();
      }
    }
  }
};
</script>
