<template>
  <VueApexCharts
      height="350"
      type="bar"
      :options="options"
      :series="series"
  />
</template>

<script setup>


import { ref, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useWalletStore } from "@/stores/wallet";

import {storeToRefs} from "pinia";
import {_} from "lodash";
import {format, differenceInDays, formatRelative, subDays} from "date-fns";


const walletStore = useWalletStore();
await walletStore.getTransactions();
const { transactions } = storeToRefs(walletStore);


const myObj = _(transactions.value)
  .orderBy("created_at")
  .groupBy(function(item) {
    return format(new Date(item.created_at), "LLL dd");
  }).map((value, key) => {
    return {
      x: key,
      y: _.sumBy(value, function(data) {
        return parseInt(data.amount);
      }),
    }
  })
  .value();


const getDeliveryEstimate = (date) => {
  return format(new Date(date), "DD");
};

let options = ref({
  chart: {
    id: "vuechart",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
      columnWidth: "50%",
      barHeight: "70%",
      distributed: false,
      rangeBarOverlap: false,
      rangeBarGroupRows: false,
      colors: {
        // ranges: [
        //   {
        //     from: 0,
        //     to: 0,
        //     color: "#1E1D24",
        //   },
        // ],
        backgroundBarColors: ["#EDF2EF"],
        backgroundBarOpacity: 1,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: ["#1E1D24"],
  title: {
    enabled: false,
  },
  xaxis: {
    type: "category",
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    nabled: false,
  },
  toolbar: {
    enabled: false,
  },
  noData: {
    text: "No Data",
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
  },
});

let series = ref([{
  data: myObj,
}]);


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
