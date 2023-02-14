import { defineStore } from "pinia";
import { API, ROUTES } from "@/utils/api.url";
import Cookies from "js-cookie";

export const useGenericStore = defineStore("generic", {
  persist: true,
  state: () => ({
    banks: null,
    attributes: null,
    genres: null,
    countries: null,
  }),
  //   getters: {
  //     isAuthenticated: (state) => !!state.data,
  //   },
  actions: {
    async getBanks() {
      return await API(ROUTES().banks).then(async (data) => {
        this.banks = data;
      });
    },
    async resolveAccountNumber(data) {
      return await API(ROUTES().resolve_account_number, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
    },

    async getExclusiveAttribute() {
      this.attributes =  await API(ROUTES().exclusiveAttribute);
    },

    async getGenres() {
      this.genres =  await API(ROUTES().genres);
    },

    async getCountries() {
      this.countries =  await API(ROUTES().countries);
    },
  },
});

