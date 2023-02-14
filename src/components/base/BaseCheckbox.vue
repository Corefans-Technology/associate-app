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
  modelValue: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  obscure: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    default: "",
  },
});

const input = ref('');
const nameRef = toRef(props, 'name');
const { value } = useField(nameRef);

const uuid = UniqueID().getID();


</script>

<template>
  <div class="flex items-start space-x-3">
    <div>
      <input
          v-bind="$attrs"
          v-model="value"
          :placeholder="label"
          :aria-describedby="error ? `${uuid}-error` : null"
          :aria-invalid="error ? true : null"
          :id="uuid"
          type="checkbox"
          class="border focus:ring-0 aria-[invalid=true]:border-error border-D5D5D5 focus:border-D5D5D5"
      />
    </div>
    <div class="space-y-2">
      <label :for="uuid" class="text-black font-medium leading-none text-sm" v-if="label">{{ label }}</label
      >
      <p v-if="desc" class="text-[#98A2B3]">
        <span v-text="desc"></span>
      </p>
      <BaseError :message="error" :id="uuid"/>
    </div>
  </div>
</template>
