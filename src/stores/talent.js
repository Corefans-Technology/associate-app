import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";

export const useTalentStore = defineStore("talent", {
  persist: true,
  state: () => ({
    invitedList: null,
    inviteeList: null,
    waitlistsList: null,
    waitlistsLists: null,
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

    async fetchWaitlists() {
      const { data } = await API.get(ROUTES().waitlists);
      this.waitlistsLists = data;
    },
    async fetchWaitlist(id) {
      this.waitlistsList = null
      const { data } = await API.get(ROUTES(id).waitlist);
      this.waitlistsList = data;
    },

    async sendInvite(form) {
      return await API.post(ROUTES().invite, form );
    },
    
    async revokeInvite(invite) {
      return await API.get(ROUTES(invite).inviteRevoke).then(() => {
        this.inviteeList.data = this.inviteeList.data.filter(invitee => invitee.id !== invite);
      });
    },

    async rejectArtist() {
      return await API.post(ROUTES(this.waitlistsList.id).rejectedWaitlist).then(() => {
        this.fetchWaitlist(this.waitlistsList.id)
        // this.fetchWaitlists()
        // this.inviteeList.data = this.inviteeList.data.filter(invitee => invitee.id !== invite);
      });
    },

    async acceptArtist() {
      return await API.post(ROUTES(this.waitlistsList.id).acceptedWaitlist).then(() => {
        this.fetchWaitlist(this.waitlistsList.id)
        // this.waitlistsList.status = "Invited"
        // this.inviteeList.data = this.inviteeList.data.filter(invitee => invitee.id !== invite);
      });
    },

    async setForReview() {
      return await API.post(ROUTES(this.waitlistsList.id).inReviewWaitlist).then(() => {
        // this.waitlistsList.status = "In review"
        this.fetchWaitlist(this.waitlistsList.id)
        // this.inviteeList.data = this.inviteeList.data.filter(invitee => invitee.id !== invite);
      });
    },

    invite() {
      API.post(ROUTES().invite);
    },
  },
})
