<template>
  <dashboard-layout>
    <div class="p-[2.5rem] space-y-6 h-full">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-black flex-none pr-[2rem]">
          Campaign
        </h2>

        <label class="relative block max-w-[20.5rem] w-full flex-none">
          <span class="sr-only">Search</span>
          <span
            class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
          >
            <Icon name="search" />
          </span>
          <input
            class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded py-2 pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:font-normal"
            placeholder="Find campaign"
            type="text"
            name="search"
          />
        </label>

        <div class="flex-grow flex items-center justify-end">
          <router-link :to="{ name: 'campaigns.create' }">
            <div
              class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
            >
              <PlusIcon class="h-5" />
              <span>Start a campaign</span>
            </div>
          </router-link>
        </div>

        <Popover class="relative">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="filter" />
            <span>Filter</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>

        <Popover class="relative">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="export" />
            <span>Export</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </div>
      <Suspense>
        <template #default>
          <CampaignItem />
        </template>
        <template #fallback>
          <div class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3">
            <LoaderComponent />
          </div>
        </template>
      </Suspense>
    </div>
  </dashboard-layout>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import CampaignItem from "@/components/CampaignItem.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusIcon } from "@heroicons/vue/24/outline"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
</script>
