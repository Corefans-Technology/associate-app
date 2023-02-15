import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import OverviewView from "../views/OverviewView.vue";
import SettingIndexView from "../views/settings/IndexView.vue";
import SettingProfileView from "../views/settings/ProfileView.vue";
import SettingSecurityView from "../views/settings/SecurityView.vue";
import SettingFundingAccountView from "../views/settings/FundingAccountView.vue";
import SettingFanLinkView from "../views/settings/FanLinkView.vue";
import SettingPreferenceView from "../views/settings/PreferenceView.vue";
import WalletIndexView from "../views/wallet/IndexView.vue";
import WalletWithdrawView from "../views/wallet/WithdrawView.vue";
import WalletWithdrawSuccessView from "../views/wallet/WithdrawSuccessView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignUpView from "../views/auth/SignUpView.vue";
import SignUpSuccess from "../views/auth/SignUpSuccess.vue";
import PasswordView from "../views/auth/PasswordView.vue";
import PasswordForgotVerifyView from "../views/auth/PasswordForgotVerifyView.vue";
import PasswordResetView from "../views/auth/PasswordResetView.vue";
import WaitListView from "../views/auth/WaitListView.vue";
import CampaignIndexView from "../views/campaign/IndexView.vue";
import TalentIndexView from "../views/talents/IndexView.vue";
import TalentSendInviteView from "../views/talents/SendInviteView.vue";
import TalentShowView from "../views/talents/ShowView.vue";
import CampaignCreateView from "../views/campaign/CreateView.vue";
import CampaignBasicFormView from "../views/campaign/BasicFormView.vue";
import CampaignContentFormView from "../views/campaign/ContentFormView.vue";
import CampaignExclusiveView from "../views/campaign/ExclusiveView.vue";
import CampaignFundingFormView from "../views/campaign/FundingFormView.vue";
import CampaignReviewView from "../views/campaign/ReviewView.vue";
import CampaignPreView from "../views/campaign/PreView.vue";
import ExclusiveIndexView from "../views/exclusives/IndexView.vue";
import ExclusiveCreateView from "../views/exclusives/CreateView.vue";
import ExclusiveEditView from "../views/exclusives/EditView.vue";
import PasswordForgotView from "../views/auth/PasswordForgotView.vue";
import CampaignShowView from "../views/campaign/ShowView.vue";
import { useManagerStore } from "@/stores/manager";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "overview",
      component: OverviewView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/talents",
      name: "talents.index",
      component: TalentIndexView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "invite",
          name: "talents.send.invite",
          component: TalentSendInviteView,
        },
      ],
    },
    {
      path: "/talents/:id",
      name: "talents.show",
      component: TalentShowView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/campaigns",
      name: "campaigns.index",
      component: CampaignIndexView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/campaigns/create",
      component: CampaignCreateView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "",
          name: "campaigns.create",
          component: CampaignBasicFormView,
        },
      ],
    },
    {
      path: "/campaigns/create/:id",
      component: CampaignCreateView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "basic",
          name: "campaigns.basic",
          component: CampaignBasicFormView,
        },
        {
          path: "content",
          name: "campaigns.content",
          component: CampaignContentFormView,
        },
        {
          path: "exclusive",
          name: "campaigns.exclusive",
          component: CampaignExclusiveView,
        },
        {
          path: "funding",
          name: "campaigns.funding",
          component: CampaignFundingFormView,
        },
        {
          path: "review",
          name: "campaigns.review",
          component: CampaignReviewView,
        },
      ],
    },
    {
      path: "/exclusives",
      name: "exclusives.index",
      component: ExclusiveIndexView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/exclusives/create",
      name: "exclusives.create",
      component: ExclusiveCreateView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/exclusives/:id/edit",
      name: "exclusives.edit",
      component: ExclusiveEditView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/campaigns/:id",
      name: "campaigns.show",
      component: CampaignShowView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/campaigns/:id/preview",
      name: "campaigns.preview",
      component: CampaignPreView,
      meta: {
        middleware: "auth",
      },
    },
    {
      path: "/wallet",
      name: "wallet",
      component: WalletIndexView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "withdraw",
          name: "wallet.withdraw",
          component: WalletWithdrawView,
        },
        {
          path: "withdraw/acknowledge",
          name: "wallet.withdraw.acknowledge",
          component: WalletWithdrawSuccessView,
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingIndexView,
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "profile",
          name: "settings.profile",
          component: SettingProfileView,
        },
        {
          path: "security",
          name: "settings.security",
          component: SettingSecurityView,
        },
        {
          path: "fan-link",
          name: "settings.fan.link",
          component: SettingFanLinkView,
        },
        {
          path: "funding-account",
          name: "settings.funding.account",
          component: SettingFundingAccountView,
        },
        {
          path: "preferences",
          name: "settings.preference",
          component: SettingPreferenceView,
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView,
      meta: {
        middleware: "guest",
      },
    },
    {
      path: "/auth/password",
      component: PasswordView,
      meta: {
        middleware: "guest",
      },
      children: [
        {
          path: "forget",
          name: "forget.password",
          component: PasswordForgotView,
        },
        {
          path: "forget/:email/verification",
          name: "forgot.password.verify",
          component: PasswordForgotVerifyView,
        },
        {
          path: ":email/:pin/reset",
          name: "reset.password",
          component: PasswordResetView,
        },
      ],
    },
    {
      path: "/auth/awaiting/list",
      name: "awaiting.list",
      component: WaitListView,
      meta: {
        middleware: "guest",
      },
    },
    {
      path: "/auth/sign-up",
      name: "sign.up",
      component: SignUpView,
      meta: {
        middleware: "guest",
      },
    },
    {
      path: "/auth/sign-up/acknowledge",
      name: "sign.up.success",
      component: SignUpSuccess,
      meta: {
        middleware: "auth",
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],

  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to) => {
  const managerStore = useManagerStore();

  if (to.meta.middleware === "auth" && ! managerStore.isAuthenticated) {
    return router.push({ name: "login" });
  }

  if (to.meta.middleware === "guest" && managerStore.isAuthenticated) {
    return router.push({ name: "overview" });
  }

  // if (to.meta.requiresStore && !auth.hasAStore) {
  //   return router.push({ name: "user.store.setup" });
  // }
});

export default router;
