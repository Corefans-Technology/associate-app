<template>
    <div :class='sizeClass'></div>
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "px",
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
});

const sizeClass = computed(() =>  props.horizontal ? `w-${props.size}` : `h-${props.size}` )

</script>

<style lang="scss" scoped>

</style>