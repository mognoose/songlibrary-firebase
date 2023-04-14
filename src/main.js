import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from "vue3-icon";
import VueSocialSharing from "vue-social-sharing";
const { DateTime } = require("luxon");

let app = createApp(App);

app.config.globalProperties.$version = 'ALPHA 0.3.2';

app.use(store)
  .use(router)
  .use(VueSocialSharing)
  .component("svg-icon", SvgIcon)
  .mount('#app');

app.config.globalProperties.$luxonDateTime = DateTime;

