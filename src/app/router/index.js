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
      path: "/",
      redirect: "/movies"
    },
    {
      path: "*",
      component: NotFound
    },
    {
      path: "/movies",
      component: MoviesList
    },
    {
      path: "/movies/:id",
      component: MovieItem,
      props: true
    },
    {
      path: "/favorites",
      component: FavoritesList
    },
    {
      path: "/login",
      component: LoginBox,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) next("/movies");
        next();
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.path !== "/login") next("/login");
  else next();
});

export default router;
