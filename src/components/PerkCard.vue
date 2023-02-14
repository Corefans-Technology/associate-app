<template>
  <div class="border rounded-lg">
    <img
      class="w-full h-[13.3125rem] object-cover rounded-t-lg"
      :src="exclusive.thumbnail"
      alt=""
    />
    <div class="py-4 px-[0.875rem] space-y-4">
      <p class="text-lg font-medium">
        {{ exclusive.title }}
      </p>
      <p class="text-[#667085] text-base font-normal">
        {{ exclusive.description }}
      </p>
      <div class="space-y-4 relative">
        <div
          class="text-2xl text-black font-medium flex justify-between items-center"
        >
          <h5>{{ exclusive.price }} <span class="text-xs">or more</span></h5>
          <Status classes="bg-[#F18B1B] text-[#F18B1B]" name="3/ 27 claimed" />
        </div>

        <hr />

        <div class="flex items-center justify-between">
          <growth-card
            class=""
            title-class="font-semibold text-base"
            :title="exclusive.delivery_estimate"
            description="Estimated shipping"
            description-class="text-sm text-[#626E8B]"
          />
          <div class="h-8 w-px mx-2 bg-[#EDEDED]"></div>
          <growth-card
            class=""
            title-class="font-semibold text-base"
            title="345"
            description="Corefans"
            description-class="text-sm text-[#626E8B]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GrowthCard from "@/components/GrowthCard.vue";
import Status from "@/components/Status.vue";
defineProps({
  exclusive: String,
  classes: String,
});
</script>

<style lang="scss" scoped></style>
