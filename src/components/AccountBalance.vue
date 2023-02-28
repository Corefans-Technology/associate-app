<template>
  <h3 class="text-[#333333] text-[2rem] font-bold">
    {{

      useCurrency(walletStore.balance)
    }}
  </h3>
</template>
<script setup>
import {useWalletStore} from "@/stores/wallet";
import {useCurrency} from "@/composables/currency";


const walletStore = useWalletStore();
await walletStore.getBalance();
</script>
