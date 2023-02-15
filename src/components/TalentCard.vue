<template>
  <div class="w-64 h-fit min-h-full max-h-full border border-light-grey overflow-hidden">
    <div class="relative">
      <img
        class="w-full object-cover h-64"
        :src="talent.photo_path"
        :alt="talent.first_name"
      />
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between relative">
        <div class="text-1E1D24">
          <h3
            class="font-medium text-lg pt-3 leading-snug"
            v-text="fullName"
          />
          <p class="text-sm font-light italic leading-snug">
            {{ talent.type }}
          </p>
        </div>
        <Icon
          name="rectangle"
          class="absolute"
        />
        <Icon
          name="dot3"
          class="absolute right-0"
        />
      </div>

      <div class="flex items-center justify-between pt-8">
        <Status name="pending" />
        <RouterLink
          class="text-xs text-gray-1 flex items-center space-x-1"
          to="/"
        >
          <span>View Profile</span>
          <ArrowRightIcon class="w-4 h-4" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Status from "@/components/Status.vue";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";
import {computed} from "vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  talent: {
    type: Object,
    required: true,
  },
});

const fullName = computed(() => `${props.talent.first_name} ${props.talent.last_name}`)

</script>

<style lang="scss" scoped></style>
