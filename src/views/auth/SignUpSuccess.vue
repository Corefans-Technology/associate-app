<template>
  <auth-layout>
    <div class="flex items-center justify-center w-full mx-auto relative">
      <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-[3rem]">
        <div class="w-[19.77625rem] h-[18.830625rem] mx-auto">
          <img
            class="w-[316.42px] h-[301.29px] object-cover"
            src="@/assets/images/success.png"
            alt=""
          />
        </div>

        <div>
          <h1 class="text-[1.75rem] font-semibold text-[#000000] text-center">
            You’re in🚀
          </h1>
          <p class="text-[#434345] text-lg font-light text-center">
            Let’s start raising funds for your next project.
          </p>
        </div>

        <div class="pt-8 pb-6">
          <BaseButton
            type="button"
            class="bg-gradient-to-r from-orange to-red text-white rounded w-full"
            @click="$router.push({ name: 'overview' })"
          >
            Continue
          </BaseButton>
        </div>
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
    <AuthSideLayout />
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
</script>