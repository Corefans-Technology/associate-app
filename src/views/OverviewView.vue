<script setup>
import HowTo from "@/components/HowTo.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useManagerStore } from "@/stores/manager";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, PlayIcon } from "@heroicons/vue/20/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
const managerStore = useManagerStore();
managerStore.profile();
</script>

<template>
  <dashboard-layout>
    <div class="p-[40px] space-y-8">
      <div class="space-y-1">
        <h1 class="text-2xl text-1E1D24 font-medium">
          Hi {{ managerStore.data.first_name }}
        </h1>
        <p class="text-gray-2 text-sm">
          Here’s an overview of your campaigns and funds
        </p>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <HowTo
          title="How it works"
          text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          icon="info"
        />
        <HowTo
          title="Pricing"
          text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          icon="pricing"
        />
        <HowTo
          title="Roles and Responsibilty"
          text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          icon="brand"
        />
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-2xl font-medium">
            Checklist List
          </h3>
          <div
            class="rounded shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-6 min-h-[19.625rem]"
          >
            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-6 w-6 stroke-1 stroke-gray-2 flex-none" />
                <span class="text-1E1D24 flex-grow text-left">Complete your profile</span>
                <ChevronUpIcon class="h-5 w-5 text-1E1D24 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>
            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-6 w-6 stroke-1 stroke-gray-2 flex-none" />
                <span class="text-1E1D24 flex-grow text-left">Set up your first campaign</span>
                <ChevronUpIcon class="h-5 w-5 text-1E1D24 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>

            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-6 w-6 stroke-1 stroke-gray-2 flex-none" />
                <span class="text-1E1D24 flex-grow text-left">Reach your first campaign goal</span>
                <ChevronUpIcon class="h-5 w-5 text-1E1D24 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>

            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-6 w-6 stroke-1 stroke-gray-2 flex-none" />
                <span class="text-1E1D24 flex-grow text-left">Sell your first Exclusive to your core fan</span>
                <ChevronUpIcon class="h-5 w-5 text-1E1D24 rotate-90" />
              </DisclosureButton>
            </Disclosure>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-2xl font-medium">
            About Corefans
          </h3>
          <div
            class="shadow-[0px_4px_16px_rgba(0,0,0,0.03)] h-[19.625rem] relative"
          >
            <video class="w-full h-full rounded bg-#FFFBF7">
              <source
                src="https://www.youtube.com/watch?v=helEv0kGHd4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div
              class="absolute top-2/4 right-2/4 w-[3.188rem] h-[3.188rem] rounded-full bg-orange text-white flex items-center justify-center"
            >
              <PlayIcon class="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>
