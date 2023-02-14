<script setup>
import { onMounted, ref } from "vue";

defineProps({
  modelValue: String,
  hasError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
  <textarea 
    ref="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)" 
    :class="[
      hasError
    ? 'border-[#E52053] focus:border-[#E52053]'
    : 'border-[#D9D9D9] focus:border-[#D9D9D9]',
    ]"
    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] w-full text-sm text-[#1E1D24] focus:ring-0"
  >
  </textarea>
</template>
