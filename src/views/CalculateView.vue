<template>
  <Modal
    :is-open="isOpen"
    @close="isOpen = !isOpen"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <DialogPanel
        class="w-full max-w-md transform overflow-hidden rounded-lg bg-white py-4 pb-8 px-6 text-left shadow-xl transition-all"
      >
        <div class="flex items-center justify-between">
          <DialogTitle
            as="h2"
            class="text-2xl font-bold text-black leading-loose font-power"
          >
            Earnings Calculator
          </DialogTitle>
          <XMarkIcon
            class="w-5 h-5 stroke-09121F stroke-2"
            @click="$router.push({ name: 'overview' })"
          />
        </div>
        <div class="text-xs text-black">
          <p class="flex items-center space-x-1">
            Enter an amount into the calculator to see potential
            earnings
          </p>
        </div>
        <div class="space-y-4 pt-6">
          <BaseInput
            v-maska:[options]
            name="talent_earns"
            placeholder="Enter amount"
            label="Talent Earns"
            type="text"
            data-maska="0.99"
            data-maska-tokens="0:\d:multiple|9:\d:optional"
            class="rounded-lg border-beerus focus:border-beerus pl-8"
            :error="errors.talent_earns"
          >
            <span class="absolute left-4 top-[47px]">₦</span>
          </BaseInput>

          <div class="flex items-center justify-center">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3893_85528)">
                <path
                  d="M4.32455 3.50963C5.76108 2.26486 7.59887 1.58085 9.49967 1.5835C13.872 1.5835 17.4163 5.1278 17.4163 9.50017C17.4163 11.1912 16.8859 12.7587 15.9834 14.0443L13.458 9.50017H15.833C15.8331 8.25854 15.4682 7.04427 14.7838 6.00833C14.0993 4.9724 13.1255 4.1605 11.9833 3.6736C10.8411 3.1867 9.58099 3.04627 8.35964 3.26977C7.13829 3.49327 6.00958 4.07084 5.11384 4.93067L4.32455 3.50963ZM14.6748 15.4907C13.2383 16.7355 11.4005 17.4195 9.49967 17.4168C5.1273 17.4168 1.58301 13.8725 1.58301 9.50017C1.58301 7.80917 2.11342 6.24167 3.01592 4.956L5.54134 9.50017H3.16634C3.16624 10.7418 3.5311 11.9561 4.21557 12.992C4.90003 14.0279 5.87389 14.8398 7.01607 15.3267C8.15825 15.8136 9.41836 15.9541 10.6397 15.7306C11.8611 15.5071 12.9898 14.9295 13.8855 14.0697L14.6748 15.4907Z"
                  fill="url(#paint0_linear_3893_85528)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_3893_85528"
                  x1="1.58301"
                  y1="1.5835"
                  x2="17.4164"
                  y2="17.4168"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <clipPath id="clip0_3893_85528">
                  <rect
                    width="19"
                    height="19"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>


          <BaseInput
            name="your_pay"
            type="text"
            :disabled="true"
            placeholder=""
            label="You Get Paid"
            class="rounded-lg border-#DCDCE4 focus:border-#DCDCE4 w-full bg-#EAEAEA pl-8"
            aria-autocomplete="inline"
            autofocus
          >
            <span class="absolute left-4 top-[47px]">₦</span>
          </BaseInput>



          <div class="pt-2">
            <BaseButton
              class=" bg-gradient-to-br from-orange to-red h-11 text-white rounded-lg text-center font-light w-full"
              :is-loading="isSubmitting"
            >
              <span class="flex items-center space-x-2">
                <!-- <Icon
                  class="stroke-current"
                  name="send"
                />  -->
                <span>Calculate Earnings</span>
              </span>
            </BaseButton>
          </div>
        </div>
      </DialogPanel>
    </form>
  </Modal>
</template>

<script setup>
import {
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import {
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { object, string } from "yup";
import {useForm} from "vee-validate";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import {useGenericStore} from "@/stores/generic";
import { vMaska } from "maska"
const options = {
  preProcess: val => val.replace(/[$,]/g, ""),
  postProcess: val => {
    if (!val) return ""

    const sub = 3 - (val.includes(".") ? val.length - val.indexOf(".") : 0)

    return Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(val).slice(0, sub ? -sub : undefined).replace("₦", "")
      
  },
}

const genericStore = useGenericStore();
genericStore.getCountries();
const isOpen = ref(true);


const currentSchema = computed(() => {
  return  object({
    talent_earns: string().required().label("Talent Earns"),
    your_pay: string().label("First Name"),
  });
});

const { handleSubmit, errors, isSubmitting, setFieldValue } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})

function calculateAssociateCommission(artistEarnings) {

  // Platform's 12% charge
  const platformCharge = artistEarnings * 0.12;

  // Associate's 10% commission from the platform's charge
  const associateCommission = platformCharge * 0.10;

  const formated = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(associateCommission).replace("₦", "") ;

  setFieldValue("your_pay",  formated);

  return formated
}

const onSubmit = handleSubmit( async ( values ) => {
  calculateAssociateCommission(values.talent_earns.replace(/,/g, ""))
});


</script>
