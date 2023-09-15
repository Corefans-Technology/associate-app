<template>
  <layout>
    <div class="px-5 md:px-[2.5rem] py-9 md:py-6  space-y-8">
      <div class="flex items-center justify-between">
        <div class="rounded-lg bg-gradient-to-b p-px from-orange to-red block">
          <BaseButton
            type="button"
            class="text-light-grey-2 text-sm rounded-lg bg-white w-full py-2 px-2 h-9"
          >
            <span class="text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium">
              Last 30Days
            </span>
          </BaseButton>
        </div>
        <!-- <h3 class="text-lg font-power font-bold lg:hidden">
          Wallet
        </h3> -->

        <BaseButton
          class="bg-gradient-to-br from-orange to-red text-white text-sm rounded-lg font-medium py-2 px-2 h-9"
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
        <div class="col-span-2 p-6 border-r space-y-2 md:space-y-8">
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
                  loading...
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
                  <LoaderComponent />
                </div>
              </template>
            </Suspense>
          </div>
        </div>
        <div class="divide-y grid grid-rows-2">
          <div class="p-6 space-y-2">
            <div>
              <p class="flex items-center space-x-2 font-medium">
                <span>NO OF TRANSACTIONS</span>
                <span class="text-white">
                  <Icon name="help" />
                </span>
              </p>
              <Suspense>
                <template #default>
                  <h3 class="text-[#333333] text-[1.7rem] font-bold">
                    {{
                      transactions.length
                    }}
                  </h3>
                </template>
                <template #fallback>
                  loading...
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
                  <h3 class="text-[#333333] text-[1.7rem] font-bold">
                    {{
                      transactions.length
                    }}
                  </h3>
                </template>
                <template #fallback>
                  loading...
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
      <div>
        <Suspense>
          <template #default>
            <WalletManagerTable />
          </template>
          <template #fallback>
            <div class="mt-40 grid place-items-center place-content-center">
              <LoaderComponent />
            </div>
          </template>
        </Suspense>
      </div>
    </div>
    <router-view />
  </layout>
</template>

<script setup>
import {storeToRefs} from "pinia";
import Layout from "@/layouts/DashboardLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import {useWalletStore} from "@/stores/wallet";
import { useManagerStore } from "@/stores/manager";
import GraphView from "./GraphView.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import WalletManagerTable from "@/components/tables/WalletManagerTable.vue";
import Icon from "@/components/Icon.vue"
const managerStore = useManagerStore();
managerStore.profile();

const walletStore = useWalletStore();
walletStore.getTransactions();
const { transactions } = storeToRefs(walletStore);

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
