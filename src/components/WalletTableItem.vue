<template>
  <div class="py-2 flex space-x-4 items-center">
    <!-- <pre>
      {{ item }}
    </pre> -->
    <div class="flex-none">
      <!-- {{ item.fund_type }} -->
      <Icon :name="item.fund_type" />
      <!--      <span v-html="item.transact_type" />-->
    </div>
    <div class="space-y-1 py-3 flex-grow">
      <h4 class="text-sm text-1E1D24 font-medium capitalize">
        {{ item.name }}
      </h4>
      <p class="text-xs text-#7D7C80 font-normal">
        {{ item.payment_status }}
      </p>
    </div>
    <div class="space-y-1 py-3 flex-none">
      <h4 class="text-sm text-1E1D24 font-medium">
        {{ item.amount.formatted }}
      </h4>
      <p class="text-xs text-#7D7C80 font-normal">
        {{ useFormat(item.date_created, "MMM dd, Y") }}
      </p>
    </div>
  </div>
</template>
<script setup>
// import exclusive from "../assets/icons/status/exclusive.svg?raw"
// import support from "../assets/icons/status/support.svg?raw"
// import contribution from "../assets/icons/status/contribution.svg?raw"
// import bank_transfer from "../assets/icons/status/bank-transfer.svg?raw"
import { useFormat } from "@/composables/duration";
import Icon from "@/components/Icon.vue";


defineProps({
  item: {
    type: Object,
    required: true,
  },
})


</script>
