<template>
  <TabPanel>
    <form @submit="submit">
      <div class="space-y-20 border-b pb-8">
        <div class="flex space-x-20">
          <div class="max-w-md w-full space-y-3">
            <h3 class="text-xl font-medium">
              Profile
            </h3>
            <p class="text-sm text-[#98A2B3]">
              Make a good first impression: introduce your campaign
              objectives and entice people to learn more. This basic
              information will represent your campaign on your campaign
              page, on your campaign card, and in searches.
            </p>
          </div>

          <div class="max-w-md w-full space-y-[1.2rem]">
            <div class="flex space-x-5">
              <!-- First name -->
              <BaseInput
                label="First Name"
                name="first_name"
                type="text"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                :error="errors.first_name"
              />
              <!-- Last name -->
              <BaseInput
                label="Last Name"
                name="last_name"
                type="text"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                :error="errors.last_name"
              />
            </div>

            <!-- Email Address -->
            <BaseInput
              label="Email Address"
              name="email"
              type="email"
              autofocus
              readonly
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.email"
            />

            <!-- Phone Number -->
            <BaseInput
              label="Phone Number"
              name="phone_number"
              type="phone"
              autofocus
              class="rounded border border-light-grey focus:border-light-grey"
              :error="errors.phone_number"
            />
          </div>
        </div>

        <div class="flex space-x-20">
          <div class="max-w-md w-full space-y-3">
            <h3 class="text-xl font-medium">
              Profile Photo
            </h3>
          </div>

          <div class="max-w-fit w-full space-y-[1rem]">
            <!-- photo -->
            <BaseFile
              label="Your photo"
              name="photo"
              width="w-[15.625rem]"
              height="h-[15.625rem]"
              :error="errors.photo"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end pt-8">
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
import {ref,  onMounted, computed} from "vue";
import { useManagerStore } from "@/stores/manager";
import { mixed, object, string } from "yup";
import { useForm } from "vee-validate";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseFile from "@/components/base/BaseFile.vue";

const managerStore = useManagerStore();
managerStore.profile();

const loading = ref(false);


const schema = computed(() => {
  return object({
    first_name: string().required().label("First Name"),
    last_name: string().required().label("Last Name"),
    email: string().email().label("Email Address"),
    phone_number: string().required().label("Phone Number"),
    photo: mixed().label("Photo"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    first_name: managerStore.data.first_name,
    last_name: managerStore.data.last_name,
    email: managerStore.data.email,
    phone_number: managerStore.data.phone_number,
    photo: managerStore.data.photo_path,
  },
})

const submit = handleSubmit( async (values, actions) => {
  loading.value = true;
  await managerStore.profileUpdate({
    ...values,
  }).then(() => {
    Toast.fire({
      icon: "success",
      title:  "Saved!",
    });
  }).catch(error => {
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
    actions.setErrors(error.response.data.errors);
  }).finally(() => loading.value = false );
});

let profile_pic_preview = ref("");

onMounted(() => {
  profile_pic_preview.value = managerStore.data.photo_path
})
</script>

