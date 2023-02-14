// import { ref, computed } from "vue";
import {defineStore} from "pinia";
import {API, ROUTES} from "@/utils/api.url";
import Cookies from "js-cookie";

export const useWalletStore = defineStore("wallet", {
  persist: true,
  state: () => ({
    balance: null,
    transactions: null,
  }),
  getters: {},
  actions: {

    async getBalance() {
      await this.csrf();
      const { balance } = await API(ROUTES().balance);
      this.balance = balance
    },

    async getTransactions() {
      await this.csrf();
      const { transactions } = await API(ROUTES().transactions);
      this.transactions = transactions
    },

    async withdraw(form) {
      await this.csrf();
      return API(ROUTES().withdraw, {
        method: "POST",
        body: form,
      });
    },

    async confirmation() {
      await this.csrf();
      return API(ROUTES().withdrawConfirmation, {
        method: "POST",
      });
    },

    async csrf() {
      await API(ROUTES().csrfCookie);
    },

    async forgetPassword(form) {
      await this.csrf();
      return await API(ROUTES().forgetPassword, {
        method: "POST",
        body: form,
      })
    },
    async verifyToken(form) {
      await this.csrf();
      return await API(ROUTES().verifyToken, {
        method: "POST",
        body: form,
      })
    },
    async resetPassword(form) {
      await this.csrf();
      return await API(ROUTES().resetPassword, {
        method: "POST",
        body: form,
      })
    },
    async verifyInviteCode(code) {
      await this.csrf();
      return await API(ROUTES().verifyInviteCode, {
        method: "POST",
        body: {
          invite_code: code,
        },
      });
    },
    async passwordUpdate(form) {
      return await API(ROUTES().changePassword, {
        method: "POST",
        body: form,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
    },
    async profileUpdate(form) {


      const data = new FormData();

      data.append("first_name", form.first_name);
      data.append("last_name", form.last_name);
      data.append("email", form.email);
      data.append("phone_number", form.phone_number);
      data.append("bio", form.bio);
      data.append("genres", form.genres);

      if (typeof form.photo !== "string") {
        data.append("photo", form.photo);
      }

      console.log("I am here now");

      let response = await API(ROUTES().profileUpdate, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      }).catch((error) => error);
      this.data = response.data
      return response;
    },
    async signUp(form) {
      const { data } = await API(ROUTES().register, {
        method: "POST",
        body: form,
      });

      console.log(data);
      this.data = data;

    },

    logout() {
      API(ROUTES().logout, {
        method: "POST",
      }).finally(() => {
        localStorage.removeItem("creative");
        localStorage.removeItem("exclusive");
        localStorage.removeItem("settings");
        localStorage.removeItem("campaign");
        this.data = null;
        window.location.pathname = "/";
      });
    },
  },
});
