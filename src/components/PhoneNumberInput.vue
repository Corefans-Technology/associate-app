<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>
import { computed } from "vue"
import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef } from "vue";
import BaseError from "@/components/base/BaseError.vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue"
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

const modifyOptions = computed( () => {
  return props.options.map( i => {
    i.dialing_code = `+${i?.dialing_code}`
    return i
  })
})


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
      <!-- {{ options }} -->
      <!-- <input
        id="countryCode"
        v-model="countryCode"
        list="countryCodes"
        name="countryCode"
        class="pl-4 w-[124px] md:w-40 border rounded-lg border-#DCDCE4 focus:border-#DCDCE4 focus:outline-none focus:ring-0 h-12"
      /> -->
      <!-- <datalist id="countryCodes">
        <option
          v-for="(codes, index) in options"
          :key="index"
        >
          {{ codes.dialing_code }}
        </option>
      </datalist> -->
      <Listbox v-model="countryCode">
        <div class="relative">
          <div class="flex gap-3">
            <ListboxButton
              class="relative w-[124px] md:w-40 h-12 cursor-default inline-flex justify-start gap-2 rounded-lg px-4 py-3 focus:outline-none border border-#DCDCE4"
            >
              <!-- <Icon
                          class="fill-black text-lg"
                          :name="item.icon.icon"
                        /> -->
              <img
                :src="countryCode.flag_url"
                class="w-6 h-6 flex-none rounded-full"
                alt=""
                srcset=""
              />
              <span class="flex-grow text-left">{{ countryCode.dialing_code }}</span>
                        
              <ChevronDownIcon
                class="w-6 h-6 flex-none text-1E1D24"
                aria-hidden="true"
              />
            </ListboxButton>
          </div>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white z-[100] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <ListboxOption
                v-for="(codes, index) in modifyOptions"
                :key="index"
                :value="codes"
                class="hover:bg-black/5 group flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-1E1D24 cursor-pointer"
              >
                <!-- <Icon
                            class="fill-black text-lg"
                            :name="social.icon"
                          /> -->
                <!-- <span v-html="social.icon" /> -->
                <img
                  :src="codes.flag_url"
                  class="w-6 h-6 rounded-full"
                  alt=""
                  srcset=""
                />
                {{ codes.dialing_code }}
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
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