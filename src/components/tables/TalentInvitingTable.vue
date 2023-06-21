<template>
  <div v-if="talentStore.inviteeList?.data?.length">
    <table-lite
        :is-slot-mode="true"
        :has-checkbox="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        @is-finished="tableLoadingFinish"
    >
      <template v-slot:status="data">
        <BaseButton :is-loading="loading" type='button' @click="revokeInvite(data.value.id)" class='revoke-invite text-red bg-red bg-opacity-10 text-xs py-1 px-2 rounded-full'>
          Revoke invite
          </BaseButton>
      </template>
    </table-lite>
  </div>
  <div
      v-else
      class="border rounded border-#F2F4F7 min-h-[42.625rem] grid place-items-center"
  >
    <div class="flex flex-col items-center justify-center space-y-3">
      <Icon name="empty" />
      <h4 class="text-xl text-#1D2939 text-center">
        No Talents Yet
      </h4>
      <p
          class="max-w-[16.5rem] w-full mx-auto text-center text-sm text-[#98A2B3]"
      >
        Recruit talents to start earning commissions from their campaigns
      </p>
      <router-link  :to="{ name: 'talents.send.invite' }">
        <div
            class="text-1E1D24 text-[0.8125rem] flex items-center justify-center space-x-2 mx-auto text-sm"
        >
          <PlusIcon class="h-4" />
          <span>Invite Talent</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>

import {ref, reactive} from "vue";
import TableLite from "@/components/TableLite.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useTalentStore } from "@/stores/talent";
import {storeToRefs} from "pinia";

const talentStore = useTalentStore();
await talentStore.fetchInvitee();
let loading = ref(false);

const { invitee } = storeToRefs(talentStore)

const revokeInvite = async (id) => {
  loading.value = true;
  await talentStore.revokeInvite(id).then(() => {
    Toast.fire({
      icon: "success",
      title: "Invite Revoke",
    });
  });
  loading.value = false;
}

const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "First Name",
      field: "first_name",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Last Name",
      field: "last_name",
      // width: "10%",
      sortable: true,
    },
    {
      label: "Email Address",
      field: "email",
      // width: "15%",
    },
    {
      label: "Phone Number",
      field: "phone_number",
      // width: "15%",
    },
    {
      label: "Date",
      field: "invite_date",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Action",
      field: "status",
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
  rows: invitee.inviteeList?.data,
  totalRecordCount: invitee.inviteeList?.data?.length ?? 0,
  sortable: {
    order: "created_at",
    sort: "asc",
  },
});

const tableLoadingFinish = (elements) => {
  table.isLoading = false;
  Array.prototype.forEach.call(elements, function (element) {
    if (element.classList.contains("revoke-invite")) {
      element.addEventListener("click", function () {
        console.log(this.dataset.id + " quick-btn click!!");
      });
    }
  });
};


</script>

<script>
import Title from "@/components/Title.vue";
export default {
  components: {Title},
}
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