<template>
  <auth-layout>
    <AuthSideLayout />
    <div class="flex items-center justify-center w-full mx-auto">
      <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-[3rem]">
        <div class="w-[19.77625rem] h-[18.830625rem] mx-auto">
          <img
            class="w-[316.42px] h-[301.29px] object-cover"
            src="@/assets/images/success.png"
            alt=""
          />
        </div>

        <div>
          <h1 class="text-[1.75rem] font-semibold text-center">
            You’re in🚀
          </h1>
          <p class="text-434345 text-lg font-light text-center">
            Let’s start raising funds for your next project.
          </p>
        </div>

        <div class="pt-8 pb-6">
          <BaseButton
            type="button"
            class="bg-1E1D24 text-white rounded w-full"
            @click="$router.push({ name: 'overview' })"
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";
</script>