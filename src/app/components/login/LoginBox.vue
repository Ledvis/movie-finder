<style scoped>
.box {
  padding: 30px;
}
.fa {
  margin-right: 5px;
}
</style>

<template>
  <div id="login" class="box has-text-centered">
    <h2 class="title">Fullstack Movies</h2>
    <button v-bind:class="[{'is-loading': loading}, 'button is-primary']" v-on:click="login">
      <i class="fa fa-sign-in"></i>
      Login
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginBox",
  methods: {
    login() {
      this.$store.dispatch("login").then(() => {
        this.$router.push("/movies");
      });
    }
  },
  computed: {
    ...mapGetters(["loading"])
  }
};
</script>
