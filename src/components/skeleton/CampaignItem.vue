<template>
  <div>
    <div class="w-[16.6rem] bg h-32 rounded-t-lg" />
    <div class="px-5 -mt-8 space-y-6 w-full max-w-[16.6rem] rounded-t-lg">
      <div class="w-16 h-16 bg rounded-full" />

      <div class="space-y-2">
        <div class="py-3 bg w-full" />
        <div class="py-2 bg w-full" />
        <div class="py-2 bg w-full" />
        <div class="py-4 bg w-full" />
      </div>

      <div class=" space-y-2">
        <div class="flex gap-6">
          <div class="rounded h-8 w-full bg" />
          <div class="rounded h-8 w-full bg" />
        </div>
        <div class="rounded-full h-4 bg" />
      </div>
    </div>
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
