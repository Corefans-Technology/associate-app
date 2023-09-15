<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef,  ref, computed } from "vue";


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  maxlength: {
    type: String,
    default: "10",
  },
});

const input = ref("");
const nameRef = toRef(props, "name");
const { value } = useField(nameRef);

const uuid = UniqueID().getID();

let inputSize = computed(() => value.value ? value.value.length : 4  );



</script>

<template>
  <div
    class="flex w-full space-x-2 justify-center items-center"
  >
    <!-- <h3 class="text-sm text-gray-1 leading-10 flex-none -mt-1">
      NGN
    </h3> -->
    <input
      v-bind="$attrs"
      :id="uuid"
      ref="input"
      v-model="value"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
      :maxlength="maxlength"
      :readonly="disabled"
      aria-label="amount"
      :size="inputSize"
      class="placeholder:text-4xl placeholder:text-left focus:outline-none text-4xl font-bold text-black leading-none focus:ring-0 p-0 m-0 aria-[invalid=true]:border-error font-power placeholder:text-1E1D24 placeholder:font-power"
      :class="error ? 'placeholder:text-error text-error' : null"
    />

    <svg
      width="42"
      height="24"
      viewBox="0 0 42 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.5"
        width="42"
        height="23"
        rx="11.5"
        fill="#F9CFA2"
      />
      <path
        d="M16.7926 7.8H18.1456V15.5H16.8806V10.011L14.5376 13.883H14.3836L12.0406 10V15.5H10.7756V7.8H12.1396L14.4606 11.65L16.7926 7.8ZM24.1799 10.781V10H25.3679V15.5H24.1799V14.708C23.7289 15.335 23.0909 15.643 22.2549 15.643C21.4959 15.643 20.8579 15.368 20.3189 14.807C19.7799 14.246 19.5159 13.553 19.5159 12.75C19.5159 11.936 19.7799 11.254 20.3189 10.693C20.8579 10.132 21.4959 9.857 22.2549 9.857C23.0909 9.857 23.7289 10.165 24.1799 10.781ZM21.1989 14.015C21.5289 14.345 21.9469 14.51 22.4419 14.51C22.9369 14.51 23.3549 14.345 23.6849 14.015C24.0149 13.674 24.1799 13.256 24.1799 12.75C24.1799 12.244 24.0149 11.826 23.6849 11.496C23.3549 11.155 22.9369 10.99 22.4419 10.99C21.9469 10.99 21.5289 11.155 21.1989 11.496C20.8689 11.826 20.7039 12.244 20.7039 12.75C20.7039 13.256 20.8689 13.674 21.1989 14.015ZM29.8326 12.684L31.8896 15.5H30.5146L29.1506 13.619L27.7756 15.5H26.3896L28.4576 12.673L26.4996 10H27.8746L29.1396 11.738L30.4046 10H31.7906L29.8326 12.684Z"
        fill="#935510"
      />
    </svg>
  </div>
</template>
