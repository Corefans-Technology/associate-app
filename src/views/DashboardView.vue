<script setup>
import Statistic from "@/components/Statistic.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useManagerStore } from "@/stores/manager";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, PlayIcon} from "@heroicons/vue/20/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
const managerStore = useManagerStore();
managerStore.profile();
</script>

<template>
  <dashboard-layout>
    <div class="p-[40px] space-y-8">
      <div class="space-y-1">
        <h1 class="text-2xl text-black font-medium">
          Hi {{ managerStore.data.first_name }}
        </h1>
        <p class="text-[#667085] text-sm">
          Here’s an overview of your campaigns and funds
        </p>
      </div>
      <div
        class="flex py-[1.125rem] rounded-[0.625rem] border border-[#EAECF0] divide-x"
      >
        <!-- <div class="w-[1px] h-full mx-4 bg-[#EAECF0] flex-none"></div> -->
        <Statistic
          title="Total Revenue"
          amount="0.00"
          volume="0,50%"
        />
        <Statistic
          title="Total Campaigns"
          amount="246,586,062"
          volume="0,50%"
        />
        <Statistic
          title="Total Corefans"
          amount="246,586,062"
          volume="0,50%"
        />
        <Statistic
          title="Total Exclusives"
          amount="246,586,062"
          volume="0,50%"
        />
      </div>
    </div>
  </dashboard-layout>
</template>
