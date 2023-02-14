<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef, ref, computed} from "vue";
import TextArea from "@/components/TextArea.vue";
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
  maxlength: {
    type: String,
    default: "300",
  },
  canCountText: {
    type: Boolean,
    default: false,
  },
});

const input = ref('');
const nameRef = toRef(props, 'name');
const { value } = useField(nameRef);

const countText = computed(() => {
  return (value.value?.length ?? 0) + " / " + input.value.maxLength
});

const uuid = UniqueID().getID();


</script>

<template>
<div class="relative">
  <label :for="uuid" class="text-black text-base">{{ label }}</label>
  <textarea
      v-bind="$attrs"
      v-model="value"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
      :id="uuid"
      ref="input"
      :maxlength="maxlength"
      class="placeholder:text-98A2B3 placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none w-full text-sm text-1E1D24 focus:ring-0 px-4 aria-[invalid=true]:border-error mt-2.5 mb-1"
  ></textarea>
  <div v-if="desc" class="text-light-grey-2 text-xs flex items-center justify-between">
    <span v-text="desc"></span>
    <span v-if="canCountText" v-text="countText"></span>
  </div>
  <BaseError :message="error" :id="uuid"/>
</div>
</template>
