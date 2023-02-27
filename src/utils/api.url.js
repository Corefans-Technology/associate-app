import axios from "axios";
import NProgress from "nprogress";
import { useManagerStore } from "@/stores/manager";

const baseType = import.meta.env.VITE_BASE_URL;
let baseURL = import.meta.env.VITE_LIVE_BASE_URL;

if (baseType === "local") baseURL = import.meta.env.VITE_LOCAL_BASE_URL;

export const API = axios.create({
  baseURL: baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  // csrf token
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => {

    NProgress.done();
    return response;
  },
  (error) => {

    // check if user session expiry or not login
    if(
      [401, 419].includes(error.response.status) && !error.request.responseURL.endsWith("/v1/manager")
    ) {

      console.log("from plugin");
      // logout
      const managerStore = useManagerStore();
      managerStore.logout();
    } else {
      return Promise.reject(error)
    }
  }
);


export const ROUTES = function (param = "") {
  return {
    register: "/v1/manager/register",
    login: "/v1/manager/login",
    csrfCookie: "/sanctum/csrf-cookie",
    logout: "/v1/manager/logout",
    verifyInviteCode: "/v1/manager/invite-code",
    changePassword: "/v1/manager/change-password",
    forgetPassword: "/v1/manager/password/email",
    verifyToken: "/v1/manager/password/pin/verify",
    resetPassword: "/v1/manager/password/reset",
    profile: "/v1/manager",
    profileUpdate: "/v1/manager/update",
    talents: "/v1/manager/talents",
    invite: "/v1/manager/talents/invite",
    saveForLater: "/v1/manager",
    fanLink: "/v1/manager/fanlink",
    notificationPreference: "/v1/manager/preferences/notifications",
    campaigns: "/v1/manager/campaigns",
    listBanks: "/v1/manager/banks",
    addBank: "/v1/manager/banks/create",
    balance: "/v1/manager/wallet/balance",
    withdraw: "/v1/manager/wallet/withdraw",
    withdrawConfirmation: "/v1/manager/wallet/withdraw-confirmation",
    transactions: "/v1/manager/wallet/transactions",
    campaignCreate: "/v1/manager/campaigns",
    campaignBasic: `/v1/manager/campaigns/${param}/basic`,
    campaignContent: `/v1/manager/campaigns/${param}/content`,
    productVariantRestore: `/user/product-variants/${param}/restore`,
    exclusives: "/v1/manager/exclusives",
    campaignExclusiveStore: `/v1/manager/campaigns/${param}/exclusives`,
    campaignExclusives: `/v1/manager/campaigns/${param}/exclusives`,
    campaignExclusiveSync: `/v1/manager/campaigns/${param}/exclusives/sync`,
    campaignFunding: `/v1/manager/campaigns/${param}/funding`,
    goLive: `/v1/manager/campaigns/${param}/activate`,
    exclusiveAttribute: "/v1/exclusives/attributes",

    // Generics
    banks: "v1/banks",
    genres: "v1/genres",
    countries: "v1/countries",
    resolve_account_number: "v1/banks/resolve-account-number",
  };
};