<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    target="_self"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link v-else v-bind="$props">
    <slot />
  </router-link>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "AppLink",
  props: { ...RouterLink.props },

  computed: {
    isExternalLink() {
      return typeof this.to === "string" && this.to.startsWith("http");
    },
  },
};
</script>

<style scoped></style>
