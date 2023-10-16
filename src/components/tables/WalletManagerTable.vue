<template>
  <div class="flex flex-col lg:flex-row lg:items-center gap-4">
    <h2 class="text-xl font-bold font-power text-1E1D24 flex-none pr-[2rem]">
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

    <!-- <div class="flex-grow flex items-center justify-end">
      <Popover class="relative hidden md:block">
        <div class="bg-gradient-to-tr from-orange to-red p-px rounded-lg h-[37px]">
          <div class="bg-white rounded-lg h-full">
            <PopoverButton
              class="focus:outline-none relative text-[0.8125rem] px-4 rounded-lg flex items-center justify-center space-x-2 border border-[#F2F4F7] text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium h-full"
            >
              <Icon name="filter" />
              <span>Filter</span>
            </PopoverButton>
          </div>
        </div>

        <PopoverPanel class="absolute z-50 bg-white" />
      </Popover>
    </div> -->

    <!-- <Popover class="relative hidden md:block">
      <div class="bg-gradient-to-tr from-orange to-red p-px rounded-lg h-[37px]">
        <div class="bg-white rounded-lg h-full">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] px-4 rounded-lg flex items-center justify-center space-x-2 border border-[#F2F4F7] text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium h-full"
          >
            <Icon name="export" />
            <span>Export</span>
          </PopoverButton>
        </div>
      </div>

      <PopoverPanel class="absolute z-50 bg-white" />
    </Popover> -->
  </div>
  <div class="mt-8">
    <TabGroup>
      <TabList class="flex space-x-5 900/20 p-1">
        <Tab
            v-for="(tab, index) in tabs"
            :key="index"
            v-slot="{ selected }"
            as="div"
            class="focus:outline-none focus:border-0 focus:ring-0"
        >
          <!-- <button
              type="button"
              :class="[
                  'text-[15px]',
                  'focus:outline-none focus:ring-2 relative',
                  selected ? 'text-[#FF9E0B]' : 'text-[#878787]',
                ]"
          >
            {{ tab }}
            <div
                :class="[selected ? 'opacity-100' : 'opacity-0']"
                class="absolute -bottom-3 inset-x-0 flex justify-center"
            >
              <span class="w-[6px] h-[6px] rounded-full bg-[#FF9E0B]" />
            </div>
          </button> -->
          <div
            :class="[selected
              ? 'pb-[2px] bg-gradient-to-r from-orange to-red'
              : 'bg-transparent']"
          >
            <button
              type="button"
              :class="[
                'text-base',
                'focus:outline-none focus:ring-0 focus:border-0 relative pb-3 -mb-[0px] bg-white border-0',
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
              :columns="commissions_table.columns"
              :rows="commissions_table.rows"
              :total="commissions_table.totalRecordCount"
              :sortable="commissions_table.sortable"
              :messages="commissions_table.messages"
              @do-search="doSearch"
              @is-finished="commissions_table.isLoading = false"
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@headlessui/vue";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

import { ref, reactive } from "vue";
import TableLite from "@/components/TableLite.vue";
import { useWalletStore } from "@/stores/wallet";

import {storeToRefs} from "pinia";
import {_} from "lodash";
import {format, differenceInDays, formatRelative, subDays} from "date-fns";


const walletStore = useWalletStore();

await walletStore.getTransactions();
walletStore.getCreativeCampaign();

const { transactions } = storeToRefs(walletStore);
const { campaigns } = storeToRefs(walletStore);




const getDeliveryEstimate = (date) => {
  return format(new Date(date), "DD");
};



const tabs = ref(["Campaigns", "Commissions"]);
const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Name",
      field: "title",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Artist",
      field: "talent",
      // width: "10%",
      sortable: true,
      display: function (row) {
        return row.creative.name;
      },
    },
    {
      label: "Category",
      field: "category",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Goal Amount",
      field: "goal",
      sortable: true,
      display: function (row) {
        return row.goal.formatted;
      },
    },
    {
      label: "Amount Raised",
      field: "raised",
      sortable: true,
      display: function (row) {
        return row.raised.formatted;
      },
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
      label: "Created",
      field: "date_created",
      // width: "15%",
      sortable: true,
    },
  ],
  rows: campaigns,
  // rows: [
  //   {
  //     id: "3r3hfa44343",
  //     name: "Benson Momodu",
  //     email: "ben@gmail.com",
  //     amount: "4000.00",
  //     campaign: "falz night out",
  //     status: "Successful",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  //   {
  //     id: "100912340175",
  //     name: "Charlie Sheen",
  //     email: "charlie.sheen@outlook.com",
  //     amount: "NGN 509,123.45",
  //     campaign: "Chasing Paper EP",
  //     status: "Failed",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  //   {
  //     id: "100912340175",
  //     name: "Charlie Sheen",
  //     email: "charlie.sheen@outlook.com",
  //     amount: "NGN 509,123.45",
  //     campaign: "Chasing Paper EP",
  //     status: "Pending",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  // ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const commissions_table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Name",
      field: "title",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Artist",
      field: "talent",
      // width: "10%",
      sortable: true,
      display: function (row) {
        return row.creative.name;
      },
    },
    // {
    //   label: "Category",
    //   field: "category",
    //   // width: "15%",
    //   sortable: true,
    // },
    {
      label: "Amount Raised",
      field: "goal",
      sortable: true,
    },
    {
      label: "Commission Earned",
      field: "raise",
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
    // {
    //   label: "Created",
    //   field: "date_created",
    //   // width: "15%",
    //   sortable: true,
    // },
  ],
  rows: campaigns,
  // rows: [
  //   {
  //     id: "3r3hfa44343",
  //     name: "Benson Momodu",
  //     email: "ben@gmail.com",
  //     amount: "4000.00",
  //     campaign: "falz night out",
  //     status: "Successful",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  //   {
  //     id: "100912340175",
  //     name: "Charlie Sheen",
  //     email: "charlie.sheen@outlook.com",
  //     amount: "NGN 509,123.45",
  //     campaign: "Chasing Paper EP",
  //     status: "Failed",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  //   {
  //     id: "100912340175",
  //     name: "Charlie Sheen",
  //     email: "charlie.sheen@outlook.com",
  //     amount: "NGN 509,123.45",
  //     campaign: "Chasing Paper EP",
  //     status: "Pending",
  //     date: "28 Jul, 2021 2:33 PM",
  //   },
  // ],
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
