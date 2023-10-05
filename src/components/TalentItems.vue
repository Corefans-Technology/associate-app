<template>
  <div
    v-if="talentStore.invitedList?.data?.length"
    class="space-y-6 flex flex-col overflow-hidden"
  >
        <div class="flex flex-col md:flex-row overflow-x-auto md:flex-wrap gap-5 pt-8 ">
          <TalentCard
            v-for="(talent, index) in talentStore.invitedList?.data"
            :key="index"
            :talent="talent"
          />
        </div>
  </div>
  <div
    v-else
    class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3"
  >
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
        <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">Invite Talent</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import TalentCard from "@/components/TalentCard.vue";
import {computed, ref} from "vue";


import {useTalentStore} from "@/stores/talent";
import TalentInvitingTable from "@/components/tables/TalentInvitingTable.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import Icon from "@/components/Icon.vue";

const talentStore = useTalentStore();
await talentStore.fetchInvited();


</script>

<style lang="scss" scoped></style>
