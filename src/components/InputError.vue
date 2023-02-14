<template>
    <p v-show="message" class="text-[#E52053] w-full whitespace-nowrap">
        {{
            message
        }}
    </p>
</template>

<script setup>
defineProps({
    message: String,
});
</script>

<style lang="scss" scoped>

</style>