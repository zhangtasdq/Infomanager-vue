// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import VueI18n from "vue-i18n"
import Toasted from "vue-toasted";
import Vuex from "vuex";

import "./assets/css/base.scss";
import AppConfig from "./configs/app-config";
import Language from "./i18n";
import storeBuilder from "./stores";


Vue.config.productionTip = false

Vue.use(VueI18n);
Vue.use(Toasted, {duration: 1500, position: "top-center"});
Vue.use(Vuex);

Vue.component("icon", Icon)

const i18n = new VueI18n({
  locale: AppConfig.language,
  messages: Language
});

const store = storeBuilder();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  i18n,
  store
})
