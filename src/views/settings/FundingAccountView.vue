<template>
  <TabPanel>
    <form @submit="submit">
      <div class="space-y-20 border-b pb-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
          <div class="max-w-[25.25rem] w-full space-y-3">
            <h3 class="text-xl font-bold font-power">
              Funding Account
            </h3>
            <p class="text-sm text-[#7D7C80]">
              Set up and monitor your funding account for seamless transactions.
            </p>
          </div>
          <div class=" w-full space-y-[1.2rem]">
            <!-- Bank -->

            <small>For testing: select <b>Access bank</b> and use a/c: <b>0690000010</b></small>

            <BaseSelect
              label="Bank Name"
              label-prop="name"
              :options="banks"
              value-prop="code"
              track-by="name"
              placeholder="Select Bank"
              name="code"
              :searchable="true"
              class="rounded border border-light-grey focus:border-light-grey"
              :error="errors.code"
            />
            <div>
              <!-- Account number -->
              <BaseInput
                label="Account number"
                name="number"
                type="text"
                inputmode="numeric"
                :disabled="!values.code"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                :error="errors.number"
              />
              <!--                  <LoaderComponent :isLoading="verifying" />-->
              <p class="font-semibold text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">
                {{ values.name }}
              </p>
            </div>

            <div
              class="flex items-center space-x-3 justify-end"
            >
              <BaseButton
                v-if="!values.name"
                :is-loading="isSubmitting"
                class="rounded-lg bg-gradient-to-br from-orange to-red text-white h-11 "
              >
                Validate
              </BaseButton>
            <!-- <BaseButton
              v-if="!!values.name"
              :is-loading="isSubmitting"
              class="rounded-lg bg-gradient-to-br from-orange to-red text-white h-11 "
            >
              Add Account
            </BaseButton> -->
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          v-if="!!values.name"
          :is-loading="isSubmitting"
          class="px-4 py-3 rounded-lg bg-gradient-to-br from-orange to-red text-white text-[0.8125rem] w-fit h-11"
        >
          Save Changes
        </BaseButton>
      </div>
    </form>
  </TabPanel>

  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-[100]"
      static
      @close="closeModal"
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
        <DialogOverlay
          class="fixed inset-0 bg-black bg-opacity-25"
        />
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
            <DialogPanel class="w-full max-w-[34.5rem] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all divide-y">
              <DialogTitle
                as="h3"
                class="text-xl text-left font-medium leading-6 text-black py-4 px-6"
              >
                New Account
              </DialogTitle>

              <form
                class="space-y-4 py-4 px-6"
                @submit="submit"
              >
                <!-- Bank -->

                <small>For testing: select <b>Access bank</b> and use a/c: <b>0690000010</b></small>

                <BaseSelect
                  v-model="bankCode"
                  label="Bank Name"
                  label-prop="name"
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
                  v-model="accountNumber"
                  label="Account number"
                  name="number"
                  type="text"
                  inputmode="numeric"
                  :disabled="!bankCode"
                  autofocus
                  class="rounded border-light-grey focus:border-light-grey"
                  :error="errors.number"
                />
                <!--                  <LoaderComponent :isLoading="verifying" />-->
                <p class="font-semibold">
                  {{ accountName }}
                </p>

                <div
                  v-if="accountName"
                  class="flex items-center space-x-3 justify-end"
                >
                  <BaseButton
                    type="button"
                    class="rounded border border-626E8B focus:border-626E8B text-626E8B"
                    @click="closeModal"
                  >
                    Cancel
                  </BaseButton>
                  <BaseButton
                    :is-loading="isSubmitting"
                    class="rounded bg-1E1D24 text-white text-sm w-32"
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
</template>

<script setup>

import {
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";
import { TabPanel } from "@headlessui/vue";
import {ref, computed} from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { useSettingsStore } from "@/stores/settings";
import {useGenericStore} from "@/stores/generic";
import {number, object, string} from "yup";
import {useForm, useResetForm} from "vee-validate";
import { useRouter } from "vue-router";
// import BankCreativeTable from "@/components/tables/BankCreativeTable.vue";
// import LoaderComponent from "@/components/LoaderComponent.vue";
const settingsStore = useSettingsStore();
import {storeToRefs} from "pinia";
const resetForm = useResetForm();
//settingsStore.getBanks();

const genericStore = useGenericStore();
genericStore.getBanks()
const { banks } = storeToRefs(genericStore);

const verifying = ref(false);

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
// function openModal() {
//   isOpen.value = true;
// }


const bankCode = ref("");
const accountNumber = ref("");
const accountName = ref("");
let currentStep = ref(0);
const router = useRouter();
// watch( accountNumber, (value) => {
//   if (value.length === 10) {
//     resolveAccountNumber();
//   }
// });

const schemas = [
  object({
    code: string().required().label("Bank Name"),
    number: number().required("Not a Valid Account Number").min(10, "Not a Valid Account Number").label("Account Number"),
  }),
  object({
    name: string().required("Account Name cannot be empty").trim().min(1, "Account Name cannot be empty").label("Account Name"),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

const { handleSubmit, errors, isSubmitting, values, setFieldValue } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})


const submit = handleSubmit( async ( values, actions ) => {

  if (currentStep.value === 0) {
    await genericStore
      .resolveAccountNumber({
        account_number: values.number,
        bank_code: values.code,
      })
      .then(({ data }) => {
        // currentStep.value = 1
        setFieldValue("name",  data.account_name)
        // Toast.fire({
        //   icon: "error",
        //   title: 'here',
        // });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
    return currentStep.value = 1
  }

  if (currentStep.value === 1) {
    await settingsStore.addBank(values).then(() => {
      resetForm();
      Toast.fire({
        icon: "success",
        title: "Account Added!",
      });

      router.push({ name: "settings.funding.account" })
    }).catch((error) => {
      Toast.fire({
        icon: "error",
        title: error.data.message,
      });
      actions.setErrors(error.data.errors);
    });
  }

  await settingsStore.addBank({
    ...values,
    name: accountName.value,
  }).then(() => {
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "success",
      title: "Account Added!",
    });
    closeModal()
  }).catch((error) => {
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
    actions.setErrors(error.response.data.errors);
  });
});

</script>

<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>

