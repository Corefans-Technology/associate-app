<template>
    <div class="border rounded-lg lg:flex lg:space-x-8 lg:p-8 relative">
        <div class="lg:max-w-[22.25rem] space-y-4">
            <img class="w-full h-[22.25rem] object-cover rounded-b-md rounded-t-md lg:rounded-b-md" src="~/assets/images/photo.png" alt="">
            <div class="hidden lg:block">
                <img class="w-8 h-8 object-cover rounded" src="~/assets/images/photo.png" alt="">
            </div>
        </div>
        <div class="py-4 lg:py-0 px-[0.875rem] space-y-6">
            <div class="space-y-2">
                <p class="text-lg font-medium">Physical Album + Digital Download</p>
                <p class="text-[#667085] text-base font-normal">
                    You'll get the early digital download and a signed copy of the album when it's released!
                </p>
            </div>
            <Listbox v-model="quantity">
                <div class="relative mt-1">
                    <ListboxButton
                        class="relative w-full max-w-[5.8125rem] cursor-default bg-white py-4 text-left border flex items-center justify-center space-x-4 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span class="block truncate text-lg">{{ quantity }}</span>
                        <span class="pointer-events-none flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>

                        </span>
                    </ListboxButton>
            
                    <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                        <ListboxOptions
                            class="absolute z-50 w-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption v-slot="{ active, selected }" v-for="quan in 10" :key="quan" :value="quan"
                                as="template">
                                <li :class="[
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]">
                                    <span :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate',
                                    ]">{{ quan }}</span>
                                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <!-- <CheckIcon class="h-5 w-5" aria-hidden="true" /> -->
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>

            <div class="space-y-4 relative  max-w-[21.0625rem] w-full">
                <div class="text-2xl text-black font-medium flex justify-between items-center">
                    <h5>$1000 <span class="text-xs">or more</span></h5>
                    <Status classes="bg-[#F18B1B] text-[#F18B1B]" name="3/ 27 claimed" />
                </div>

                
                <hr>

                <div class="flex items-center justify-between">
                    <growth-card 
                        class="" 
                        title-class="font-semibold text-base" 
                        title="August 2022" 
                        description="Estimated shipping"
                        description-class="text-sm text-[#626E8B]"
                    />
                    <div class="h-8 w-px mx-2 bg-[#EDEDED]"></div>
                    <growth-card 
                        class="" 
                        title-class="font-semibold text-base" 
                        title="345" 
                        description="Corefans"
                        description-class="text-sm text-[#626E8B]" 
                    />
                </div>
            </div>

            <div class="text-sm text-[#626E8B] space-y-3">
                <h3 class="">INCLUDES</h3>
                <ul class="list-disc list-inside space-y-1">
                    <li>xxxxxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxxxxx</li>
                </ul>
            </div>

            <div class="space-y-5 md:space-y-0 md:flex md:space-x-4">
                <BaseButton class="w-full md:w-fit flex-none">
                    Proceed to Checkout
                </BaseButton>
                <button type="button" @click="step--"
                    class="w-full md:w-fit flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B] font-medium">
                    <Icon name="heart-2" />
                    <span>Save for Later</span>
                </button>
            </div>
        </div>

        <div class="hidden lg:block absolute right-8 top-8 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
// import { ChevronUpDownIcon } from '@heroicons/vue/24/solid'
// import { ChevronUpDownIcon } from '@heroicons/vue/outline'
const quantity = ref(1)
</script>

<style lang="scss" scoped>

</style>