<template>
  <TabPanel>
    <form @submit="submit">
      <div class="space-y-20 border-b pb-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
          <div class="w-full max-w-[400px] space-y-3">
            <h3 class="text-xl font-bold font-power">
              Security
            </h3>
            <p class="text-sm text-[#7D7C80]">
              Secure your account with a strong password.
            </p>
          </div>

          <div class="w-full space-y-[1.2rem]">
            <!-- Old Password -->
            <BaseInput
              label="Old Password"
              name="current_password"
              type="password"
              autofocus
              :obscure="true"
              class="rounded-lg border-light-grey focus:border-light-grey"
              placeholder="Enter Old Password"
              :error="errors.current_password"
            />

            <!-- New Password -->
            <BaseInput
              label="New Password"
              name="password"
              type="password"
              autofocus
              :obscure="true"
              class="rounded-lg border-light-grey focus:border-light-grey"
              placeholder="Enter new password"
              :error="errors.password"
            />

            <!-- Confirm Password -->
            <BaseInput
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              autofocus
              :obscure="true"
              class="rounded-lg border-light-grey focus:border-light-grey"
              :error="errors.password_confirmation"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          :is-loading="isSubmitting"
          class="px-4 py-3 rounded-lg bg-gradient-to-br from-orange to-red text-white text-[0.8125rem] w-fit h-11"
        >
          Save Changes
        </BaseButton>
      </div>
    </form>
  </TabPanel>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import { computed } from "vue";
import { useManagerStore } from "@/stores/manager";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import {object, string } from "yup";
import {useForm} from "vee-validate";

const managerStore = useManagerStore();

const schema = computed(() => {
  return object().shape({
    current_password: string()
      .required()
      .label("Old Password"),
    password: string()
      .required()
      .label("New Password"),
    password_confirmation: string().required()
      .test("passwords-match", "Passwords must match", function(value){
        return this.parent.password === value
      })
      .label("Confirm Password"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

const submit = handleSubmit( async (values, actions) => {
  await managerStore.passwordUpdate({
    ...values,
  }).then(() => {
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "success",
      title:  "Password Updated",
    });
    actions.resetForm();
  }).catch((error) => {
    actions.setErrors(error.response.data.errors);
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
  })
});


</script>
