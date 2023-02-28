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

    async fetchAll() {
      const { data } = await API.get(ROUTES().talents);
      this.data = data.talents;
    },

    async sendInvite(form) {
      const { data: talent } = await API.post(ROUTES().invite, form );

      this.data.unshift(talent);
    },

    invite() {
      API.post(ROUTES().invite);

    },
  },
})
