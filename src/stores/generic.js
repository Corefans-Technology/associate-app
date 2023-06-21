import { defineStore } from "pinia";
import { API, ROUTES } from "@/utils/api.url";
import Cookies from "js-cookie";

export const useGenericStore = defineStore("generic", {
  persist: true,
  state: () => ({
    banks: null,
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
    async resolveAccountNumber(form) {
      return await API.post(ROUTES().resolve_account_number, form );
    },


    async getCountries() {
      const { data } =  await API.get(ROUTES().countries);
      this.countries = data;
    },
  },
});

