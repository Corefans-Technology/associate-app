// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { API, ROUTES } from "@/utils/api.url";
import Cookies from "js-cookie";
// import { useRouter } from "vue-router";

export const useSettingsStore = defineStore("settings", {
  persist: true,
  state: () => ({
    banks: [],
    links: [],
    notifications: [],
  }),

  actions: {
    async getBanks() {
      const { data } = await API.get(ROUTES().listBanks);
      this.banks = data.banks;
    },

    async addBank(form) {
      const { data } = await API.post(ROUTES().addBank, form );

      this.banks.push( data.bank );
    },



    async getNotificationPreference() {
      const { data }  = await API.get(ROUTES().notificationPreference);
      this.notifications = data.notifications;
    },

    async updateNotificationPreference(form) {
      const { data } = await API.post(ROUTES().notificationPreference, form );
      this.notifications = data.notifications
      return data;
    },



  },
});
