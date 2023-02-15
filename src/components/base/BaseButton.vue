<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "submit",
  },
});
</script>

<template>
  <button
    id="submit"
    :type="props.type"
    class="focus:outline-none px-4 flex items-center justify-center relative h-12"
    :class="{
      'disabled opacity-90 cursor-not-allowed': disabled || props.isLoading,
    }"
    :disabled="disabled || props.isLoading"
  >
    <svg
      v-show="props.isLoading"
      class="w-7 h-7 animate-spin absolute left-1/2 -ml-2.5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-75 text-white"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-100 text-white"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
    <span
      class="flex items-center justify-center space-x-4"
      :class="{ invisible: props.isLoading }"
    ><slot /></span>
  </button>
</template>
