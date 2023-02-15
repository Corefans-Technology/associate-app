<template>
  <div
    :class="[
      'rounded-full px-5 py-1 flex items-center justify-center bg-opacity-10 text-xs capitalize',
      name === 'draft'
        ? 'bg-[#00C48C] text-[#00C48C]'
        : 'bg-orange bg:opacity-10 text-orange',
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
