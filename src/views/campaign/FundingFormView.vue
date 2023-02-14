<template>
  <div class="flex flex-col lg:flex-row max-w-8xl">
    <div class="w-full lg:w-1/3 space-y-3">
      <h3 class="text-xl font-medium">
        Funding
      </h3>
      <div class="text-sm text-98A2B3 space-y-4 leading-loose">
        <p>
          Enter your bank details and your campaign target anount. Here
          are some tips:
        </p>

        <div>
          <ul class="list-disc pl-10">
            <li>
              Make a list of everything you would need to pay for to
              achieve your goal
            </li>
            <li>Estimate the costs and create a budget</li>
            <li>Consider the cost of producing your perks</li>
            <li>
              Make sure your video or image is clear and good quality
            </li>
            <li>
              Set your goal higher than your budget to cater for Corefans
              15% transaction fee
            </li>
          </ul>
        </div>

        <a
          class="text-orange block"
          href="#"
        >Need help?</a>
      </div>
    </div>
    <div class="w-24 h-20" />
    <form
      class="w-full lg:w-2/3 space-y-8"
      @submit="submit"
    >
      <!-- Target Amount (Goal) -->
      <BaseInput
        label="Target Amount"
        name="goal"
        type="text"
        inputmode="numeric"
        autofocus
        class="rounded border-light-grey focus:border-light-grey"
        desc="How much money would you like to raise on this campaign? A minimum goal of ₦500,000 is required.  "
        :error="errors.goal"
      />
      <!-- Bank Account   -->
      <BaseSelect
        label="Bank Account"
        label-prop="name"
        :options="settingsStore.banks"
        value-prop="id"
        track-by="name"
        :searchable="false"
        name="bank_account"
        placeholder="Select Bank Account"
        class="rounded border border-light-grey focus:border-light-grey"
        :error="errors.bank_account"
      />
      <!-- DISCLAIMER -->

      <div class="space-y-1 relative">
        <p class="font-medium">
          DISCLAIMER
        </p>
        <div
          class="text-[#020955] w-full bg-[#DDE0FE] border border-[#8D9DD4] rounded py-[1.25rem] px-[1rem]"
        >
          <span class="font-semibold">Platform Fee:</span> Corefans
          charges a 15% platform fee across all campaigns.
          <a
            class="underline"
            href="#"
          >Learn more</a>
        </div>
      </div>

      <div class="w-full flex space-x-4 py-8 mt-6 border-t">
        <div class="flex-grow flex items-center">
          <BaseButton
            type="button"
            class="text-light-grey-2 text-sm rounded border border-light-grey-2"
            @click="$router.push({name: 'campaigns.exclusive', params: {'id': $route.params.id }})"
          >
            Previous
          </BaseButton>
        </div>
        <BaseButton
          type="button"
          class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B]"
          @click.prevent="saveForLater"
        >
          <span>Save for Later</span>
        </BaseButton>
        <BaseButton
          :is-loading="isSubmitting"
          class="bg-gradient-to-r from-orange to-red text-white text-sm rounded"
        >
          Save & Proceed
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

import { useCampaignStore } from "@/stores/campaign";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { object, string, number  } from "yup";
import { useForm  } from "vee-validate";
import BaseSelect from "@/components/base/BaseSelect.vue";
import {useRoute, useRouter} from "vue-router";
import {useGenericStore} from "@/stores/generic";
import {useSettingsStore} from "@/stores/settings";
const router = useRouter();
const route = useRoute();

const campaignStore = useCampaignStore();
const genericStore = useGenericStore();
genericStore.getExclusiveAttribute();
const settingsStore = useSettingsStore();
settingsStore.getBanks();

let forLater = ref(false)


const schema = computed(() => {
  return object({
    goal: number().min(500000).required().label("Target Amount"),
    bank_account: string().required().label("Bank Account"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    goal: campaignStore.form.funding?.goal,
    bank_account: campaignStore.form.funding?.bank_account?.id,
  },
})

const saveForLater = async () => {
  forLater.value = true;
  await submit();
}


const submit = handleSubmit( async (values, actions) => {
  await campaignStore.funding({
    step: 5,
    ...values,
    id: route.params.id,
  }).then(async (response) => {
    Toast.fire({
      icon: "success",
      title: "Saved!",
    });
    if (forLater.value) return router.push({ name: "campaigns.index" });
    await router.push({name: "campaigns.review", params: {"id": response.data.id}});
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title:  error.data.message,
    });
    actions.setErrors(error.data.errors);
  })
});


</script>
