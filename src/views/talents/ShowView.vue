<template>
  <DashboardLayout>
    <div class="px-5 md:px-[2.5rem] py-6 md:py-6 space-y-6 h-full">
      <div class="md:flex flex-col md:flex-row md:items-center md:space-x-4 md:justify-between">
        <div class="md:space-y-5 pt-2 md:pt-0">
          <button
            class="items-center space-x-1 hidden md:flex"
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
              Talents
            </p>
          </button>
          <h2 class="text-2xl font-bold font-power text-black pr-[2rem]">
            {{ campaign?.title }} 
          </h2>
        </div>

        <!-- <div class="hidden md:flex items-center justify-end">
          <button
            class="bg-gradient-to-br from-orange to-red text-white text-[0.8125rem] h-[37px] px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Icon name="plus"/>
            <span>Stop campaign</span>
          </button>
        </div> -->
      </div>

      <div class="grid xl:grid-cols-2 gap-4">
        <div
          class="flex flex-col md:flex-row md:p-[1.125rem] py-2 rounded-[0.625rem] border border-[#EAECF0] space-y-3 md:space-y-0"
        >
          <Statistic
            title="Total Amount Raised"
            class="px-4 md:px-0"
            :amount="campaign.claim.formatted"
            volume="0.50%"
          />

          <div class="w-full md:w-[1px] h-px md:h-full md:mx-4 bg-[#EAECF0] flex-none" />

          <Statistic
            title="Total Contributions"
            class="px-4 md:px-0"
            :amount="campaign.fans"
            volume="0.50%"
            :is-currency="false"
          />
        </div>
        <div
          class="p-4 px-1 rounded-[0.625rem] border border-[#EAECF0]"
        >
          <div
            class="bg-[#FAFAFA] w-full rounded-b-[1.5rem] shadow-[0px_20px_40px_rgba(5,32,58,0.05)] px-3 space-y-2 flex flex-col h-full"
          >
            <div class="space-y-2 flex-grow">
              <div class="text-base text-black font-medium flex justify-between">
                <h5 class="font-bold font-power text-#091C35"> 
                  {{ campaign.claim.formatted }}
                  <!-- <span class="text-sm">raised</span> -->
                </h5>
                <!-- <h5>{{ useDuration(campaign.duration) }}</h5> -->
              </div>
              <div
                class="text-[#989C9E] flex items-center space-x-3 text-xs"
              >
                <p class="text-sm text-#444349 font-medium px-2 rounded-full bg-[#8080801A]">
                  {{ useDuration(campaign.duration) }} days left
                </p>
                <span class="text-#3A495D">Goal amount: {{ campaign?.goal.formatted }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 flex-none">
              <div class="w-full rounded-full bg-[#FEF3E8] relative h-5 border border-1E1D24 overflow-hidden">
                <!-- :style="{ width: useProgress(campaign.funding.goal, campaign.claim) + '%' }" -->
                <div
                  :style="{ width: useProgress(campaign?.goal?.value, campaign?.claim?.value) + '%' }"
                  class="rounded-full bg-gradient-to-br from-orange to-red absolute inset-0 h-full"
                />
                <p
                  v-if="campaign.fans > 0"
                  class="absolute left-0 inset-y-0 flex items-center justify-center px-2 text-xs font-semibold text-white"
                >
                  {{ campaign.fans }} fans
                </p>
                <p class="absolute right-0 inset-y-0 flex items-center justify-center px-2 text-xs font-semibold text-1E1D24">
                  {{ useProgress(campaign?.goal?.value, campaign?.claim?.value) + '%' }}
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
      </div>

      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-black flex-none pr-[2rem] font-power">
          Transactions
        </h2>

        <label class="relative hidden max-w-[20.5rem] w-full flex-none  lg:block">
          <span class="sr-only">Search</span>
          <span
            class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
          >
            <Icon name="search" />
          </span>
          <input
            class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded py-2 pl-10 pr-3 focus:outline-none focus:border-orange focus:ring-orange focus:ring-1 sm:text-sm placeholder:font-normal"
            placeholder="Find Transactions"
            type="text"
            name="search"
          />
        </label>
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
import { useDuration } from "@/composables/duration";
import { useProgress } from "@/composables/progress";
// import Status from "@/components/Status.vue";
import CampaignSupportTable from "@/components/tables/CampaignSupportTable.vue";
import CampaignOrderTable from "@/components/tables/CampaignOrderTable.vue";


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
