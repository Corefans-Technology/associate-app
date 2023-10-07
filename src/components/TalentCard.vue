<template>
  <div class="w-full md:w-64 h-fit min-h-full max-h-full border rounded-2xl border-light-grey overflow-hidden">
    <div class="relative">
      <img
        class="w-full object-cover h-52"
        :src="talent.photo_path"
        :alt="talent.first_name"
      />
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between relative ">
        <div class="text-1E1D24">
          <h3
            class="font-medium text-lg pt-3 leading-snug font-power"
            v-text="talent?.stage_name"
          />
        </div>
        <!-- <Icon
          name="rectangle"
          class="absolute"
        />
        <Icon
          name="dot3"
          class="absolute right-0"
        /> -->
      </div>
      <div class="flex items-center space-x-1 pt-2 border-b pb-4">
        <div
          class="border rounded-full text-black border-black py-1 px-2 text-xs font-semibold"
        >
          {{ talent?.genre }}
        </div>
        <div
          class="border rounded-full text-#444349 border-black py-1 px-2 text-xs font-semibold flex items-center space-x-1"
        >
          <Icon name="country" />
          <span>NG</span>
        </div>
        <p class="text-xs text-#444349 leading-snug bg-#808080 bg-opacity-10 rounded-full px-[10px] py-[5px] font-medium">
          {{ talent.type }}
        </p>
      </div>

      <div class="flex items-center justify-between pt-6">
        <!-- <Status name="pending" /> -->
        <a
          class="text-sm flex items-center space-x-1"
          :href="`https://demo.corefans.co/${talent?.username}`"
        >
          <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">View Campaigns</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              d="M5.94001 14.28C5.81335 14.28 5.68668 14.2333 5.58668 14.1333C5.39335 13.94 5.39335 13.62 5.58668 13.4267L9.93335 9.08001C10.2533 8.76001 10.2533 8.24001 9.93335 7.92001L5.58668 3.57335C5.39335 3.38001 5.39335 3.06001 5.58668 2.86668C5.78001 2.67335 6.10001 2.67335 6.29335 2.86668L10.64 7.21335C10.98 7.55335 11.1733 8.01335 11.1733 8.50001C11.1733 8.98668 10.9867 9.44668 10.64 9.78668L6.29335 14.1333C6.19335 14.2267 6.06668 14.28 5.94001 14.28Z"
              fill="url(#paint0_linear_3424_41988)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3424_41988"
                x1="5.44168"
                y1="2.72168"
                x2="14.6425"
                y2="7.28426"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F18B1B" />
                <stop
                  offset="1"
                  stop-color="#E52053"
                />
              </linearGradient>
            </defs>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// import Status from "@/components/Status.vue";
// import { ArrowRightIcon } from "@heroicons/vue/24/outline";
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
