import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import "./style.css";
import App from "./App.vue";

import Dashboard from "./views/Dashboard.vue";
import Informations from "./views/Informations.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/info", component: Informations },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
