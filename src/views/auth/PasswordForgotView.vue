<template>
  <form @submit="requestReset">
    <FormHeader
      name="Forgot Password"
      desc="Enter your email address and we’ll
send you a code to reset your password."
    />
    <Spacer size="10" />
    <BaseInput
      name="email"
      label="Email Address"
      type="email"
      aria-autocomplete="none"
      class="rounded border border-beerus focus:border-beerus"
      autofocus
      :error="errors.email"
    />
    <div class="pt-8 pb-3">
      <BaseButton
        class="bg-1E1D24 text-white rounded py-3 w-full"
        :is-loading="isSubmitting"
      >
        Request Password Reset
      </BaseButton>
    </div>
  </form>
  <div class="flex flex-col justify-center items-center">
    <div class="space-x">
      <span>Don’t have an account?</span>
      <RouterLink
        :to="{ name: 'sign.up' }"
        class="text-1E1D24 font-medium"
      >
        Sign up
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import {computed, reactive, ref} from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useManagerStore } from "@/stores/manager";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import FormHeader from "@/components/FormHeader.vue";
import Spacer from "@/components/Spacer.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import {boolean, object, string} from "yup";
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
      Toast.fire({
        icon: "success",
        title: response.message,
      });

      const email = values.email;
      const emailEncoded = encodeURIComponent(email);
      return router.push({name: "forgot.password.verify", params: { email: emailEncoded }});
    }).catch((error) => {
      actions.setFieldError("email", error.data.message);
    });
});
</script>

<style lang="scss" scoped></style>
