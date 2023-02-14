<template>
  <div class="rounded-b-[1.5rem] py-4">
    <div class="text-2xl text-black font-medium flex justify-between">
      <h5>
        {{ 0 }}%
        <span class="text-xs">raised</span>
      </h5>
      <Status classes="" :name="campaign.status" />
    </div>

    <div class="pt-4 space-y-3">
      <div class="w-full rounded-[7px] bg-[#E0E0E0] relative h-2">
        <div
          style="width: 0%"
          class="rounded-[7px] bg-gradient-to-r from-orange to-red absolute inset-0 h-2"
        ></div>
      </div>
      <div class="flex items-center justify-between">
        <growth-card
          class=""
          title-class="font-semibold text-base"
          :title="`₦${campaign?.funding?.goal}`"
          description="Goal"
          description-class="text-sm text-[#626E8B]"
        />
        <div class="h-8 w-px mx-2 bg-[#EDEDED]"></div>
        <growth-card
          class=""
          title-class="font-semibold text-base"
          :title="0"
          description="Corefans"
          description-class="text-sm text-[#626E8B]"
        />
        <div class="h-8 w-px mx-2 bg-[#EDEDED]"></div>
        <growth-card
          class=""
          title-class="font-semibold text-base"
          :title="durations"
          description="days left"
          description-class="text-sm text-[#626E8B]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GrowthCard from "@/components/GrowthCard.vue";
import Status from "@/components/Status.vue";
import { format, differenceInDays, formatRelative, subDays } from 'date-fns'
import {computed} from "vue";

const props = defineProps({
  campaign: Object,
});

const durations = computed(() => {
  return differenceInDays(new Date(props.campaign.basic.duration), new Date());
});
</script>

<style lang="scss" scoped></style>
