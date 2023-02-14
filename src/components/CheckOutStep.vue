<template>
    <div class="flex items-center space-x-2">
        <!-- step 1 -->
        <div 
            class="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center text-white"
            :class="[step === 1 ? 'bg-[#F18B1B]' : step > 0 ? 'bg-[#00A438]' : 'bg-[#98A2B3]']">
            1
        </div>
        <!-- text -->
        <p :class="[step === 1 ? 'text-[#F18B1B]' : step > 0 ? 'text-[#00A438]' : 'text-[#98A2B3]']" class="text-[0.8125rem]">Basics</p>
        <!-- line -->
        <div :class="[step === 1 ? 'border-[#F18B1B] border-b-2' : step > 0 ? 'border-[#00A438] border-b-2' : 'border-[#B9B9C3] border-b-2 border-dashed']" class="w-[1.5rem]"></div>

        <!-- step 2 -->
        <div 
            class="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center text-white"
            :class="[step > 2 ? 'bg-[#00A438]' : step > 1 ? 'bg-[#F18B1B]' : 'bg-[#98A2B3]']">
            2
        </div>
        <!-- text -->
        <p :class="[step > 2 ? 'text-[#00A438]' : step > 1 ? 'text-[#F18B1B]' : 'text-[#98A2B3]']" class="text-[0.8125rem]">Content</p>
        <!-- line -->
        <div :class="[step > 2 ? 'border-[#00A438] border-b-2' : step > 1 ? 'border-[#F18B1B] border-b-2' : 'border-[#B9B9C3] border-b-2 border-dashed']" class=" w-[1.5rem]"></div>

        <!-- step 3 -->
        <div 
            class="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center text-white"
            :class="[step > 3 ? 'bg-[#00A438]' : step > 2 ? 'bg-[#F18B1B]' : 'bg-[#98A2B3]']">
            3
        </div>
        <!-- text -->
        <p :class="[step > 3 ? 'text-[#00A438]' : step > 2 ? 'text-[#F18B1B]' : 'text-[#98A2B3]']" class="text-[0.8125rem]">Perks</p>
        <!-- line -->
        <div :class="[step > 3 ? 'border-b-2 border-[#00A438]' : step > 2 ? 'border-[#F18B1B] border-b-2' : 'border-[#B9B9C3] border-b-2 border-dashed']" class=" w-[1.5rem]"></div>

        <!-- step 4 -->
        <div 
            class="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center text-white"
            :class="[step > 4 ? 'bg-[#00A438]' : step > 3 ? 'bg-[#F18B1B]' : 'bg-[#98A2B3]']">
            4
        </div>
        <!-- text -->
        <p :class="[step > 4 ? 'text-[#00A438]' : step > 3 ? 'text-[#F18B1B]' : 'text-[#98A2B3]']" class="text-[0.8125rem]">Funding</p>
        <!-- line -->
        <div :class="[step > 4 ? 'border-b-2 border-[#00A438]' : step > 3 ? 'border-[#F18B1B] border-b-2' : 'border-[#B9B9C3] border-b-2 border-dashed']" class=" w-[1.5rem]"></div>

        <div 
            class="w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center text-white"
            :class="[step > 5 ? 'bg-[#00A438]' :  step > 4 ? 'bg-[#F18B1B]' : 'bg-[#98A2B3]']">
            5
        </div>
        <!-- text -->
        <p :class="step > 5 ? 'text-[#00A438]' : [step > 4 ? 'text-[#F18B1B]' : 'text-[#98A2B3]']" class="text-[0.8125rem]">Review</p>


    </div>
</template>

<script setup>
    const props = defineProps(['step',])
</script>

<style lang="scss" scoped>

</style>