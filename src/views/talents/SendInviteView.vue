<template>
  <Modal
    :is-open="isInviteOpen"
    @close="isInviteOpen = !isInviteOpen"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <DialogPanel
        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-4 px-6 text-left shadow-xl transition-all space-y-4"
      >
        <div class="flex items-center justify-between">
          <DialogTitle
            as="h2"
            class="text-xl font-bold text-black leading-loose"
          >
            Send Invite
          </DialogTitle>
          <XMarkIcon
            class="w-5 h-5 stroke-09121F stroke-2"
            @click="$router.push({ name: 'talents.index' })"
          />
        </div>
        <div class="space-y-4">
          <div class="flex items-start space-x-6">
            <!-- First name -->
            <BaseInput
              readonly
              name="first_name"
              placeholder="First Name"
              type="text"
              class="rounded-2xl border-beerus focus:border-beerus cursor-not-allowed"
              :error="errors.first_name"
            />
            <!-- Last name -->
            <BaseInput
              readonly
              name="last_name"
              placeholder="Last Name"
              type="text"
              class="rounded-2xl border border-beerus focus:border-beerus cursor-not-allowed"
              :error="errors.last_name"
            />
          </div>

          <BaseInput
            name="email"
            type="email"
            placeholder="Email Address"
            class="rounded-2xl border-beerus focus:border-beerus w-full"
            aria-autocomplete="inline"
            autofocus
            :error="errors.email"
          />

          <PhoneNumberInput
            placeholder="70 397 6220"
            code="country_code"
            number="phone_number"
            :options="genericStore.countries"
            class="bg-white rounded-2xl border border-beerus focus:border-beerus focus:border-beerus"
            :error="errors.phone_number"
          />



          <div class="flex items-center justify-end space-x-4 pt-4">
            <BaseButton
              type="button"
              class="bg-light-grey-3 text-gray-1 rounded text-center font-light text-sm"
              @click="$router.push({ name: 'talents.index' })"
            >
              <XMarkIcon class="h-4" />
              Cancel
            </BaseButton>
            <BaseButton
              class="bg-1E1D24 text-white rounded text-center font-light"
              :is-loading="isSubmitting"
            >
              <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" />
              Send Invite
            </BaseButton>
          </div>
        </div>
      </DialogPanel>
    </form>
  </Modal>
  <Modal
    :is-open="isSuccessOpen"
    @close="isSuccessOpen = !isSuccessOpen"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <DialogPanel
        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-10 px-6 text-left shadow-xl transition-all space-y-4"
      >
        <div class="mx-auto flex justify-center">
          <Icon name="success" />
        </div>

        <div>
          <h1 class="text-lg font-semibold text-black text-center">
            Success
          </h1>
          <p class="text-434345 text-lg font-light text-center">
            Invitation sent
          </p>
        </div>

        <div class="flex items-center justify-center space-x-4 pt-4">
          <BaseButton
            type="button"
            class="bg-1E1D24 text-white rounded text-center text-sm w-1/2"
            @click="$router.push({ name: 'talents.index' })"
          >
            Continue
          </BaseButton>
          <BaseButton
            class="bg-1E1D24 text-white rounded text-center font-light hidden"
            :is-loading="isSubmitting"
          >
            <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" />
            Send Invite
          </BaseButton>
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
  PaperAirplaneIcon,
} from "@heroicons/vue/24/outline";
import Icon from "@/components/Icon.vue";
import { computed, ref } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { object, string } from "yup";
import {useForm} from "vee-validate";
import {useTalentStore} from "@/stores/talent";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import PhoneNumberInput from "@/components/PhoneNumberInput.vue";
import PhoneNumber from "google-libphonenumber";
import {useGenericStore} from "@/stores/generic";
import { useRouter } from "vue-router";

const router = useRouter();
const genericStore = useGenericStore();
genericStore.getCountries();
const talentStore = useTalentStore();

const isSuccessOpen = ref(false);
const isInviteOpen = ref(true);

const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();

const currentSchema = computed(() => {
  return  object({
    email: string().required().email().label("Email Address"),
    first_name: string().required().label("First Name"),
    last_name: string().required().label("Last Name"),
    phone_number: string().required().test({
      name: "phone",
      message: "Invalid phone number",
      test: async (value, ctx) => {
        try {
          // add the selectedCountryCode to the phone number
          const phoneNumber = ctx.parent.country_code + value;
          const parsedNumber = phoneUtil.parse(phoneNumber);
          const isValid = phoneUtil.isValidNumber(parsedNumber);
          if (!isValid) {
            throw new Error("Invalid phone number");
          }
          return true;
        } catch (err) {
          return false;
        }
      },
    }).label("Phone Number"),
  });
});

const { handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})

const onSubmit = handleSubmit( async ( values, actions ) => {

  await talentStore
    .sendInvite(values)
    .then(() => {
      Toast.fire({
        icon: "success",
        title: "Invite Sent!!",
      });
      isSuccessOpen.value = true;
      isInviteOpen.value = false;
      router.push({ name: "talents.invitee"})
    }).catch((error) => {
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
      actions.setErrors(error.response.data.errors);
    });

});


</script>
