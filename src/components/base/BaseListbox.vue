<script setup>
import { computed, ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  options: Array,
  modelValue: [String, Number, Array],
  placeholder: {
    type: String,
    default: "Select Option",
  },
  multiple: Boolean,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const label = computed(() => {
  return props.options
      .filter((option) => {
        if (Array.isArray(props.modelValue)) {
          return props.modelValue.includes(option.value);
        }
        return option.value === props.modelValue;
      })
      .map((option) => option.label)
      .join(", ");
});
</script>

<template>
  <Listbox
      @update:modelValue="(value) => emit('update:modelValue', value)"
      :model-value="props.modelValue"
      :multiple="props.multiple"
  >
    <div class="relative mt-1">
      <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm

placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24] capitalize"
      >
        <span class="block truncate" v-if="label">{{ label }}</span>
        <span class="text-gray-500" v-else>{{ props.placeholder }}</span>
        <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <ListboxOptions
            class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
              v-slot="{ active, selected }"
              v-for="(option, index) in props.options"
              :key="index"
              :value="option.value"
              as="template"
          >
            <li
                :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                  :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >{{ option.label }}</span
              >
              <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
      <div class="text-xs text-red mt-1" v-if="props.error">
        {{ props.error }}
      </div>
    </div>
  </Listbox>
</template>