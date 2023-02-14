<template>
  <div class="flex items-center space-x-2">
    <!-- step 1 -->
    <div
      v-for="(form, key) in campaignStore.steps"
      :key="key"
      class="flex items-center space-x-2"
    >
      <div
        class="w-6 h-6 rounded-full text-sm flex items-center justify-center text-white"
        :class="[
          campaignStore?.form?.step === form.step + 1
            ? 'bg-orange'
            : campaignStore.form.step > form.step
              ? 'bg-green'
              : 'bg-light-grey-2',
        ]"
      >
        {{ form.step + 1 }}
      </div>
      <!-- text -->
      <p
        :class="[
          campaignStore.form.step === form.step + 1
            ? 'text-orange'
            : campaignStore.form.step > form.step
              ? 'text-green'
              : 'text-light-grey-2',
        ]"
        class="text-sm"
      >
        {{ form.title }}
      </p>
      <!-- line -->
      <!-- {{ key = key + 1 }} {{ steps.length }} -->
      <div
        v-show="(key = key < campaignStore.steps.length - 1 )"
        :class="[
          campaignStore?.form.step === form.step + 1
            ? 'border-orange border-b-2'
            : campaignStore?.form.step > form.step
              ? 'border-green border-b-2'
              : 'text-light-grey-2 border-b-2',
        ]"
        class="w-4"
      />
    </div>
  </div>
</template>

<script setup>
import {useCampaignStore} from "@/stores/campaign";
const campaignStore = useCampaignStore();
</script>

<style lang="scss" scoped></style>
