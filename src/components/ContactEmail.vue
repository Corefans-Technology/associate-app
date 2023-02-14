<template>
    <div class="flex item-center space-x-4">
        <p class="font-semibold">
            {{ title }}
        </p>
        <p class="text-[#667085] underline">
            {{ email }}
        </p>
    </div>
</template>

<script setup>
    defineProps({
        title: String,
        email: String,
    })
</script>

<style lang="scss" scoped>

</style>