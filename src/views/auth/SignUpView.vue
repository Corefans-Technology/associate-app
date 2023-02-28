<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import {computed, ref, watch } from "vue";
import { useManagerStore } from "@/stores/manager";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import Spacer from "@/components/Spacer.vue";
import FormHeader from "@/components/FormHeader.vue";
import {RouterLink, useRouter} from "vue-router";
import {object, string, number} from "yup";
import {useForm} from "vee-validate";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import PhoneNumber from "google-libphonenumber";
import {useGenericStore} from "@/stores/generic";
import PhoneNumberInput from "@/components/PhoneNumberInput.vue";
import { vMaska } from "maska"

const managerStore = useManagerStore();
const genericStore = useGenericStore();
genericStore.getCountries();
genericStore.getBanks()
const router = useRouter()

let currentStep = ref(0);
const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();

const bankCode = ref("");
const accountNumber = ref("");
const accountName = ref("");
const verifying = ref(false);

watch( accountNumber, (value) => {
  if (value.length === 10) {
    resolveAccountNumber();
  }
});

const schemas = [
  object({
    invite_code: number("Invite Code format").required().label("Invitation Code"),
  }),
  object({
    email: string().required().email().label("Email Address"),
    password: string().required().label("Password"),
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
    country_code: string().required().label("Country Code"),
  }),
  object({
    number: number("Not a Valid Account Number").required().label("Account Number"),
    code: string().required().label("Bank"),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

const { handleSubmit, errors, isSubmitting, setValues, setErrors   } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
  initialValues: {
    country_code: "+234",
  },
})

const onSubmit = handleSubmit( async (values, actions) => {
  if (currentStep.value === 0) {
    return verifyInviteCode(values.invite_code)
  }
  if (currentStep.value === 2) {
    await managerStore
      .signUp({...values, name: accountName.value})
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "You are in!",
        });
        return router.push({name: "sign.up.success"});
      }).catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
        actions.setErrors(error.response.data.errors);
      });
  }

  currentStep.value += 1;
});

const verifyInviteCode = (value) =>  {
  managerStore
    .verifyInviteCode(value)
    .then((response) => {
      setValues({
        invite_code: value,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        phone_number: response.data.phone_number,
      });

      currentStep.value = 1;

    })
    .catch(( error ) => {
      setErrors({"invite_code": error.response.data.message});
    });
};

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
<template>
  <auth-layout>
    <AuthSideLayout />
    <div class="flex items-center justify-center w-full mx-auto">
      <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-[3rem]">
        <form @submit.prevent="onSubmit">
          <template v-if="currentStep === 0">
            <FormHeader
              name="Create your Account"
              desc="Welcome back! Please fill in your details."
            />
            <Spacer size="10" />
            <BaseInput
              v-maska
              name="invite_code"
              label="Invitation Code"
              type="text"
              data-maska="######"
              inputmode="numeric"
              placeholder="******"
              class="rounded border-beerus focus:border-beerus"
              :error="errors.invite_code"
            />
            <Spacer size="2" />
            <div
              class="text-sm text-1E1D24 flex justify-end items-center pt-1"
            >
              <p class="text-right">
                Why you need an invitation code
              </p>
              <ChevronRightIcon class="w-3 h-3" />
            </div>
            <Spacer size="10" />
            <div>
              <div class="space-y-3">
                <RouterLink
                  :to="{ name: 'awaiting.list' }"
                  class="flex items-center justify-center border border-1E1D24 text-1E1D24 rounded text-base font-medium h-12"
                >
                  <span>I don’t have an invitation</span>
                </RouterLink>


                <BaseButton
                  :is-loading="isSubmitting"
                  class="bg-1E1D24 text-white rounded w-full"
                >
                  Continue
                </BaseButton>
              </div>
              <Spacer size="8" />
              <p class="text-center">
                Already have an account?
                <RouterLink
                  :to="{ name: 'login' }"
                  class="text-1E1D24 font-medium"
                >
                  Login
                </RouterLink>
              </p>
            </div>
          </template>
          <template v-if="currentStep === 1">
            <FormHeader
              name="Let’s get started"
              desc="Tell us a bit about yourself"
            />
            <Spacer size="8" />
            <div class="space-y-2">
              <div class="w-full h-1 rounded-[10px] bg-#D5D5D5 relative">
                <div class="w-2/4 absolute inset-y-0 bg-1E1D24 rounded-[10px]" />
              </div>
              <p class="text-1E1D24">
                Personal Information: 1/2
              </p>
            </div>
            <Spacer size="8" />
            <div class="space-y-5">
              <div class="flex items-start space-x-6">
                <!-- First name -->
                <BaseInput
                  readonly
                  name="first_name"
                  label="First Name"
                  type="text"
                  class="rounded border-beerus focus:border-beerus cursor-not-allowed"
                  :error="errors.first_name"
                />
                <!-- Last name -->
                <BaseInput
                  readonly
                  name="last_name"
                  label="Last Name"
                  type="text"
                  class="rounded border border-beerus focus:border-beerus cursor-not-allowed"
                  :error="errors.last_name"
                />
              </div>


              <PhoneNumberInput
                label="Phone Number"
                code="country_code"
                number="phone_number"
                :options="genericStore.countries"
                class="bg-white rounded border border-beerus focus:border-beerus focus:border-beerus"
                :error="errors.phone_number"
              />

              <BaseInput
                name="email"
                type="email"
                label="Email Address"
                class="rounded border-beerus focus:border-beerus w-full"
                aria-autocomplete="inline"
                autofocus
                :error="errors.email"
              />
              <BaseInput
                name="password"
                type="password"
                label="Password"
                :obscure="true"
                class="rounded border-beerus focus:border-beerus"
                :error="errors.password"
              />
              <div class="pt-5">
                <BaseButton
                  class="bg-1E1D24 text-white rounded py-3 w-full"
                  :is-loading="isSubmitting"
                >
                  Continue
                </BaseButton>
              </div>
            </div>
          </template>
          <template v-if="currentStep === 2">
            <FormHeader
              name="Let’s get started"
              desc="Tell us a bit about yourself"
            />
            <Spacer size="8" />
            <div class="space-y-2">
              <div class="w-full h-1 rounded-[10px] bg-#D5D5D5 relative">
                <div class="w-full absolute inset-y-0 bg-1E1D24 rounded-[10px]" />
              </div>
              <p class="text-1E1D24">
                Talent Information: 2/2
              </p>
            </div>
            <Spacer size="8" />
            <div class="space-y-5">
              <BaseSelect 
                v-model="bankCode"
                label="Bank"
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

              <BaseInput
                v-model="accountNumber"
                label="Account number"
                name="number"
                type="text"
                inputmode="numeric"
                :disabled="!bankCode"
                autofocus
                class="rounded border-beerus focus:border-beerus"
                :error="errors.number"
              />
              <p class="font-semibold">
                {{ accountName }}
              </p>




              <div class="pt-5">
                <BaseButton
                  class="bg-1E1D24 text-white rounded py-3 w-full"
                  :is-loading="isSubmitting"
                >
                  Create Your Account
                </BaseButton>
              </div>
            </div>
          </template>
        </form>
      </div>
    </div>
  </auth-layout>
</template>