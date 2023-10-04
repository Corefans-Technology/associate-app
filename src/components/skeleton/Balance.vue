<template>
  <h2 class="py-4 bg rounded" />
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
