<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef,  ref } from "vue";
import BaseError from "@/components/base/BaseError.vue";

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
  label: {
    type: String,
    default: "",
  },

  value: {
    type: [String, Number],
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
  obscure: {
    type: Boolean,
    default: false,
  },
});

const input = ref('');
const togglePassword = ref(false);
const nameRef = toRef(props, 'name');
const { value: radioValue } = useField(nameRef);

const uuid = UniqueID().getID();
</script>

<template>
<div class="flex items-center space-x-4 w-full">
  <input
      v-bind="$attrs"
      v-model="radioValue"
      :value="value"
      :name="name"
      :placeholder="label"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
      :id="uuid"
      type="radio"
      class="focus:ring-0 h-5 w-5 aria-[invalid=true]:border-error border-D5D5D5 focus:border-D5D5D5 text-orange"
  />
  <label :for="uuid" class="text-black text-sm" v-if="label">{{ label }}</label
  >
  <BaseError :message="error" :id="uuid"/>
</div>
</template>
