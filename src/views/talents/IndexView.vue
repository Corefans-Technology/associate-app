<template>
  <dashboard-layout>
    <div class="md:p-[2.5rem] p-6 py-6 space-y-6 h-full">
      <div class="flex items-center md:space-x-4">
        <!-- <h2 class="text-2xl font-medium text-1E1D24 flex-none pr-[2rem]">
          
        </h2> -->
        <h3 class="text-lg font-power font-bold lg:hidden flex-none">
          Talents
        </h3>

        <div class="flex-grow hidden md:block">
          <label class="relative block max-w-[12.5rem] w-full">
            <span class="sr-only">Search</span>
            <span
              class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
            >
              <Icon name="search" />
            </span>
            <input
              class="placeholder:text-#A3A2A5 placeholder:text-xs placeholder:text-left bg-white w-full border border-beerus h-9 px-4 pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm placeholder:font-normal aria-[invalid=true]:border-error rounded-lg"
              placeholder="Find Talents"
              type="text"
              name="search"
            />
          </label>
        </div>

        <div class="flex-grow flex items-center justify-end">
          <div class="p-px bg-gradient-to-br from-orange to-red md:bg-transparent rounded-lg">
            <BaseButton
              type="button"
              class="bg-white md:bg-gradient-to-br from-orange to-red text-white text-sm rounded-lg h-[37px] px-2"
              @click="$router.push({ name: 'talents.send.invite' })"
            >
              <div class="flex items-center space-x-1 md:space-x-2">
                <svg
                  width="16"
                  class="md:hidden"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
                    fill="url(#paint0_linear_3474_42901)"
                  />
                  <path
                    d="M8 12.5C7.72667 12.5 7.5 12.2733 7.5 12V4C7.5 3.72667 7.72667 3.5 8 3.5C8.27333 3.5 8.5 3.72667 8.5 4V12C8.5 12.2733 8.27333 12.5 8 12.5Z"
                    fill="url(#paint1_linear_3474_42901)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3474_42901"
                      x1="3.5"
                      y1="7.5"
                      x2="3.71951"
                      y2="9.47561"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F18B1B" />
                      <stop
                        offset="1"
                        stop-color="#E52053"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3474_42901"
                      x1="7.5"
                      y1="3.5"
                      x2="9.47561"
                      y2="3.71951"
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

                <PlusIcon class="h-5 hidden md:block" />
                <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red md:text-white">Invite Talent</span>
              </div>
            </BaseButton>
          </div>
        </div>

        <Popover class="relative flex-none hidden md:block">
          <div class="bg-gradient-to-tr from-orange to-red p-px rounded-lg h-[37px]">
            <div class="bg-white rounded-lg h-full">
              <PopoverButton
                class="focus:outline-none relative text-[0.8125rem] px-4 rounded-lg flex items-center justify-center space-x-2 border border-[#F2F4F7] text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium h-full"
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.29327 15.5999C6.97327 15.5999 6.65993 15.5199 6.3666 15.3599C5.77993 15.0332 5.4266 14.4399 5.4266 13.7732V10.2399C5.4266 9.90657 5.2066 9.40657 4.99993 9.15324L2.5066 6.51324C2.0866 6.09324 1.7666 5.37324 1.7666 4.83324V3.2999C1.7666 2.23324 2.57327 1.3999 3.59993 1.3999H12.3999C13.4133 1.3999 14.2333 2.2199 14.2333 3.23324V4.6999C14.2333 5.3999 13.8133 6.19324 13.4199 6.58657L10.5333 9.1399C10.2533 9.37324 10.0333 9.88657 10.0333 10.2999V13.1666C10.0333 13.7599 9.65993 14.4466 9.19327 14.7266L8.27327 15.3199C7.97327 15.5066 7.63327 15.5999 7.29327 15.5999ZM3.59993 2.3999C3.13327 2.3999 2.7666 2.79324 2.7666 3.2999V4.83324C2.7666 5.0799 2.9666 5.5599 3.21993 5.81324L5.75994 8.48657C6.09994 8.90657 6.43327 9.60657 6.43327 10.2332V13.7666C6.43327 14.1999 6.73327 14.4132 6.85993 14.4799C7.13994 14.6332 7.47993 14.6332 7.73993 14.4732L8.6666 13.8799C8.85327 13.7666 9.03994 13.4066 9.03994 13.1666V10.2999C9.03994 9.58657 9.3866 8.7999 9.8866 8.3799L12.7399 5.85324C12.9666 5.62657 13.2399 5.08657 13.2399 4.69324V3.23324C13.2399 2.77324 12.8666 2.3999 12.4066 2.3999H3.59993Z"
                    fill="url(#paint0_linear_3424_652)"
                  />
                  <path
                    d="M3.99995 7.66652C3.90661 7.66652 3.81995 7.63985 3.73328 7.59318C3.49995 7.44652 3.42661 7.13318 3.57328 6.89985L6.85995 1.63318C7.00661 1.39985 7.31328 1.32652 7.54661 1.47318C7.77995 1.61985 7.85328 1.92652 7.70661 2.15985L4.41995 7.42652C4.32661 7.57985 4.16661 7.66652 3.99995 7.66652Z"
                    fill="url(#paint1_linear_3424_652)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3424_652"
                      x1="1.7666"
                      y1="1.3999"
                      x2="15.8471"
                      y2="13.7617"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F18B1B" />
                      <stop
                        offset="1"
                        stop-color="#E52053"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3424_652"
                      x1="3.49756"
                      y1="1.39746"
                      x2="9.33853"
                      y2="5.38965"
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
                <span>Filter</span>
              </PopoverButton>
            </div>
          </div>
          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>

        <Popover class="relative flex-nones hidden md:block">
          <div class="bg-gradient-to-tr from-orange to-red p-px rounded-lg h-[37px]">
            <div class="bg-white rounded-lg h-full">
              <PopoverButton
                class="focus:outline-none relative text-[0.8125rem] px-4 rounded-lg flex items-center justify-center space-x-2 border border-[#F2F4F7] text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium h-full"
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.62675 5.33342C9.50009 5.33342 9.37342 5.28675 9.27342 5.18675L7.92009 3.83342L6.56675 5.18675C6.37342 5.38008 6.05342 5.38008 5.86009 5.18675C5.66675 4.99342 5.66675 4.67342 5.86009 4.48008L7.56675 2.77342C7.76009 2.58008 8.08009 2.58008 8.27342 2.77342L9.98009 4.48008C10.1734 4.67342 10.1734 4.99342 9.98009 5.18675C9.88009 5.28675 9.75342 5.33342 9.62675 5.33342Z"
                    fill="url(#paint0_linear_3424_661)"
                  />
                  <path
                    d="M7.91992 10.4533C7.64659 10.4533 7.41992 10.2267 7.41992 9.95334V3.17334C7.41992 2.90001 7.64659 2.67334 7.91992 2.67334C8.19326 2.67334 8.41992 2.90001 8.41992 3.17334V9.95334C8.41992 10.2333 8.19326 10.4533 7.91992 10.4533Z"
                    fill="url(#paint1_linear_3424_661)"
                  />
                  <path
                    d="M8.00008 14.3333C4.56675 14.3333 2.16675 11.9333 2.16675 8.5C2.16675 8.22667 2.39341 8 2.66675 8C2.94008 8 3.16675 8.22667 3.16675 8.5C3.16675 11.3467 5.15341 13.3333 8.00008 13.3333C10.8467 13.3333 12.8334 11.3467 12.8334 8.5C12.8334 8.22667 13.0601 8 13.3334 8C13.6067 8 13.8334 8.22667 13.8334 8.5C13.8334 11.9333 11.4334 14.3333 8.00008 14.3333Z"
                    fill="url(#paint2_linear_3424_661)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3424_661"
                      x1="5.71509"
                      y1="2.62842"
                      x2="8.12629"
                      y2="6.55944"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F18B1B" />
                      <stop
                        offset="1"
                        stop-color="#E52053"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3424_661"
                      x1="7.41992"
                      y1="2.67334"
                      x2="9.38742"
                      y2="2.92623"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F18B1B" />
                      <stop
                        offset="1"
                        stop-color="#E52053"
                      />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_3424_661"
                      x1="2.16675"
                      y1="8"
                      x2="7.4778"
                      y2="17.7835"
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
                <span>Export</span>
              </PopoverButton>
            </div>
          </div>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </div>

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
                :class="[$route.query.tab === name
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
                    :class="['text-xs md:text-base whitespace-nowrap', $route.query.tab === name
                      ? ' text-transparent bg-clip-text bg-gradient-to-b from-orange to-red font-medium'
                      : 'text-[#878787]']"
                  >
                    {{ name }}
                  </span>
                </router-link>
              </div>
            </Tab>
          </TabList>
          <TabPanels class="">
            <router-view />
          </TabPanels>
        </TabGroup>
      </div>

      <!-- <div>
        <div class="flex space-x-5 900/20 border-b py-5">
          <div>
            <router-link
              :to="{ name: 'talents.invited' }"
              class="focus:outline-none focus:ring-0 relative py-5 mr-5 text-98A2B3"
            >
              {{ 'Invited' }}
            </router-link>
          </div>
          <div>
            <router-link
              :to="{ name: 'talents.invitee' }"
              class="focus:outline-none focus:ring-0 relative py-5 mr-5 text-98A2B3"
            >
              {{ 'Inviting' }}
            </router-link>
          </div>
        </div>
      </div>
      <router-view /> -->
    </div>
  </dashboard-layout>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels } from "@headlessui/vue";
import Icon from "@/components/Icon.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
// import { useTalentStore } from "@/stores/talent";
// import TalentItems from "@/components/TalentItems.vue";
// import LoaderComponent from "@/components/LoaderComponent.vue";


import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";

import {useGenericStore} from "@/stores/generic";
import BaseButton from "@/components/base/BaseButton.vue";
// import { useRoute } from "vue-router"
const genericStore = useGenericStore();
genericStore.getCountries();
const tabs = ref({
  "All" : "talents.invited",
  "Active and Pending": "talents.invitee",
  "Artist Discovery": "talents.artist",
});
// const query = useRoute().query
// const errors = ref([]);
// const success = ref(false);
// const loading = ref(false);


</script>

<!-- <style scoped>
.router-link-active {
  color: #272643;
  border-bottom: #272643 2px solid;
}

.router-link-exact-active {
  color: #272643;
  border-bottom: #272643 2px solid;
}

</style> -->
