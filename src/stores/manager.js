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
      await this.csrf();
      return await API(ROUTES().login, {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
        },
      }).then(async () => {
        this.data = await API(ROUTES().profile);
        // this.data = data;s
      });
    },

    async profile() {
      this.data = await API(ROUTES().profile);
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


      const data = new FormData();

      data.append("first_name", form.first_name);
      data.append("last_name", form.last_name);
      data.append("email", form.email);
      data.append("phone_number", form.phone_number);
      data.append("bio", form.bio);
      data.append("genres", form.genres);

      if (typeof form.photo !== "string") {
        data.append("photo", form.photo);
      }


      let response = await API(ROUTES().profileUpdate, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).catch((error) => error);
      this.data = response.data
      return response;
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
        localStorage.removeItem("creative");
        localStorage.removeItem("exclusive");
        localStorage.removeItem("settings");
        localStorage.removeItem("campaign");
        localStorage.removeItem("wallet");
        this.data = null;
        window.location.pathname = "/";
      });
    },
  },
});
