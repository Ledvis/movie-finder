<style scoped>
#movie-item {
  position: relative;
  width: 100%;
  margin: 60px auto 0;
}

.return-icon {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #00d1b2;
  cursor: pointer;
}

.movie-item__details {
  margin-bottom: 20px;
  text-align: center;
}

.movie-item__image {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-item__image img {
  object-fit: cover;
}
</style>

<template>
  <section id="movie-item" class="box">
    <span class="return-icon" v-on:click="$router.go(-1)">
      <i class="fa fa-arrow-left is-primary"></i>
    </span>
    <div class="movie-item__details">
      <h1 class="title is-4">
        <p>{{ movieItem.title }}</p>
      </h1>
    </div>
    <div class="movie-item__image">
      <iframe width="auto" height="315" v-bind:src="(`https://www.youtube.com/embed/${youtubeKey}`)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "movieItem",
  props: ["id"],
  computed: {
    movieItem() {
      return this.$store.getters.movieItemFromId(parseInt(this.id));
    },
    ...mapGetters(["token"])
  },
  data() {
    return {
      youtubeKey: null
    };
  },
  methods: {
    searchSource() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${
            this.token
          }&language=en-US`
        )
        .then(response => {
          this.youtubeKey = response.data.results[0].key;
        });
    }
  },
  created() {
    this.searchSource();
  }
};
</script>
