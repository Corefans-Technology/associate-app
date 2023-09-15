<script setup>
import HowTo from "@/components/HowTo.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { useManagerStore } from "@/stores/manager";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon, PlayIcon } from "@heroicons/vue/20/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";
const managerStore = useManagerStore();
managerStore.profile();
</script>

<template>
  <dashboard-layout>
    <div class="px-5 md:px-[40px] space-y-6 py-8 md:space-y-8">
      <div class="space-y-1">
        <h1 class="text-lg md:text-2xl text-black font-bold font-power ">
          Hi, {{ managerStore.data.first_name }}! Welcome to Corefans 🔥
        </h1>
        <p class="text-[#444349] text-sm md:text-base">
          Here’s an overview of your campaigns and funds
        </p>
      </div>
      <div class="">
        <div
          class="rounded-lg shadow-[0px_4px_16px_rgba(0,0,0,0.03)] border p-3"
        >
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full items-center space-x-5 pb-4 border-b relative"
            >
              <svg
                class="flex-none"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M24.0001 37.3334C31.3639 37.3334 37.3334 31.3639 37.3334 24.0001C37.3334 16.6363 31.3639 10.6667 24.0001 10.6667C16.6363 10.6667 10.6667 16.6363 10.6667 24.0001C10.6667 31.3639 16.6363 37.3334 24.0001 37.3334Z"
                  fill="url(#paint0_linear_1795_14362)"
                />
                <path
                  d="M20.1333 24V22.0267C20.1333 19.48 21.9333 18.4533 24.1333 19.72L25.84 20.7067L27.5466 21.6933C29.7466 22.96 29.7466 25.04 27.5466 26.3067L25.84 27.2933L24.1333 28.28C21.9333 29.5467 20.1333 28.5067 20.1333 25.9733V24Z"
                  fill="url(#paint1_linear_1795_14362)"
                />
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  stroke="#E9E8E9"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1795_14362"
                    x1="10.6667"
                    y1="10.6667"
                    x2="37.3334"
                    y2="37.3334"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1795_14362"
                    x1="20.1333"
                    y1="19.1777"
                    x2="29.757"
                    y2="28.2237"
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
              <!-- <Icon name="know" /> -->
              <div class=" flex-grow">
                <p class="font-semibold text-#2E0B34 text-left whitespace-nowrap">
                  Get to know Corefans
                </p>
                <p class="text-#2E0B34 text-left text-sm  pr-10">
                  Explore all the possibilities on Corefans
                </p>
              </div>
              <div class="absolute space-y-0 right-0 flex items-center">
                <div class="bg-#A3A2A5 rounded-full bg-opacity-50 p-[2px]">
                  <ChevronUpIcon
                    :class="[ open ? 'rotate-0' : 'rotate-90' ]"
                    class="h-5 w-5 text-#2E0B34"
                  />
                </div>
              </div>
            </DisclosureButton>
            <DisclosurePanel class="md:px-4 px-2 pt-3 md:pt-4 pb-2 text-sm text-gray-500 space-y-5">
              <p class="text-base text-#2E0B34">
                Learn more about the role of a Corefans associate and it’s responsibilities by clicking 
                <RouterLink
                  to="/"
                  class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red cursor-pointer"
                >
                  here
                </RouterLink>
              </p>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full items-center space-x-5 py-4 border-b relative"
            >
              <svg
                width="48"
                height="48"
                class="flex-none"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M24 37.3466C31.3638 37.3466 37.3333 31.3771 37.3333 24.0133C37.3333 16.6495 31.3638 10.6799 24 10.6799C16.6362 10.6799 10.6666 16.6495 10.6666 24.0133C10.6666 31.3771 16.6362 37.3466 24 37.3466Z"
                  fill="url(#paint0_linear_2583_51332)"
                />
                <path
                  d="M24 17.2534C21.24 17.2534 19 19.4934 19 22.2534C19 24.9601 21.12 27.1601 23.9333 27.2401C23.9733 27.2401 24.0267 27.2401 24.0533 27.2401C24.08 27.2401 24.12 27.2401 24.1467 27.2401C24.16 27.2401 24.1733 27.2401 24.1733 27.2401C26.8667 27.1468 28.9867 24.9601 29 22.2534C29 19.4934 26.76 17.2534 24 17.2534Z"
                  fill="url(#paint1_linear_2583_51332)"
                />
                <path
                  d="M33.04 33.8134C30.6666 36.0001 27.4933 37.3467 24 37.3467C20.5066 37.3467 17.3333 36.0001 14.96 33.8134C15.28 32.6001 16.1466 31.4934 17.4133 30.6401C21.0533 28.2134 26.9733 28.2134 30.5866 30.6401C31.8666 31.4934 32.72 32.6001 33.04 33.8134Z"
                  fill="url(#paint2_linear_2583_51332)"
                />
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  stroke="#E9E8E9"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2583_51332"
                    x1="10.6666"
                    y1="10.6799"
                    x2="37.3333"
                    y2="37.3466"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_2583_51332"
                    x1="19"
                    y1="17.2534"
                    x2="28.9867"
                    y2="27.2534"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_2583_51332"
                    x1="14.96"
                    y1="28.8201"
                    x2="21.5391"
                    y2="42.7706"
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
              <div class=" flex-grow ">
                <p class="font-semibold text-#2E0B34 text-left whitespace-nowrap">
                  Complete your profile
                </p>
                <p class="text-#2E0B34 text-left text-sm pr-8">
                  Add a profile photo and configure your campaign preferences
                </p>
              </div>
              <div class="absolute space-y-0 right-0 flex items-center">
                <div class="bg-#A3A2A5 rounded-full bg-opacity-50 p-[2px]">
                  <ChevronUpIcon
                    :class="[ open ? 'rotate-0' : 'rotate-90' ]"
                    class="h-5 w-5 text-#2E0B34"
                  />
                </div>
              </div>
            </DisclosureButton>
            <DisclosurePanel class="md:px-4 px-2 pt-3 md:pt-4 pb-2 text-sm text-gray-500 space-y-5">
              <p class="text-base text-#2E0B34">
                Set up your profile and give fans a clearer view of your creative personality. A few things to note are;
              </p>
              <ul class="text-#2E0B34 list-disc list-outside ml-5 text-sm md:text-base">
                <li>
                  Use your stage name as your user name
                </li>
                <li>
                  Upload nice and clear profile photo & header
                </li>
                <li>
                  Write a concise bio (make it short, sweet and personal)
                </li>
              </ul>
              <div class="w-full flex items-center space-x-4 pt-3">
                <BaseButton
                  class="bg-gradient-to-br from-orange to-red text-white text-sm rounded-lg font-medium h-9"
                  @click.prevent="$router.push({ name: 'settings' })"
                >
                  Profile Settings
                </BaseButton>
                <div class="rounded-lg bg-gradient-to-br p-px from-orange to-red">
                  <BaseButton
                    type="button"
                    class="text-light-grey-2 text-sm rounded-lg bg-white h-9"
                  >
                    <span class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">
                      Remind Later
                    </span>
                  </BaseButton>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full items-center space-x-5 pt-4 relative"
            >
              <svg
                width="48"
                height="48"
                class="flex-none"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M17.48 15.9469L29.5067 11.9335C34.9067 10.1335 37.84 13.0802 36.0533 18.4802L32.04 30.5069C29.3467 38.6002 24.92 38.6002 22.2267 30.5069L21.04 26.9335L17.4667 25.7469C9.38666 23.0669 9.38666 18.6535 17.48 15.9469Z"
                  fill="url(#paint0_linear_2583_51402)"
                />
                <path
                  d="M24.16 23.5069L29.24 18.4136L24.16 23.5069Z"
                  fill="url(#paint1_linear_2583_51402)"
                />
                <path
                  d="M24.16 24.5065C23.9067 24.5065 23.6533 24.4132 23.4533 24.2132C23.0667 23.8265 23.0667 23.1865 23.4533 22.7998L28.52 17.7065C28.9067 17.3198 29.5467 17.3198 29.9333 17.7065C30.32 18.0932 30.32 18.7332 29.9333 19.1198L24.8667 24.2132C24.6667 24.3998 24.4133 24.5065 24.16 24.5065Z"
                  fill="url(#paint2_linear_2583_51402)"
                />
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  stroke="#E9E8E9"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2583_51402"
                    x1="11.4083"
                    y1="11.4048"
                    x2="36.5804"
                    y2="36.5734"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_2583_51402"
                    x1="24.16"
                    y1="18.4136"
                    x2="29.2534"
                    y2="23.4936"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_2583_51402"
                    x1="23.1633"
                    y1="17.4165"
                    x2="30.2533"
                    y2="24.4764"
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


              <div class=" flex-grow ">
                <p class="font-semibold text-#2E0B34 text-left whitespace-nowrap">
                  Invite your first talent
                </p>
                <p class="text-#2E0B34 text-left text-sm pr-24">
                  Invite your first creative talent and help them set up to start earning
                </p>
              </div>
              <div class="absolute space-y-0 right-0 flex items-center">
                <div class="bg-#A3A2A5 rounded-full bg-opacity-50 p-[2px]">
                  <ChevronUpIcon
                    :class="[ open ? 'rotate-0' : 'rotate-90' ]"
                    class="h-5 w-5 text-#2E0B34"
                  />
                </div>
                <!-- <p class="text-xs bg-[#F18B1B33] rounded-full py-1 px-2">
                  <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">Coming Soon</span>
                </p> -->
              </div>
            </DisclosureButton>
            <DisclosurePanel class="md:px-4 px-2 pt-3 md:pt-4 pb-2 text-sm text-gray-500 space-y-5">
              <p class="text-base text-#2E0B34">
                Identify promising creative individuals aligned with Corefans' needs. Reach out, express interest in their work, and highlight what you admire about their creativity.
              </p>
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white text-sm rounded-lg font-medium h-9"
                @click.prevent="$router.push({ name: 'talents.send.invite' })"
              >
                Invite Now
              </BaseButton>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
      <div class="space-y-2">
        <h3 class="text-xl font-bold font-power text-#252733">
          Learn More:
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HowTo
            title="Demo"
            text="See the Corefans product in action for creatives around the world."
            icon="info"
            more="Play Demo"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M35.9601 17.5867V25.8267H10.6667V17.5867C10.6667 14.5067 13.1734 12 16.2534 12H30.3734C33.4534 12 35.9601 14.5067 35.9601 17.5867Z"
                fill="url(#paint0_linear_1815_14501)"
              />
              <path
                d="M10.6667 25.8267V26.08C10.6667 29.1733 13.1734 31.6667 16.2534 31.6667H21.0534C21.7867 31.6667 22.3867 32.2667 22.3867 33V34.0933C22.3867 34.8267 21.7867 35.4267 21.0534 35.4267H18.0401C17.5201 35.4267 17.0934 35.8533 17.0934 36.3733C17.0934 36.8933 17.5201 37.32 18.0401 37.32H28.6134C29.1334 37.32 29.5601 36.8933 29.5601 36.3733C29.5601 35.8533 29.1334 35.4267 28.6134 35.4267H25.6134C24.8801 35.4267 24.2801 34.8267 24.2801 34.0933V33C24.2801 32.2667 24.8801 31.6667 25.6134 31.6667H30.3734C33.4667 31.6667 35.9601 29.16 35.9601 26.08V25.8267H10.6667Z"
                fill="url(#paint1_linear_1815_14501)"
              />
              <path
                d="M37.3199 11.1466L35.8133 12.2V11.64C35.8133 10.3733 34.7866 9.35998 33.5333 9.35998H27.8266C26.4533 9.34665 25.3333 10.4666 25.3333 11.84V16.2133C25.3333 17.36 25.9066 18.4933 27.6133 18.4933H33.5199C34.7866 18.4933 35.7999 17.4666 35.7999 16.2133V15.64L37.3066 16.6933C38.0666 17.2133 38.6666 16.8933 38.6666 15.9866V11.8533C38.6666 10.9466 38.0666 10.64 37.3199 11.1466Z"
                fill="url(#paint2_linear_1815_14501)"
              />
              <rect
                x="1"
                y="1"
                width="46"
                height="46"
                rx="23"
                stroke="#E9E8E9"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1815_14501"
                  x1="10.6667"
                  y1="12"
                  x2="22.3055"
                  y2="33.291"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1815_14501"
                  x1="10.6667"
                  y1="25.8267"
                  x2="19.3243"
                  y2="44.8793"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1815_14501"
                  x1="25.3333"
                  y1="9.35986"
                  x2="33.8499"
                  y2="21.7928"
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
          </HowTo>
          <HowTo
            title="Blog"
            text="Learn more about all the things you can do with Corefans, and stay up to date with industry trends"
            icon="pricing"
            more="Read Blog"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M16.9734 34.2667C18.0667 33.0934 19.7334 33.1867 20.6934 34.4667L22.0401 36.2667C23.1201 37.6934 24.8667 37.6934 25.9467 36.2667L27.2934 34.4667C28.2534 33.1867 29.9201 33.0934 31.0134 34.2667C33.3867 36.8001 35.3201 35.9601 35.3201 32.4134V17.3867C35.3334 12.0134 34.0801 10.6667 29.0401 10.6667H18.9601C13.9201 10.6667 12.6667 12.0134 12.6667 17.3867V32.4001C12.6667 35.9601 14.6134 36.7867 16.9734 34.2667Z"
                fill="url(#paint0_linear_1815_14517)"
              />
              <path
                d="M29.3334 18.3333H18.6667C18.1201 18.3333 17.6667 17.8799 17.6667 17.3333C17.6667 16.7866 18.1201 16.3333 18.6667 16.3333H29.3334C29.8801 16.3333 30.3334 16.7866 30.3334 17.3333C30.3334 17.8799 29.8801 18.3333 29.3334 18.3333Z"
                fill="url(#paint1_linear_1815_14517)"
              />
              <path
                d="M28 23.6667H20C19.4533 23.6667 19 23.2134 19 22.6667C19 22.1201 19.4533 21.6667 20 21.6667H28C28.5467 21.6667 29 22.1201 29 22.6667C29 23.2134 28.5467 23.6667 28 23.6667Z"
                fill="url(#paint2_linear_1815_14517)"
              />
              <rect
                x="1"
                y="1"
                width="46"
                height="46"
                rx="23"
                stroke="#E9E8E9"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1815_14517"
                  x1="12.6667"
                  y1="10.6667"
                  x2="38.9854"
                  y2="33.0217"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1815_14517"
                  x1="17.6667"
                  y1="16.3333"
                  x2="18.283"
                  y2="20.236"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1815_14517"
                  x1="19"
                  y1="21.6667"
                  x2="19.7692"
                  y2="25.5129"
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
          </HowTo>
          <HowTo
            title="Support"
            text="Get access to personalised customer support and answers to all your burning questions"
            icon="brand"
            more="Get Help"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M30.6667 32.5733H25.3334L19.4001 36.52C18.5201 37.1067 17.3334 36.48 17.3334 35.4133V32.5733C13.3334 32.5733 10.6667 29.9067 10.6667 25.9067V17.9067C10.6667 13.9067 13.3334 11.24 17.3334 11.24H30.6667C34.6667 11.24 37.3334 13.9067 37.3334 17.9067V25.9067C37.3334 29.9067 34.6667 32.5733 30.6667 32.5733Z"
                fill="url(#paint0_linear_1815_14533)"
              />
              <path
                d="M23.9999 24.1467C23.4533 24.1467 22.9999 23.6934 22.9999 23.1467V22.8668C22.9999 21.3201 24.1332 20.5601 24.5599 20.2668C25.0532 19.9334 25.2132 19.7068 25.2132 19.3601C25.2132 18.6934 24.6666 18.1467 23.9999 18.1467C23.3333 18.1467 22.7866 18.6934 22.7866 19.3601C22.7866 19.9068 22.3333 20.3601 21.7866 20.3601C21.24 20.3601 20.7866 19.9068 20.7866 19.3601C20.7866 17.5868 22.2266 16.1467 23.9999 16.1467C25.7733 16.1467 27.2132 17.5868 27.2132 19.3601C27.2132 20.8801 26.0933 21.6401 25.6799 21.9201C25.1599 22.2668 24.9999 22.4934 24.9999 22.8668V23.1467C24.9999 23.7067 24.5466 24.1467 23.9999 24.1467Z"
                fill="url(#paint1_linear_1815_14533)"
              />
              <path
                d="M24 27.4666C23.44 27.4666 23 27.0132 23 26.4666C23 25.9199 23.4533 25.4666 24 25.4666C24.5467 25.4666 25 25.9199 25 26.4666C25 27.0132 24.56 27.4666 24 27.4666Z"
                fill="url(#paint2_linear_1815_14533)"
              />
              <rect
                x="1"
                y="1"
                width="46"
                height="46"
                rx="23"
                stroke="#E9E8E9"
                stroke-width="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1815_14533"
                  x1="10.6667"
                  y1="11.24"
                  x2="36.1467"
                  y2="37.8802"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1815_14533"
                  x1="20.7866"
                  y1="16.1467"
                  x2="28.5985"
                  y2="22.4222"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F18B1B" />
                  <stop
                    offset="1"
                    stop-color="#E52053"
                  />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1815_14533"
                  x1="23"
                  y1="25.4666"
                  x2="25"
                  y2="27.4666"
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
          </HowTo>
        </div>
      </div>

      <div
        v-if="false"
        class="grid grid-cols-2 gap-6"
      >
        <div class="space-y-4">
          <h3 class="text-2xl font-medium">
            Checklist List
          </h3>
          <div
            class="rounded shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-6 min-h-[19.625rem]"
          >
            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-5 w-5 text-#626E8B flex-none" />
                <span class="text-#1E1D24 flex-grow text-left">Complete your profile</span>
                <ChevronUpIcon class="h-5 w-5 text-#2E0B34 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>
            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-5 w-5 text-#626E8B flex-none" />
                <span class="text-#1E1D24 flex-grow text-left">Set up your first campaign</span>
                <ChevronUpIcon class="h-5 w-5 text-#2E0B34 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>

            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-5 w-5 text-#626E8B flex-none" />
                <span class="text-#1E1D24 flex-grow text-left">Reach your first campaign goal</span>
                <ChevronUpIcon class="h-5 w-5 text-#2E0B34 rotate-90" />
              </DisclosureButton>
              <!-- <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </DisclosurePanel> -->
            </Disclosure>

            <Disclosure>
              <DisclosureButton
                class="flex w-full items-center space-x-2 py-3 border-b"
              >
                <CheckCircleIcon class="h-5 w-5 text-#626E8B flex-none" />
                <span class="text-#1E1D24 flex-grow text-left">Sell your first Exclusive to your core fan</span>
                <ChevronUpIcon class="h-5 w-5 text-#2E0B34 rotate-90" />
              </DisclosureButton>
            </Disclosure>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-2xl font-medium">
            About Corefans
          </h3>
          <div
            class="shadow-[0px_4px_16px_rgba(0,0,0,0.03)] h-[19.625rem] relative"
          >
            <video class="w-full h-full rounded bg-#FFFBF7">
              <source
                src="https://www.youtube.com/watch?v=helEv0kGHd4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div
              class="absolute top-2/4 right-2/4 w-[3.188rem] h-[3.188rem] rounded-full bg-orange text-white flex items-center justify-center"
            >
              <PlayIcon class="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>
