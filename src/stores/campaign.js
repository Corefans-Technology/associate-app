// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { API, ROUTES } from "@/utils/api.url";
import Cookies from "js-cookie";
import {array, boolean, date, mixed, number, string} from "yup";
// import { useRouter } from "vue-router";

export const useCampaignStore = defineStore("campaign", {
  persist: true,
  state: () => ({
    data: null,
    campaign: null,
    exclusives: null,
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
    isAuthenticated: (state) => !!state.data,
  },
  actions: {
    async index() {
      await API(ROUTES().campaigns).then(async (response) => {
        this.data = response.data;
      });
    },
    async byId(id) {
      const campaignIndex = this.data.findIndex( campaign => campaign.id === id);
      return this.data[campaignIndex];
    },

    async getCampaignById(id)  {
      this.campaign = this.data.find( campaign =>  campaign.id === id);
    },

    async saveForLater() {
      return await API(ROUTES().register, {
        method: "POST",
        body: this.form,
      });
    },
    async saveAndProceed(current_step, form) {
      let url = `${ROUTES().campaigns}`;
      if (this.form.status === "draft") {
        url = `${ROUTES().campaigns}/${this.form.id}/${current_step}`;
      }
      return await API(url, {
        method: "POST",
        body: form,
      });
    },
    async getBanks() {
      await API(ROUTES().listBanks).then(async ({ data }) => {
        this.banks = data;
      });
    },

    async create(form) {

      let data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("location", form.location);
      data.append("duration", form.duration);
      data.append("step", form.step);
      data.append("thumbnail", form.thumbnail);
      for (let tag in form.tags) {
        data.append("tags["+ tag + "]", form.tags[tag]);
      }
      let response = await API(ROUTES().campaignCreate, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.form.id = response.data.id
      this.form.status = response.data.status
      this.form.step = response.data.step
      this.form.exclusives = response.data.exclusives
      return response;
    },

    async basic(form) {

      let data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("location", form.location);
      data.append("duration", form.duration);
      data.append("step", form.step);
      data.append("thumbnail", form.thumbnail);
      for (let tag in form.tags) {
        data.append("tags["+ tag + "]", form.tags[tag]);
      }
      let response = await API(ROUTES(form.id).campaignBasic, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.form.id = response.data.id
      this.form.status = response.data.status
      this.form.step = response.data.step
      this.form.basic = response.data.basic
      return response;
    },

    async content(form) {
      let data = new FormData();

      data.append("video_url", form.url);
      data.append("story", form.story);
      data.append("images[0]", form.image_one);
      data.append("images[1]", form.image_two);
      data.append("step", form.step);

      let response = await API(ROUTES(form.id).campaignContent, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.form.id = response.data.id
      this.form.status = response.data.status
      this.form.step = response.data.step
      this.form.content = response.data.content
      return response;
    },

    async getCampaignExclusives(id) {
      this.exclusives = await API(ROUTES(id).campaignExclusives, {
        retry: 3,
      }).then(response => response.data).catch(error => {

        if (error.status === 404) {
          this.exclusives = null;
        }
      });
    },

    async exclusive(form) {
      let data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("quantity", form.quantity);
      data.append("price", form.price);
      data.append("delivery_estimate", form.delivery_estimate);
      data.append("discount", form.discount);
      data.append("is_shippable", form.is_shippable);
      data.append("has_attribute", form.has_attribute);
      data.append("thumbnail", form.thumbnail);

      //  data.append("shipping", JSON.stringify(form.shipping));
      //   data.append("attributes", JSON.stringify(form.attributes));

      for (let key in form.shipping) {
        data.append("shipping["+ key + "][location]", form.shipping[key]["location"]);
        data.append("shipping["+ key + "][amount]", form.shipping[key]["amount"]);
      }
      for (let key in form.attributes) {
        data.append("attributes["+ key + "][name]", form.attributes[key]["name"]);
        data.append("attributes["+ key + "][value]", form.attributes[key]["value"]);
      }

      let response = await API(ROUTES(form.id).campaignExclusiveStore, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).catch((error) => error);
      this.form.id = response.data.id
      this.form.exclusives = response.data.exclusive
      return response;
    },

    async syncSelectedExclusive(form) {
      let data = new FormData();

      data.append("step", form.step);

      for (let key in form.exclusives) {
        data.append("exclusives["+ key + "]", form.exclusives[key]);
      }

      let response = await API(ROUTES(form.id).campaignExclusiveSync, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.form.id = response.data.id
      this.form.status = response.data.status
      this.form.step = response.data.step
      return response;
    },

    async funding(form) {
      let data = new FormData();

      data.append("step", form.step);
      data.append("goal", form.goal);
      data.append("bank_account", form.bank_account);


      let response = await API(ROUTES(form.id).campaignFunding, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      this.form.id = response.data.id
      this.form.status = response.data.status
      this.form.step = response.data.step
      this.form.funding = response.data.funding
      return response;
    },

    async goLive(form) {
      return await API(ROUTES(form.id).goLive);
    },

    async formEditMode(id) {
      if (!id) return;

      await this.index();
      const campaignIndex = this.data.findIndex( campaign => campaign.id === id);

      if (0 > campaignIndex) return;

      this.form = this.data[campaignIndex];
    },

  },
});
