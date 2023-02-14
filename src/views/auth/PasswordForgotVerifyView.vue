<template>
  <FormHeader
    name="We’ve sent a mail"
    desc="`A mail was sent to ${email} Please view the mail
            for instructions on how to reset your password`"
  />
  <form
    class="mt-8"
    @submit.prevent="verifyToken"
  >
    <!-- Verification Code -->

    <BaseOtpInput
      name="pin"
      label="Verification Code"
      class="space-x-3"
      :error="errors.pin"
    />
    <div class="mt-5">
      <BaseButton
        class="bg-1E1D24 text-white rounded w-72 max-w-full"
        :is-loading="isSubmitting"
      >
        Proceed
      </BaseButton>
    </div>
  </form>
  <div class="mt-3 space-x-2 flex items-center w-72 text-1E1D24 text-sm">
    <p>Don’t get any mail?</p>
    <BaseButton>
      Resend Mail
    </BaseButton>
  </div>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import {computed, reactive, ref} from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseOtpInput from "@/components/base/BaseOtpInput.vue";
import { useManagerStore } from "@/stores/manager";
import { useRouter, useRoute } from "vue-router";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import FormHeader from "@/components/FormHeader.vue";
import {object, string} from "yup";
import {useForm} from "vee-validate";

const managerStore = useManagerStore();
const router = useRouter();
const route = useRoute();



const schema = computed(() => {
  return object({
    pin: string().required().label("Verification Code"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: decodeURIComponent(route.params.email),
  },
})

const verifyToken = handleSubmit( async (values, actions) => {
  await managerStore
    .verifyToken(values)
    .then(() => {
      Toast.fire({
        icon: "success",
        title: "correct",
      });

      const email = values.email;
      const pin = values.pin;
      const emailEncoded = encodeURIComponent(email);
      const pinEncoded = encodeURIComponent(pin);
      return router.push({name: "reset.password", params: { email: emailEncoded, pin: pinEncoded }});
    }).catch((error) => {
      actions.setFieldError("pin", error.data.message);
    });
});


// function verifyToken() {
//   loading.value = true;
//   managerStore
//     .verifyToken(form.value)
//     .then(() => {
//       managerStore.pin = form.value.pin
//       router.push({ name: "reset-password" });
//     })
//     .catch((error) => {
//       errors.value.push(error._data.message);
//     })
//     .finally(() => {
//       loading.value = false;
//       setTimeout(() => {
//         $loading.hide();
//       }, 5000);
//     });
// }


</script>
