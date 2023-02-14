<template>
  <div
    :class="[
      'rounded-full px-5 py-1 flex items-center justify-center bg-opacity-10 text-xs',
      name === 'draft'
        ? 'bg-[#FF9E0B] text-[#FF9E0B]'
        : 'bg-[#00C48C] text-[#00C48C]',
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
