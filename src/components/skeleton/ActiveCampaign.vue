<template>
  <!-- <h2 class="py-4 bg rounded" /> -->
  <div class="shadow space-y-5 p-3 md:p-6">
    <p class="w-44 py-3 bg rounded" />
    <div class="flex gap-4">
      <div class="w-10 md:w-24 h-10 md:h-24 bg rounded flex-none" />
      <div class="flex-grow flex-col flex gap-4">
        <p class="w-60 md:w-80 py-2 bg rounded" />
        <p class="w-36 py-2 bg rounded" />
        <p class="w-full py-3 bg rounded hidden md:block" />
      </div>
    </div>
    <p class="w-full py-3 bg rounded md:hidden" />
  </div>
</template>

<script setup></script>

<style>
.bg {
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
