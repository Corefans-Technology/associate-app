<template>
  <div class="space-y-3">
    <h1 :class="nameStyle">
      {{ name }}
    </h1>
    <p
      v-if="desc"
      :class="descStyle"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  "name" : {
    type: String,
  },
  "nameStyle": {
    type: String,
    default: "text-xl lg:text-4xl font-semibold text-black",
  },
  "desc": {
    type: String,
  },
  "descStyle": {
    type: String,
    default: "text-1E1D24 text-sm lg:text-base",
  },
})
</script>

<style lang="scss" scoped>

</style>