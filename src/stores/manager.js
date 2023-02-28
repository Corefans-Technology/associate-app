// import { ref, computed } from "vue";
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";

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
      })
      await this.profile()
    },

    async profile() {
      const { data } = await API.get(ROUTES().profile);
      this.data = data;
    },

    async csrf() {
      await API.get(ROUTES().csrfCookie);
    },

    async forgetPassword(form) {
      await this.csrf();
      return await API.post(ROUTES().forgetPassword, form)
    },
    async verifyToken(form) {
      await this.csrf();
      return await API.post(ROUTES().verifyToken, form)
    },
    async resetPassword(form) {
      await this.csrf();
      return await API.post(ROUTES().resetPassword, form)
    },
    async verifyInviteCode(code) {
      await this.csrf();
      return await API.post(ROUTES().verifyInviteCode, {
        invite_code: code,
      });
    },
    async passwordUpdate(form) {
      return await API.post(ROUTES().changePassword, form);
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


      const { data:response } = await API.post(ROUTES().profileUpdate, formData,  {
        "headers": {
          "Content-Type": "multipart/form-data",
        },
      });
      this.data = response.data;
    },

    async signUp(form) {
      const { data } = await API.post(ROUTES().register, form);

      this.data = data;

    },

    logout() {
      API.post(ROUTES().logout).finally(() => {
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
