<template>
  <div class="max-h-screen h-full flex flex-col bg-white">
    <NavigationBar :is-authenticated="managerStore.isAuthenticated" />
    <main class="flex-1 flex overflow-y-scroll">
      <SideBar />
      <div class="ml-60 flex-grow h-full">
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
