<template>
  <dashboard-layout>
    <div class="p-[2.5rem] space-y-6 h-full">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-black flex-none pr-[2rem]">
          Exclusives
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
              class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded py-2 pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:font-normal"
              placeholder="Find exclusives"
              type="text"
              name="search"
            />
          </label>
        </div>

        <div class="flex-grow flex items-center justify-end">
          <router-link :to="{ name: 'exclusives.create' }">
            <div
              class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
            >
              <PlusIcon class="h-5" />
              <span>New Exclusives</span>
            </div>
          </router-link>
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

      <Suspense>
        <template #default>
          <div
            v-if="exclusiveStore?.data?.length"
            class="flex flex-wrap gap-5"
          >
            <ExclusiveCard />
          </div>
          <div
            v-else
            class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3"
          >
            <Icon name="empty" />
            <h4 class="text-xl text-#1D2939 text-center">
              No Exclusives Yet
            </h4>
            <p
              class="max-w-[16.5rem] w-full mx-auto text-center text-sm text-[#98A2B3]"
            >
              Get money for your next creative project with your first Exclusives
            </p>
            <router-link :to="{ name: 'exclusives.create' }">
              <div
                class="text-orange text-[0.8125rem] flex items-center justify-center space-x-2 mx-auto text-sm"
              >
                <PlusIcon class="h-4" />
                <span>Add Exclusives</span>
              </div>
            </router-link>
          </div>
        </template>
        <template #fallback>
          <div class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3">
            <LoaderComponent />
          </div>
        </template>
      </Suspense>

      <!--      <div v-if="exclusiveStore.data.length" class="flex flex-wrap gap-5">-->
      <!--        &lt;!&ndash; <template v-for="(campaign, index) in campaignStore.data" :key="index">-->
      <!--          <CampaignItem :campaign="campaign" />-->
      <!--        </template> &ndash;&gt;-->
      <!--          <ExclusiveCard />-->


      <!--&lt;!&ndash;        <table-lite&ndash;&gt;-->
      <!--&lt;!&ndash;          :is-slot-mode="true"&ndash;&gt;-->
      <!--&lt;!&ndash;          :has-checkbox="true"&ndash;&gt;-->
      <!--&lt;!&ndash;          :columns="table.columns"&ndash;&gt;-->
      <!--&lt;!&ndash;          :rows="table.rows"&ndash;&gt;-->
      <!--&lt;!&ndash;          :total="table.totalRecordCount"&ndash;&gt;-->
      <!--&lt;!&ndash;          :sortable="table.sortable"&ndash;&gt;-->
      <!--&lt;!&ndash;          :messages="table.messages"&ndash;&gt;-->
      <!--&lt;!&ndash;          @is-finished="table.isLoading = false"&ndash;&gt;-->
      <!--&lt;!&ndash;        >&ndash;&gt;-->
      <!--&lt;!&ndash;          <template v-slot:action="data">&ndash;&gt;-->
      <!--&lt;!&ndash;            <div :key="data" class="">&ndash;&gt;-->
      <!--&lt;!&ndash;              <Menu as="div" class="relative inline-block text-left">&ndash;&gt;-->
      <!--&lt;!&ndash;                <div>&ndash;&gt;-->
      <!--&lt;!&ndash;                  <MenuButton>&ndash;&gt;-->
      <!--&lt;!&ndash;                    <EllipsisVerticalIcon class="h-5" />&ndash;&gt;-->
      <!--&lt;!&ndash;                  </MenuButton>&ndash;&gt;-->
      <!--&lt;!&ndash;                </div>&ndash;&gt;-->

      <!--&lt;!&ndash;                <transition&ndash;&gt;-->
      <!--&lt;!&ndash;                    enter-active-class="transition duration-100 ease-out"&ndash;&gt;-->
      <!--&lt;!&ndash;                    enter-from-class="transform scale-95 opacity-0"&ndash;&gt;-->
      <!--&lt;!&ndash;                    enter-to-class="transform scale-100 opacity-100"&ndash;&gt;-->
      <!--&lt;!&ndash;                    leave-active-class="transition duration-75 ease-in"&ndash;&gt;-->
      <!--&lt;!&ndash;                    leave-from-class="transform scale-100 opacity-100"&ndash;&gt;-->
      <!--&lt;!&ndash;                    leave-to-class="transform scale-95 opacity-0"&ndash;&gt;-->
      <!--&lt;!&ndash;                >&ndash;&gt;-->
      <!--&lt;!&ndash;                  <MenuItems&ndash;&gt;-->
      <!--&lt;!&ndash;                      class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"&ndash;&gt;-->
      <!--&lt;!&ndash;                  >&ndash;&gt;-->
      <!--&lt;!&ndash;                    <div>&ndash;&gt;-->
      <!--&lt;!&ndash;                      <MenuItem v-slot="{ active }">&ndash;&gt;-->
      <!--&lt;!&ndash;                        <router-link&ndash;&gt;-->
      <!--&lt;!&ndash;                            :to="{ name: 'exclusives.edit', params: { id: data.value.action } }"&ndash;&gt;-->
      <!--&lt;!&ndash;                            :class="[&ndash;&gt;-->
      <!--&lt;!&ndash;                  active ? 'bg-violet-500 text-white' : 'text-gray-900',&ndash;&gt;-->
      <!--&lt;!&ndash;                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',&ndash;&gt;-->
      <!--&lt;!&ndash;                ]"&ndash;&gt;-->
      <!--&lt;!&ndash;                        >&ndash;&gt;-->
      <!--&lt;!&ndash;                          Edit&ndash;&gt;-->
      <!--&lt;!&ndash;                        </router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;                      </MenuItem>&ndash;&gt;-->
      <!--&lt;!&ndash;                    </div>&ndash;&gt;-->
      <!--&lt;!&ndash;                  </MenuItems>&ndash;&gt;-->
      <!--&lt;!&ndash;                </transition>&ndash;&gt;-->
      <!--&lt;!&ndash;              </Menu>&ndash;&gt;-->
      <!--&lt;!&ndash;            </div>&ndash;&gt;-->
      <!--&lt;!&ndash;          </template>&ndash;&gt;-->

      <!--&lt;!&ndash;          &lt;!&ndash; <template v-slot:price="data">&ndash;&gt;-->
      <!--&lt;!&ndash;            <div :key="data" class="">&ndash;&gt;-->
      <!--&lt;!&ndash;              {{ formatCurrency(data.price) }}&ndash;&gt;-->
      <!--&lt;!&ndash;            </div>&ndash;&gt;-->
      <!--&lt;!&ndash;          </template> &ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;        </table-lite>&ndash;&gt;-->
      <!--      </div>-->

      <!--      <div-->
      <!--        class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3"-->
      <!--        v-else-->
      <!--      >-->
      <!--        <Icon name="empty" />-->
      <!--        <h4 class="text-xl text-#1D2939 text-center">No Exclusives Yet</h4>-->
      <!--        <p-->
      <!--          class="max-w-[16.5rem] w-full mx-auto text-center text-sm text-[#98A2B3]"-->
      <!--        >-->
      <!--          Get money for your next creative project with your first Exclusives-->
      <!--        </p>-->
      <!--        <router-link :to="{ name: 'exclusives.create' }">-->
      <!--          <div-->
      <!--            class="text-orange text-[0.8125rem] flex items-center justify-center space-x-2 mx-auto text-sm"-->
      <!--          >-->
      <!--            <PlusIcon class="h-4" />-->
      <!--            <span>Add Exclusives</span>-->
      <!--          </div>-->
      <!--        </router-link>-->
      <!--      </div>-->
    </div>
  </dashboard-layout>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useExclusiveStore } from "@/stores/exclusives";
import ExclusiveCard from "@/components/ExclusiveCard.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
const exclusiveStore = useExclusiveStore();

exclusiveStore.index();


</script>
