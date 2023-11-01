
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";

export const useCampaignStore = defineStore("campaign", {
  persist: true,
  state: () => ({
    campaign: null,
    transactions: null,
  }),
  getters: {
    getFundTypeBySupport(state) {
      return state.transactions?.filter((transaction) => transaction?.fund_type === "contribution");
    },
    getFundTypeByOrder(state) {
      return state.transactions?.filter((transaction) => transaction?.fund_type === "exclusive");
    },
  },
  actions: {
    // async byId(id) {
    //   const campaignIndex = this.data.findIndex( campaign => campaign.id === id);
    //   return this.data[campaignIndex];
    // },
    

    async getCampaignById(id)  {
      const { data } = await API.get(ROUTES(id).campaign);
      this.campaign = data;
      this.transactions = data?.transactions;
    },

  },
});
