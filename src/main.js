import { createApp } from "vue";
import { createPinia } from "pinia";
// import { upperFirst, camelCase } from "lodash";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import App from "./App.vue";
import router from "./router";

import Swal from "sweetalert2";
import "nprogress/nprogress.css";

import "./assets/css/main.css";
//import 'sweetalert2/src/sweetalert2.scss'

import {LoadingPlugin} from "vue-loading-overlay";
import axios from "axios";
import NProgress from "nprogress";
import {API} from "./utils/api.url";
import {useManagerStore} from "./stores/manager";

window.Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  // csrf token
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    // check if user session expiry or not login
    if(
      [401, 419].includes(error.request.status) && !error.request.responseURL.endsWith("/v1/manager")
    ) {

      // logout
      const managerStore = useManagerStore();
      managerStore.logout();
    } else {
      return Promise.reject(error)
    }
  }
);

//
// for (const path in requireComponent) {
//     requireComponent[path]().then((mod) => {
//         console.log(path, mod)
//     })
// }

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(LoadingPlugin);

app.mount("#app");
