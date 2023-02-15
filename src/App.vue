<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
const layout = ref("div");
</script>


<template>
  <component :is="layout">
    <router-view v-model:layout="layout" />
  </component>
</template>