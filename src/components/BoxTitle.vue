<template>
    <div class="flex items-center justify-center md:w-[83px] h-7 rounded-2xl bg-transparent md:bg-gradient-to-r from-[rgba(241,139,27,0.07)] to-[rgba(229,32,83,0.07)]">
          <p class="text-base font-medium text-transparent bg-gradient-to-r from-[#F18B1B] to-[#E52053] bg-clip-text">{{name}}</p>
    </div>
</template>

<script setup>
    const props = defineProps(['name',])
</script>

<style lang="scss" scoped>

</style>