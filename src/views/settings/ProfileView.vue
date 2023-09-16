<template>
  <TabPanel class="">
    <form @submit="submit">
      <div class="space-y-12 border-b pb-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
          <div class="w-full max-w-[400px] space-y-3">
            <h3 class="text-xl font-bold font-power">
              Profile
            </h3>
            <p class="text-sm text-[#7D7C80]">
              Customize your preferences, Personalize your experience and Manage your account settings
            </p>
          </div>

          <div class="w-full space-y-[1.2rem]">

            <div class="flex space-x-5">
              <!-- First name -->
              <BaseInput
                label="First Name"
                name="first_name"
                type="text"
                autofocus
                class="rounded-lg border-light-grey focus:border-light-grey"
                :error="errors.first_name"
              />
              <!-- Last name -->
              <BaseInput
                label="Last Name"
                name="last_name"
                type="text"
                autofocus
                class="rounded-lg border-light-grey focus:border-light-grey"
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
              class="rounded-lg border-light-grey focus:border-light-grey"
              :error="errors.email"
            />

            <!-- Phone Number -->
            <BaseInput
              label="Phone Number"
              name="phone_number"
              type="phone"
              autofocus
              class="rounded-lg border border-light-grey focus:border-light-grey"
              :error="errors.phone_number"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
          <div class="w-full max-w-[400px] space-y-3">
            <h3 class="text-xl font-bold font-power">
              Profile Photo
            </h3>
            <p class="text-sm text-[#7D7C80]">
              Make your mark with a picture that reflects your identity. Upload, change, or update your profile photo here.
            </p>
          </div>

          <div class="w-full space-y-[1rem]">
            <!-- photo -->
            <BaseFile
              label="Profile Photo"
              name="photo"
              width="w-full md:w-[15.625rem]"
              height="h-[15.625rem]"
              :error="errors.photo"
              desc="Upload a square Profile Image"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          :is-loading="loading"
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
import {ref,  onMounted, computed} from "vue";
import { useManagerStore } from "@/stores/manager";
import { mixed, object, string } from "yup";
import { useForm } from "vee-validate";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseFile from "@/components/base/BaseFile.vue";
// import BaseTextArea from "@/components/base/BaseTextArea.vue";
// import BaseSelect from "@/components/base/BaseSelect.vue";
const managerStore = useManagerStore();
managerStore.profile();

const loading = ref(false);


const schema = computed(() => {
  return object({
    first_name: string().required().label("First Name"),
    last_name: string().required().label("Last Name"),
    email: string().email().label("Email Address"),
    phone_number: string().required().label("Phone Number"),
    // bio: string().required().label("Bio").typeError("Please say something about yourself"),
    // genres: string().required().label("Genres"),
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

