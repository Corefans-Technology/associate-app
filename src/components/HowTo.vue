<template>
  <div class="p-8 rounded shadow-[0px_4px_16px_rgba(0,0,0,0.03)] border">
    <div>
      <!-- <Icon :name="icon" /> -->
      <slot />
    </div>
    <h4 class="text-lg text-#333333 font-semibold pt-6">
      {{ title }}
    </h4>

    <p class="text-sm text-#333333 pb-4">
      {{ text }}
    </p>

    <div class="read-more">
      <RouterLink
        :to="link"
        class="flex items-center space-x-1 text-#0A0B0D text-sm font-semibold"
      >
        <span>{{ more }}</span>
        <ChevronRightIcon class="h-3" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// import Icon from "@/components/Icon.vue"
import { ChevronRightIcon } from "@heroicons/vue/24/outline"
import {RouterLink} from "vue-router"
defineProps({
  title: String,
  text: String,
  link: {
    type: String,
    default: "/overview",
  },
  icon: String,
  more: String,
});
</script>

<style scoped>
.read-more .router-link-active {
  color: #0A0B0D;
  /* background: rgba(255, 255, 255, 0.20); */
  border-radius: 4px;
}

.read-more .router-link-exact-active {
  color: #0A0B0D;
  /* background: rgba(255, 255, 255, 0.20); */
  border-radius: 4px;
  border: none;
}
</style>

