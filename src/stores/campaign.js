// import { ref, computed } from "vue";
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";
// import { useRouter } from "vue-router";

export const useCampaignStore = defineStore("campaign", {
  persist: true,
  state: () => ({
    data: null,
    campaign: null,
    transactions: null,
    steps: [
      { title: "Basics", step: 0 },
      { title: "Content", step: 1 },
      { title: "Exclusives", step: 2 },
      { title: "Funding", step: 3 },
      { title: "Review", step: 4 },
    ],
    form: {
      id: null,
      status: null,
      step: 1,
      basic: {
        title: "",
        description: "",
        category: "Music",
        location: "lagos",
        duration: "",
        tags: [],
        thumbnail: null,
        step: 1,
      },
      content: {
        images: [],
        story: "",
        videos: [],
        step: 2,
      },
      exclusives: {
        title: "",
        description: "",
        quantity: "",
        price: "",
        discount: "",
        delivery_estimate: "",
        is_shippable: false,
        has_attribute: false,
        thumbnail: "",
        shipping_fees: [{ location: "", amount: "" }],
        attributes: [{ name: "", value: "" }],
        step: 3,
      },
      funding: {
        goal: "",
        bank: {},
        step: 4,
      },
    },
    banks: [],
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
    async index() {
      const { data: response } = await API.get(ROUTES().campaigns);
      // console.log(response.data);
      this.data = response.data;
    },
    async byId(id) {
      const campaignIndex = this.data.findIndex( campaign => campaign.id === id);
      return this.data[campaignIndex];
    },

    async getCampaignById(id)  {
      const { data } = await API.get(ROUTES(id).campaign);
      this.campaign = data;
    },

    async getTransactions(id)  {
      const { data } = await API.get(ROUTES(id).campaignTransactions);
      this.transactions = data;
    },

    async getCampaignExclusives(id) {
      const { data: response } = await API.get(ROUTES(id).campaignExclusives)
      this.exclusives = response.data;
    },

  },
});
