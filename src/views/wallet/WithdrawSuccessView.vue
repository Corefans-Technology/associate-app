<template>
  <Modal :is-open="true">
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
              Transfer to OLOYEDE TOBI E.
            </DialogTitle>
            <p class="text-[2rem] font-bold text-center text-black">
              {{ useCurrency(700) }}
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
  </Modal>
</template>

<script setup>
import {
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import VOtpInput from "vue3-otp-input";
import { ref, reactive, computed} from "vue";
import Modal from "@/components/ModalComponent.vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { useWalletStore } from "@/stores/wallet";
import { useSettingsStore } from "@/stores/settings";
import {number, object, string} from "yup";
import {useForm} from "vee-validate";
import AmountInput from "@/components/base/AmountInput.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import { vMaska } from "maska"
import BaseButton from "@/components/base/BaseButton.vue";
import { useCurrency } from "@/composables/currency";

const settingsStore = useSettingsStore();
const walletStore = useWalletStore();
walletStore.getBalance();
walletStore.getTransactions();
settingsStore.getBanks();

const accountDetails = [ ...settingsStore.banks ];

let currentStep = ref(0);

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

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: currentSchema,
})

const onSubmit = handleSubmit( async ( values, actions ) => {
  if (currentStep.value === 0) {
    currentStep.value = 2
  }


  if (currentStep.value === 1) {
    await managerStore
      .signUp(values)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "You are in!",
        });
        return router.push({name: "sign.up.success"});
      }).catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        actions.setErrors(error.data.errors);
      });
  }

  currentStep.value += 1;
});

const isOpen = ref(true);
const confirm = ref(true);
const otpModal = ref(true);
const success = ref(true);



const formData = reactive({
  bank: {
    description: "",
    bank: {},
    account_number: "",
    account_name: "",
  },
});

const rules = {
  bank: {
    description: {
      required,
      maxLengthValue: maxLength(20),
    },
    bank: {
      required,
    },
    account_number: {
      required,
    },
    account_name: {
      required,
    },
  },
};

const $v = useVuelidate(rules, formData);

const otpInput = ref(null);
// const pinInput = ref(null);

// const handleOnOtpComplete = (value) => {
//   otpModal.value = false;
//   pinModal.value = true;

//   console.log("OTP completed: ", value);
// };
const handleOnPinComplete = () => {
  otpModal.value = false;
  confirm.value = true;
  // console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};


function openModal() {
  isOpen.value = true;
}

function submitWithdraw() {
  isOpen.value = false;
  otpModal.value = true;
}

function confirmPay() {
  success.value = true;
  confirm.value = false;
}

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
</script>
<!-- otp-input -->
<style>
.otp-input-2 {
  border: 1px solid #d9d9d9 !important;
}
.otp-input-2.is-complete {
  border-color: #b9b9b9 !important;
}

.otp-input-2::-webkit-inner-spin-button,
.otp-input-2::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.otp-input-3 {
  width: 74px;
  height: 74px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #b9b9b9;
  text-align: center;
}
.otp-input-3.is-complete {
  border-color: #ff9e0b;
}

.otp-input-3.is-complete::-webkit-inner-spin-button,
.otp-input-3::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<style>
.apexcharts-toolbar {
  display: none !important;
}
</style>

<style scoped>
::v-deep(.Successful) {
  color: #00c48c;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(0, 196, 140, 0.1);
  border-radius: 100px;
}
::v-deep(.Failed) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Unfulfilled) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Pending) {
  color: #e3a11b;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(227, 161, 27, 0.1);
  border-radius: 100px;
}
::v-deep(.Fulfilled) {
  color: #3d6abe;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(61, 106, 190, 0.1);
  border-radius: 100px;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #98a2b3;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  border-bottom: #98a2b31f 1px solid;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}

::v-deep(.vtl-thead div) {
  font-weight: normal !important;
  font-size: 14px;
}

::v-deep(.vtl-paging-info) {
  font-size: 12px;
  color: #565758;
}

::v-deep(.vtl-tbody-td div) {
  font-weight: normal !important;
  font-size: 14px;
  padding: 6px 0px;
}

::v-deep(.vtl-paging-change-div) {
  opacity: 0;
}

::v-deep(.vtl-thead-checkbox) {
  border-radius: 4px;
}
::v-deep(.vtl-tbody-checkbox) {
  border-radius: 4px;
}
</style>
