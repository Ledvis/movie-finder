import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../components/NotFound.vue";
import LoginBox from "../components/login/LoginBox.vue";
import MoviesList from "../components/movies/MoviesList.vue";
import MovieItem from "../components/movies/MovieItem.vue";
import FavoritesList from "../components/favorite/FavoritesList.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/movie-finder/",
      redirect: "/movie-finder/movies"
    },
    {
      path: "*",
      component: NotFound
    },
    {
      path: "/movie-finder/movies",
      component: MoviesList
    },
    {
      path: "/movie-finder/movies/:id",
      component: MovieItem,
      props: true
    },
    {
      path: "/movie-finder/favorites",
      component: FavoritesList
    },
    {
      path: "/movie-finder/login",
      component: LoginBox,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) next("/movie-finder/movies");
        next();
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.path !== "/movie-finder/login") next("/movie-finder/login");
  else next();
});

export default router;
