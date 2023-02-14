import { defineStore } from "pinia";
import { API, ROUTES } from "@/utils/api.url";
import Cookies from "js-cookie";
// import { useRouter } from "vue-router";

export const useExclusiveStore = defineStore("exclusive", {
  persist: true,
  state: () => ({
    data: null,
    exclusives: [],
    allExclusives: [],
    form: {
      id: null,
      title: "",
      description: "",
      image: "",
      quantity: "",
      price: "",
      retail_price: "",
      delivery_date: "",
      shipping: false,
      shipping_details: [{ location: "", fee: "" }],
      variation: false,
      variations: [{ name: "", value: "" }],
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.data,
  },
  actions: {

    async index() {
      this.data = await API(ROUTES().exclusives, {
        retry: 3,
      }).then((response) => response.data)
    },

    async store(form) {
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

      let response = await API(ROUTES().exclusives, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });

      this.exclusives.push(response.data.exclusive);
      return response;
    },

    async update(form) {
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

      let response = await API(ROUTES().exclusives, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).catch((error) => error);

      this.exclusives.push(response.data.exclusive);
      return response;
    },


    async getAlltExclusives() {
      const data = await API(`${ROUTES().exclusives}/${id}/exclusives`);
      console.log(data);
      this.exclusives = data;
    },

  },
});
