<template>
  <div class="p-6 rounded shadow-[0px_4px_16px_rgba(0,0,0,0.03)]">
    <div>
      <Icon :name="icon" />
    </div>
    <h4 class="text-base text-black font-medium pt-6">
      {{ title }}
    </h4>

    <p class="text-sm text-#667085 pt-2 pb-4">
      {{ text }}
    </p>

    <RouterLink to="/" class="flex items-center space-x-1 text-orange text-sm">
      <span>View</span>
      <ChevronRightIcon class="h-3"/>
    </RouterLink>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import { ChevronRightIcon } from "@heroicons/vue/24/outline"
import {RouterLink} from 'vue-router'
defineProps({
  title: String,
  text: String,
  link: String,
  icon: String
});
</script>

<style lang="scss" scoped></style>
