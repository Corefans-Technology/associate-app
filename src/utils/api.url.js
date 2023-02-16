import { $fetch } from "ohmyfetch";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import { useManagerStore } from "@/stores/manager";

const baseType = import.meta.env.VITE_BASE_URL;
let baseURL = import.meta.env.VITE_LIVE_BASE_URL;

if (baseType === "local") baseURL = import.meta.env.VITE_LOCAL_BASE_URL;

export const API = $fetch.create({
  baseURL: baseURL,
  credentials: "include",
  headers: {
    Accept: "application/json",
    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
  onRequest(ctx) {
    NProgress.start();
  },
  onResponse(ctx) {
    NProgress.done();
  },
  async onResponseError({ request, response, options }) {
    const managerStore = useManagerStore();
    if (response.status === 401 || response.status === 419) {
      managerStore.logout();
    }
  },
});

export const apiConfig = (multipart = null) => {
  return { headers: getHeader(multipart) };
};

function getHeader(type) {
  const header = {};
  if (type === true) header["Content-Type"] = "multipart/form-data";
  if (type === false) header["Content-Type"] = "application/json";
  return header;
}

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
