<template>
  <div class="col-span-2 flex flex-col gap-4">
    <div
        v-for="(item, index) in activeCampaigns.data"
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
</template>

<script setup>


import { ref, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useWalletStore } from "@/stores/wallet";

import {storeToRefs} from "pinia";
import {_} from "lodash";
import {format, differenceInDays, formatRelative, subDays} from "date-fns";


const walletStore = useWalletStore();
await walletStore.getActiveCampaigns();
const { activeCampaigns } = storeToRefs(walletStore);




function openModal() {
  isOpen.value = true;
}

function submitWithdraw() {
  isOpen.value = false;
  otpModal.value = true;
}

function confirmPay() {
  success.value = true;
  confirm.value = false;
}

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
::v-deep(.successful) {
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
::v-deep(.pending) {
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
