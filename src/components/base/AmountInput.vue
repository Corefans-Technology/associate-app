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
    class="flex w-full space-x-2 justify-center"
  >
    <h3 class="text-sm text-gray-1 leading-10 flex-none -mt-1">
      NGN
    </h3>
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
      class="placeholder:text-4xl placeholder:text-left focus:outline-none text-4xl font-bold text-black leading-none focus:ring-0 p-0 m-0 aria-[invalid=true]:border-error"
      :class="error ? 'placeholder:text-error text-error' : null"
    />
  </div>
</template>
