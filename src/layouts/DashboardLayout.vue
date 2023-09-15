<template>
  <div class="max-h-screen h-screen flex flex-col md:flex-row bg-white md:p-4">
    <SideBar />
    <main class="flex-grow  overflow-y-auto">
      <NavigationBar :is-authenticated="managerStore.isAuthenticated" />
      <div class="">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import SideBar from "@/components/SideBar.vue";
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();
</script>
