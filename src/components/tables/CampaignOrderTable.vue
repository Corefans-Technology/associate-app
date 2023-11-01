<template>
  <table-lite
    :has-checkbox="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @is-finished="tableLoadingFinish"
  />
</template>

<script setup>

import TableLite from "@/components/TableLite.vue";
import { useCampaignStore } from "@/stores/campaign";
import { useFormat } from "@/composables/duration";
import {storeToRefs} from "pinia";
import {reactive} from "vue";
const campaignStore = useCampaignStore();
const { getFundTypeByOrder } = storeToRefs(campaignStore)


const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Reference ID",
      field: "transaction_number",
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
      display: function (row) {
        return (
          `<span class="capitalize"> ${row?.email}</span>`);
      },
    },
    {
      label: "Amount",
      field: "amount",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return row.amount.formatted;
      },
    },
    {
      label: "Phone Number",
      field: "phone_number",
    },
    {
      label: "Status",
      field: "payment_status",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return (
          "<span data-id=\"" +
            row.id +
            "\" class=\"" +
            row.payment_status +
            "\">" +
            row.payment_status +
            "</span>"
        );
      },
    },
    {
      label: "Date",
      field: "date_created",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return (
          useFormat(row.date_created, "dd MMM, yyyy h:mm a")
        );
      },
    },
  ],
  rows: getFundTypeByOrder,
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const tableLoadingFinish = (elements) => {
  table.isLoading = false;
  Array.prototype.forEach.call(elements, function (element) {
    if (element.classList.contains("revoke-invite")) {
      element.addEventListener("click", function () {
        // eslint-disable-next-line no-console
        console.log(this.dataset.id + " quick-btn click!!");
      });
    }
  });
};


</script>

<style src="@vueform/multiselect/themes/default.css"></style>
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

::v-deep(.vtl-thead-th div) {
  white-space: nowrap;
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