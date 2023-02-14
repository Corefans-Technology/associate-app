<script setup>

defineProps({
  message: String,
  id: String,
});

</script>

<template>
  <div
    v-if="message"
    :id="`${id}-error`"
    aria-live="assertive"
    class="text-error whitespace-nowrap text-sm mt-1"
  >
    {{ message }}
  </div>
</template>
