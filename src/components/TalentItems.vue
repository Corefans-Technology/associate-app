<template>
  <div
    v-if="talentStore.invitedList?.data?.length"
    class="space-y-6 flex flex-col overflow-hidden"
  >
        <div class="flex flex-wrap gap-5">
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
