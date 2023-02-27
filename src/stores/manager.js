// import { ref, computed } from "vue";
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";
import Cookies from "js-cookie";

export const useManagerStore = defineStore("manager", {
  persist: true,
  state: () => ({
    data: null,
    email: null,
    pin: null,
    banks: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.data,
    getEmail: (state) => state.data?.email,
  },
  actions: {
    async login(form) {
      await this.csrf()
      await API.post(ROUTES().login,  {
        email: form.email,
        password: form.password,
      });
      await this.profile()
    },

    async profile() {
      this.data = await API.get(ROUTES().profile);
    },

    async csrf() {
      await API(ROUTES().csrfCookie);
    },

    async forgetPassword(form) {
      await this.csrf();
      return await API(ROUTES().forgetPassword, {
        method: "POST",
        body: form,
      })
    },
    async verifyToken(form) {
      await this.csrf();
      return await API(ROUTES().verifyToken, {
        method: "POST",
        body: form,
      })
    },
    async resetPassword(form) {
      await this.csrf();
      return await API(ROUTES().resetPassword, {
        method: "POST",
        body: form,
      })
    },
    async verifyInviteCode(code) {
      await this.csrf();
      return await API(ROUTES().verifyInviteCode, {
        method: "POST",
        body: {
          invite_code: code,
        },
      });
    },
    async passwordUpdate(form) {
      return await API(ROUTES().changePassword, {
        method: "POST",
        body: form,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
    },
    async profileUpdate(form) {


      const formData = new FormData();

      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("email", form.email);
      formData.append("phone_number", form.phone_number);

      if (typeof form.photo !== "string") {
        formData.append("photo", form.photo);
      }


      const { data } = await API(ROUTES().profileUpdate, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.data = data;
    },
    async signUp(form) {
      const { data } = await API(ROUTES().register, {
        method: "POST",
        body: form,
      });

      this.data = data;

    },

    logout() {
      API(ROUTES().logout, {
        method: "POST",
      }).finally(() => {
        localStorage.removeItem("manager");
        localStorage.removeItem("settings");
        localStorage.removeItem("talent");
        localStorage.removeItem("wallet");
        this.data = null;
        window.location.pathname = "/";
      });
    },
  },
});
