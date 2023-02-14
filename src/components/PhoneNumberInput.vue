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
  number: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },

});


const phoneNumberRef = toRef(props, 'number');
const countryCodeRef = toRef(props, 'code');
const { value: phoneNumber } = useField(phoneNumberRef);
const { value: countryCode } = useField(countryCodeRef);

const uuid = UniqueID().getID();

</script>

<template>

  <div class="relative w-full">
    <label :for="uuid" class="text-black text-base">{{ label }}</label>
    <div class="flex items-center w-full mt-2.5 mb-1" v-bind="$attrs">
      <input list="countryCodes" name="countryCode" id="countryCode" v-model="countryCode" class="pl-4 w-20 border-0 focus:outline-none focus:ring-0">
      <datalist id="countryCodes">
        <option v-for="code in options"> {{ code.dialing_code }}</option>
      </datalist>
      <div class="bg-E5E5E5 w-2.5 h-2.5"></div>
      <input type="text" name="phoneNumber" inputmode="numeric" v-model="phoneNumber" class="placeholder:text-98A2B3 placeholder:text-sm placeholder:text-left placeholder:font-normal border-0 focus:outline-none text-sm text-1E1D24 focus:ring-0 h-12 px-4 aria-[invalid=true]:border-error flex-grow" />
      <!--    <span v-show="errors.has('phone')">{{ errors.first('phone') }}</span>-->
    </div>
    <BaseError :message="error" :id="uuid"/>
  </div>
</template>




<!--import * as yup from 'yup';-->
<!--import PhoneNumber from 'google-libphonenumber';-->
<!--import { ref, computed } from 'vue'-->

<!--const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();-->

<!--const phoneValidation = yup.string().test({-->
<!--  name: 'phone',-->
<!--  message: 'Invalid phone number',-->
<!--  test: async value => {-->
<!--    try {-->
<!--      // add the selectedCountryCode to the phone number-->
<!--      const phoneNumber = "+" + selectedCountryCode.value + value;-->
<!--      const parsedNumber = phoneUtil.parse(phoneNumber);-->
<!--      const isValid = phoneUtil.isValidNumber(parsedNumber);-->
<!--      if (!isValid) {-->
<!--        throw new Error('Invalid phone number');-->
<!--      }-->
<!--      return true;-->
<!--    } catch (err) {-->
<!--      return false;-->
<!--    }-->
<!--  }-->
<!--});-->

<!--export default {-->
<!--  setup() {-->
<!--    const selectedCountryCode = ref("1")-->
<!--    const phoneNumber = ref("")-->
<!--    const countryCodes = ["1", "52", "81"]-->
<!--    const validation = computed(() => phoneValidation);-->

<!--    return { selectedCountryCode, phoneNumber, countryCodes, validation }-->
<!--  }-->
<!--};-->
<!--</script>-->
