<template>
  <FormHeader
    name="Create new password?"
    desc="Create your new password for your account for easing login."
    desc-style="text-grey-1 font-light w-2/3"
  />
  <form
    class="mt-5 space-y-4"
    @submit.prevent="resetPassword"
  >
    <!-- Password -->
    <BaseInput
      name="password"
      type="password"
      label="Password"
      :obscure="true"
      class="rounded-lg border border-beerus focus:border-beerus"
      :error="errors.password"
    />
    <!-- Password -->
    <BaseInput
      name="password_confirmation"
      type="password"
      label="Repeat New Password"
      :obscure="true"
      class="rounded-lg border border-beerus focus:border-beerus"
      :error="errors.password_confirmation"
    />

    <div class="pt-5">
      <base-button
        class="bg-gradient-to-br from-orange to-red text-white rounded-lg py-3 w-full"
        :is-loading="isSubmitting"
      >
        Reset Password
      </base-button>
    </div>
  </form>
  <div class="flex flex-col justify-center items-center text-orange text-sm mt-4">
    <div class="space-x-2">
      <span class="text-black">Already have an account?</span>
      <RouterLink
        class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red underline font-medium"
        :to="{ name: 'login' }"
      >
        Login
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import FormHeader from "@/components/FormHeader.vue";
import { useManagerStore } from "@/stores/manager";
import {useRoute, useRouter} from "vue-router";
import BaseInput from "@/components/base/BaseInput.vue";
import {object, string} from "yup";
import {useForm} from "vee-validate";

const managerStore = useManagerStore();
const router = useRouter();
const route = useRoute();

const schema = computed(() => {
  return object({
    password: string().required().min(8).label("Password"),
    password_confirmation: string().required()
      .test("password-confirmation", "Passwords do not match", function(value) {
        return this.parent.password === value;
      }).label("Repeat New Password"),
  })
});


const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: decodeURIComponent(route.params.email),
    pin: decodeURIComponent(route.params.pin),
  },
})

const resetPassword = handleSubmit( async (values, actions) => {
  await managerStore
    .resetPassword(values)
    .then(() => {
      // eslint-disable-next-line no-undef
      Toast.fire({
        icon: "success",
        title: "password reset successfully!",
      });

      return router.push({name: "login" });
    }).catch((error) => {
      actions.setErrors(error.response.data.errors);
    });
});


// function resetPassword() {
//   $v._value.$touch();
//   if (!$v._value.$invalid) {
//     loading.value = true;
//     managerStore
//       .resetPassword(form)
//       .then(() => {
//         // console.log('here')
//         managerStore.email = null
//         managerStore.pin = null
//         router.push({ name: "login" });
//       })
//       .catch((error) => {
//         errors.value.push(error._data.message);
//       })
//       .finally(() => {
//         loading.value = false;
//         setTimeout(() => {
//           $loading.hide();
//         }, 5000);
//       });
//   }
// }
</script>

<style lang="scss" scoped></style>
