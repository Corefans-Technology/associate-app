<template>
  <dashboard-layout>
    <div class="p-[2.5rem] space-y-6">
      <div class="flex items-center space-x-4 justify-between">
        <!-- breabcrum -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <RouterLink
              :to="{ name: 'campaigns.index' }"
              class="text-sm text-[#626E8B]"
            >
              Campaigns
            </RouterLink>
            <button class="focus:outline-none">
              <Icon name="right-arrow" />
            </button>
            <a
              class="text-sm text-[#626E8B]"
              href="#"
            >New Campaigns </a>
          </div>
          <h2 class="text-2xl font-medium text-black pr-[2rem]">
            New Campaign
          </h2>
        </div>

        <div class="flex items-center justify-end hidden">
          <button
            class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
          >
            <Icon name="preview" />
            <span>Preview Campaign</span>
          </button>
        </div>
      </div>
      <!-- <CheckOutStep :step="step" /> -->
      <FormStep />
      <hr class="border-t border-[#EDEDED]" />
      <router-view />
    </div>
  </dashboard-layout>
</template>

<script setup>
import { ref, watch  } from "vue";
import { useRoute  } from "vue-router";
import Icon from "@/components/Icon.vue";
import FormStep from "@/components/FormStep.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import { useCampaignStore } from "@/stores/campaign";
const campaignStore = useCampaignStore();
const route = useRoute();


watch(
  () => route.params,
  async () => {
    await campaignStore.formEditMode(route.params.id)
  },
  // fetch the data when the view is created and the data is
  // already being observed
  { immediate: true },
)


// const saveForLater = () => {
//   campaignStore.saveForLater();
// };
</script>
