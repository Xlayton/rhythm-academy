import Vue from "vue";
import App from "./App.vue";
import GamePage from "./pages/GamePage.vue";
import HomePage from "./pages/HomePage.vue";
import VueRouter from "vue-router";
Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/game", name: "game", component: GamePage },
];

const router = new VueRouter({ routes });

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
