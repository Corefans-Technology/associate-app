<template>
  <TabPanel>
    <Suspense>
      <template #default>
        <BankCreativeTable />
      </template>
      <template #fallback>
        <div class="flex flex-col items-center justify-center py-10 pt-40">
          <LoaderComponent />
        </div>
      </template>
    </Suspense>

    <div class="flex items-center justify-end py-10 pt-40">
      <div>
        <BaseButton
          type="button"
          class="rounded bg-1E1D24 text-white text-sm w-32"
          @click="openModal"
        >
          <span>
            Add account
          </span>
        </BaseButton>
      </div>
    </div>
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
import {ref, watch, computed} from "vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { useSettingsStore } from "@/stores/settings";
import {useGenericStore} from "@/stores/generic";
import {number, object, string} from "yup";
import {useForm} from "vee-validate";
import BankCreativeTable from "@/components/tables/BankCreativeTable.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
const settingsStore = useSettingsStore();
//settingsStore.getBanks();

const genericStore = useGenericStore();
genericStore.getBanks()

const verifying = ref(false);

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}


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
    code: string().required().label("Bank Name"),
    number: number("Not a Valid Account Number").required().label("Account Number"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})


const submit = handleSubmit( async ( values, actions ) => {
  await settingsStore.addBank({
    ...values,
    name: accountName.value,
  }).then(() => {
    Toast.fire({
      icon: "success",
      title: "Account Added!",
    });
    closeModal()
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
    actions.setErrors(error.response.data.errors);
  });
});

const resolveAccountNumber = async () => {
  verifying.value = true;
  await genericStore
    .resolveAccountNumber({
      account_number: accountNumber.value,
      bank_code: bankCode.value,
    })
    .then((response) => {
      accountName.value = response.data.account_name;
      verifying.value = false;
    })
    .catch((error) => {
      // console.log(error?.response)
      Toast.fire({
        icon: "error",
        title: error.response.data.massage,
      });
      verifying.value = false;
    });
  verifying.value = false;
};

</script>

<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>

