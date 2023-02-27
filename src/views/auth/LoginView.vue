<template>
  <auth-layout>
    <AuthSideLayout />
    <div class="flex items-center justify-center">
      <div class="space-y-5 w-full max-w-md m-5">
        <FormHeader
          name="Login"
          desc="Welcome back! Please fill in your details."
        />
        <form @submit="login">
          <BaseInput
            name="email"
            type="email"
            label="Email Address"
            class="rounded border border-beerus focus:border-beerus w-full"
            aria-autocomplete="inline"
            autofocus
            :error="errors.email"
          />
          <spacer size="5" />
          <BaseInput
            name="password"
            type="password"
            label="Password"
            :obscure="true"
            class="rounded border border-beerus focus:border-beerus"
            :error="errors.password"
          />
          <div class="pt-8 pb-3">
            <base-button
              class="bg-1E1D24 text-white rounded py-3 w-full"
              :is-loading="isSubmitting"
            >
              Log into your account
            </base-button>
          </div>
        </form>
        <div class="flex flex-col justify-center items-center">
          <div class="space-x">
            <span class="leading-loose">Don’t have an account?</span>
            <RouterLink
              :to="{ name: 'sign.up' }"
              class="text-1E1D24 font-medium"
            >
              Sign up
            </RouterLink>
          </div>
          <div class="mt-2">
            <RouterLink :to="{ name: 'forget.password' }">
              Forget your password ?
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { computed, ref } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { useManagerStore } from "@/stores/manager";
import { useRouter } from "vue-router"
const managerStore = useManagerStore();

import { useForm } from "vee-validate";
import { object, boolean, string } from "yup";
import Spacer from "@/components/Spacer.vue";
import FormHeader from "@/components/FormHeader.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";

const router = useRouter()


const loading = ref(false);

const schema = computed(() => {
  return object({
    email: string().required().email().label("Email Address"),
    password: string().required().label("Password"),
    remember: boolean(),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const login = handleSubmit( async (values, actions) => {
  loading.value = true;
  await managerStore
    .login(values)
    .then(async () => {
      await managerStore.profile()
      await Toast.fire({
        icon: "success",
        title: `Welcome back ${managerStore.data.first_name}!`,
      });

      return router.push({name: "overview"});
    }).catch((error) => {
      if ( error.status === 500 ) {
        return actions.setFieldError("email", "!Oops, unable to login at this time");
      }
      actions.setFieldError("email", error.data.message);
    })
    .finally(() => {
      loading.value = false;
    });
});

// async function login() {
//   loading.value = true;
//   await managerStore
//       .login(form)
//       .then((response) => {
//         Toast.fire({
//           icon: "success",
//           title: `Welcome back ${managerStore.data.first_name}!`,
//         });
//
//         return router.push({name: "overview"});
//       })
//       .catch((error) => {
//         console.log(error)
//         errors.value = {'email': error.data.message};
//       })
//       .finally(() => {
//         loading.value = false;
//       });
// }
</script>

<style lang="scss" scoped></style>
