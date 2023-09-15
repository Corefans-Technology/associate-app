<template>
  <div
    class="flex-none md:pb-4 hidden md:flex md:w-60 w-full bg-#121216 md:bg-#2D1713 py-4 px-3.5 left-0 h-fit md:h-full rounded-t-none rounded-b-none md:rounded-t-2xl md:rounded-b-2xl  flex-col divide-y divide-#3A2622"
  >
    <button
      class="flex-none relative"
      @click="router.push('/')"
    >
      <img
        src="@/assets/images/logo_3.png"
        alt=""
        class="mx-auto h-7"
      />
    </button>
    <ul class="hidden md:flex flex-col h-full flex-grow pt-8">
      <!-- <p class="text-xs text-1E1D24 text-opacity-30 pb-2">
        ACTIVITY
      </p> -->
      <li class="flex-none links">
        <router-link
          class="flex items-center space-x-3 text-white py-2 px-4"
          :to="{ name: 'overview' }"
        >
          <Icon
            class="fill-current"
            name="started"
          />
          <span>Get Started</span>
        </router-link>
      </li>
      <li class="flex-none links">
        <router-link
          class="flex items-center space-x-3 text-white py-2 px-4"
          :to="{ name: 'wallet' }"
        >
          <Icon
            class="fill-current"
            name="dashboard"
          />
          <span>Home</span>
        </router-link>
      </li>
      <li class="flex-none links">
        <router-link
          class="flex items-center space-x-3 text-white py-2 px-4"
          :to="{ name: 'talents.index', query: { tab: 'All' } }"
        >
          <Icon name="users" />
          <span>Talents</span>
        </router-link>
      </li>
    </ul>

    <ul class="hidden md:flex flex-col flex-none pt-4">
      <li class="links">
        <router-link
          class="flex items-center w-full space-x-3 text-white py-2 px-4"
          :to="{ name: 'settings.profile', query: { tab: 'Profile' } }"
        >
          <Icon
            class="fill-current"
            name="settings"
          />
          <span>Settings</span>
        </router-link>
      </li>
      <li class="flex-grow flex items-end">
        <button
          class="flex items-center w-full space-x-3 text-white py-[0.5rem] px-[1rem]"
          href="/settings"
          @click="logout"
        >
          <Icon name="logout" />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import Icon from "@/components/Icon.vue";
import { useManagerStore } from "@/stores/manager";

const managerStore = useManagerStore();

function logout() {
  managerStore.logout();
}
const router = useRouter()
</script>

<style scoped>
.links .router-link-active {
  color: white;
  /* background: rgba(255, 255, 255, 0.20); */
  border-radius: 4px;
  @apply bg-gradient-to-br from-orange to-red
}

.links .router-link-exact-active {
  color: white;
  /* background: rgba(255, 255, 255, 0.20); */
  border-radius: 4px;
  border: none;
  @apply bg-gradient-to-br from-orange to-red
}
</style>
