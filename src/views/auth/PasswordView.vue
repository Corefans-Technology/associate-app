
<template>
  <auth-layout>
    <div class="flex items-center justify-center w-full mx-auto md:relative order-2 md:order-1 pt-2 ">
      <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-4">
        <router-view />
      </div>
      <RouterLink
        to="/"
        class="text-orange flex-none"
      >
        <img
          class="w-[6.813rem] bg-cover absolute left-20 top-11"
          src="@/assets/images/logo_3.png"
          alt="Corefans"
        />
      </RouterLink>
    </div>
    <AuthSideLayout class="order-1 md:order-2" />
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
</script>