<template>
  <nav
    class="h-20 bg-white w-full flex-none flex items-center sticky top-0 z-[60] border-EAECF0 border-b"
  >
    <!-- navigations -->
    <ul
      class="w-full px-6 md:px-10 xl:px-[4rem] mx-auto flex items-center space-x-8 text-gray-1 font-medium text-base"
    >
      <!-- logo -->
      <li class="flex-none">
        <app-link to="/">
          <img
            class="w-24 max-w-sm"
            src="@/assets/images/logo.png"
            alt=""
          />
        </app-link>
      </li>
      <!-- About Us -->
      <li
        v-show="!isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <app-link to="https://demo.corefans.co/about">
          About Us
        </app-link>
      </li>
      <!-- Explore -->
      <li
        v-show="!isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <app-link to="https://demo.corefans.co/explore">
          Explore
        </app-link>
      </li>
      <li
        v-show="!isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <app-link to="https://demo.corefans.co/explore">
          Contact
        </app-link>
      </li>
      <!-- Start a campaign button -->
      <li
        v-show="!isAuthenticated"
        class="flex-grow hidden lg:flex items-center justify-end"
      >
        <app-link
          :to="{ name: 'campaigns.create' }"
          class="bg-gradient-to-r from-orange to-red text-white font-medium text-base h-12 px-4 rounded-lg flex items-center justify-center"
        >
          Start a campaign
        </app-link>
      </li>
      <!-- Log in -->
      <li
        v-show="!isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <app-link :to="{ name: 'login' }">
          Log in
        </app-link>
      </li>
      <!-- Sign up -->
      <li
        v-show="!isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <app-link :to="{ name: 'sign.up' }">
          Sign up
        </app-link>
      </li>

      <li
        v-if="isAuthenticated"
        class="flex-grow flex items-center justify-end"
      >
        <Popover class="relative">
          <PopoverButton class="focus:outline-none relative">
            <Icon name="notification" />
            <div
              class="absolute right-0 top-0 rounded-full w-[0.5rem] h-[0.5rem] bg-[#00A438]"
            />
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </li>

      <li
        v-if="isAuthenticated"
        class="flex-none hidden lg:block"
      >
        <Menu
          as="div"
          class="relative inline-block text-left"
        >
          <div>
            <MenuButton
              class="flex items-center space-x-3 focus:outline-none"
            >
              <img
                class="w-[2rem] h-[2rem] rounded-full object-cover"
                :src="managerStore.data.photo_path"
                alt=""
                srcset=""
              />
              <div class="text-right">
                <h3 class="text-sm font-medium text-1E1D24 leading-snug">
                  {{ managerStore.data.first_name }}
                </h3>
                <p class="text-xs font-normal text-gray-1">
                  {{ managerStore.data.type }}
                </p>
              </div>
              <ChevronDownIcon
                :class="open ? '' : 'text-opacity-70'"
                class="ml-2 h-5 w-5 text-1E1D24 transition duration-150 ease-in-out group-hover:text-opacity-80"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-4">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-1E1D24 bg-opacity-10 text-1E1D24' : 'text-1E1D24',
                      'group flex w-full items-center px-4 py-2 text-sm space-x-2',
                    ]"
                    @click="$router.push({ name: 'settings.profile' })"
                  >
                    <Icon
                      name="person"
                      class=""
                    />
                    <span>Profile</span>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link
                    :class="[
                      active ? 'bg-1E1D24 bg-opacity-10 text-1E1D24' : 'text-1E1D24',
                      'group flex w-full items-center px-4 py-2 text-sm space-x-2',
                    ]"
                    to="{ name: 'settings.preference' }"
                  >
                    <AdjustmentsVerticalIcon class="h-4" />
                    <span class="text-sm">Preferences</span>
                  </router-link>
                </MenuItem>
              </div>
              <!--              <div class="px-1 py-1">-->
              <!--                <MenuItem v-slot="{ active }">-->
              <!--                  <button-->
              <!--                      @click="$router.push({ name: 'settings.preference' })"-->
              <!--                      :class="[-->
              <!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
              <!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
              <!--                ]"-->
              <!--                  >-->
              <!--                    <ChevronDownIcon-->
              <!--                        :active="active"-->
              <!--                        class="mr-2 h-5 w-5 text-violet-400"-->
              <!--                        aria-hidden="true"-->
              <!--                    />-->
              <!--                    Archive-->
              <!--                  </button>-->
              <!--                </MenuItem>-->
              <!--                <MenuItem v-slot="{ active }">-->
              <!--                  <button-->
              <!--                      :class="[-->
              <!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
              <!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
              <!--                ]"-->
              <!--                  >-->
              <!--                    <ChevronDownIcon-->
              <!--                        :active="active"-->
              <!--                        class="mr-2 h-5 w-5 text-violet-400"-->
              <!--                        aria-hidden="true"-->
              <!--                    />-->
              <!--                    Move-->
              <!--                  </button>-->
              <!--                </MenuItem>-->
              <!--              </div>-->

              <div>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-1E1D24 bg-opacity-10 text-1E1D24' : 'text-1E1D24',
                      'group flex w-full items-center px-4 py-2 text-sm space-x-2',
                    ]"
                    @click="logout"
                  >
                    <ArrowRightOnRectangleIcon class="h-4" />
                    <span class="text-sm">Log Out</span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <!--        <Popover class="relative">-->
        <!--          <PopoverButton class="flex items-center space-x-3 focus:outline-none">-->
        <!--            <img-->
        <!--              class="w-[2rem] h-[2rem] rounded-full object-cover"-->
        <!--              :src="managerStore.data.photo_path"-->
        <!--              alt=""-->
        <!--              srcset=""-->
        <!--            />-->
        <!--            <div class="text-right">-->
        <!--              <h3 class="text-sm font-medium text-1E1D24 leading-snug">-->
        <!--                {{ managerStore.data.first_name }}-->
        <!--              </h3>-->
        <!--              <p class="text-xs font-normal text-gray-1">-->
        <!--                {{ managerStore.data.type }}-->
        <!--              </p>-->
        <!--            </div>-->
        <!--            <ChevronDownIcon-->
        <!--                :class="open ? '' : 'text-opacity-70'"-->
        <!--                class="ml-2 h-5 w-5 text-1E1D24 transition duration-150 ease-in-out group-hover:text-opacity-80"-->
        <!--                aria-hidden="true"-->
        <!--            />-->
        <!--          </PopoverButton>-->

        <!--          <PopoverPanel-->
        <!--            class="absolute right-0 z-50 bg-white rounded w-[10rem] shadow-[0px_2px_20px_rgba(0,0,0,0.13)]"-->
        <!--          >-->
        <!--            <ul class="py-[0.625rem]">-->
        <!--              <li>-->
        <!--                <RouterLink-->
        <!--                  class="hover:text-orange text-#1E1D24 flex items-center space-x-2 py-2 px-4 hover:bg-#FFF9F3"-->
        <!--                  :to="{ name: 'settings.profile' }"-->
        <!--                >-->
        <!--                  <Icon name="person" class="" />-->
        <!--                  <span class="text-sm">Profile</span>-->
        <!--                </RouterLink>-->
        <!--              </li>-->

        <!--              <li>-->
        <!--                <RouterLink-->
        <!--                  class="hover:text-orange text-#1E1D24 flex items-center space-x-2 py-2 px-4 hover:bg-#FFF9F3"-->
        <!--                  :to="{ name: 'settings.preference' }"-->
        <!--                >-->
        <!--                  <AdjustmentsVerticalIcon class="h-4" />-->
        <!--                  <span class="text-sm">Preferences</span>-->
        <!--                </RouterLink>-->
        <!--              </li>-->

        <!--              <li>-->
        <!--                <button-->
        <!--                  @click="logout"-->
        <!--                  class="hover:text-orange text-#1E1D24 flex items-center space-x-2 py-2 px-4 hover:bg-#FFF9F3"-->
        <!--                  to="/"-->
        <!--                >-->
        <!--                  <ArrowRightOnRectangleIcon class="h-4" />-->
        <!--                  <span class="text-sm">Log Out</span>-->
        <!--                </button>-->
        <!--              </li>-->
        <!--            </ul>-->
        <!--          </PopoverPanel>-->
        <!--        </Popover>-->
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import Icon from "@/components/Icon.vue";
import AppLink from "@/components/AppLink.vue";
import { useManagerStore } from "@/stores/manager";

const managerStore = useManagerStore();

function logout() {
  managerStore.logout();
}
defineProps({
  layout: {
    type: String,
    default: "home",
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
