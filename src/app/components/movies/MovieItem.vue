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

.fa-arrow-left:hover {
  color: rgb(0, 209, 178);
}
</style>

<template>
  <section id="movie-item" class="box" v-if="item">
    <span class="return-icon" v-on:click="$router.go(-1)">
      <i class="fa fa-2x fa-arrow-left"></i>
    </span>
    <div class="movie-item__details">
      <h1 class="title is-4">
        <p>{{ item.title }}</p>
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
    favoriteMovieItem() {
      return this.$store.getters.favoriteMovieItem(parseInt(this.id));
    },
    item() {
      return this.movieItem || this.favoriteMovieItem;
    },
    ...mapGetters(["TOKEN"])
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
            this.TOKEN
          }&language=en-US`
        )
        .then(response => {
          this.youtubeKey = response.data.results[0].key;
        })
        .catch(err => window.console.log(err));
    }
  },
  created() {
    this.searchSource();
  }
};
</script>
