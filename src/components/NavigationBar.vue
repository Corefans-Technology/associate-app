
<template>
  <button
    class="flex-none relative mx-auto bg-#121216 w-full p-4 hidden"
    @click="router.push('/')"
  >
    <img
      src="@/assets/images/logo_3.png"
      alt=""
      class="mx-auto h-7"
    />
  </button>
  <!-- rounded-b-2xl -->
  <nav
    class="h-[65px] md:h-[55px] bg-#121216 md:bg-white w-full flex-none flex  sticky top-0 z-[60] border-EAECF0 border-b  md:rounded-b-none px-6 md:px-10"
  >
    <!-- navigations -->
    <ul
      class="w-full mx-auto flex gap-x-8 text-[#626E8B] items-center md:items-start font-medium text-base "
    >
      <li
        v-if="route.meta.name !== 'Withdraw'"
        class="flex-none text-white md:hidden"
        @click="toggle = !toggle"
      >
        <!-- <Bars3Icon
          class="w-7 h-7"
          @click="toggle = !toggle"
        /> -->
        <img
          class="w-[2.3rem] h-[2.3rem] rounded-full object-cover"
          :src="managerStore.data.photo_path"
          alt=""
          srcset=""
        />
        <!-- <div class="text-left space-y-1 hidden md:block">
          <p class="text-xs font-normal text-gray-1 text-1E1D24">
            {{ managerStore.data.type ? managerStore.data.type : 'Associate' }} 
          </p>
          <h3 class="text-sm font-semibold text-#7D7C80 leading-snug">
            {{ managerStore.data.first_name }}
          </h3>
        </div> -->
      </li>
      <li
        v-if="route.meta.name === 'Withdraw'"
        class="flex-none text-white md:hidden"
      >
        <router-link
          class="flex items-center justify-center uppercase space-x-3 text-white py-3"
          :to="{ name: 'wallet' }"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0003 20.67C14.8103 20.67 14.6203 20.6 14.4703 20.45L7.95027 13.93C6.89027 12.87 6.89027 11.13 7.95027 10.07L14.4703 3.55002C14.7603 3.26002 15.2403 3.26002 15.5303 3.55002C15.8203 3.84002 15.8203 4.32002 15.5303 4.61002L9.01027 11.13C8.53027 11.61 8.53027 12.39 9.01027 12.87L15.5303 19.39C15.8203 19.68 15.8203 20.16 15.5303 20.45C15.3803 20.59 15.1903 20.67 15.0003 20.67Z"
              fill="white"
            />
          </svg>
        </router-link>
        

        <!-- <ChevronLeftIcon
          class="w-7 h-7"
          @click="toggle = !toggle"
        /> -->
      </li>
      <div
        v-show="toggle"
        class="bg-#121216 absolute inset-x-0 top-0 h-96 md:hidden z-30"
      >
        <ul class="flex flex-col h-full flex-grow pt-4 relative">
          <li class="flex-none mobile_links">
            <router-link
              class="flex items-center justify-center uppercase space-x-3 text-white py-3 px-4"
              :to="{ name: 'overview' }"
            >
              <span>Get Started</span>
            </router-link>
          </li>
          <!-- <li class="flex-none mobile_links">
            <router-link
              class="flex items-center justify-center uppercase space-x-3 text-white py-3 px-4"
              :to="{ name: 'wallet' }"
            >
              <span>Home</span>
            </router-link>
          </li> -->
          <!-- <li class="flex-none mobile_links">
            <router-link
              class="flex items-center justify-center uppercase space-x-3 text-white py-3 px-4"
              :to="{ name: 'talents.invited', query: { tab: 'All' } }"
            >
              <span>Talents</span>
            </router-link>
          </li> -->
          <li class="mobile_links">
            <router-link
              class="flex items-center justify-center uppercase w-full space-x-3 text-white py-3 px-4"
              :to="{ name: 'settings.profile' }"
            >
              <span>Settings</span>
            </router-link>
          </li>
          <li class="mobile_links flex items-end">
            <button
              class="flex items-center justify-center uppercase w-full space-x-3 text-white py-[0.5rem] px-[1rem]"
              href="/settings"
              @click="logout"
            >
              <span>Logout</span>
            </button>
          </li>

          <XMarkIcon
            class="w-5 h-5 absolute left-4 top-7  z-50 text-white"
            @click="toggle = !toggle"
          />
        </ul>
      </div>
      <!-- logo -->
      <li class="flex-grow">
        <h3 class="text-base md:text-2xl text-white text-center md:text-left md:text-1E1D24 md:font-bold font-medium font-sans md:font-power uppercase md:capitalize">
          {{ route.meta.name }}
        </h3>
      </li>

      <li
        v-if="isAuthenticated"
        class="flex-none flex items-center space-x-4 md:h-full opacity-0 md:opacity-100"
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
                class="w-[2.3rem] h-[2.3rem] rounded-full object-cover"
                :src="managerStore.data.photo_path"
                alt=""
                srcset=""
              />
              <div class="text-left space-y-1 hidden md:block">
                <p class="text-xs font-normal text-gray-1 text-1E1D24">
                  {{ managerStore.data.type ? managerStore.data.type : 'Associate' }} 
                </p>
                <h3 class="text-sm font-semibold text-#7D7C80 leading-snug">
                  {{ managerStore.data.first_name }}
                </h3>
              </div>
              <ChevronDownIcon
                :class="open ? '' : 'text-opacity-70'"
                class="ml-2 h-3 w-3 text-1E1D24 transition duration-150 ease-in-out group-hover:text-opacity-80 hidden md:block"
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
                    :to="{ name: 'settings.preference' }"
                  >
                    <AdjustmentsVerticalIcon class="h-4" />
                    <span class="text-sm">Preferences</span>
                  </router-link>
                </MenuItem>
              </div>
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

        <div class="h-6 my-auto w-px bg-#E9E8E9 hidden md:block" />

        <Popover class="relative hidden md:inline-block">
          <PopoverButton class="focus:outline-none relative ">
            <Icon name="notification" />
            <!-- <div
              class="absolute right-0 top-0 rounded-full w-[0.5rem] h-[0.5rem] bg-[#00A438]"
            /> -->
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white" />
        </Popover>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref} from "vue"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  // Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import Icon from "@/components/Icon.vue";
// import AppLink from "@/components/AppLink.vue";
// import { useCreativeStore } from "@/stores/creative";
import { useRoute } from "vue-router"
import { useManagerStore } from "@/stores/manager";
import { useRouter } from "vue-router"
const router = useRouter()

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
const route = useRoute()
const toggle = ref(false)
</script>

<style scoped>
.mobile_links .router-link-active {
  color: white;
  /* background: rgba(255, 255, 255, 0.20); */
  /* border-radius: 4px; */
  /* @apply bg-gradient-to-br from-orange to-red */
}

.mobile_links .router-link-exact-active {
  color: white;
  /* background: rgba(255, 255, 255, 0.20); */
  /* border-radius: 4px; */
  border: none;
  /* @apply bg-gradient-to-br from-orange to-red */
  
}
</style>
