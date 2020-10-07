import Vue from "vue";
import VueRouter from "vue-router";
import "../common/myUtils";
import "../common/vue-global";
import "../common/myGlobal";
import "../common/axios";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/emoji",
    name: "emoji",
    component: () => import("../components/emoji/index")
  },
  {
    path: "/systemManage",
    name: "systemManage",
    component: () => import("../views/main/systemManage")
  },
  {
    path: "/",
    name: "list",
    component: () => import("../views/main/personList")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/account/register")
  }, {
    path: "*",
    name: "notFound",
    component: () => import("../views/error/notFound")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
