<template>
  <p
    class="text-transparent bg-gradient-to-r from-orange to-red bg-clip-text"
  >
    {{ name }}
  </p>
</template>

<script setup>
const props = defineProps(["name"]);
</script>

<style lang="scss" scoped></style>
