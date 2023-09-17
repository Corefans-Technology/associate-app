
<template>
  <Async class="" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(["name"]);
const Async = defineAsyncComponent(() =>
  import(`@/assets/icons/${props.name}.svg`)
);
</script>

<style lang="scss" scoped></style>
