<template>
  <svg
    width="1140"
    class="w-full"
    height="200"
    viewBox="0 0 1140 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M108.354 62.0435L1 79H571H1139L1067.39 54.6957L1011.15 75.0435L899.708 59.2174L835.296 54.6957L782.13 36.0435L722.83 59.2174L629.789 33.2174L556.175 66L483.583 54.6957H384.408L329.197 27L249.448 44.5217L190.148 33.2174L108.354 62.0435Z"
      fill="url(#chart-shine)"
      stroke="#ECEEEF"
      stroke-width="2"
    />
    <rect
      x="9"
      y="8"
      width="118"
      height="11"
      rx="2"
      fill="#ECEEEF"
    />
    <defs>
      <linearGradient
        id="chart-shine"
        x1="0"
        y1="100%"
        x2="100%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#ECEEEF" />
        <stop
          offset="12%"
          stop-color="#ECEEEF"
          stop-opacity="0.1"
        />
        <stop
          offset="30%"
          stop-color="#ECEEEF"
        />
        <stop
          offset="100%"
          stop-color="#ECEEEF"
        />
        <animate
          id="gradient"
          attributeName="x1"
          dur="1s"
          from="0"
          to="100%"
          repeatCount="indefinite"
          begin="0s"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup></script>

<style>
.bg {
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
