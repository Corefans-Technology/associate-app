<template>
    <div class="flex items-center space-x-2">
        <!-- dot -->
        <div 
            class="w-3 h-3 rounded-full"
            :class="[step > 0 ? 'active-dot' : 'border-[#B9B9C3] border']">
        </div>
        <!-- line -->
        <div :class="[step > 1 ? 'active-dot h-[1px]' : 'border-[#B9B9C3] border-b']" class="w-[1.5rem]"></div>

        <div 
            class="w-3 h-3 rounded-full"
            :class="[step > 1 ? 'active-dot' : 'border-[#B9B9C3] border']">
        </div>
        <!-- line -->
        <div :class="[step > 2 ? 'active-dot h-[1px]' : 'border-[#B9B9C3] border-b']" class=" w-[1.5rem]" @click="step = 2"></div>

        <div 
            class="w-3 h-3 rounded-full"
            :class="[step === 3 ? 'active-dot' : 'border-[#B9B9C3] border']">
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['step',])
</script>

<style lang="scss" scoped>

</style>