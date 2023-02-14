<template>
  <div class="min-h-screen flex flex-col">
    <NavigationBar layout="home"/>
    <main class="flex-grow pb-10 px-6 md:px-10 xl:px-0">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
