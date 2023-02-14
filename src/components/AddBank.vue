<template>
  <div>
    <button
      type="button"
      @click.prevent="newBank = !newBank"
      :class="[
        'text-orange text-[0.8125rem] flex items-center py-3 px-4 font-semibold space-x-2 text-sm w-full',
        buttonClass,
      ]"
    >
      <PlusIcon v-if="withIcon" class="h-5" />
      <span>
        {{ buttonTitle }}
      </span>
    </button>
    <TransitionRoot appear :show="newBank" as="template">
      <Dialog
        static
        as="div"
        @click="newBank = !newBank"
        class="relative z-[100]"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-[34.5rem] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all divide-y"
              >
                <DialogTitle
                  as="h3"
                  class="text-xl text-left font-medium leading-6 text-black py-4 px-6"
                >
                  New Account
                </DialogTitle>

                <form class="space-y-4 py-4 px-6" @submit="submit">
                  <!-- Bank -->

                  <BaseSelect
                      label="Bank Name"
                      label-prop="name"
                      v-model="bankCode"
                      :options="genericStore.banks"
                      value-prop="code"
                      track-by="name"
                      placeholder="Select Bank"
                      name="code"
                      :searchable="true"
                      class="rounded border border-light-grey focus:border-light-grey"
                      :error="errors.code"
                  />

                  <!-- Account number -->
                  <BaseInput
                      label="Account number"
                      name="number"
                      v-model="accountNumber"
                      type="text"
                      inputmode="numeric"
                      :disabled="!bankCode"
                      autofocus
                      class="rounded border-light-grey focus:border-light-grey"
                      :error="errors.number"
                  />
<!--                  <LoaderComponent :isLoading="verifying" />-->
                  <p class="font-semibold">{{ accountName }}</p>

<!--                  <div class="space-y-1 relative">-->
<!--                    <label for="account_number">Account number</label>-->
<!--                    <input-->
<!--                      id="account_number"-->
<!--                      v-model="bank.account_number"-->
<!--                      @keypress="isNumber($event)"-->
<!--                      :disabled="verifying"-->
<!--                      @input="verifyAccountNumber"-->
<!--                      :class="[-->
<!--                        $v.account_number.$error-->
<!--                          ? 'border-[#E52053]'-->
<!--                          : 'border-[#D9D9D9]',-->
<!--                      ]"-->
<!--                      class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"-->
<!--                      placeholder="Enter account number "-->
<!--                      type="text"-->
<!--                    />-->
<!--                    &lt;!&ndash; Error &ndash;&gt;-->
<!--                    <p-->
<!--                      v-show="$v.account_number.$error"-->
<!--                      class="absolute right-0 top-0 text-[#E52053]"-->
<!--                    >-->
<!--                      {{-->
<!--                        $v.account_number.required.$invalid-->
<!--                          ? "Account number is Required"-->
<!--                          : ""-->
<!--                      }}-->
<!--                    </p>-->
<!--                    <LoaderComponent :isLoading="verifying" />-->
<!--                    <p class="font-semibold">{{ bank.account_name }}</p>-->
<!--                  </div>-->

                  <div class="flex items-center space-x-3 justify-end" v-if="accountName">
                    <BaseButton
                        type="button"
                        @click="newBank = false"
                        class="rounded border border-626E8B focus:border-626E8B text-626E8B">
                      Cancel
                    </BaseButton>
                    <BaseButton
                        :is-loading="loading"
                        class="rounded bg-gradient-to-r from-orange to-red text-white"
                    >
                      Add Account
                    </BaseButton>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {ref, reactive, watch, computed} from "vue";
import {
  DialogPanel,
  DialogTitle,
  Listbox,
  TransitionRoot,
  TransitionChild,
  Dialog,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/24/outline";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useGenericStore } from "@/stores/generic";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useSettingsStore } from "@/stores/settings";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { number, object, string} from "yup";
import {useForm } from "vee-validate";

const genericStore = useGenericStore();
const settingsStore = useSettingsStore();
genericStore.getBanks()


const newBank = ref(false);
const verifying = ref(false);
const loading = ref(false);

//const canEditAccountNumber = ref("");

const bankCode = ref("");
const accountNumber = ref("");
const accountName = ref("");

watch( accountNumber, (value) => {
  if (value.length === 10) {
    resolveAccountNumber();
  }
});

const schema = computed(() => {
  return object({
    code: string().required().label('Bank Name'),
    number: number('Not a Valid Account Number').required().label('Account Number'),
  })
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})


const submit = handleSubmit( async (values, actions) => {
  loading.value = true;
  await settingsStore.addBank({
    ...values,
    name: accountName.value
  }).then(async (response) => {
   await Toast.fire({
      icon: "success",
      title: "Account Added!",
    });
    newBank.value = false;
    await settingsStore.getBanks();
  }).catch((error) => {
    console.log(error.data)
    Toast.fire({
      icon: "error",
      title: error,
    });
 //   actions.setErrors(error.data.errors);
  }).finally(() => loading.value = false);
});

const isNumber = (event) => {
  const keysAllowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const keyPressed = event.key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
};

const resolveAccountNumber = async () => {
  verifying.value = true;
  await genericStore
    .resolveAccountNumber({
      account_number: accountNumber.value,
      bank_code: bankCode.value,
    })
    .then(({ data }) => {
      accountName.value = data.account_name;
      verifying.value = false;
    })
    .catch((error) => {
      // console.log(error?.response)
      Toast.fire({
        icon: "error",
        title: `${error?.data?.massage}!`,
      });
      verifying.value = false;
    });
  verifying.value = false;
};

defineProps({
  buttonClass: String,
  buttonTitle: String,
  withIcon: Boolean,
});
</script>
