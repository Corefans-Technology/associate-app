<template>
    <div class="space-y-5">
        <GradientTitle class="text-base font-semibold" :name="name" />
        <Title class="text-4xl" :name="title" />
        <p class="text-[#667085] text-2xl font-normal leading-8">
            {{ text }}
        </p>
    </div>
</template>

<script setup>
    defineProps({
        name: String,
        title: String,
        text: String,
    })
</script>

<style lang="scss" scoped>

</style>