<template>
  <div v-for="(exclusive, index) in exclusiveStore.data" :key="index">
  <div class="w-[262px] h-fit min-h-full max-h-full border border-light-grey rounded-lg overflow-hidden">
    <div class="relative">
      <img
          class="w-full object-cover w-[262px] h-40"
          :src="exclusive.thumbnail"
          :alt="exclusive.title"
      />
      <BaseCheckbox name="exclusives" :value="exclusive.id" type="checkbox" class="absolute top-2 right-5 rounded-full h-6 w-6 text-orange shadow-2xl" />
    </div>

    <div class="m-4 flex flex-col justify-end">
      <h3 class="font-medium text-1E1D24 capitalize leading-snug line-clamp-1">
        {{ exclusive.title }}
      </h3>
      <p class="text-7B7B7B text-sm font-normal line-clamp-2 mt-2">
        {{ exclusive.description }}
      </p>
      <div class="space-y-4 relative mt-4">
        <div class="flex items-baseline space-x-1">
          <h5 class="font-medium text-base leading-snug">{{ exclusive.price }} </h5>
          <span class="text-sm text-626E8B">or more</span>
        </div>
        <hr />
        <div class="flex items-center justify-between">
          <growth-card
              class=""
              title-class="font-medium text-sm leading-loose"
              :title="getDeliveryEstimate(exclusive.delivery_estimate)"
              description="Estimated shipping"
              description-class="text-sm text-626E8B"
          />
          <hr class="mx-2 bg-light-grey-3" />
          <growth-card
              class=""
              title-class="font-medium text-sm leading-loose"
              :title="exclusive.quantity"
              description="Quantity"
              description-class="text-xs text-626E8B"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import GrowthCard from "@/components/GrowthCard.vue";
import Status from "@/components/Status.vue";
import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import {useExclusiveStore} from "@/stores/exclusives";
import {computed} from "vue";
import {format, differenceInDays, formatRelative, subDays} from "date-fns";

const exclusiveStore = useExclusiveStore();
await exclusiveStore.index();

const getDeliveryEstimate = (date) => {
  return format(new Date(date), "MMMM Y");
};
</script>

<style lang="scss" scoped></style>
