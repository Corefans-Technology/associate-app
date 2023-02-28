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
      const { banks } = await API.get(ROUTES().listBanks);
      this.banks = banks;
    },

    async addBank(form) {
      const { bank } = await API.post(ROUTES().addBank, form );

      this.banks.push( bank );
    },



    async getNotificationPreference() {
      const { response }  = await API.get(ROUTES().notificationPreference);
      this.notifications = response.notifications;
    },

    async updateNotificationPreference(form) {
      const { response } = await API.post(ROUTES().notificationPreference, form );
      this.notifications = response?.notifications
      return response;
    },



  },
});
