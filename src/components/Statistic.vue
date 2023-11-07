<template>
  <div class="flex-1 py-2 px-[1.125rem]">
    <div class="flex items-center justify-between">
      <h4 class="text-sm text-[#232859]">
        {{ title }}
      </h4>
      <!-- <span class="text-white"><Icon name="info" /></span> -->
    </div>
    <div class="space-y-4">
      <h5 class="text-[22px] text-[#1E1D24] font-bold">
        <span
          v-show="isCurrency"
          class="text-[#8C8FA7]"
        >₦</span> {{ amount }}
      </h5>
      <p class="flex items-center space-x-1">
        <span class="text-white"><Icon name="raise" /></span>
        <span class="text-[#42C458] text-sm">
          {{ volume }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
defineProps({
  title: String,
  amount: String,
  volume: String,
  isCurrency: Boolean,
});
</script>

<style lang="scss" scoped></style>
