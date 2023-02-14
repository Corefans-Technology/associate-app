<template>
  <div
    class="flex-none w-60 bg-FAFAFB py-[3.125rem] px-[0.875rem] fixed left-0 h-full"
  >
    <ul class="flex flex-col h-full pb-10">
      <li class="flex-none">
        <router-link
          class="flex items-center space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'overview' }"
        >
          <Icon class="fill-current" name="home" />
          <span>Overview</span>
        </router-link>
      </li>

      <p class="text-xs text-1E1D24 text-opacity-30 pt-8 pb-2">ACTIVITY</p>
      <li class="flex-none">
        <router-link
          class="flex items-center space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'dashboard' }"
        >
          <Icon class="fill-current" name="dashboard" />
          <span>Dashboard</span>
        </router-link>
      </li>
      <li class="flex-none">
        <router-link
          class="flex items-center space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'campaigns.index' }"
        >
          <Icon name="campaign" />
          <span>Campaign</span>
        </router-link>
      </li>
      <li class="flex-none">
        <router-link
          class="flex items-center space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'wallet' }"
        >
          <Icon name="wallet" />
          <span>Wallet</span>
        </router-link>
      </li>
      <li class="flex-none">
        <router-link
          class="flex items-center space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'exclusives.index' }"
        >
          <Icon name="perk" />
          <span>Exclusives</span>
        </router-link>
      </li>

      <p class="text-xs text-1E1D24 text-opacity-30 pt-8 pb-2">MANAGEMENT</p>
      <li class="">
        <router-link
          class="flex items-center w-full space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          :to="{ name: 'settings.profile' }"
        >
          <Icon class="fill-current" name="settings" />
          <span>Settings</span>
        </router-link>
      </li>

      <!-- <li class="flex-grow flex items-end">
        <button
          @click="logout"
          class="flex items-center w-full space-x-3 text-[#626E8B] py-[0.5rem] px-[1rem]"
          href="/settings"
        >
          <Icon name="more" />
          <span>Logout</span>
        </button>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

</script>

<style scoped>
.router-link-active {
  color: #f18b1b;
  background: rgba(241, 139, 27, 0.15);
  border-radius: 4px;
}

.router-link-exact-active {
  color: #f18b1b;
  background: rgba(241, 139, 27, 0.15);
  border-radius: 4px;
}
</style>
