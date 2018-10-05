<style scoped>
.tag {
  cursor: pointer;
}

.movies--header {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 15px;
}

.movie-list {
  padding-top: 10px;
}

.movie-list--item {
  padding: 10px 0;
}

.movie-load {
  text-align: center;
}

.fa {
  margin-bottom: 10px;
}
</style>

<template>
  <div id="movies" class="box">
    <div class="movies--header has-text-centered">
      <i class="fa fa-2x fa-film"></i>
      <MovieSearch v-bind:movies="movies"/>
    </div>
    <div class="movie-list">
      <div class="movie-list--item" v-for="movie in movies" v-bind:key="movie.id">
        <MovieListItem v-bind:movie="movie"/>
      </div>
    </div>
    <div class="movie-count has-text-right">
      <span class="has-text-weight-bold"># of movies: {{moviesQuantity}}</span>
    </div>
    <div class="movie-load">
      <button v-bind:class="[{'is-loading': loading}, 'button is-primary']" v-on:click="getMovies">Load more...</button>
    </div>
  </div>  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieListItem from "./MovieListItem";
import MovieSearch from "./MovieSearch";

export default {
  name: "MovieList",
  components: {
    MovieListItem,
    MovieSearch
  },
  computed: {
    ...mapGetters(["movies", "moviesQuantity", "loading"])
  },
  methods: {
    ...mapActions(["getMovies"])
  }
};
</script>
