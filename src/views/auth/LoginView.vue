<template>
  <auth-layout>
    <div class="flex items-center justify-center md:relative bg-white order-2 md:order-1 pt-2">
      <div class="space-y-5 w-full max-w-md m-4">
        <FormHeader
          name="Sign in"
          desc="Welcome back! Please fill in your details."
        />
        <form @submit="login">
          <BaseInput
            name="email"
            type="email"
            label="Email Address"
            class="rounded-lg border border-#DCDCE4 focus:border-#DCDCE4 w-full"
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
            class="rounded-lg border border-#DCDCE4 focus:border-#DCDCE4"
            :error="errors.password"
          />

          <div class="flex items-center justify-between pt-4">
            <BaseCheckbox
              name="remember"
              label="Remember for 30 days"
            />
            <RouterLink
              class="font-medium text-sm"
              :to="{ name: 'forget.password' }"
            >
              Forgot Password
            </RouterLink>
          </div>
          <div class="pt-8 pb-3">
            <base-button
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg py-3 w-full text-sm font-medium"
              :is-loading="isSubmitting"
            >
              Sign in
            </base-button>
          </div>
        </form>
        <div class="flex flex-col justify-center items-center text-orange text-sm">
          <div class="space-x-1">
            <span class="text-black">Don’t have an account?</span>
            <RouterLink
              class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red underline font-medium"
              :to="{ name: 'sign.up' }"
            >
              Sign up for free
            </RouterLink>
          </div>
          <!-- <div class="mt-2">
            
          </div> -->
        </div>
      </div>

      <RouterLink
        to="/"
        class="text-orange flex-none"
      >
        <img
          class="w-[6.813rem] bg-cover absolute left-20 top-11"
          src="@/assets/images/logo_3.png"
          alt="Corefans"
        />
      </RouterLink>
    </div>
    <AuthSideLayout class="order-1 md:order-2" />
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { computed } from "vue";
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


// const loading = ref(false);

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
  await managerStore
    .login(values)
    .then(() => {
      // eslint-disable-next-line no-undef
      Toast.fire({
        icon: "success",
        title: `Welcome back ${managerStore.data.first_name}!`,
      });

      return router.push({name: "overview"});
    }).catch((error) => {
      if ( error.response.status === 500 ) {
        return actions.setFieldError("email", "!Oops, unable to login at this time");
      }
      actions.setFieldError("email", error.response.data.message);
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
