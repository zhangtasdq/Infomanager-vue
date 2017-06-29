// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "vue-awesome/icons";
import Vue from "vue";
import Icon from "vue-awesome/components/Icon";
import VueI18n from "vue-i18n"
import Toasted from "vue-toasted";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";

import "./assets/css/base.scss";
import App from "./App";
import router from "./router";
import AppConfig from "./configs/app-config";
import Language from "./i18n";
import storeBuilder from "./stores";


Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(Toasted, {duration: 1200, position: "top-center"});
Vue.use(Vuex);

Vue.component("icon", Icon)

const i18n = new VueI18n({
  locale: AppConfig.language,
  messages: Language
});

const store = storeBuilder();
sync(store, router);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  i18n,
  store
})
