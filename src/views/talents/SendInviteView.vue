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
        class="w-full max-w-md transform overflow-hidden rounded-lg bg-white py-4 pb-8 px-6 text-left shadow-xl transition-all space-y-4"
      >
        <div class="flex items-center justify-between">
          <DialogTitle
            as="h2"
            class="text-2xl font-bold text-black leading-loose font-power"
          >
            Send Invite
          </DialogTitle>
          <XMarkIcon
            class="w-5 h-5 stroke-09121F stroke-2"
            @click="$router.push({ name: 'talents.index' })"
          />
        </div>
        <div class="bg-#E9E8E9 p-2 px-3 rounded-lg flex items-center justify-between text-sm font-medium text-#444349">
          <p class="flex items-center space-x-1">
            <Icon
              class="stroke-current"
              name="send"
            /> 
            <span>Talent Invites Left</span>
          </p>
          <p>{{ totalNumberInvites }}/20</p>
        </div>
        <div class="space-y-4 pt-4">
          <div class="flex flex-col md:flex-row items-start gap-y-4 gap-x-6">
            <!-- First name -->
            <BaseInput
              name="first_name"
              placeholder="First Name"
              label="First Name"
              type="text"
              class="rounded-lg border-beerus focus:border-beerus cursor-not-allowed"
              :error="errors.first_name"
            />
            <!-- Last name -->
            <BaseInput
              readonly
              name="last_name"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              class="rounded-lg border border-beerus focus:border-beerus cursor-not-allowed"
              :error="errors.last_name"
            />
          </div>

          <BaseInput
            name="email"
            type="email"
            placeholder="Email Address"
            label="Email Address"
            class="rounded-lg border-beerus focus:border-beerus w-full"
            aria-autocomplete="inline"
            autofocus
            :error="errors.email"
          />

          <PhoneNumberInput
            placeholder="70 397 6220"
            code="country_code"
            number="phone_number"
            label="Phone Number"
            :options="genericStore.countries"
            class="bg-white rounded-lg border-beerus focus:border-beerus "
            :error="errors.phone_number"
          />



          <div
            v-if="totalNumberInvites < 21"
            class="flex items-center justify-end space-x-4 pt-4"
          >
            <div class=" bg-gradient-to-br from-orange to-red p-px rounded-lg">
              <BaseButton
                type="button"
                class="rounded-lg text-center font-light text-sm bg-white h-9"
                @click="$router.push({ name: 'talents.index' })"
              >
                <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red flex items-center justify-center space-x-1 font-medium">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4749 11.6819L4.81808 6.02502C4.6248 5.83174 4.6248 5.51118 4.81808 5.31791C5.01135 5.12463 5.33191 5.12463 5.52518 5.31791L11.182 10.9748C11.3753 11.168 11.3753 11.4886 11.182 11.6819C10.9888 11.8751 10.6682 11.8751 10.4749 11.6819Z"
                      fill="url(#paint0_linear_3424_24180)"
                    />
                    <path
                      d="M4.81796 11.6819C4.62469 11.4886 4.62469 11.168 4.81796 10.9748L10.4748 5.31791C10.6681 5.12463 10.9886 5.12463 11.1819 5.31791C11.3752 5.51118 11.3752 5.83174 11.1819 6.02502L5.52507 11.6819C5.33179 11.8751 5.01124 11.8751 4.81796 11.6819Z"
                      fill="url(#paint1_linear_3424_24180)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3424_24180"
                        x1="5.17163"
                        y1="4.96436"
                        x2="3.92988"
                        y2="6.51654"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F18B1B" />
                        <stop
                          offset="1"
                          stop-color="#E52053"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3424_24180"
                        x1="10.8284"
                        y1="4.96436"
                        x2="12.0701"
                        y2="6.51654"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F18B1B" />
                        <stop
                          offset="1"
                          stop-color="#E52053"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  Cancel
                </span>
              </BaseButton>
            </div>
            <BaseButton
              class=" bg-gradient-to-br from-orange to-red h-9 text-white rounded-lg text-center font-light"
              :is-loading="isSubmitting"
            >
              <span class="flex items-center space-x-2">
                <Icon
                  class="stroke-current"
                  name="send"
                /> 
                <span>Send Invite</span>
              </span>
            </BaseButton>
          </div>
          <div
            v-else
            class="flex items-center justify-end space-x-2 pt-4 text-error font-power"
          >
            <ExclamationTriangleIcon class="w-5 h-5" />
            <p>You have reach limit</p>
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
        class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 md:p-10 text-left shadow-xl transition-all space-y-4"
      >
        <div class="mx-auto flex justify-center">
          <!-- <Icon name="success" /> -->
          <img
            src="@/assets/images/success.png"
            alt=""
            srcset=""
          />
        </div>

        <div class="space-y-1">
          <h1 class="text-2xl font-bold text-black text-center font-power">
            Success
          </h1>
          <p class="text-434345 text-lg font-light text-center">
            Invitation sent. You can monitor the status of the invite 
            in the Talent > Pending section
          </p>
        </div>

        <div class="flex items-center justify-center space-x-4 pt-4">
          <BaseButton
            type="button"
            class=" bg-gradient-to-br from-orange to-red text-white rounded-lg text-center text-sm w-full"
            @click="$router.push({ name: 'talents.index' })"
          >
            Close
          </BaseButton>
          <!-- <BaseButton
            class="bg-1E1D24 text-white rounded text-center font-light hidden"
            :is-loading="isSubmitting"
          >
            <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" />
            Send Invite
          </BaseButton> -->
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
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import Icon from "@/components/Icon.vue";
import { computed, ref, onMounted } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { object, string } from "yup";
import {useForm} from "vee-validate";
import {useTalentStore} from "@/stores/talent";
import {useManagerStore} from "@/stores/manager";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import PhoneNumberInput from "@/components/PhoneNumberInput.vue";
import PhoneNumber from "google-libphonenumber";
import {useGenericStore} from "@/stores/generic";
import { useRouter } from "vue-router";
import {storeToRefs} from "pinia";
const router = useRouter();
const genericStore = useGenericStore();
const managerStore = useManagerStore();
genericStore.getCountries();
const talentStore = useTalentStore();
const { invitedList, inviteeList } = storeToRefs(talentStore)
const isSuccessOpen = ref(false);
const isInviteOpen = ref(true);

const totalNumberInvites = computed( () => {
  return invitedList.value?.data?.length + inviteeList.value?.data?.length
})

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
          const phoneNumber = ctx.parent.country_code.dialing_code + value;
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
    country_code: object().required().label("Country Code"),
  });
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
  initialValues: {
    country_code:  { 
      "id": "01hbtgs0gmj9wvk2k64ag54d47", 
      "name": "Nigeria", 
      "code": "NG", 
      "currency": "NGN", 
      "currency_name": "Nigeria Naira", 
      "dialing_code": "+234", 
      "flag_url": "https://flagcdn.com/ng.svg", 
    },
  },
})

const onSubmit = handleSubmit( async ( values, actions ) => {

  await talentStore
    .sendInvite({
      ...values,
      country_code: values.country_code.dialing_code,
      manager_id: managerStore.data.id
    })
    .then(() => {
      // eslint-disable-next-line no-undef
      Toast.fire({
        icon: "success",
        title: "Invite Sent!!",
      });
      isSuccessOpen.value = true;
      isInviteOpen.value = false;
      router.push({ name: "talents.invitee"})
    }).catch((error) => {
      // eslint-disable-next-line no-undef
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
      actions.setErrors(error.response.data.errors);
    });

});


onMounted( async () => {
  await talentStore.fetchInvited();
  await talentStore.fetchInvitee();
})

</script>
