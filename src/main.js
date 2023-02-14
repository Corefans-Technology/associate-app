import { createApp } from "vue";
import { createPinia } from "pinia";
import { upperFirst, camelCase } from "lodash";
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
