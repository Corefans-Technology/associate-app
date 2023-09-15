<template>
  <layout>
    <div class="px-5 md:px-[2.5rem] py-10 md:py-0 md:space-y-6">
      <div class="flex items-center space-x-4 justify-between">
        <!-- breabcrum -->
        <div class="md:hidden pb-3">
          <h2 class="text-lg md:text-2xl font-bold font-power text-black pr-[2rem]">
            Settings
          </h2>
        </div>
      </div>

      <!-- perks -->
      <div class="w-full">
        <TabGroup
          :selected-index="selectedTab"
          @change="changeTab"
        >
          <TabList class="flex space-x-8 900/20 border-b overflow-x-auto overflow-y-hidden scrollbar-thumb-white scrollbar-track-white">
            <Tab
              v-for="(link, name) in tabs"
              :key="name"
              as="template"
            >
              <div
                :class="[query.tab === name
                  ? 'pb-[2px] bg-gradient-to-r from-orange to-red'
                  : 'bg-transparent']"
              >
                <router-link
                  :to="{ name: link, query: { tab: name} }"
                  :class="[
                    'text-base',
                    'focus:outline-none focus:ring-0 focus:border-0 relative pb-3 -mb-[0px] bg-white border-0 block',
                  ]"
                >
                  <span
                    :class="['text-xs md:text-base whitespace-nowrap', query.tab === name
                      ? ' text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium'
                      : 'text-[#878787]']"
                  >
                    {{ name }}
                  </span>
                </router-link>
              </div>
            </Tab>
          </TabList>
          <TabPanels class="mt-8">
            <router-view />
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </layout>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels } from "@headlessui/vue";
import Layout from "@/layouts/DashboardLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router"

const query = useRoute().query

const selectedTab = ref(0)

function changeTab(index) {
  selectedTab.value = index
}

const tabs = ref({
  "Profile" : "settings.profile",
  "Security": "settings.security",
  "Funding Account": "settings.funding.account",
  "Preferences": "settings.preference",
});

</script>

<!-- <style lang="css">
.router-link-active {
  @apply text-[#FF9E0B] border-b-2 border-[#FF9E0B]
}
</style> -->