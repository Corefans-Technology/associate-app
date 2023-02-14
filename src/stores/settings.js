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
      const { banks } = await API(ROUTES().listBanks);
      this.banks = banks;
    },

    async addBank(form) {
      const { bank } = await API(ROUTES().addBank, {
        method: "POST",
        body: form,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });

      this.banks.push( bank );
    },

    async getFanLink() {
      let response = await API(ROUTES().fanLink);
      this.links = response.link;
    },

    async updateFanLink(form) {
      return await API(ROUTES().fanLink, {
        method: "POST",
        body: form,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).then((response) => {
        this.links = response.link
        return response;
      }).catch((error) => error.data);


    },


    async getNotificationPreference() {
      let response = await API(ROUTES().notificationPreference);
      this.notifications = response.notifications;
    },

    async updateNotificationPreference(form) {
      return await API(ROUTES().notificationPreference, {
        method: "POST",
        body: form,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).then((response) => {
        this.notifications = response?.notifications
        return response;
      }).catch((error) => error.data);


    },



  },
});
