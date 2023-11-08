<template>
  <DashboardLayout>
    <div class="px-5 md:px-[2.5rem] py-6 md:py-6 space-y-8 h-full">
      <div class="">
        <div class="md:space-y-5 pt-3 md:pt-0 pb-6">
          <button
            class="items-center space-x-1 flex"
            @click.prevent="router.back()"
          >
            <span
              class="focus:outline-none"
            >
              <Icon name="back-arrow" />
            </span>
            <p
              class="text-sm text-[#444349] font-medium"
              href="#"
            >
              Campaigns
            </p>
          </button>
        </div>
        <div class="flex flex-col md:flex-row gap-6">
          <img
            class="w-[100px] h-[100px] rounded-lg object-cover flex-none mx-auto md:mx-0 order-1"
            :src="campaign?.photo_path ? campaign?.photo_path : 'https://placehold.co/600x400'"
            :alt="campaign?.title"
          />
          
          <div class="flex flex-col flex-grow gap-y-1 order-3 md:order-2">
            <h2 class="text-xl md:text-2xl font-bold font-power text-black pr-[2rem] flex-grow text-center md:text-left">
              {{ campaign?.title }} 
            </h2>
            <div class="flex-none flex items-center justify-between md:justify-start gap-3 md:gap-6">
              <div class="flex items-center gap-2">
                <img 
                  v-if="campaign?.creative?.photo_path" 
                  class="w-[34px] h-[34px] rounded-full object-cover" 
                  :src="campaign?.creative?.photo_path"
                  :alt="campaign?.creative?.stage_name"
                />
                <div
                  v-else
                  class="w-[34px] h-[34px] rounded-full flex items-center justify-center border border-#A3A2A5 bg-#E9E8E9 text-sm font-bold text-1E1D24 uppercase"
                >
                  {{ useGetNameLetter(campaign?.creative?.stage_name ? campaign?.creative?.stage_name : 'Shaddy Badboi') }}
                </div>
                <div class="text-[11px] md:text-sm text-black">
                  <p class=" text-#697386">
                    Talent
                  </p>
                  <span>{{ campaign?.creative?.stage_name ? campaign?.creative?.stage_name : 'Shaddy Badboi' }}</span>
                </div>
              </div>
              <div class="w-[1px] h-[32px] bg-[#EAECF0] flex-none" />
              <div class="text-[11px] md:text-sm text-black">
                <p class=" text-#697386">
                  Date
                </p>
                <span>{{ 'August 21, 2018' }}</span>
              </div>
              <div class="w-[1px] h-[32px] bg-[#EAECF0] flex-none" />
              <div class="text-[11px] md:text-sm text-black">
                <p class=" text-#697386">
                  Category
                </p>
                <span>{{ 'Afrobeats' }}</span>
              </div>
            </div>
          </div>
          

          <div class="flex items-center justify-center md:justify-end flex-none order-2 md:order-3">
            <a
              class="bg-gradient-to-br from-orange to-red text-white text-[0.8125rem] h-[37px] px-4 rounded-lg flex items-center justify-center space-x-2"
              :href="`https://demo.corefans.co/${campaign?.talent_id}/campaigns/${campaign.id}`"
            >
              <!-- <Icon name="plus" /> -->
              <span>View campaign</span>
            </a>
          </div>
        </div>
      </div>

      <div class="xl:grid xl:grid-cols-3 gap-4 space-y-4 md:space-y-0">
        <div
          class="p-6 rounded-[0.625rem] border border-[#EAECF0] col-span-2"
        >
          <div
            class="w-full rounded-b-[1.5rem] space-y-2 flex flex-col h-full"
          >
            <div class="">
              <p class="text-sm text-#3A495D">
                Available balance / Goal amount
              </p>
              <div class="text-[22px] text-black font-medium flex justify-between">
                <h5 class="font-bold font-power text-#091C35"> 
                  {{ campaign.claim.formatted }} / <span class="text-#3A495D"> {{ campaign?.goal.formatted }}</span>
                  <!-- <span class="text-sm">raised</span> -->
                </h5>
                <!-- <h5>{{ useDuration(campaign.duration) }}</h5> -->
              </div>
              <!-- <div
                class="text-[#989C9E] flex items-center space-x-3 text-xs"
              >
                <p class="text-sm text-#444349 font-medium px-2 rounded-full bg-[#8080801A]">
                  {{ useDuration(campaign.duration) }} days left
                </p>
                <span class="text-#3A495D">Goal amount: {{ campaign?.goal.formatted }}</span>
              </div> -->
            </div>

            <div class="flex-none flex flex-col gap-1 pt-4">
              <div class="w-full rounded-full bg-[#CCD5DF] relative h-2 border-1E1D24 overflow-hidden">
                <!-- :style="{ width: useProgress(campaign.funding.goal, campaign.claim) + '%' }" -->
                <div
                  :style="{ width: useProgress(campaign?.goal?.value, campaign?.claim?.value) + '%' }"
                  class="rounded-full bg-gradient-to-br from-[#62CE74] to-[#62CE74] absolute inset-0 h-full"
                />
                <!-- <p
                  v-if="campaign.fans > 0"
                  class="absolute left-0 inset-y-0 flex items-center justify-center px-2 text-xs font-semibold text-white"
                >
                  {{ campaign.fans }} fans
                </p>
                <p class="absolute right-0 inset-y-0 flex items-center justify-center px-2 text-xs font-semibold text-1E1D24">
                  {{ useProgress(campaign?.goal?.value, campaign?.claim?.value) + '%' }}
                </p> -->
              </div>
              <div class="flex text-#3A495D justify-between items-center">
                <p>{{ useProgress(campaign?.goal?.value, campaign?.claim?.value) + '%' }} Completed</p>
                <p class="flex items-center gap-1">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_4269_170864)">
                      <path
                        d="M11.9051 2.4926H11.317V1.31641H10.1408V2.4926H4.25981V1.31641H3.08362V2.4926H2.49553C1.84862 2.4926 1.31934 3.02188 1.31934 3.66879V13.0783C1.31934 13.7252 1.84862 14.2545 2.49553 14.2545H11.9051C12.552 14.2545 13.0812 13.7252 13.0812 13.0783V3.66879C13.0812 3.02188 12.552 2.4926 11.9051 2.4926ZM11.9051 13.0783H2.49553V6.60926H11.9051V13.0783ZM11.9051 5.43307H2.49553V3.66879H11.9051V5.43307Z"
                        fill="#3A495D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4269_170864">
                        <rect
                          width="14.1143"
                          height="14.1143"
                          fill="white"
                          transform="translate(0.143555 0.728516)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Nov 15, 2023</span>
                </p>
              </div>
            </div>

            <!-- <div
              v-if="false"
              class="flex items-center justify-between"
            >
              <span class="text-base text-[#000000] font-medium">{{ useProgress(campaign.goal, campaign.claim) + '%' }}</span>
              <Status
                classes="capitalize"
                :status="campaign.status"
              />
            </div> -->
          </div>
        </div>

        <div
          class="flex flex-row md:p-[1.125rem] py-2 rounded-[0.625rem] border border-[#EAECF0] gap-y-3 "
        >
          <Statistic
            title="Total Exclusives Sold"
            class="px-4 md:px-0 text-sm flex-1"
            :amount="campaign.claim.formatted"
            volume="0.50%"
          />

          <div class="w-[1px] sh-full md:mx-4 bg-[#EAECF0] flex-none" />

          <Statistic
            title="Total Corefans"
            class="px-4 md:px-0 text-sm flex-1"
            :amount="campaign.fans"
            volume="0.50%"
            :is-currency="false"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row md:items-center gap-4 mt-2">
        <h2 class="text-2xl font-medium text-black md:flex-none pr-[2rem] font-power flex-1">
          Transactions
        </h2>

        <div class="flex flex-grow gap-2">
          <label class="relative md:max-w-[12.5rem] w-full h-[37px] flex-grow md:flex-none">
            <span class="sr-only">Search</span>
            <span
              class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
            >
              <Icon name="search" />
            </span>
            <input
              class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded-lg h-[37px] pl-10 pr-3 focus:outline-none focus:border-orange focus:ring-orange focus:ring-1 sm:text-sm placeholder:font-normal"
              placeholder="Find Transactions"
              type="text"
              name="search"
            />
          </label>
          <div class="flex-grow hidden md:block" />

          <Popover class="relative flex-none">
            <div class="bg-gradient-to-tr from-orange to-red p-px rounded-lg h-[37px]">
              <div class="bg-white rounded-lg h-full">
                <PopoverButton
                  class="focus:outline-none relative text-[0.8125rem] px-2 md:px-4 rounded-lg flex items-center justify-center space-x-2 border border-[#F2F4F7] text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium h-full"
                >
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.62675 5.33342C9.50009 5.33342 9.37342 5.28675 9.27342 5.18675L7.92009 3.83342L6.56675 5.18675C6.37342 5.38008 6.05342 5.38008 5.86009 5.18675C5.66675 4.99342 5.66675 4.67342 5.86009 4.48008L7.56675 2.77342C7.76009 2.58008 8.08009 2.58008 8.27342 2.77342L9.98009 4.48008C10.1734 4.67342 10.1734 4.99342 9.98009 5.18675C9.88009 5.28675 9.75342 5.33342 9.62675 5.33342Z"
                      fill="url(#paint0_linear_3424_661)"
                    />
                    <path
                      d="M7.91992 10.4533C7.64659 10.4533 7.41992 10.2267 7.41992 9.95334V3.17334C7.41992 2.90001 7.64659 2.67334 7.91992 2.67334C8.19326 2.67334 8.41992 2.90001 8.41992 3.17334V9.95334C8.41992 10.2333 8.19326 10.4533 7.91992 10.4533Z"
                      fill="url(#paint1_linear_3424_661)"
                    />
                    <path
                      d="M8.00008 14.3333C4.56675 14.3333 2.16675 11.9333 2.16675 8.5C2.16675 8.22667 2.39341 8 2.66675 8C2.94008 8 3.16675 8.22667 3.16675 8.5C3.16675 11.3467 5.15341 13.3333 8.00008 13.3333C10.8467 13.3333 12.8334 11.3467 12.8334 8.5C12.8334 8.22667 13.0601 8 13.3334 8C13.6067 8 13.8334 8.22667 13.8334 8.5C13.8334 11.9333 11.4334 14.3333 8.00008 14.3333Z"
                      fill="url(#paint2_linear_3424_661)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3424_661"
                        x1="5.71509"
                        y1="2.62842"
                        x2="8.12629"
                        y2="6.55944"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F18B1B" />
                        <stop
                          offset="1"
                          stop-color="#E52053"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_3424_661"
                        x1="7.41992"
                        y1="2.67334"
                        x2="9.38742"
                        y2="2.92623"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F18B1B" />
                        <stop
                          offset="1"
                          stop-color="#E52053"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_3424_661"
                        x1="2.16675"
                        y1="8"
                        x2="7.4778"
                        y2="17.7835"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F18B1B" />
                        <stop
                          offset="1"
                          stop-color="#E52053"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span class="hidden md:block">Export</span>
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel class="absolute z-50 bg-white" />
          </Popover>
        </div>
      </div>

      <div class="">
        <TabGroup>
          <TabList class="flex space-x-5 900/20">
            <Tab
              v-for="(tab, index) in tabs"
              :key="index"
              v-slot="{ selected }"
              as="template"
              class="focus:outline-none focus:ring-0 focus:border-0"
            >
              <div
                :class="[selected
                  ? 'pb-[2px] bg-gradient-to-r from-orange to-red'
                  : 'bg-transparent']"
              >
                <button
                  type="button"
                  :class="[
                    'text-base',
                    'focus:outline-none focus:ring-0 focus:border-0 relative pb-3 -mb-[px] bg-white border-0',
                  ]"
                >
                  <span
                    :class="['text-xs md:text-base', selected
                      ? ' text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium'
                      : 'text-[#878787]']"
                  >
                    {{ tab }}
                  </span>
                </button>
              </div>
            </Tab>
          </TabList>

          <TabPanels class="">
            <TabPanel>
              <Suspense>
                <CampaignOrderTable />

                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </Tabpanel>
            <TabPanel>
              <Suspense>
                <CampaignSupportTable />

                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </Tabpanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
// import TableLite from "vue3-table-lite";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";
import Statistic from "@/components/Statistic.vue";
import Icon from "@/components/Icon.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useCampaignStore } from "@/stores/campaign";
// import TableLite from "@/components/TableLite.vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
// import { useCurrency } from "@/composables/currency";
// import { useDuration } from "@/composables/duration";
import { useProgress } from "@/composables/progress";
// import Status from "@/components/Status.vue";
import CampaignSupportTable from "@/components/tables/CampaignSupportTable.vue";
import CampaignOrderTable from "@/components/tables/CampaignOrderTable.vue";
import { useGetNameLetter } from "@/composables/useGetNameLetter.js";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";

const route = useRoute();
const router = useRouter();
const tabs = ref(["Orders", "Support"]);

const campaignStore = useCampaignStore();

campaignStore.getCampaignById(route.params.id)



const { campaign } = storeToRefs(campaignStore)

// campaignStore.getTransactions(route.params.id);

</script>

<style></style>

<style scoped>
::v-deep(.Successful) {
  color: #00c48c;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(0, 196, 140, 0.1);
  border-radius: 100px;
}
::v-deep(.Failed) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Unfulfilled) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Pending) {
  color: #e3a11b;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(227, 161, 27, 0.1);
  border-radius: 100px;
}
::v-deep(.Fulfilled) {
  color: #3d6abe;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(61, 106, 190, 0.1);
  border-radius: 100px;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #98a2b3;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  border-bottom: #98a2b31f 1px solid;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}

::v-deep(.vtl-thead div) {
  font-weight: normal !important;
  font-size: 14px;
}

::v-deep(.vtl-paging-info) {
  font-size: 12px;
  color: #565758;
}

::v-deep(.vtl-tbody-td div) {
  font-weight: normal !important;
  font-size: 14px;
  padding: 6px 0px;
}

::v-deep(.vtl-paging-change-div) {
  opacity: 0;
}
</style>
