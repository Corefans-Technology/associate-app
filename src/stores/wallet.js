// import { ref, computed } from "vue";
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";
import Cookies from "js-cookie";

export const useWalletStore = defineStore("wallet", {
  persist: true,
  state: () => ({
    balance: null,
    transactions: null,
    campaigns: null,
    activeCampaigns: null,
    topTalents: null,
  }),
  getters: {},
  actions: {

    async getBalance() {
      await this.csrf();
      const { data } = await API.get(ROUTES().balance);
      this.balance = data.balance
    },

    async getCreativeCampaign() {
      await this.csrf();
      const { data } = await API.get(ROUTES().creativeCampaign);
      this.campaigns = data
    },

    async getActiveCampaigns() {
      await this.csrf();
      const { data } = await API.get(ROUTES().activeCampaigns);
      this.activeCampaigns = data
    },

    async getTopTalents() {
      await this.csrf();
      const { data } = await API.get(ROUTES().topTalents);
      this.topTalents = data
    },

    async getTransactions() {
      await this.csrf();
      const { data } = await API.get(ROUTES().transactions);
      this.transactions = data.transactions
    },

    async withdraw(form) {
      await this.csrf();
      return API.post(ROUTES().withdraw, form );
    },

    async confirmation() {
      await this.csrf();
      return API.post(ROUTES().withdrawConfirmation);
    },

    async csrf() {
      await API(ROUTES().csrfCookie);
    },

  },
});
