<template>
  <!-- bg-#121216 -->
  <div
    class="flex-none md:pb-4 bg-white border-t border-[#EDEDED] shadow md:shadow-none md:flex md:w-60 w-full md:bg-#2D1713 md:py-4 px-3.5 left-0 h-fit md:h-full rounded-t-none rounded-b-none md:rounded-t-2xl md:rounded-b-2xl  md:flex-col flex-row md:divide-y divide-#3A2622 fixed bottom-0 md:relative z-10"
  >
    <button
      class="flex-none relative pb-4 hidden md:block"
      @click="router.push('/')"
    >
      <img
        src="@/assets/images/logo_3.png"
        alt=""
        class="mx-auto h-7"
      />
    </button>
    <ul class="flex flex-row items-center justify-between md:justify-start md:items-start md:flex-col h-full md:flex-grow md:pt-8 gap-y-2 bg-white md:bg-transparent">
      <!-- <p class="text-xs text-1E1D24 text-opacity-30 pb-2">
        ACTIVITY
      </p> -->
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 hover:border hover:border-black rounded-lg border border-transparent relative"
          :to="{ name: 'overview' }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="started"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <MobileDashboard class="inactive" />
            <MobileDashboardActive class="active hidden" />
          </p>
          <span class="">Get Started</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 hover:border hover:border-black rounded-lg border border-transparent relative"
          :to="{ name: 'wallet' }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="dashboard"
          />
          <!-- mobile nav icons -->
          <!-- <p class="md:hidden">
            <MobileHome class="inactive" />
            <MobileHomeActive class="active hidden" />
          </p> -->
          <p class="md:hidden">
            <span class="inactive">
              <MobileHome />
            </span>
            <span class="active hidden">
              <MobileHomeActive />
            </span>
          </p>
          <span class="">Home</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 hover:border hover:border-black rounded-lg border border-transparent relative"
          :to="{ name: 'talents.invited', query: { tab: 'All' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="users"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <MobileTalent class="inactive" />
            <MobileTalentActive class="active hidden" />
          </p>
          <span class="">Talents</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>

      <li class="md:flex-grow links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 hover:border hover:border-black rounded-lg border border-transparent relative"
          :to="{ name: 'settings.profile', query: { tab: 'Profile' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="users"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <span class="inactive">
              <MobileCommissions />
            </span>
            <span class="active hidden">
              <MobileCommissionsActive />
            </span>
          </p>
          <span class="">Commissions</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      

      <li class="flex-none links w-fit md:w-full md:border-t border-#3A2622 md:pt-4 hidden md:block">
        <router-link
          class="flex flex-col md:flex-row items-center w-full gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 hover:border hover:border-black rounded-lg border border-transparent relative"
          :to="{ name: 'settings.profile', query: { tab: 'Profile' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="settings"
          />
          <!-- mobile nav icons -->
          <!-- <p class="md:hidden">
            <MobileTalent class="inactive" />
            <MobileTalentActive class="active hidden" />
          </p> -->
          <span class="">Settings</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none hidden md:flex items-end">
        <button
          class="flex flex-col md:flex-row items-center w-full gap-y-1 gap-3 text-#7D7C80 md:text-white py-[0.5rem] md:px-4 text-xs md:text-sm font-medium md:font-normal"
          href="/settings"
          @click="logout"
        >
          <Icon name="logout" />
          <span class="">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import Icon from "@/components/Icon.vue";
import { useManagerStore } from "@/stores/manager";
import MobileDashboard from "@/assets/icons/mobile/dashboard.svg?component"
import MobileHome from "@/assets/icons/mobile/home.svg?component"
import MobileTalent from "@/assets/icons/mobile/talent.svg?component"
import MobileCommissions from "@/assets/icons/mobile/commissions.svg?component"
import MobileDashboardActive from "@/assets/icons/mobile/dashboard-active.svg?component"
import MobileHomeActive from "@/assets/icons/mobile/home-active.svg?component"
import MobileTalentActive from "@/assets/icons/mobile/talent-active.svg?component"
import MobileCommissionsActive from "@/assets/icons/mobile/commissions-active.svg?component"


const managerStore = useManagerStore();

function logout() {
  managerStore.logout();
}
const router = useRouter()
</script>

<style scoped>
.links .router-link-active {
  @apply bg-gradient-to-br text-transparent bg-clip-text md:bg-clip-border from-orange to-red md:text-white rounded-lg
}

.links .router-link-active div {
  @apply bg-gradient-to-br from-orange to-red
}

.links .router-link-exact-active div {
  @apply bg-gradient-to-br from-orange to-red
}

.links .router-link-exact-active {
  @apply bg-gradient-to-br text-transparent bg-clip-text md:bg-clip-border from-orange to-red md:text-white rounded-lg border-0
}

.links .router-link-active .active {
  /* @apply block */
  display: block !important;
}

.links .router-link-active .inactive {
  display: none !important;
  /* @apply hidden */
}

/* .links .router-link-exact-active .active {
  @apply block
} */

/* .links .router-link-exact-active .inactive {
  @apply hidden
} */
</style>
