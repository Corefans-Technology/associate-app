import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";

export const useTalentStore = defineStore("talent", {
  persist: true,
  state: () => ({
    data: null,
    step: 1,
    form: {
      first_name: null,
      last_name: null,
      password: null,
      username: null,
      email: null,
      category: "",
      bio: "",
      phone_number: null,
      invite_code: "",
    },

  }),
  getters: {
    isAuthenticated: (state) => !! state.data,
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
        const {data: profile} = await API(ROUTES().profile);
        this.data = profile;
      });


    },

    async fetchAll() {
      const { talents } = await API(ROUTES().talents, {
        retry: 3,
      });
      this.data = talents;
    },

    async csrf() {
      await API(ROUTES().csrfCookie);
    },

    async sendInvite(form) {
      const { talent } = await API(ROUTES().invite, {
        method: "POST",
        body: form,
      });

      this.data.unshift(talent);
    },

    async signUp(form) {
      return await API(ROUTES().register, {
        method: "POST",
        body: form,
      });
    },

    invite() {
      API(ROUTES().invite, {
        method: "POST",
      }).then(r => {
        localStorage.setItem("creative", null)
        this.data = null;
        window.location.pathname = "/";
      });

    },
  },
})
