<template>
  <auth-layout>
    <AuthSideLayout />
    <div class="flex items-center justify-center w-full mx-auto">
      <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-[3rem]">
        <router-view />
      </div>
    </div>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";



</script>