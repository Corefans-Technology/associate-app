<template>
  <div class="space-y-5">
    <div class="pb-6">
      <div class="max-w-[64.25rem] w-full space-y-8">
        <div class="space-y-3">
          <h3 class="text-2xl font-medium">Review</h3>
          <p class="text-sm text-[#98A2B3]">
            Check through your campaign for errors before publishing.
          </p>
        </div>
        <div>
          <div class="flex space-x-8">
            <!-- image -->
            <div class="max-w-[32.125rem] w-full flex-none">
              <img
                  class="h-full max-h-[23.375rem] w-full object-cover rounded-[0.625rem]"
                  :src="campaignStore.campaign.basic.thumbnail"
                  alt=""
              />
            </div>

            <div class="flex-grow flex flex-col justify-between">
              <div class="flex items-center">
                <img
                    :alt="managerStore.data.username"
                    class="h-10 w-10 object-cover rounded-t-[1.5rem]"
                    :src="managerStore.data.photo_path"
                />
                <div class="pl-3 space-y-1">
                  <p
                      class="text-sm font-semibold flex items-center space-x-2 capitalize"
                  >
                    <span>{{managerStore.data.username}}</span>
                    <span>
                            <Icon name="verify" />
                          </span>
                  </p>
                  <div class="flex items-center">
                    <div class="flex items-center space-x-2">
                      <Icon class="" name="campaign-2" />
                      <!-- {{ managerStore.campaigns }} -->
                      <span class="text-[#1E1D24] text-[10px]"
                      > Campaign</span
                      >
                    </div>
                    <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                    <div class="flex items-center space-x-2">
                      <Icon class="" name="location" />
                      <span class="text-[#1E1D24] text-[10px] capitalize">
                              {{campaignStore.campaign.basic.location}}
                            </span>
                    </div>
                    <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                    <div class="flex items-center space-x-2">
                      <Icon class="" name="genre" />
                      <span class="text-[#1E1D24] text-[10px] capitalize"
                      >
                              {{campaignStore.campaign.basic.category}}
                              </span
                              >
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <Title class="text-2xl" :name="campaignStore.campaign.basic.title" />
                <p class="text-[#667085] text-base font-normal">
                  {{
                    campaignStore.campaign.basic.description
                  }}
                </p>
              </div>

              <CampaignStatus :campaign="campaignStore.campaign" />

              <div class="flex space-x-4 pt-6">
                <BaseButton
                    type="button"
                    class="rounded text-grey-1 border border-grey-1 leading-snug"
                >
                  Previous
                </BaseButton>
                <BaseButton
                    class="bg-gradient-to-r from-orange to-red text-white rounded leading-snug"
                >
                  Go Live
                </BaseButton>
              </div>
            </div>
          </div>
          <!-- image slide -->
          <div class="flex items-center space-x-2 mt-4">
            <img
                class="w-[1.875rem] h-[1.875rem] object-cover rounded-[3px]"
                :src="campaignStore.campaign.basic.thumbnail"
                alt=""
            />
          </div>
        </div>
        <div class="py-6 w-full flex  space-x-4">
          <div class="w-full flex-grow">
            <TabGroup>
              <TabList class="flex space-x-5 900/20 border-b">
                <Tab
                    as="template"
                    v-slot="{ selected }"
                >
                  <button
                      type="button"
                      :class="[
                      'text-base',
                      'focus:outline-none  focus:ring-0 relative pb-3 -mb-[1px]',
                      selected
                        ? 'text-[#FF9E0B] border-b-2 border-[#FF9E0B]'
                        : 'text-[#878787]',
                    ]"
                  >
                    About Talent
                  </button>
                </Tab>
                <Tab
                    as="template"
                    v-slot="{ selected }"
                >
                  <button
                      type="button"
                      :class="[
                      'text-base',
                      'focus:outline-none  focus:ring-0 relative pb-3 -mb-[1px]',
                      selected
                        ? 'text-[#FF9E0B] border-b border-F2F4F7'
                        : 'text-[#878787]',
                    ]"
                  >
                    Story
                  </button>
                </Tab>
              </TabList>

              <TabPanels class="mt-8">
                <TabPanel>
                  <p class="text-base text-#667085">
                    {{ campaignStore.campaign.basic.description }}
                  </p>
                </TabPanel>
                <TabPanel>
                  <p class="text-base text-#667085">
                    {{ campaignStore.campaign.content.story }}
                  </p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
          <div class="flex-none space-y-6 pt-8 space-y-4">
            <p class="text-2xl font-semibold">Pick an option</p>
            <CampaignExclusiveCard :exclusives="campaignStore.campaign.exclusives" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, reactive} from "vue";
import CampaignExclusiveCard from "@/components/CampaignExclusiveCard.vue";
import Icon from "@/components/Icon.vue";
import Title from "@/components/Title.vue";

import { useCampaignStore } from "@/stores/campaign";
import { useManagerStore } from "@/stores/manager";
import BaseButton from "@/components/base/BaseButton.vue";
import {useRoute, useRouter} from "vue-router";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import CampaignStatus from "@/components/CampaignStatus.vue";

const router = useRouter();
const route = useRoute();
const managerStore = useManagerStore();
const campaignStore = useCampaignStore();
managerStore.profile();
await campaignStore.getCampaignById(route.params.id)


</script>

