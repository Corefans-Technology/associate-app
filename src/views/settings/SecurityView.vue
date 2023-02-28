<template>
  <TabPanel>
    <form @submit="submit">
      <div class="space-y-20 border-b pb-14">
        <div class="flex space-x-20">
          <div class="max-w-sm w-full space-y-3">
            <h3 class="text-xl font-medium">
              Security
            </h3>
          </div>

          <div class="max-w-sm w-full space-y-5">
            <!-- Old Password -->
            <BaseInput
              label="Current Password"
              name="current_password"
              type="password"
              autofocus
              :obscure="true"
              class="rounded border-light-grey focus:border-light-grey"
              placeholder="Enter Current password"
              :error="errors.current_password"
            />

            <!-- New Password -->
            <BaseInput
              label="New Password"
              name="password"
              type="password"
              autofocus
              :obscure="true"
              class="rounded border-light-grey focus:border-light-grey"
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
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.password_confirmation"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          :is-loading="isSubmitting"
          class="rounded bg-1E1D24 text-white text-sm w-32"
        >
          Save
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
    Toast.fire({
      icon: "success",
      title:  "Password Updated",
    });
    actions.resetForm();
  }).catch((error) => {
    actions.setErrors(error.response.data.errors);
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
  })
});


</script>
