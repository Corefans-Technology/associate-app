<template>
  <div
    v-for="(exclusive, index) in exclusives"
    :key="index"
  >
    <div class="w-[262px] h-fit min-h-full max-h-full border border-light-grey rounded-lg overflow-hidden">
      <div class="relative">
        <img
          class="w-full object-cover w-[262px] h-40"
          :src="exclusive.thumbnail"
          :alt="exclusive.title"
        />
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
            <h5 class="font-medium text-base leading-snug">
              {{ exclusive.price }}
            </h5>
            <span class="text-sm text-626E8B">or more</span>
          </div>
          <hr />
          <div class="flex items-center justify-between">
            <growth-card
              class=""
              title-class="font-medium text-sm leading-loose"
              :title="exclusive.delivery_estimate"
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

defineProps({
  exclusives: Object,
});

</script>

