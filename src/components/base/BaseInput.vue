<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef,  ref, computed } from "vue";
import BaseError from "@/components/base/BaseError.vue";

const emit = defineEmits(["changeAndBlur"])

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
  desc: {
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
  maxlength: {
    type: String,
    default: "60",
  },
  obscure: {
    type: Boolean,
    default: false,
  },
  canCountText: {
    type: Boolean,
    default: false,
  },
});

const input = ref("");
const togglePassword = ref(false);
const nameRef = toRef(props, "name");
const { value } = useField(nameRef);

const uuid = UniqueID().getID();

const togglePasswordAction = () => {
  if (input.value.type === "password") {
    input.value.type = "text"
    togglePassword.value = true
  } else {
    input.value.type = "password"
    togglePassword.value = false
  }

};


const countText = computed(() => {
  return (value.value?.length ?? 0) + " / " + input.value.maxLength
});
</script>

<template>
  <div class="relative w-full">
    <label
      :for="uuid"
      class="text-black text-base"
    >{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="uuid"
      ref="input"
      v-model="value"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
      :autocomplete="obscure ? 'off' : 'on'"
      :maxlength="maxlength"
      :readonly="disabled"
      class="placeholder:text-98A2B3 placeholder:text-sm placeholder:text-left placeholder:font-normal focus:outline-none w-full text-sm text-1E1D24 focus:ring-0 h-12 px-4 aria-[invalid=true]:border-error mt-2.5 mb-1"
    />
    <div
      v-if="desc"
      class="text-light-grey-2 text-xs flex items-center justify-between"
    >
      <span v-text="desc" />
      <span
        v-if="canCountText"
        v-text="countText"
      />
    </div>
    <BaseError
      :id="uuid"
      :message="error"
    />
    <span
      v-if="obscure"
      class="absolute text-sm text-1E1D24 right-5 top-12 mb-10 cursor-pointer"
      @click="togglePasswordAction"
      v-text="togglePassword ? 'Hide' : 'Show'"
    />
  </div>
</template>
