<style scoped>
#movie-list-item {
  position: relative;
  display: flex;
  width: 100%;
}

.bookmark-icon {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #00d1b2;
  cursor: pointer;
}

.movie-list-item__details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  padding: 20px 10px 0;
}

.movie-list-item__image {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-list-item__link {
  display: block;
}

.movie-list-item__description {
  padding-bottom: 10px;
}

.movie-list-item__created_at {
  font-size: 12px;
  padding-bottom: 10px;
}

.movie-list-item__button {
  max-width: 150px;
}

.movie-list-item__tag:not(:last-of-type) {
  margin-right: 10px;
}

.movie-rating__tag {
  margin-top: 10px;
}

.movie-rating__tag i {
  margin-left: 3px;
}

.bookmark-icon i {
  color: rgb(74, 74, 74);
}

.bookmark-icon i:hover {
  color: rgb(0, 209, 178);
}

.bookmark-icon i.fa-bookmark {
  color: rgb(0, 209, 178);
}
</style>

<template>
  <section id="movie-list-item" class="box">
    <span class="bookmark-icon">
      <i v-bind:class="[basicStarClass, additionalBookmarkClass]" v-on:click="addItemToFavorites"></i>
    </span>
    <div class="movie-list-item__details">
      <h1 class="title is-4">
        <router-link class="movie-list-item__link" v-bind:to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
        <p class="tag movie-list-item__tag" v-for="(genreId, index) in movie.genre_ids" v-bind:key="index">
          <MovieGenre v-bind:genre="getGenre(genreId)" v-if="genres"/>
        </p>
        <p>
          <span v-bind:class="[basicTagClass, additionalRatingClass]">
            {{ movie.vote_average }}
            <i class="fa fa-star"></i>
          </span>
        </p>
      </h1>
      <p class="movie-list-item__description">{{ movie.overview }}</p>
      <p class="movie-list-item__created_at">
        Release Date:
        <span class="has-text-weight-bold">{{ movie.release_date }}</span>
      </p>
    </div>
    <div class="movie-list-item__image">
      <img v-bind:src="(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`)" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import MovieGenre from "./MovieGenre";

export default {
  name: "MovieListItem",
  props: ["movie"],
  data() {
    return {
      basicStarClass: "fa fa-2x",
      basicTagClass: "tag movie-rating__tag",
      activeBookmarkClass: "fa-bookmark",
      inactiveBookmarkClass: "fa-bookmark-o"
    };
  },
  computed: {
    additionalBookmarkClass() {
      return this.isFavorite
        ? this.activeBookmarkClass
        : this.inactiveBookmarkClass;
    },
    additionalRatingClass() {
      switch (true) {
        case this.movie.vote_average < 6:
          return "is-danger";
        case this.movie.vote_average < 7:
          return "is-warning";
        case this.movie.vote_average < 8:
          return "is-info";
        case this.movie.vote_average < 9:
          return "is-link";
        case this.movie.vote_average < 10:
          return "is-success";
      }
    },
    isFavorite() {
      return this.$store.getters.isFavorite(this.movie.id);
    },
    ...mapGetters(["genres", "favoriteItem"])
  },
  methods: {
    getGenre(genreId) {
      const genreObj = this.genres.find(genre => {
        return genre.id === genreId;
      });

      if (genreObj) {
        return genreObj.name;
      }
    },
    addItemToFavorites() {
      this.$store.dispatch("addFavoriteItem", this.movie);
    }
  },
  components: {
    MovieGenre
  }
};
</script>
