
<template>
  <Async class="" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps(["name"]);
const Async = defineAsyncComponent(() =>
  import(`@/assets/icons/${props.name}.svg`)
);
</script>

<style lang="scss" scoped></style>
