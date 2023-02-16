<template>
  <layout>
    <div class="p-10">
      <div class="flex items-center space-x-4 justify-between">
        <!-- breabcrum -->
        <div>
          <h2 class="text-2xl font-medium pr-8">Settings</h2>
        </div>
      </div>

      <!-- perks -->
      <div class="py-6 w-full">
        <TabGroup>
          <TabList class="flex space-x-8 900/20 border-b border-b-F2F4F7 text-sm">
            <Tab
              v-for="(link, name) in tabs"
              as="template"
              :key="name"
              v-slot="{ selected }"
            >
              <router-link
                :to="{ name: link }"
                :class="[
                  selected ? 'text-1E1D24 border-b-1E1D24' : 'text-light-grey-2',
                  'focus:outline-none relative py-3 -mb-[1px]'
                ]"
              >
                {{ name }}
              </router-link>
            </Tab>
          </TabList>
          <TabPanels class="mt-8">
          <router-view></router-view>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </layout>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Layout from "@/layouts/DashboardLayout.vue";
import { ref } from "vue";

const tabs = ref({
  "Profile" : 'settings.profile',
  "Security": 'settings.security',
  "Funding Account": 'settings.funding.account',
  "Preferences": 'settings.preference',
});

</script>

<style lang="css">
.router-link-active {
  @apply text-[#FF9E0B] border-b-2 border-[#FF9E0B]
}
</style>