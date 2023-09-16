<template>
  <div class="space-y-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
      <div class="w-full max-w-[25rem] space-y-3">
        <h3 class="text-xl font-bold font-power">
          Preferences
        </h3>
        <p class="text-sm text-[#7D7C80]">
          Tailor your experience. Customize your preferences and decide what notifications Corefans send to you.
        </p>
      </div>

      <form
          class="w-full space-y-5"
          @submit="submit"
      >

        <!-- SMS Notification -->
        <BaseCheckbox
            name="sms"
            label="SMS Notification"
            class="rounded checkbox"
            desc="If you select this, customers will receive SMS notifications"
        />

        <!-- PUSH Notification -->
        <BaseCheckbox
            name="app"
            label="Push Notification"
            class="rounded checkbox"
            desc="If you select this, customers will receive SMS notifications"
        />

        <!-- Email Notification -->
        <BaseCheckbox
            name="email"
            label="Email"
            class="rounded checkbox"
            desc="If you select this, customers will receive SMS notifications"
        />
        <!-- <BaseCheckbox
            name="campaign_goal"
            label="Hide Campaign Goal"
            class="rounded checkbox"
            desc="If you select this, Campaign Goal will be hidden from the Fans"
        /> -->
        <button
            ref="notifyForm"
            type="submit"
            hidden
        >
          submit
        </button>
      </form>
    </div>

    <div v-if="false" class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px] ">
      <div class="w-full max-w-[25rem] flex-grow-0 space-y-3">
        <h3 class="text-xl font-bold font-power">
          Campaign Earned Amount
        </h3>
        <p class="text-sm text-[#7D7C80]">
          Choose whether you want your creative campaign's earned amount to be visible to your Corefans.
        </p>
      </div>

      <form
          class="w-full space-y-5"
          @submit="submit"
      >
        <!-- Email Notification -->
        <BaseCheckbox
            name="campaign_goal"
            label="Campaign Earned Amount"
            class="rounded checkbox"
            desc="Choose whether you want your creative campaign's earned amount to be visible to your Corefans."
        />
        <button
            ref="notifyForm"
            type="submit"
            hidden
        >
          submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import {ref, computed, watch, onMounted} from "vue";
import { useSettingsStore } from "@/stores/settings";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import { object, boolean } from "yup";
import {useForm} from "vee-validate";

const settingsStore = useSettingsStore();
await settingsStore.getNotificationPreference();


const notifyForm = ref(null);

const schema = computed(() => {
  return object({
    email: boolean().label("Email Notification"),
    sms: boolean().label("SMS Notification"),
    app: boolean().label("Push Notification"),
    campaign_goal: boolean().label("Campaign Goal"),
  })
});

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: settingsStore.notifications.email,
    sms: settingsStore.notifications.sms,
    app: settingsStore.notifications.app,
    campaign_goal: settingsStore.notifications.campaign_goal,
  },
})

watch(values, (oldValues, newValues) => {
  notifyForm.value.click();
})

const submit = handleSubmit( async (values, actions) => {
  await settingsStore.updateNotificationPreference(values).then(() => {
    Toast.fire({
      icon: "success",
      title: "Preference Updated!",
    });
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title: error.data.message,
    });
    actions.setErrors(error.data.errors);
  });
});

</script>

