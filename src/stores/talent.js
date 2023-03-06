import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";

export const useTalentStore = defineStore("talent", {
  persist: true,
  state: () => ({
    invitedList: null,
    inviteeList: null,
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

    async fetchInvited() {
      const { data } = await API.get(ROUTES().invitedTalents);
      this.invitedList = data;
    },

    async fetchInvitee() {
      const { data } = await API.get(ROUTES().inviteeTalents);
      this.inviteeList = data;
    },

    async sendInvite(form) {
      return await API.post(ROUTES().invite, form );
    },

    invite() {
      API.post(ROUTES().invite);

    },
  },
})
