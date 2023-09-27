<template>
  <div v-if="talentStore.waitlistsLists?.data?.length">
    <!-- <pre>
      {{ waitlistsLists }}
    </pre> -->
    <div class="hidden md:block">
      <table-lite
          :is-slot-mode="true"
          :has-checkbox="true"
          :columns="table.columns"
          :rows="table.rows"
          :total="table.totalRecordCount"
          :sortable="table.sortable"
          @is-finished="tableLoadingFinish"
      >
        <template v-slot:action="data">
          <p class="bg-gradient-to-br from-orange to-red p-px rounded-lg w-fit ">
            <BaseButton type='button' @click="open(data.value.id)" class='revoke-invite bg-white text-xs rounded-lg max-h-8'>
            <span class="flex items-center space-x-1">
              <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Details</span>
            </span>
          </BaseButton>
          </p>
        </template>

        <template v-slot:social="data">
          <p class="flex items-center space-x-2">
            <!-- <Icon :name="item.name" /> -->
            <span v-for="(item, index) in data.value.social" :key="index" v-html="socials.find( i => i.name === index).icon" />
          </p>
        </template>
      </table-lite>
    </div>

    <div class="divide-y md:hidden">
      <div v-for="(item, index) in waitlistsLists?.data.map( (item) => {
        return {
          accept_invite: item?.accept_invite,
          email: item?.email,
          name: `${item?.first_name} ${item?.last_name}`,
          id: item?.id,
          invite_date: item.invite_date,
          phone_number: item.phone_number
        }
      })" :key="index" class="py-2 flex space-x-4 items-center">
        <div class="p-[10px] flex-none">
          <input class="rounded border-[#CBCCCE]" type="checkbox" name="" value="">
        </div>
        <div class="space-y-2 py-3 flex-grow">
            <h4 class="text-sm text-1E1D24 font-medium">{{item.name}}</h4>
            <p class="text-xs text-#7D7C80 font-normal">Musician</p>
        </div>
        <BaseButton type='button' @click="open(item.id)" class='revoke-invite bg-white text-xs rounded-lg max-h-8 flex-none px-0'>
        <span class="flex items-center space-x-1">
          <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">See Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path d="M6.43974 13.78C6.31307 13.78 6.18641 13.7333 6.08641 13.6333C5.89307 13.44 5.89307 13.12 6.08641 12.9267L10.4331 8.58001C10.7531 8.26001 10.7531 7.74001 10.4331 7.42001L6.08641 3.07335C5.89307 2.88001 5.89307 2.56001 6.08641 2.36668C6.27974 2.17335 6.59974 2.17335 6.79307 2.36668L11.1397 6.71335C11.4797 7.05335 11.6731 7.51335 11.6731 8.00001C11.6731 8.48668 11.4864 8.94668 11.1397 9.28668L6.79307 13.6333C6.69307 13.7267 6.56641 13.78 6.43974 13.78Z" fill="url(#paint0_linear_3474_42614)"/>
            <defs>
            <linearGradient id="paint0_linear_3474_42614" x1="5.94141" y1="2.22168" x2="15.1422" y2="6.78426" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F18B1B"/>
            <stop offset="1" stop-color="#E52053"/>
            </linearGradient>
            </defs>
          </svg>
        </span>
      </BaseButton>
      </div>
    </div>
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
<!-- accept -->
  <Modal
    :is-open="acceptModal"
    @close="acceptModal = !acceptModal"
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
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="48" height="48" rx="24" fill="#D1FADF"/>
            <path d="M35.7857 25.2554V26.1425C35.7845 28.2219 35.1112 30.2452 33.8661 31.9107C32.6211 33.5762 30.871 34.7946 28.877 35.3841C26.8829 35.9737 24.7516 35.9029 22.8011 35.1823C20.8506 34.4617 19.1852 33.1298 18.0534 31.3854C16.9216 29.641 16.3841 27.5774 16.5209 25.5025C16.6577 23.4276 17.4616 21.4525 18.8126 19.8718C20.1637 18.2911 21.9895 17.1895 24.0178 16.7312C26.046 16.273 28.1681 16.4826 30.0675 17.3289M35.7857 18.4282L26.1429 28.0807L23.25 25.1879" stroke="#039855" stroke-width="1.92857" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="3" y="3" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="5.78571"/>
          </svg>
        </div>

        <div class="space-y-1">
          <h1 class="text-lg md:text-2xl font-bold text-black text-center font-power">
            Accept  Request 
          </h1>
          <p class="text-434345 text-sm md:text-lg font-light text-center">
            Are you sure you want to accept this talent’s request? 
          </p>
        </div>

        <div class="flex items-center justify-center space-x-4 pt-4">
          <BaseButton
            type="button"
            @click.prevent="acceptModal = !acceptModal"
            class="tex-#7D7C80 border-#7D7C80 border rounded-lg flex-1 text-sm md:text-base"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :is-loading="loading"
            type="button"
            class="  bg-gradient-to-br from-orange to-red text-white rounded text-center font-light flex-1 text-sm md:text-base"
          >
            <!-- <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" /> -->
            Yes, Accept
          </BaseButton>
        </div>
      </DialogPanel>
    </form>
  </Modal>

  <Modal
    :is-open="rejectModal"
    @close="rejectModal = !rejectModal"
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
            <path d="M31.3675 32.4717L22.5286 23.6329C22.2266 23.3309 22.2266 22.83 22.5286 22.528C22.8306 22.226 23.3315 22.226 23.6335 22.528L32.4723 31.3668C32.7743 31.6688 32.7743 32.1697 32.4723 32.4717C32.1703 32.7737 31.6695 32.7737 31.3675 32.4717Z" fill="#F51211"/>
            <path d="M22.5277 32.4717C22.2257 32.1697 22.2257 31.6688 22.5277 31.3668L31.3665 22.528C31.6685 22.226 32.1694 22.226 32.4714 22.528C32.7734 22.83 32.7734 23.3309 32.4714 23.6329L23.6325 32.4717C23.3305 32.7737 22.8297 32.7737 22.5277 32.4717Z" fill="#F51211"/>
            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
          </svg>
        </div>

        <div class="space-y-1">
          <h1 class="text-lg md:text-2xl font-bold text-black text-center font-power">
            Reject  Request 
          </h1>
          <p class="text-434345 text-sm md:text-lg font-light text-center">
            Are you sure you want to reject this talent’s request? This action cannot be undone. 
          </p>
        </div>

        <div class="flex items-center justify-center space-x-4 pt-4">
          <BaseButton
            type="button"
            @click.prevent="rejectModal = !rejectModal"
            class="tex-#7D7C80 border-#7D7C80 border rounded-lg flex-1 text-sm md:text-base"
          >
            Cancel
          </BaseButton>
          <BaseButton
            :is-loading="loading"
            type="button"
            class="bg-error text-white rounded text-center font-light flex-1 text-sm md:text-base"
          >
            <!-- <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" /> -->
            Yes, Reject
          </BaseButton>
        </div>
      </DialogPanel>
    </form>
  </Modal>

  <Modal
    :is-open="detailModal"
    @close="detailModal = !detailModal"
  >
    <div
      class="w-full flex justify-center relative"
    >
      <div v-if="getArtistloading" class="inset-0 bg-white flex items-center justify-center">
        <LoaderComponent />
      </div>
      <DialogPanel
        class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-4 md:p-6 text-left shadow-xl transition-all space-y-4"
      >
        <div class="mx-auto flex justify-between items-start">
          <div class="space-y-1">
            <h3 class="text-2xl font-medium font-power flex items-end gap-1">
              <span>{{ waitlistsList?.first_name }} {{ waitlistsList?.last_name }}</span> <Status :name="waitlistsList?.status" />
            </h3>
            <span class=" text-sm text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">
              {{ waitlistsList?.last_name }}
            </span>
          </div>

          <button @click.prevent="detailModal = !detailModal" class=" w-6 h-6 rounded-full bg-#E9E8E9 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10.4752 11.1824L4.81832 5.5255C4.62505 5.33223 4.62505 5.01167 4.81832 4.8184C5.0116 4.62512 5.33215 4.62512 5.52543 4.8184L11.1823 10.4753C11.3756 10.6685 11.3756 10.9891 11.1823 11.1824C10.989 11.3756 10.6685 11.3756 10.4752 11.1824Z" fill="#1E1D24"/>
              <path d="M4.81772 11.1824C4.62444 10.9891 4.62444 10.6685 4.81772 10.4753L10.4746 4.8184C10.6678 4.62512 10.9884 4.62512 11.1817 4.8184C11.375 5.01167 11.375 5.33223 11.1817 5.5255L5.52482 11.1824C5.33155 11.3756 5.01099 11.3756 4.81772 11.1824Z" fill="#1E1D24"/>
            </svg>
          </button>
        </div>

        <div class="">
          <!-- <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Nationality</h4>
            <p class="text-base text-#7D7C80 font-medium">Nigerian</p>
          </div> -->
          <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Email</h4>
            <p class="text-base text-#7D7C80 font-medium">
              {{ waitlistsList?.email }}
            </p>
          </div>

          <!-- <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Phone Number</h4>
            <p class="text-base text-#7D7C80 font-medium">09172057365</p>
          </div> -->
          <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Genre</h4>
            <p class="text-base text-#7D7C80 font-medium">
              {{ waitlistsList?.genre }}
            </p>
          </div>
          <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Links</h4>
            <div class="space-y-2">
              <a :href="item" target="_blank" v-for="(item, index) in waitlistsList?.social" class="text-base font-medium flex items-center space-x-1">
                <span :key="index" v-html="socials.find( i => i.name === index).icon" />
                <span :class="[socials.find( i => i.name === index).class]">{{ index }}</span>
              </a>
            </div>
          </div>
          <div class="space-y-3 py-3 border-b">
            <h4 class="text-sm text-1E1D24 font-medium">Request Date</h4>
            <p class="text-base text-#7D7C80 font-medium">
              {{ waitlistsList?.last_name }}
            </p>
          </div>
        </div>

        <div v-if="waitlistsList?.status === 'Awaiting Review'" class="space-y-4 pt-4">
          <BaseButton
            type="button"
            @click.prevent="acceptModal = !acceptModal; detailModal = !detailModal"
            class="tex-#7D7C80 rounded-lg flex-1 bg-gradient-to-br from-orange to-red w-full text-white"
          >
            Set For Review
          </BaseButton>
        </div>

        <div v-else class="space-y-4 pt-4">
          <BaseButton
            type="button"
            @click.prevent="acceptModal = !acceptModal; detailModal = !detailModal"
            class="tex-#7D7C80 rounded-lg flex-1 bg-gradient-to-br from-orange to-red w-full text-white"
          >
            Accept Request
          </BaseButton>
          <div class=" bg-gradient-to-br from-orange to-red rounded-lg p-px">
            <BaseButton
            :is-loading="loading"
            type="button"
            @click.prevent="rejectModal = !rejectModal; detailModal = !detailModal"
            class="bg-white rounded-lg w-full text-center flex-1"
          >
            <!-- <PaperAirplaneIcon class="h-4 -rotate-45 pb-x" /> -->
            <span class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">
              Reject Request
            </span>
          </BaseButton>
          </div>
        </div>

        
      </DialogPanel>

    </div>
  </Modal>
</template>

<script setup>
import {
  DialogPanel,
} from "@headlessui/vue";
import Modal from "@/components/ModalComponent.vue";
import Status from "@/components/Status.vue";
import {ref, reactive} from "vue";
import TableLite from "@/components/TableLite.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import Icon from "@/components/Icon.vue";
import { useTalentStore } from "@/stores/talent";
import {storeToRefs} from "pinia";
import spotify from "@/assets/icons/socials-colored/spotify.svg?raw"
import apple from "@/assets/icons/socials-colored/apple.svg?raw"
import deezer from "@/assets/icons/socials-colored/deezer.svg?raw"
import facebook from "@/assets/icons/socials-colored/facebook.svg?raw"
import instagram from "@/assets/icons/socials-colored/instagram.svg?raw"
import sound from "@/assets/icons/socials-colored/sound.svg?raw"
import tiktok from "@/assets/icons/socials-colored/tiktok.svg?raw"
import twitter from "@/assets/icons/socials-colored/twitter.svg?raw"
import LoaderComponent from "@/components/LoaderComponent.vue";
const socials = ref([
  { id: 1, name: "Spotify", placeholder: "https://spotify.com/yourpage", icon: spotify, unavailable: false, class: 'text-[#1DB953]' },
  { id: 2, name: "Deezer", placeholder: "https://deezer.com/yourpage", icon: deezer, unavailable: false, class: 'text-1E1D24'},
  { id: 3, name: "Apple Music", placeholder: "https://apple.com/yourpage", icon: apple, unavailable: false, class: 'text-1E1D24' },
  { id: 4, name: "Soundcloud", placeholder: "https:/soundcloud/.com/yourpage", icon: sound, unavailable: false, class: 'text-transparent bg-clip-text bg-gradient-to-br from-orange to-red' },
  { id: 5, name: "Facebook", placeholder: "https://facebook.com/yourpage", icon: facebook, unavailable: false, class: 'text-1E1D24' },
  { id: 6, name: "Twitter", placeholder: "https://twitter.com/yourpage", icon: twitter, unavailable: false, class: 'text-1E1D24' },
  { id: 7, name: "Instagram", placeholder: "https://instagram.com/yourpage", icon: instagram, unavailable: false, class: 'text-1E1D24' },
  { id: 8, name: "Tik Tok", placeholder: "https://tiktok.com/yourpage", icon: tiktok, unavailable: false, class: 'text-1E1D24' },
])

const talentStore = useTalentStore();
await talentStore.fetchWaitlists();
let loading = ref(false);
let getArtistloading = ref(false);
let detailModal = ref(false);
let acceptModal = ref(false);
let rejectModal = ref(false);
let selectedId = ref(null);

const { waitlistsLists, waitlistsList } = storeToRefs(talentStore)



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
      label: "Genre",
      field: "genre",
      // width: "15%",
    },
    {
      label: "Stage Name",
      field: "stage_name",
      // width: "15%",
    },
    {
      label: "Links",
      field: "social",
      // width: "15%",
      sortable: true,
    },
    // {
    //   label: "Nationality",
    //   field: "nationality",
    //   // width: "15%",
    //   sortable: true,
    // },
    {
      label: "Action",
      field: "action",
    },

    {
      label: "Status",
      field: "status",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return (
          '<span data-id="' +
          row.id +
          '" class="' +
          row?.status?.toLowerCase().replaceAll(' ', '_') +
          '">' +
          row.status +
          "</span>"
        );
      },
    },
  ],
  rows: waitlistsLists.value?.data.map( (item) => {
    return {
      accept_invite: item?.accept_invite,
      email: item?.email,
      name: `${item?.first_name} ${item?.last_name}`,
      id: item?.id,
      invite_date: item.invite_date,
      social: item.social,
      genre: item.genre,
      stage_name: item.stage_name,
      status: item.status
    }
  }),
  totalRecordCount: waitlistsLists.value?.data?.length,
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

const open = async (id) => {
  getArtistloading.value = true
  detailModal.value = !detailModal.value
  selectedId.value = id
  await talentStore.fetchWaitlist(id).then( () => {
    getArtistloading.value = false
  }).catch( () => {
    getArtistloading.value = false
  });
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
::v-deep(.in_review) {
  color: #e3a11b;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(255, 158, 11, 0.10);
  border-radius: 100px;
}
::v-deep(.awaiting_review) {
  color: #3d6abe;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(61, 106, 190, 0.10);
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