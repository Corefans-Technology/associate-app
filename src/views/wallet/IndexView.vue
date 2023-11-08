<template>
  <layout>
    <div class="px-5 md:px-[2.5rem] py-9 md:py-6  space-y-8">
      <div class="flex items-center justify-between">
        <div class="rounded-lg bg-gradient-to-b p-px from-orange to-red block">
          <BaseButton
            type="button"
            class="text-light-grey-2 text-sm rounded-lg bg-white w-full py-2 px-[10px] h-9"
          >
            <span class="text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium">
              Last 30Days
            </span>
          </BaseButton>
        </div>

        <BaseButton
          class="bg-gradient-to-br from-orange to-red text-white text-sm rounded-lg font-medium py-2 px-[10px] h-9"
          @click="$router.push({ name: 'wallet.withdraw' })"
        >
          <div class="flex gap-2">
            <span>Withdraw</span>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99996 14.6666C7.87329 14.6666 7.74662 14.6199 7.64662 14.5199L3.59996 10.4732C3.40662 10.2799 3.40662 9.95992 3.59996 9.76658C3.79329 9.57325 4.11329 9.57325 4.30662 9.76658L7.99996 13.4599L11.6933 9.76658C11.8866 9.57325 12.2066 9.57325 12.4 9.76658C12.5933 9.95992 12.5933 10.2799 12.4 10.4732L8.35329 14.5199C8.25329 14.6199 8.12662 14.6666 7.99996 14.6666Z"
                fill="white"
              />
              <path
                d="M8 14.5533C7.72667 14.5533 7.5 14.3266 7.5 14.0533V2.83325C7.5 2.55992 7.72667 2.33325 8 2.33325C8.27333 2.33325 8.5 2.55992 8.5 2.83325V14.0533C8.5 14.3266 8.27333 14.5533 8 14.5533Z"
                fill="white"
              />
            </svg>
          </div>
          <!-- <div class="flex items-center md:hidden gap-2 text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99996 14.1671C7.87329 14.1671 7.74662 14.1204 7.64662 14.0204L3.59996 9.97374C3.40662 9.7804 3.40662 9.4604 3.59996 9.26707C3.79329 9.07374 4.11329 9.07374 4.30662 9.26707L7.99996 12.9604L11.6933 9.26707C11.8866 9.07374 12.2066 9.07374 12.4 9.26707C12.5933 9.4604 12.5933 9.7804 12.4 9.97374L8.35329 14.0204C8.25329 14.1204 8.12662 14.1671 7.99996 14.1671Z"
                fill="url(#paint0_linear_2236_60261)"
              />
              <path
                d="M8 14.053C7.72667 14.053 7.5 13.8263 7.5 13.553V2.33301C7.5 2.05967 7.72667 1.83301 8 1.83301C8.27333 1.83301 8.5 2.05967 8.5 2.33301V13.553C8.5 13.8263 8.27333 14.053 8 14.053Z"
                fill="url(#paint1_linear_2236_60261)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2236_60261"
                  x1="3.45496"
                  y1="9.12207"
                  x2="7.7362"
                  y2="16.836"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2236_60261"
                  x1="7.5"
                  y1="1.83301"
                  x2="9.4867"
                  y2="1.99559"
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
            <span>Withdraw</span>
          </div> -->
        </BaseButton>
      </div>
      <div class=" border rounded-2xl grid lg:grid-cols-3">
        <div class="col-span-2 p-6 pb-0 border-r">
          <div class="flex items-center space-x-4">
            <div class="flex-none text-sm text-[#151419] space-y-4">
              <p class="flex items-center space-x-2 font-medium">
                <span>AVAILABLE BALANCE</span>
                <span class="text-white">
                  <Icon name="help" />
                </span>
              </p>
              <Suspense>
                <template #default>
                  <AccountBalance />
                </template>
                <template #fallback>
                  <BalanceSkeleton />
                </template>
              </Suspense>
              <p class="flex items-center gap-1 text-[#42C458]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33323 5.60913V11.9998H8.66656V5.60913L11.5286 8.47113L12.4712 7.52846L7.9999 3.05713L3.52856 7.52846L4.47123 8.47113L7.33323 5.60913Z"
                    fill="#42C458"
                  />
                </svg>
                <span>0.00%</span>
              </p>
            </div>
          </div>

          <div>
            <Suspense>
              <template #default>
                <GraphView />
              </template>
              <template #fallback>
                <div class="mt-40 grid place-items-center place-content-center">
                  <ChartSkeleton />
                </div>
              </template>
            </Suspense>
          </div>
        </div>
        <div class="divide-y grid grid-rows-2">
          <div class="p-6 space-y-2">
            <div>
              <p class="flex items-center space-x-2 font-medium">
                <span>NO OF TALENTS</span>
                <span class="text-white">z
                  <Icon name="help" />
                </span>
              </p>

              <Suspense>
                <template #default>
                  <TotalInvitedTalent />
                </template>
                <template #fallback>
                  <BalanceSkeleton />
                </template>
              </Suspense>
            </div>
            <p class="flex items-center gap-1">
              <span class="text-xs">
                These are the total number of talents you have approved on Corefans
              </span>
            </p>
          </div>

          <div class="p-6 space-y-2">
            <div>
              <p class="flex items-center space-x-2 font-medium">
                <span>TOTAL CAMPAIGNS</span>
                <span class="text-white">
                  <Icon name="help" />
                </span>
              </p>
              <Suspense>
                <template #default>
                  <TotalTalentCampaign />
                </template>
                <template #fallback>
                  <BalanceSkeleton />
                </template>
              </Suspense>
            </div>
            <p class="flex items-center gap-1">
              <span class="text-xs">
                These are total number of campaigns across all the talents signed up on the platform.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="false">
        <Suspense>
          <template #default>
            <WalletManagerTable />
          </template>
          <template #fallback>
            <div class="mt-40 grid place-items-center place-content-center">
              <!-- <LoaderComponent /> -->
            </div>
          </template>
        </Suspense>
      </div>
      <div class="space-y-2 md:space-y-3">
        <h3 class="text-xl text-#1D2939 font-medium font-power">
          Active Campaigns
        </h3>

        <div class="grid grid-cols-1 xl:grid-cols-3 md:gap-x-4 gap-x-0 gap-y-16 md:gap-y-4">
          <!-- Active Campaign -->
          <div class="col-span-2 flex flex-col gap-4">
            <div
              v-for="(item, index) in 2"
              :key="index"
              class="flex gap-6 border border-#E9E8E9 p-4 md:p-6 pb-14 md:pb-6 rounded-lg  relative"
            >
              <img
                class="w-14 lg:w-[10rem] h-14 lg:h-[10rem] rounded-lg flex-none object-cover"
                src="https://placehold.co/600x400"
                alt=""
              />
              <div class="flex flex-col justify-between flex-grow">
                <div class="spacey-2 md:space-y-5">
                  <h2 class="text-lg md:text-[22px] font-bold font-power text-black pr-[2rem] flex-grow text-left line-clamp-1">
                    {{ 'The Act Album Listening Party' }} 
                  </h2>
                  <div class="">
                    <p class="text-xs text-#3A495D hidden md:block">
                      Available balance / Goal amount
                    </p>
                    <div class="text-lg md:text-xl text-black font-medium flex justify-between">
                      <h5 class="font-bold font-power text-#091C35"> 
                        {{ '₦0.00' }} / <span class="text-#3A495D text-base md:text-lg">{{ '₦0.00' }}</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="flex-none flex flex-col gap-1 pt-4 absolute inset-x-0 lg:relative bottom-2 px-4 lg:px-0">
                  <div class="w-full rounded-full bg-[#CCD5DF] relative h-2 border-1E1D24 overflow-hidden">
                    <div
                      :style="{ width: useProgress(10000, 3000) + '%' }"
                      class="rounded-full bg-gradient-to-br from-[#62CE74] to-[#62CE74] absolute inset-0 h-full"
                    />
                  </div>
                  <div class="flex text-#3A495D justify-between items-center text-sm md:text-base">
                    <p>{{ useProgress(10000, 3000) + '%' }} Completed</p>
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
              </div>
            </div>
          </div>
          <div class="border border-#E9E8E9 px-6 rounded-lg relative">
            <h3 class="text-xl text-#1D2939 font-medium font-power absolute -top-9 md:-top-10 left-0">
              Top Talent
            </h3>

            <div class="divide-y divide-[#F2F4F7]">
              <div
                v-for="(item, index) in 5"
                :key="index"
                class="flex items-center gap-3 py-5"
              >
                <img
                  class="w-10 h-10 rounded-full flex-none object-cover"
                  src="https://placehold.co/600x400"
                  alt=""
                  srcset=""
                />
                <div class="flex-grow">
                  <p class="text-sm text-#101828 font-semibold">
                    Andi Lane
                  </p>
                  <p class="text-sm text-#667085">
                    @andilane
                  </p>
                </div>
                <p class="text-sm text-#667085">
                  40 Campaigns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </layout>
</template>

<script setup>
// import {storeToRefs} from "pinia";
import Layout from "@/layouts/DashboardLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import {useWalletStore} from "@/stores/wallet";
import { useManagerStore } from "@/stores/manager";
import GraphView from "./GraphView.vue";
// import LoaderComponent from "@/components/LoaderComponent.vue";
import WalletManagerTable from "@/components/tables/WalletManagerTable.vue";
import Icon from "@/components/Icon.vue"
import TotalInvitedTalent from "@/components/TotalInvitedTalent.vue";
import TotalTalentCampaign from "@/components/TotalTalentCampaign.vue";
import BalanceSkeleton from "@/components/skeleton/Balance.vue";
import ChartSkeleton from "@/components/skeleton/Chart.vue";
import { useProgress } from "@/composables/progress";
const managerStore = useManagerStore();
managerStore.profile();

const walletStore = useWalletStore();
walletStore.getTransactions();

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
</script>
<!-- otp-input -->
<style>
.otp-input-2 {
  border: 1px solid #d9d9d9 !important;
}
.otp-input-2.is-complete {
  border-color: #b9b9b9 !important;
}

.otp-input-2::-webkit-inner-spin-button,
.otp-input-2::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.otp-input-3 {
  width: 74px;
  height: 74px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #b9b9b9;
  text-align: center;
}
.otp-input-3.is-complete {
  border-color: #ff9e0b;
}

.otp-input-3.is-complete::-webkit-inner-spin-button,
.otp-input-3::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<style>
.apexcharts-toolbar {
  display: none !important;
}
</style>

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

::v-deep(.vtl-thead-checkbox) {
  border-radius: 4px;
}
::v-deep(.vtl-tbody-checkbox) {
  border-radius: 4px;
}
</style>
