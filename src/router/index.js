import Vue from 'vue'
import Router from "vue-router";

import Login from "@/views/Login";
import InfoList from "@/views/InfoList";
import InfoEdit from "@/views/InfoEdit";
import InfoDetailEdit from "@/views/InfoDetailEdit";

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
      path: "/infoEdit",
      name: "InfoEdit",
      component: InfoEdit
    }, {
      path: "/infoDetailEdit",
      name: "InfoDetailEdit",
      component: InfoDetailEdit
    }
  ]
})
