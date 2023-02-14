<template>
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
</template>

<script setup>

import { TabPanel } from "@headlessui/vue";
import { reactive } from "vue";
import TableLite from "@/components/TableLite.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useSettingsStore } from "@/stores/settings";

const settingsStore =  useSettingsStore();
await settingsStore.getBanks();


const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Account No",
      field: "number",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Account Name",
      field: "name",
      // width: "10%",
      sortable: true,
    },
    {
      label: "Bank",
      field: "bank_name",
      // width: "15%",
      sortable: true,
    },
    // {
    //   label: "Amount",
    //   field: "amount",
    //   // width: "15%",
    //   sortable: true,
    // },
    // {
    //   label: "Campaign",
    //   field: "campaign",
    //   // width: "15%",
    //   sortable: true,
    // },
    // {
    //   label: "Status",
    //   field: "status",
    //   // width: "15%",
    //   sortable: true,
    //   display: function (row) {
    //     return (
    //       '<span data-id="' +
    //       row.id +
    //       '" class="' +
    //       row.status +
    //       '">' +
    //       row.status +
    //       "</span>"
    //     );
    //   },
    // },
    // {
    //   label: "Date",
    //   field: "date",
    //   // width: "15%",
    //   sortable: true,
    // },
  ],
  rows: settingsStore.banks,
  totalRecordCount: settingsStore.banks?.length ?? 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const doSearch = (offset, limit, order, sort) => {
  table.value.isLoading = true;

  // Start use axios to get data from Server
  let url =
    "https://www.example.com/api/some_endpoint?offset=" +
    offset +
    "&limit=" +
    limit +
    "&order=" +
    order +
    "&sort=" +
    sort;
  axios.get(url).then((response) => {
    table.value.rows = response.rows;
    table.value.totalRecordCount = response.count;
    table.value.sortable.order = order;
    table.value.sortable.sort = sort;
  });
  // End use axios to get data from Server
};

</script>

<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>

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
  border-radius: 5px;
}
::v-deep(.vtl-tbody-checkbox) {
  border-radius: 5px;
}
</style>
