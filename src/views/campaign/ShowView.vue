<template>
  <DashboardLayout>
    <div class="p-[2.5rem] space-y-8">
      <div class="flex items-center space-x-4 justify-between">
        <!--  breabcrum  -->
        <div>
          <div class="flex items-center space-x-1">
            <button class="focus:outline-none">
              <Icon name="back-arrow" />
            </button>
            <a
              class="text-sm text-[#626E8B]"
              href="#"
            >Campaigns </a>
          </div>
          <h2 class="text-2xl font-medium text-black pr-[2rem]">
            Campaign
          </h2>
        </div>

        <div class="flex items-center justify-end">
          <button
            class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
          >
            <!-- <Icon name="plus"/> -->
            <span>Stop campaign</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          class="flex p-[1.125rem] rounded-[0.625rem] border border-[#EAECF0]"
        >
          <Statistic
            title="Total Amount Raised"
            amount="246,586,062"
            volume="0,50%"
          />

          <div class="w-[1px] h-full mx-4 bg-[#EAECF0] flex-none" />

          <Statistic
            title="Total Campaigns"
            amount="35"
            volume="0,50%"
            :is-currency="false"
          />
        </div>
        <div
          class="p-[1.125rem] rounded-[0.625rem] border border-[#EAECF0] flex items-center"
        >
          <div
            class="bg-[#FAFAFA] w-full rounded-b-[1.5rem] shadow-[0px_20px_40px_rgba(5,32,58,0.05)] px-3 space-y-2"
          >
            <div>
              <div class="text-2xl text-black font-medium flex justify-between">
                <h5>₦0.00 <span class="text-sm">raised</span></h5>
                <h5>12</h5>
              </div>
              <p
                class="text-[#989C9E] flex items-center justify-between text-xs"
              >
                <span>of ₦1,000,000</span>
                <span>days left</span>
              </p>
            </div>

            <div class="flex items-center space-x-2">
              <div class="w-full rounded-[7px] bg-[#E0E0E0] relative h-2">
                <div
                  style="width: 50%"
                  class="rounded-[7px] bg-gradient-to-r from-orange to-red absolute inset-0 h-2"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-base text-[#000000] font-medium">50%</span>
              <span
                class="text-[#00C48C] text-[0.625rem] px-[0.625rem] py-[0.3125rem] rounded-[6.25rem] bg-[#00C48C] bg-opacity-10"
              >
                Launched
              </span>
            </div>
          </div>
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

      <div>
        <TabGroup>
          <TabList class="flex space-x-5 900/20">
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
                  'focus:outline-none relative pb-4 border-b-2',
                  selected
                    ? 'text-[#FF9E0B]  border-[#FF9E0B]'
                    : 'text-[#878787] border-transparent',
                ]"
              >
                {{ tab }}
                <!-- <div
              :class="[selected ? 'opacity-100' : 'opacity-0']"
              class="absolute -bottom-3 inset-x-0 flex justify-center"
            >
              <span class="w-[6px] h-[6px] rounded-full bg-[#FF9E0B]"></span>
            </div> -->
              </button>
            </Tab>
          </TabList>

          <TabPanels class="">
            <TabPanel>
              <!-- :is-loading="table.isLoading" -->
              <table-lite
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
              <table-lite
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
    </div>
  </DashboardLayout>
</template>

<script setup>
// import TableLite from "vue3-table-lite";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref, reactive } from "vue";
import Statistic from "@/components/Statistic.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const tabs = ref(["Contributions", "Orders"]);

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

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
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
