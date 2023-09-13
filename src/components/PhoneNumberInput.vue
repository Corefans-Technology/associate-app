<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef } from "vue";
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


const phoneNumberRef = toRef(props, "number");
const countryCodeRef = toRef(props, "code");
const { value: phoneNumber } = useField(phoneNumberRef);
const { value: countryCode } = useField(countryCodeRef);

const uuid = UniqueID().getID();

</script>

<template>
  <div class="relative w-full">
    <label
      :for="uuid"
      class="text-black text-base font-medium"
    >{{ label }}</label>
    <div
      class="flex items-center w-full mt-2.5 mb-1 gap-x-2"
      v-bind="$attrs"
    >
      <input
        id="countryCode"
        v-model="countryCode"
        list="countryCodes"
        name="countryCode"
        class="pl-4 w-[124px] md:w-40 border rounded-lg border-#DCDCE4 focus:border-#DCDCE4 focus:outline-none focus:ring-0 h-12"
      />
      <datalist id="countryCodes">
        <option
          v-for="(codes, index) in options"
          :key="index"
        >
          {{ codes.dialing_code }}
        </option>
      </datalist>
      <!-- <div class="bg-E5E5E5 w-2.5 h-2.5" /> -->
      <input
        v-model="phoneNumber"
        type="text"
        name="phoneNumber"
        inputmode="numeric"
        class="placeholder:text-98A2B3 placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none text-sm text-1E1D24 focus:ring-0 h-12 px-4 aria-[invalid=true]:border-error flex-grow rounded-lg border-#DCDCE4 focus:border-#DCDCE4"
      />
      <!--    <span v-show="errors.has('phone')">{{ errors.first('phone') }}</span>-->
    </div>
    <BaseError
      :id="uuid"
      :message="error"
    />
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
