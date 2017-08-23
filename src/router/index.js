import Vue from 'vue'
import Router from "vue-router";

import Login from "@/views/Login";
import InfoList from "@/views/InfoList";
import InfoEdit from "@/views/InfoEdit";
import InfoDetailEdit from "@/views/InfoDetailEdit";
import InfoShow from "@/views/InfoShow";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    }, {
      path: "/infoList",
      name: "InfoList",
      component: InfoList
    }, {
      path: "/infoEdit/:action/:id",
      name: "InfoEdit",
      component: InfoEdit
    }, {
      path: "/infoDetailEdit",
      name: "InfoDetailEdit",
      component: InfoDetailEdit
    }, {
      path: "/infoShow/:id",
      name: "InfoShow",
      component: InfoShow
    }
  ]
})
