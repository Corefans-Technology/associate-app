<template>
    <div class="space-y-4">
        <slot />
        <div>
            <h3 class="text-lg font-medium">
                {{ name }}
            </h3>
            <p class="text-[#FF9E0B]">
                {{ title }}
            </p>
        </div>
        <div class="flex items-center space-x-2">
            <Icon name="tweeter"/>
            <Icon name="linkedin" />
            <Icon name="unknown" />
        </div>
    </div>
</template>

<script setup>
    defineProps({
        name: String,
        title: String,
    })
</script>

<style lang="scss" scoped>

</style>