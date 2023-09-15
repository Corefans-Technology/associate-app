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
        <p class="bg-gradient-to-br from-orange to-red p-px rounded-lg w-fit ">
          <BaseButton type='button' @click="open(data.value.id)" class='revoke-invite bg-white text-xs rounded-lg max-h-8'>
          <span class="flex items-center space-x-1">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4749 11.6819L4.81808 6.02502C4.6248 5.83174 4.6248 5.51118 4.81808 5.31791C5.01135 5.12463 5.33191 5.12463 5.52518 5.31791L11.182 10.9748C11.3753 11.168 11.3753 11.4886 11.182 11.6819C10.9888 11.8751 10.6682 11.8751 10.4749 11.6819Z" fill="url(#paint0_linear_3424_6552)"/>
              <path d="M4.81796 11.6819C4.62469 11.4886 4.62469 11.168 4.81796 10.9748L10.4748 5.31791C10.6681 5.12463 10.9886 5.12463 11.1819 5.31791C11.3752 5.51118 11.3752 5.83174 11.1819 6.02502L5.52507 11.6819C5.33179 11.8751 5.01124 11.8751 4.81796 11.6819Z" fill="url(#paint1_linear_3424_6552)"/>
              <defs>
              <linearGradient id="paint0_linear_3424_6552" x1="5.17163" y1="4.96436" x2="3.92988" y2="6.51654" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F18B1B"/>
              <stop offset="1" stop-color="#E52053"/>
              </linearGradient>
              <linearGradient id="paint1_linear_3424_6552" x1="10.8284" y1="4.96436" x2="12.0701" y2="6.51654" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F18B1B"/>
              <stop offset="1" stop-color="#E52053"/>
              </linearGradient>
              </defs>
            </svg>
            <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Revoke invite</span>
          </span>
        </BaseButton>
        </p>
      </template>
    </table-lite>
  </div>
  <div
      v-else
      class="border rounded border-#F2F4F7 min-h-[42.625rem] grid place-items-center"
  >
    <div class="flex flex-col items-center justify-center space-y-3">
      <Icon name="empty" />
      <h4 class="text-xl text-#1D2939 text-center font-bold font-power">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path d="M12.5 8.49992H4.5" stroke="url(#paint0_linear_3424_695)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.50187 12.5V4.5" stroke="url(#paint1_linear_3424_695)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
          <linearGradient id="paint0_linear_3424_695" x1="4.5" y1="7.68359" x2="5.13974" y2="10.8183" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F18B1B"/>
          <stop offset="1" stop-color="#E52053"/>
          </linearGradient>
          <linearGradient id="paint1_linear_3424_695" x1="7.68555" y1="4.5" x2="10.8203" y2="5.13974" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F18B1B"/>
          <stop offset="1" stop-color="#E52053"/>
          </linearGradient>
          </defs>
        </svg>
        <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Invite Talent</span>
      </div>
      </router-link>
    </div>
  </div>

  <Modal
    :is-open="revokeModal"
    @close="revokeModal = !revokeModal"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <DialogPanel
        class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 md:p-10 text-left shadow-xl transition-all space-y-4"
      >
        <div class="mx-auto flex justify-center">
          <!-- <Icon name="success" /> -->
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2"/>
            <path d="M31.367 32.4717L22.5281 23.6329C22.2261 23.3309 22.2261 22.83 22.5281 22.528C22.8301 22.226 23.331 22.226 23.633 22.528L32.4718 31.3668C32.7738 31.6688 32.7738 32.1697 32.4718 32.4717C32.1698 32.7737 31.669 32.7737 31.367 32.4717Z" fill="#F51211"/>
            <path d="M22.5282 32.4717C22.2262 32.1697 22.2262 31.6688 22.5282 31.3668L31.367 22.528C31.669 22.226 32.1699 22.226 32.4719 22.528C32.7739 22.83 32.7739 23.3309 32.4719 23.6329L23.633 32.4717C23.331 32.7737 22.8302 32.7737 22.5282 32.4717Z" fill="#F51211"/>
            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
          </svg>

        </div>

        <div class="space-y-1">
          <h1 class="text-2xl font-bold text-black text-center font-power">
            Revoke Invite ?
          </h1>
          <p class="text-434345 text-lg font-light text-center">
            Are you sure you want to revoke this talent invite? This action cannot be undone.
          </p>
        </div>

        <div class="flex items-center justify-center space-x-4 pt-4">
          <BaseButton
            type="button"
            @click.prevent="revokeModal = !revokeModal"
            class="tex-#7D7C80 border-#7D7C80 border rounded-lg flex-1"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :is-loading="loading"
            type="button"
            @click.prevent="revokeInvite"
            class="bg-error text-white rounded text-center font-light flex-1"
          >
            <!-- <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" /> -->
            Yes, Revoke
          </BaseButton>
        </div>
      </DialogPanel>
    </form>
  </Modal>
</template>

<script setup>
import {
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import Modal from "@/components/ModalComponent.vue";
import {ref, reactive} from "vue";
import TableLite from "@/components/TableLite.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import Icon from "@/components/Icon.vue";
import { useTalentStore } from "@/stores/talent";
import {storeToRefs} from "pinia";

const talentStore = useTalentStore();
await talentStore.fetchInvitee();
let loading = ref(false);
let revokeModal = ref(false);
let selectedId = ref(null);

const { inviteeList } = storeToRefs(talentStore)



const revokeInvite = async () => {
  loading.value = true;
  await talentStore.revokeInvite(selectedId.value).then(() => {
    Toast.fire({
      icon: "success",
      title: "Invite Revoke",
    });
  });
  loading.value = false;
  selectedId.value = true
  revokeModal.value = !revokeModal.value
}

const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Name",
      field: "name",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Email",
      field: "email",
      // width: "15%",
    },
    {
      label: "Phone Number",
      field: "phone_number",
      // width: "15%",
    },
    {
      label: "Creator Type",
      field: "type",
      // width: "15%",
    },
    {
      label: "Creator Type",
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
  rows: inviteeList.value?.data.map( (item) => {
    return {
      accept_invite: item?.accept_invite,
      email: item?.email,
      name: `${item?.first_name} ${item?.last_name}`,
      id: item?.id,
      invite_date: item.invite_date,
      phone_number: item.phone_number
    }
  }),
  totalRecordCount: inviteeList.value?.data?.length,
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

const open = (id) => {
  revokeModal.value = !revokeModal.value
  selectedId.value = id
}


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
  font-weight: 500 !important;
  font-size: 14px;
  padding: 0px 0px;
}

::v-deep(.vtl-tbody-td div) {
  font-weight: 500 !important;
  font-size: 14px;
  padding: 0px 0px;
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