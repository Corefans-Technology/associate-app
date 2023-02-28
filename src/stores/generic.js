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
      const { data } = await API.get(ROUTES().banks);
      this.banks = data;
    },
    async resolveAccountNumber(data) {
      return await API.post(ROUTES().resolve_account_number, data );
    },


    async getCountries() {
      this.countries =  await API.get(ROUTES().countries);
    },
  },
});

