<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import { toRef } from "vue";
import BaseError from "@/components/base/BaseError.vue";
import VOtpInput from "vue3-otp-input";
const emit = defineEmits(["changeAndBlur", "isComplete"])

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
  inputClasses: {
    type: String,
    default: "otp-input-reset-email w-12 h-12 rounded focus:outline-none mt-2.5 mb-1",
  },
  // eslint-disable-next-line vue/require-prop-types
  // isWithdraw: {
  //   type: Boolean,
  //   default: false,
  // },
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

// const input = ref("");
// const togglePassword = ref(false);
const pinRef = toRef(props, "name");
const { value: pin } = useField(pinRef);

const uuid = UniqueID().getID();


const handleOnChange = (value) => {
  // eslint-disable-next-line no-console
  console.log("OTP changed: ", value);
};

const handleOnComplete = (value) => {
  pin.value = value;
  emit("isComplete")
  // console.log("complete: ", value);
};

</script>

<template>
  <div class="relative w-full">
    <label
      :for="uuid"
      class="text-black text-base"
    >{{ label }}</label>
    <v-otp-input
      ref="otpInput"
      v-model="pin"
      v-bind="$attrs"
      :input-classes="inputClasses"
      separator=""
      :num-inputs="5"
      :should-auto-focus="true"
      :is-input-num="true"
      :conditional-class="['one', 'two', 'three', 'four', 'five']"
      :placeholder="['', '', '', '', '']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
    <BaseError
      :id="uuid"
      :message="error"
    />
    <!--  <div v-if="desc" class="text-light-grey-2 text-xs flex items-center justify-between">-->
    <!--    <span v-text="desc"></span>-->
    <!--    <span v-if="canCountText" v-text="countText"></span>-->
    <!--  </div>-->
    <!--  <BaseError :message="error" :id="uuid"/>-->
  </div>
</template>
