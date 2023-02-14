<template>
  <Modal :is-open="true">
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <template v-if="currentStep === 0">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-14 px-6 text-left shadow-xl transition-all space-y-8"
        >
          <DialogTitle
            as="h3"
            class="text-xl font-medium leading-6 text-black text-center"
          >
            How much do you want to withdraw?
          </DialogTitle>
          <div class="space-y-4">
            <div class="w-full mx-auto">
              <AmountInput
                v-model="amount"
                inputmode="numeric"
                placeholder="00.0"
                name="amount"
                :error="errors.amount"
              />
            </div>
  
            <p class="text-xs text-[#626E8B] text-center">
              Your Total Balance NGN
              <span class="font-bold"> {{ useCurrency(walletStore.balance) }} </span>
            </p>
            <!-- Account Details -->
            <BaseSelect
              :options="accountDetails"
              track-by="id"
              label-prop="name"
              value-prop="id"
              :can-deselect="false"
              name="account"
              label="Bank Account"
              class="rounded border border-light-grey focus:border-light-grey"
              :error="errors.account"
            />
            <div class="mt-2">
              <BaseTextArea
                name="narration"
                label="Description"
                rows="3"
                maxlength="80"
                :can-count-text="true"
                class="rounded border-light-grey focus:border-light-grey w-full"
                :error="errors.narration"
              />
            </div>


            <div class="flex items-center justify-end">
              <BaseButton
                class="bg-gradient-to-r from-orange to-red text-white rounded text-center font-light"
                :is-loading="isSubmitting"
              >
                Withdraw
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  Withdraw confirmation Modal -->
      <template v-if="currentStep === 2">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all divide-y"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black py-6 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y text-sm">
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Transfer Amount
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Fee
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Total Amount
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Name
              </p>
              <p class="text-333333 font-medium line-clamp-1">
                {{ target.name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Details
              </p>
              <p class="text-333333 font-medium line-clamp-1">
                {{ target.number }} - {{ target.bank_name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Date
              </p>
              <p class="text-333333 font-medium">
                {{ format(new Date(), " dd MMM Y") }}
              </p>
            </div>
            <div class="pt-8 flex items-center space-x-4">
              <BaseButton 
                type="button"
                class="text-orange border flex-1 border-orange rounded text-center font-light w-full"
                @click.prevent="(currentStep = 0)"
              >
                Cancel
              </BaseButton>
              <BaseButton
                class="bg-gradient-to-r from-orange to-red text-white rounded text-center font-light w-full"
                :is-loading="isSubmitting"
              >
                Confirm
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  OTP code Modal-->
      <template v-if="currentStep === 1">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-14 h-14 object-cover mx-auto"
            src="@/assets/images/info.png"
            alt=""
          />
          <div>
            <DialogTitle
              as="h3"
              class="text-2xl font-medium leading-6 text-black text-center pb-3"
            >
              Check your messages
            </DialogTitle>
            <p class="text-center text-[#667085]">
              We sent a an OTP code
            </p>
            <p class="text-center text-[#667085]">
              {{ managerStore.getEmail }}
            </p>
          </div>

          <div class="pb-20 pt-5 flex items-center justify-center">
            <BaseOtpInput
              input-classes="otp-input-2 w-12 h-12 text-center focus:outline-none mx-2 rounded-xl text-2xl font-medium"
              name="pin_code"
              :error="errors.pin"
            />
          </div>

          <p class="text-[#626E8B] text-center">
            Code expires in {{ formatter( minutes, seconds ) }}
          </p>
          <div class="flex items-center justify-center">
            <BaseButton
              :is-loading="isSubmitting"
              class="bg-gradient-to-r from-orange to-red text-white text-sm w-full max-w-xs rounded"
            >
              Withdraw
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
      <template v-if="currentStep === 3">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <img
              class="w-14 h-14 object-cover mx-auto"
              src="@/assets/images/check.png"
              alt=""
            />
            <div class="space-y-3 pb-6">
              <div>
                <DialogTitle
                  as="h3"
                  class="text-[#667085] text-center"
                >
                  Transfer to {{ target.name }}
                </DialogTitle>
                <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
                </p>
              </div>
              <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p>
            </div>
          </div>

          <div class="flex-none">
            <BaseButton
              type="button"
              class="bg-gradient-to-r from-orange to-red text-white rounded w-full text-center"
              @click="$router.push({ name: 'wallet' })"
            >
              Close
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
    </form>
  </Modal>
</template>

<script setup>
import {
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { ref,  computed } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { useSettingsStore } from "@/stores/settings";
import { number, object, string } from "yup";
import {useForm} from "vee-validate";
import AmountInput from "@/components/base/AmountInput.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseOtpInput from "@/components/base/BaseOtpInput.vue";
import { useManagerStore } from "@/stores/manager";
import {useWalletStore} from "@/stores/wallet";
import { useCurrency } from "@/composables/currency";
import { useCountdown } from "@/composables/countdown";
import { format  } from "date-fns"

const { formatter, minutes, seconds } = useCountdown(300)
const managerStore = useManagerStore();
const walletStore = useWalletStore();
const settingsStore = useSettingsStore();
settingsStore.getBanks();

const accountDetails = [ ...settingsStore.banks ];

let currentStep = ref(0);

const amount = ref(0);
const totalAmount = computed(() => parseInt(amount.value) + 40);

const target = computed(() => {
  let id = values?.account;
  if (id) return settingsStore.banks.find((account) => account.id === id);
});


const schemas = [
  object({
    account: string().required().label("Bank Account"),
    amount:number("Not a Valid Account Number").required().label("Amount"),
    narration:string().required().label("Description"),
  }),
  object({
    pin_code: number("Invalid format").required().label("Pin Code"),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

const { handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})

const onSubmit = handleSubmit( async ( values, actions ) => {
  if (currentStep.value === 0) {
    return currentStep.value = 2
  }

  if (currentStep.value === 2) {
    await walletStore
      .confirmation(values)
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        actions.setErrors(error.data.errors);
      });

    return currentStep.value = 1

  }


  if (currentStep.value === 1) {
    await walletStore
      .withdraw(values)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        return currentStep.value = 3
      }).catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        actions.setErrors(error.data.errors);
      });
  }

});


</script>
