<template>
  <!--  :class="`bg-[url(${img})]`"--> 
  <div class="relative bg-cover bg-bottom bg-[url('@/assets/images/auth_bg_mobile.png')] md:bg-[url('@/assets/images/auth_bg.png')] md:p-20 p-5 flex flex-col min-h-[300px]">
    <div class="flex-grow flex flex-col justify-end text-white space-y-3 relative">
      <h2 class="text-2xl md:text-2xl lg:text-[2.5rem] font-bold w-full leading-tight lg:leading-snug font-power">
        {{ title }}
      </h2>
      <p class="text-xs md:text-xl font-normal whitespace-normal">
        {{ desc }}
      </p>

      <svg
        width="70"
        height="70"
        class="absolute bottom-20 md:bottom-32 w-10 h-10 md:w-20 md:h-20"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 35C22.2466 35 35 22.2466 35 0C35 22.2466 47.7534 35 70 35C47.7534 35 35 47.7534 35 70C35 47.7534 22.2466 35 0 35Z"
          fill="url(#paint0_linear_1436_21709)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 12C7.62742 12 12 7.62742 12 0C12 7.62742 16.3726 12 24 12C16.3726 12 12 16.3726 12 24C12 16.3726 7.62742 12 0 12Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M54 20C59.0849 20 62 17.0849 62 12C62 17.0849 64.9151 20 70 20C64.9151 20 62 22.9151 62 28C62 22.9151 59.0849 20 54 20Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1436_21709"
            x1="0"
            y1="0"
            x2="70"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F18B1B" />
            <stop
              offset="1"
              stop-color="#E52053"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <RouterLink
      to="/"
      class="text-orange flex-none md:hidden"
    >
      <img
        class="w-[6.813rem] bg-cover absolute left-5 top-8"
        src="@/assets/images/logo-nav.png"
        alt="Corefans"
      />
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  img: {
    type: String,
    default: "@/assets/images/auth_bg.png",
  },
  title: {
    type: String,
    default: "Become An Associate",
  },
  desc: {
    type: String,
    default: "Earn Income Supervising Talents On The Corefans Platform",
  },
})
</script>