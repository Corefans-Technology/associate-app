<template>
  <div class="space-y-5">
    <div class="pb-6">
      <div class="max-w-[64.25rem] w-full space-y-8">
        <div class="space-y-3">
          <h3 class="text-2xl font-medium">
            Review
          </h3>
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
                :src="campaignStore.form.basic.thumbnail"
                alt=""
              />
            </div>

            <div class="flex-grow flex flex-col justify-between">
              <div class="flex items-center">
                <img
                  class="h-10 w-10 object-cover rounded-t-[1.5rem]"
                  :src="managerStore.data.photo_path"
                />
                <div class="pl-3 space-y-1">
                  <p
                    class="text-sm font-semibold flex items-center space-x-2 capitalize"
                  >
                    <span>{{ managerStore.data.username }}</span>
                    <span>
                      <Icon name="verify" />
                    </span>
                  </p>
                  <div class="flex items-center">
                    <div class="flex items-center space-x-2">
                      <Icon
                        class=""
                        name="campaign-2"
                      />
                      <!-- {{ managerStore.campaigns }} -->
                      <span class="text-[#1E1D24] text-[10px]"> Campaign</span>
                    </div>
                    <div class="h-3 w-px mx-2 bg-[#1E1D24]" />
                    <div class="flex items-center space-x-2">
                      <Icon
                        class=""
                        name="location"
                      />
                      <span class="text-[#1E1D24] text-[10px] capitalize">
                        {{ campaignStore.form.basic.location }}
                      </span>
                    </div>
                    <div class="h-3 w-px mx-2 bg-[#1E1D24]" />
                    <div class="flex items-center space-x-2">
                      <Icon
                        class=""
                        name="genre"
                      />
                      <span class="text-[#1E1D24] text-[10px] capitalize">
                        {{ campaignStore.form.basic.category }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <h1
                  class="text-2xl font-semibold text-black leading-snug capitalize"
                  v-text="campaignStore.form.basic.title"
                />
                <p class="text-7B7B7B  mt-2">
                  {{
                    campaignStore.form.basic.description
                  }}
                </p>
              </div>

              <CampaignStatus :campaign="campaignStore.form" />

              <div class="flex space-x-4 pt-6">
                <BaseButton
                  type="button"
                  class="rounded text-gray-1 border border-gray-1 leading-snug"
                  @click="$router.push({name: 'campaigns.funding', params: {'id': $route.params.id }})"
                >
                  Previous
                </BaseButton>
                <BaseButton
                  class="bg-gradient-to-r from-orange to-red text-white rounded leading-snug"
                  @click="goLive"
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
              :src="campaignStore.form.basic.thumbnail"
              alt=""
            />
          </div>
        </div>
        <div class="py-6 w-full flex  space-x-4">
          <div class="w-full flex-grow">
            <TabGroup>
              <TabList class="flex space-x-5 900/20 border-b">
                <Tab
                  v-slot="{ selected }"
                  as="template"
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
                  v-slot="{ selected }"
                  as="template"
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
                    {{ campaignStore.form.basic.description }}
                  </p>
                </TabPanel>
                <TabPanel>
                  <p class="text-base text-#667085">
                    {{ campaignStore.form.content.story }}
                  </p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
          <div class="flex-none space-y-6 pt-8 space-y-4">
            <p class="text-2xl font-semibold">
              Pick an option
            </p>
            <CampaignExclusiveCard :exclusives="campaignStore.form.exclusives" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CampaignExclusiveCard from "@/components/CampaignExclusiveCard.vue";
import Icon from "@/components/Icon.vue";
import { useCampaignStore } from "@/stores/campaign";
import { useManagerStore } from "@/stores/manager";
import BaseButton from "@/components/base/BaseButton.vue";
import {useRoute, useRouter} from "vue-router";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import CampaignStatus from "@/components/CampaignStatus.vue";


const router = useRouter();
const route = useRoute();

const campaignStore = useCampaignStore();
const managerStore = useManagerStore();

campaignStore.getCampaignExclusives( route.params.id );


const goLive = () => {
  campaignStore.goLive({
    id: route.params.id,
  }).then((response) => {

    Toast.fire({
      icon: "success",
      title:  response.message,
    });

    return router.push({name: "campaigns.preview", params: { "id": route.params.id  }});
  }).catch( (error) => {
    Toast.fire({
      icon: "error",
      title:  error.data.message,
    });
  })
}

</script>

