<template>
  <div
    :class="[
      'rounded-full px-2 py-1 flex items-center justify-center bg-opacity-10 text-xs capitalize',
      name === 'In Review'
        ? 'bg-orange bg:opacity-10 text-orange'
        : 'bg-[#3D6ABE] text-[#3D6ABE]',
      classes,
    ]"
  >
    {{ name }}
  </div>
</template>

<script setup>
defineProps({
  name: String,
  classes: String,
});
</script>

<style lang="scss" scoped></style>
