<template>
  <layout>
    <div class="p-[2.5rem] space-y-8">
      <div class="space-y-1">
        <h1 class="text-2xl text-1E1D24 font-medium">
          Hi {{ managerStore.data.first_name }}
        </h1>
        <p class="text-gray-2 text-sm">
          Here’s an overview of your talents and commission
        </p>
      </div>

      <div class="p-6 space-y-8 border border-EAECF0 rounded-md shadow-[0_1px_rgba(16, 24, 40, 0.1)]">
        <div class="flex items-center space-x-4">
          <div class="flex-none text-sm text-[#272643] space-y-4">
            <p class="flex items-center space-x-2">
              <span>TOTAL AVAILABLE BALANCE</span>
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
          </div>
          <div class="flex-grow flex justify-end">
            <div class="flex items-center space-x-2">
              <div class="bg-1E1D24 h-[6px] w-[20px]" />
              <p class="text-sm text-626E8B">
                Commissions
              </p>
            </div>
          </div>
          <div class="flex-none">
            <input
              id=""
              class="w-36 h-12 border border-D6DFE8 rounded-[4px] text-626E8B"
              type="date"
              name=""
              :value="new Date()"
            />
          </div>
        </div>

        <div>
          <BaseButton
            class="rounded bg-1E1D24 text-white text-sm h-[40px]"
            @click="$router.push({ name: 'wallet.withdraw' })"
          >
            Withdraw
          </BaseButton>
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
         <Suspense>
        <template #default>
          <WalletManagerTable />
        </template>
        <template #fallback>
          <div class="mt-40 grid place-items-center place-content-center invisible">
            <LoaderComponent />
          </div>
        </template>
      </Suspense>
    </div>
    <router-view />
  </layout>
</template>

<script setup>


import Layout from "@/layouts/DashboardLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import {useWalletStore} from "@/stores/wallet";
import { useManagerStore } from "@/stores/manager";
import GraphView from "./GraphView.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import WalletManagerTable from "@/components/tables/WalletManagerTable.vue";

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
