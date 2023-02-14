<template>
  <DashboardLayout>
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
            >Preview Campaign </a>
          </div>
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
      <hr class="border-t border-[#EDEDED]" />
      <Suspense>
        <template #default>
          <CampaignPreview />
        </template>
        <template #fallback>
          <div class="grid place-content-center  min-h-[42.625rem]">
            <LoaderComponent />
          </div>
        </template>
      </Suspense>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useCampaignStore } from "@/stores/campaign";
import CampaignPreview from "@/components/CampaignPreview.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

const campaignStore = useCampaignStore();
campaignStore.index()


</script>

