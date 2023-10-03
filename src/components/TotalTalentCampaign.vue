<template>
  <h3 class="text-[#333333] text-[1.7rem] font-bold">
    {{ campaigns.length }}
  </h3>
</template>

<script setup>
import {useWalletStore} from "@/stores/wallet";
import {storeToRefs} from "pinia";



const walletStore = useWalletStore();
walletStore.getCreativeCampaign();
const { campaigns } = storeToRefs(walletStore);
</script>

