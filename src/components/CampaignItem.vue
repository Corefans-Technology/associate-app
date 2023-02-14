<template>
  <div
    v-if="campaignStore.data.length"
    class="flex flex-wrap gap-5 "
  >
    <div
      v-for="(campaign, index) in campaignStore.data"
      :key="index"
      class="w-[370px]"
    >
      <router-link
        :to="path(campaign)"
        class="w-full border border-light-grey rounded-2xl overflow-hidden flex flex-col"
      >
        <img
          class="h-[10.625rem] w-full object-cover rounded-t-lg"
          :src="campaign.basic.thumbnail"
          alt=""
        />
        <div class="p-3 space-y-4 -mt-12  flex-grow">
          <div class="flex items-center justify-between">
            <img
              class="w-16 h-16 object-cover rounded-full"
              :src="managerStore.photo_path"
              alt=""
            />

            <button
              class="focus:outline-none bg-white w-10 h-10 rounded-full flex items-center justify-center p-2 shadow-[0px_1px_4px_rgba(0,0,0,0.1)]"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C17.538 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.36 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.934 15.604C11.815 15.048 12.61 14.495 13.354 13.903C16.335 11.533 18 8.943 18 6C18 3.64 16.463 2 14.5 2C13.424 2 12.26 2.57 11.414 3.414L10 4.828L8.586 3.414C7.74 2.57 6.576 2 5.5 2C3.56 2 2 3.656 2 6C2 8.944 3.666 11.533 6.645 13.903C7.39 14.495 8.185 15.048 9.066 15.603C9.365 15.792 9.661 15.973 10 16.175C10.339 15.973 10.635 15.792 10.934 15.604Z"
                  fill="url(#paint0_linear_7880_27287)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_7880_27287"
                    x1="20"
                    y1="9.25"
                    x2="-1.41582e-07"
                    y2="9.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF6666" />
                    <stop
                      offset="0.507198"
                      stop-color="#FF9E0B"
                    />
                    <stop
                      offset="1"
                      stop-color="#FFC86A"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>
          <div class="divide-y divide-light-grey-3 space-y-4">
            <!-- creative name -->
            <h3 class="text-xl font-medium flex items-center space-x-1 capitalize">
              <span>{{ managerStore.username }}</span>
              <Icon name="verify" />
            </h3>

            <h4 class="text-lg font-medium pt-4 line-clamp-1">
              {{ campaign.basic.title }}
            </h4>
          </div>

          <p class="text-[#7B7B7B] line-clamp-2">
            {{ campaign.basic.description }}
          </p>
        </div>
        <div class="rounded-b-[1.5rem] py-4 px-3">
          <div class="text-2xl text-black font-medium flex justify-between">
            <h5>
              {{ campaign.status === "draft" ? "0" : campaign.funding.goal }}
              <span class="text-xs">raised</span>
            </h5>
            <Status
              classes="capitalize"
              :name="campaign.status"
            />
          </div>

          <div class="pt-6 space-y-3">
            <div class="w-full rounded-[7px] bg-[#E0E0E0] relative h-2">
              <div
                style="width: 50%"
                class="rounded-[7px] bg-gradient-to-r from-orange to-red absolute inset-0 h-2"
              />
            </div>
            <div class="flex items-center justify-between">
              <growth-card
                class=""
                title-class="font-semibold text-base"
                :title="formatCurrency(campaign.funding.goal)"
                description="Goal"
                description-class="text-sm text-[#626E8B]"
              />
              <div class="h-8 w-px mx-2 bg-[#EDEDED]" />
              <growth-card
                class=""
                title-class="font-semibold text-base"
                :title="campaign.status === 'draft' ? '0' : '0'"
                description="Corefans"
                description-class="text-sm text-[#626E8B]"
              />
              <div class="h-8 w-px mx-2 bg-[#EDEDED]" />
              <growth-card
                class=""
                title-class="font-semibold text-base"
                :title="50"
                description="days left"
                description-class="text-sm text-[#626E8B]"
              />
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div
    v-else
    class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3"
  >
    <Icon name="empty" />
    <h4 class="text-xl text-#1D2939 text-center">
      No Campaigns Yet
    </h4>
    <p
      class="max-w-[16.5rem] w-full mx-auto text-center text-sm text-[#98A2B3]"
    >
      Get money for your next creative project with your first campaign
    </p>
    <router-link :to="{ name: 'campaigns.create' }">
      <div
        class="text-orange text-[0.8125rem] flex items-center justify-center space-x-2 mx-auto text-sm"
      >
        <PlusIcon class="h-4" />
        <span>Add Campaign</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Status from "@/components/Status.vue";
import GrowthCard from "@/components/GrowthCard.vue";
import { computed } from "vue";
import { useManagerStore } from "@/stores/manager";
import { formatCurrency, useTruncate } from "@/composables/unility";
import IndexView from "@/views/campaign/ExclusiveIndexView.vue";
import FormView from "@/views/campaign/ExclusiveFormView.vue";
import {useCampaignStore} from "@/stores/campaign";
const managerStore = useManagerStore().data;

const campaignStore = useCampaignStore();

await campaignStore.index();


const pathName = [
  "campaigns.basic",
  "campaigns.content",
  "campaigns.exclusive",
  "campaigns.funding",
  "campaigns.review",
];

const path = (campaign) => computed(() => {
  if ("draft" === campaign.status) {
    return {name: pathName[campaign.step - 1], params: {id: campaign.id}}
  }
  return ({name: "campaigns.show", params: {id: campaign.id}})
})

</script>

