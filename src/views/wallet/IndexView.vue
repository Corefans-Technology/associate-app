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

      <div>
        <VueApexCharts
          height="350"
          type="bar"
          :options="options"
          :series="series"
        />
      </div>
      </div>
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-black flex-none pr-[2rem]">
          Transactions
        </h2>

        <label class="relative block max-w-[20.5rem] w-full flex-none">
          <span class="sr-only">Search</span>
          <span
            class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
          >
            <Icon name="search" />
          </span>
          <input
            class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded py-2 pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:font-normal"
            placeholder="Find Transactions"
            type="text"
            name="search"
          />
        </label>

        <div class="flex-grow flex items-center justify-end">
          <Popover class="relative">
            <PopoverButton
              class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
            >
              <Icon name="filter" />
              <span>Filter</span>
            </PopoverButton>

            <PopoverPanel class="absolute z-50 bg-white" />
          </Popover>
        </div>

        <Popover class="relative">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="export" />
            <span>Export</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </div>

      <TabGroup>
        <TabList class="flex space-x-5 900/20 p-1">
          <Tab
            v-for="(tab, index) in tabs"
            :key="index"
            v-slot="{ selected }"
            as="template"
          >
            <button
              type="button"
              :class="[
                'text-[15px]',
                'focus:outline-none focus:ring-2 relative',
                selected ? 'text-1E1D24' : 'text-[#878787]',
              ]"
            >
              {{ tab }}
              <div
                :class="[selected ? 'opacity-100' : 'opacity-0']"
                class="absolute -bottom-3 inset-x-0 flex justify-center"
              >
                <span class="w-[6px] h-[6px] rounded-full bg-1E1D24" />
              </div>
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-8">
          <TabPanel>
            <!-- :is-loading="table.isLoading" -->
            <TableLite
              :has-checkbox="true"
              :columns="table.columns"
              :rows="table.rows"
              :total="table.totalRecordCount"
              :sortable="table.sortable"
              :messages="table.messages"
              @do-search="doSearch"
              @is-finished="table.isLoading = false"
            />
          </TabPanel>
          <TabPanel>
            <!-- :is-loading="table.isLoading" -->
            <TableLite
              :has-checkbox="true"
              :columns="table.columns"
              :rows="table.rows"
              :total="table.totalRecordCount"
              :sortable="table.sortable"
              :messages="table.messages"
              @do-search="doSearch"
              @is-finished="table.isLoading = false"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <router-view />
  </layout>
</template>

<script setup>
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/vue";


import {reactive, ref} from "vue";
import Layout from "@/layouts/DashboardLayout.vue";
import VueApexCharts from "vue3-apexcharts";
import TableLite from "@/components/TableLite.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import AccountBalance from "@/components/AccountBalance.vue";
import {useWalletStore} from "@/stores/wallet";
import { useManagerStore } from "@/stores/manager";

const managerStore = useManagerStore();
managerStore.profile();

const walletStore = useWalletStore();
walletStore.getTransactions();


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
    categories: [
      1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1995, 1996, 1997, 1998,
    ],
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
});
let series = ref([
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 81, 49, 60, 70, 81],
  },
]);

const tabs = ref(["Campaigns", "Inflows"]);


const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Reference",
      field: "id",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Name",
      field: "name",
      // width: "10%",
      sortable: true,
    },
    {
      label: "Email",
      field: "email",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Amount",
      field: "amount",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Campaign",
      field: "campaign",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Status",
      field: "status",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return (
          "<span data-id=\"" +
          row.id +
          "\" class=\"" +
          row.status +
          "\">" +
          row.status +
          "</span>"
        );
      },
    },
    {
      label: "Date",
      field: "date",
      // width: "15%",
      sortable: true,
    },
  ],
  rows: [
    {
      id: "3r3hfa44343",
      name: "Benson Momodu",
      email: "ben@gmail.com",
      amount: "4000.00",
      campaign: "falz night out",
      status: "Successful",
      date: "28 Jul, 2021 2:33 PM",
    },
    {
      id: "100912340175",
      name: "Charlie Sheen",
      email: "charlie.sheen@outlook.com",
      amount: "NGN 509,123.45",
      campaign: "Chasing Paper EP",
      status: "Failed",
      date: "28 Jul, 2021 2:33 PM",
    },
    {
      id: "100912340175",
      name: "Charlie Sheen",
      email: "charlie.sheen@outlook.com",
      amount: "NGN 509,123.45",
      campaign: "Chasing Paper EP",
      status: "Pending",
      date: "28 Jul, 2021 2:33 PM",
    },
  ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

// const doSearch = (offset, limit, order, sort) => {
//   table.isLoading = true;

//   // Start use axios to get data from Server
//   // let url =
//   //   "https://www.example.com/api/some_endpoint?offset=" +
//   //   offset +
//   //   "&limit=" +
//   //   limit +
//   //   "&order=" +
//   //   order +
//   //   "&sort=" +
//   //   sort;
//   // axios.get(url).then((response) => {
//   //   table.rows = response.rows;
//   //   table.totalRecordCount = response.count;
//   //   table.sortable.order = order;
//   //   table.sortable.sort = sort;
//   // });
//   // End use axios to get data from Server
// };

// function closeModal() {
//   isOpen.value = false;
// }
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
