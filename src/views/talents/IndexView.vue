<template>
  <dashboard-layout>
    <div class="p-[2.5rem] space-y-6 h-full">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-1E1D24 flex-none pr-[2rem]">
          Talents
        </h2>

        <div class="flex-grow">
          <label class="relative block max-w-[20.5rem] w-full">
            <span class="sr-only">Search</span>
            <span
              class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
            >
              <Icon name="search" />
            </span>
            <input
              class="placeholder:text-gray-2 placeholder:text-sm placeholder:text-left bg-white w-full border border-beerus h-12 px-4 rounded pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm placeholder:font-normal aria-[invalid=true]:border-error"
              placeholder="Find Talents"
              type="text"
              name="search"
            />
          </label>
        </div>

        <div class="flex-grow flex items-center justify-end">
          <BaseButton
            type="button"
            class="bg-1E1D24 text-white text-sm rounded h-10"
            @click="$router.push({ name: 'talents.send.invite' })"
          >
            <PlusIcon class="h-5" />
            <span>Invite Talent</span>
          </BaseButton>
        </div>

        <Popover class="relative flex-none">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="filter" />
            <span>Filter</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>

        <Popover class="relative flex-nones">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="export" />
            <span>Export</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </div>
      <div>
        <div class="flex space-x-5 900/20 border-b py-5">
          <div>
            <router-link :to="{ name: 'talents.invited' }"
                class="focus:outline-none focus:ring-0 relative py-5 mr-5 text-98A2B3"
            >
              {{ 'Invited' }}
            </router-link>
          </div>
          <div>
            <router-link :to="{ name: 'talents.invitee' }"
                class="focus:outline-none focus:ring-0 relative py-5 mr-5 text-98A2B3"
            >
              {{ 'Inviting' }}
            </router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>

  </dashboard-layout>
</template>

<script setup>
import { ref } from "vue";
import Icon from "@/components/Icon.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useTalentStore } from "@/stores/talent";
import TalentItems from "@/components/TalentItems.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";


import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";

import {useGenericStore} from "@/stores/generic";
import BaseButton from "@/components/base/BaseButton.vue";

const genericStore = useGenericStore();
genericStore.getCountries();

const errors = ref([]);
const success = ref(false);
const loading = ref(false);


</script>

<style scoped>
.router-link-active {
  color: #272643;
  border-bottom: #272643 2px solid;
}

.router-link-exact-active {
  color: #272643;
  border-bottom: #272643 2px solid;
}

</style>
