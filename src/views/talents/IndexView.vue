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

      <Suspense>
        <template #default>
          <TalentItems />
        </template>
        <template #fallback>
          <div class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3">
            <LoaderComponent />
          </div>
        </template>
      </Suspense>
    </div>
    <router-view></router-view>
  </dashboard-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import Icon from "@/components/Icon.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useTalentStore } from "@/stores/talent";
import TalentItems from "@/components/TalentItems.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
const talentStore = useTalentStore();
talentStore.fetchAll();





import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import InputError from "@/components/InputError.vue";
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  XMarkIcon,
  ChevronUpDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/vue/24/outline";
import {useGenericStore} from "@/stores/generic";
// import Icon from "@/components/Icon.vue";
import BaseButton from "@/components/base/BaseButton.vue";
// import { PlusIcon } from "@heroicons/vue/24/outline";
// import TalentCard from "@/components/TalentCard.vue";
// import Modal from "@/components/ModalComponent.vue";
// import DashboardLayout from "@/layouts/DashboardLayout.vue";



const genericStore = useGenericStore();
genericStore.getCountries();

const errors = ref([]);
const isOpen = ref(false);
const success = ref(false);
const loading = ref(false);
const tabs = ref(["All", "Active", "Pending"]);


const form = ref({
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
});

const invite = () => {
  loading.value = true;
  talent.sendInvite(form.value)
    .then((response) => {
      talent.data.data.unshift(response.data);
      isOpen.value = false;
      success.value = true;

    }).catch((error) => {
      errors.value = Object.values(error.data.errors).flat();
    }).finally(() => loading.value = false)
}
const allTalent = computed(() => {
  return talent.data.data;
});

const invitedTalent = computed(() => {
  return talent.data.data.filter((talent) => talent.accept_invite);
});

const invitingTalent = computed(() => {
  return talent.data.data.filter((talent) => !talent.accept_invite);
});

const selectedCountry = ref(genericStore.countries[0]);



</script>
