<template>
  <TabPanel>
    <div class="flex flex-col lg:flex-row max-w-8xl space-x-32">
      <div class="w-full lg:w-1/3 flex-grow-0 space-y-3">
        <h3 class="text-xl font-medium">
          Preferences
        </h3>
        <p class="text-sm text-[#98A2B3]">
          Make a good first impression: introduce your campaign
          objectives and entice people to learn more. This basic
          information will represent your campaign on your campaign
          page, on your campaign card, and in searches.
        </p>
      </div>

      <form
        class="w-full flex-grow space-y-5"
        @submit="submit"
      >
        <!-- Email Notification -->
        <BaseCheckbox
          v-model="email"
          name="email"
          label="Email"
          class="rounded text-orange"
          desc="If you select this, customers will receive SMS notifications"
        />

        <!-- SMS Notification -->
        <BaseCheckbox
          v-model="sms"
          name="sms"
          label="Customer SMS Notification"
          class="rounded text-orange"
          desc="If you select this, customers will receive SMS notifications"
        />

        <!-- PUSH Notification -->
        <BaseCheckbox
          v-model="app"
          name="app"
          label="Push Notification"
          class="rounded text-orange"
          desc="If you select this, customers will receive SMS notifications"
        />
        <BaseCheckbox
          v-model="campaign_goal"
          name="campaign_goal"
          label="Hide Campaign Goal"
          class="rounded text-orange"
          desc="If you select this, Campaign Goal will be hidden from the Fans"
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
  </TabPanel>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import {ref, computed, watch } from "vue";
import { useManagerStore } from "@/stores/manager";
import { useSettingsStore } from "@/stores/settings";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import { object, boolean } from "yup";
import {useForm} from "vee-validate";

const creative = useManagerStore();
const settingsStore = useSettingsStore();
settingsStore.getNotificationPreference();

const loading = ref(false);
const email = ref("");
const sms = ref("");
const app = ref("");
const campaign_goal = ref("");
const notifyForm = ref(null);

const schema = computed(() => {
  return object({
    email: boolean().label("Email Notification"),
    sms: boolean().label("SMS Notification"),
    app: boolean().label("Push Notification"),
    campaign_goal: boolean().label("Campaign Goal"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: settingsStore.notifications.email,
    sms: settingsStore.notifications.sms,
    app: settingsStore.notifications.app,
    campaign_goal: settingsStore.notifications.campaign_goal,
  },
})

watch([email, sms, app, campaign_goal], ([newEmail, newSMS, newAPP, newCampaignGoal]) => {
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

