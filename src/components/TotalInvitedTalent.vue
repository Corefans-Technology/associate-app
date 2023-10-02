<template>
  <h3 class="text-[#333333] text-[1.7rem] font-bold">
    {{ talentStore.invitedList?.data.length }}
  </h3>
</template>

<script setup>
import {useTalentStore} from "@/stores/talent";

const talentStore = useTalentStore();
await talentStore.fetchInvited();
</script>

