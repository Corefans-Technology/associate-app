<template>
  <div>
    <h2 :class="titleClass">
      {{ title }}
    </h2>
    <p :class="descriptionClass">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  description: String,
  title: [String, Number],
  titleClass: String,
  descriptionClass: String,
});
</script>

<style lang="scss" scoped></style>
