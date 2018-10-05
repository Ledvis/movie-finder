<style scoped>
.autocomplete-results {
  padding: 0;
  margin: 0;
  max-height: 120px;
  border: 1px solid #eeeeee;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover,
.autocomplete-result.is-active {
  background-color: #4aae9b;
  color: white;
}
</style>

<template>
  <div class="field" v-if="movies">
    <div v-bind:class="[{'is-loading': isLoading}, 'control']">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-primary" type="text" placeholder="Serch film by title" 
        v-model="search" 
        v-on:input="onChange"  
        v-on:keydown.down="onArrowDown"
        v-on:keydown.up="onArrowUp"
        v-on:keydown.enter="onEnter"/>
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
        <span class="icon is-small is-right" v-show="!isLoading">
          <i class="fa fa-check"></i>
        </span>
      </p>
      <ul class="autocomplete-results" v-show="isOpen && search.length !== 0">
        <li class="autocomplete-result" v-bind:class="{ 'is-active': index === arrowCounter }" v-for="(result, index) in results" v-bind:key="index">
          <router-link v-bind:to="`/movies/${result.id}`">{{result.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSearch",
  props: ["movies"],
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1
    };
  },
  methods: {
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.movies.filter(
        movie =>
          movie.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      alert("hello");
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>
