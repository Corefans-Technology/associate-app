<template>
<!--  :class="`bg-[url(${img})]`"-->
  <div class="relative bg-cover bg-[url('@/assets/images/auth_bg.png')] p-20 flex flex-col">
    <RouterLink to="/" class="text-orange flex-none">
      <img
          class="w-[6.813rem] bg-cover"
          src="@/assets/images/logo_2.png"
          alt="Corefans"
      />
    </RouterLink>

    <div class="flex-grow flex flex-col justify-end text-white space-y-3">
      <h2 class="text-lg md:text-2xl lg:text-[2.5rem] font-bold w-full lg:w-2/5 leading-tight lg:leading-snug">
        {{  title }}
      </h2>
      <p class="text-sm md:text-xl font-normal">
        {{  desc  }}
      </p>
    </div>
  </div>
</template>

<script setup>
    const props = defineProps({
      img: {
        type: String,
        default: '@/assets/images/auth_bg.png'
      },
      title: {
        type: String,
        default: 'Turn your ideas into reality'
      },
      desc: {
        type: String,
        default: 'Start for free and get attractive offers from the community'
      }
    })
</script>