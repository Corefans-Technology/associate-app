<template>
  <form @submit="requestReset">
    <FormHeader
      name="Forgot Password"
      desc="Enter your email address and we’ll
send you a code to reset your password."
    />
    <Spacer size="6" />
    <BaseInput
      name="email"
      label="Email Address"
      type="email"
      aria-autocomplete="none"
      class="rounded-lg border border-beerus focus:border-beerus"
      autofocus
      :error="errors.email"
    />
    <div class="pt-6 pb-3">
      <BaseButton
        class="bg-gradient-to-br from-orange to-red text-white rounded-lg py-3 w-full"
        :is-loading="isSubmitting"
      >
        Request Password Reset
      </BaseButton>
    </div>
  </form>
  <div class="flex flex-col justify-center items-center text-orange text-sm">
    <div class="space-x-2">
      <span class="text-black">Don’t have an account?</span>
      <RouterLink
        class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red underline font-medium"
        :to="{ name: 'sign.up' }"
      >
        Sign up
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// import AuthLayout from "@/layouts/AuthLayout.vue";
import {computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useManagerStore } from "@/stores/manager";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import FormHeader from "@/components/FormHeader.vue";
import Spacer from "@/components/Spacer.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { object, string} from "yup";
import {useForm} from "vee-validate";

const managerStore = useManagerStore();
const router = useRouter();


const schema = computed(() => {
  return object({
    email: string().required().email().label("Email Address"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const requestReset = handleSubmit( async (values, actions) => {
  await managerStore
    .forgetPassword(values)
    .then((response) => {
      // eslint-disable-next-line no-undef
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });

      const email = values.email;
      const emailEncoded = encodeURIComponent(email);
      return router.push({name: "forgot.password.verify", params: { email: emailEncoded }});
    }).catch((error) => {
      actions.setFieldError("email", error.response.data.message);
    });
});
</script>

<style lang="scss" scoped></style>
