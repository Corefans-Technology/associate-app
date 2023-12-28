<template>
  <!-- bg-#121216 -->
  <div
    class="flex-none md:pb-4 bg-white border-t border-[#EDEDED] shadow md:shadow-none md:flex md:w-60 w-full md:bg-#2D1713 md:py-4 px-3.5 left-0 h-fit md:h-full rounded-t-none rounded-b-none md:rounded-t-2xl md:rounded-b-2xl  md:flex-col flex-row md:divide-y divide-#3A2622 sticky bottom-0 md:relative z-50"
  >
    <button
      class="flex-none relative pb-4 hidden md:block"
      @click="router.push('/')"
    >
      <img
        src="@/assets/images/logo_3.png"
        alt=""
        class="mx-auto h-7"
      />
    </button>
    <ul class="flex flex-row items-center justify-between md:justify-start md:items-start md:flex-col h-full md:flex-grow md:pt-8 gap-y-2 bg-white md:bg-transparent">
      <!-- <p class="text-xs text-1E1D24 text-opacity-30 pb-2">
        ACTIVITY
      </p> -->
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 md:hover:border md:hover:border-black rounded-lg border border-transparent relative transition ease-out delay-500 duration-700"
          :to="{ name: 'overview' }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="started"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <MobileDashboard class="inactive" />
            <MobileDashboardActive class="active hidden" />
          </p>
          <span class="">Get Started</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 md:hover:border md:hover:border-black rounded-lg border border-transparent relative transition ease-out delay-500 duration-700"
          :to="{ name: 'wallet' }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="dashboard"
          />
          <!-- mobile nav icons -->
          <!-- <p class="md:hidden">
            <MobileHome class="inactive" />
            <MobileHomeActive class="active hidden" />
          </p> -->
          <p class="md:hidden">
            <span class="inactive">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.645 2.83992L4.255 7.03992C3.355 7.73992 2.625 9.22992 2.625 10.3599V17.7699C2.625 20.0899 4.515 21.9899 6.835 21.9899H18.415C20.735 21.9899 22.625 20.0899 22.625 17.7799V10.4999C22.625 9.28992 21.815 7.73992 20.825 7.04992L14.645 2.71992C13.245 1.73992 10.995 1.78992 9.645 2.83992Z"
                  stroke="#7D7C80"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.625 17.99V14.99"
                  stroke="#7D7C80"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- <MobileHome /> -->
            </span>
            <span class="active hidden">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6183 3.19943L14.6186 3.19962L20.3785 7.22955C20.3785 7.22957 20.3786 7.2296 20.3786 7.22962C20.8478 7.55809 21.2921 8.09665 21.6195 8.72383C21.9469 9.35104 22.1352 10.0242 22.1352 10.5999V17.3799C22.1352 19.6538 20.2891 21.4999 18.0152 21.4999H7.23523C4.96278 21.4999 3.11523 19.6452 3.11523 17.3699V10.4699C3.11523 9.9355 3.28562 9.29642 3.58381 8.6908C3.88186 8.08545 4.2863 7.55682 4.71275 7.22419L4.71286 7.2241L9.72148 3.31518C9.7217 3.31501 9.72192 3.31484 9.72214 3.31467C11.059 2.27937 13.228 2.22535 14.6183 3.19943ZM12.6252 19.2499C13.3114 19.2499 13.8752 18.6861 13.8752 17.9999V14.9999C13.8752 14.3138 13.3114 13.7499 12.6252 13.7499C11.9391 13.7499 11.3752 14.3138 11.3752 14.9999V17.9999C11.3752 18.6861 11.9391 19.2499 12.6252 19.2499Z"
                  fill="url(#paint0_linear_4738_7892)"
                  stroke="url(#paint1_linear_4738_7892)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4738_7892"
                    x1="2.61523"
                    y1="2.0022"
                    x2="22.613"
                    y2="22.0222"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4738_7892"
                    x1="2.61523"
                    y1="2.0022"
                    x2="22.613"
                    y2="22.0222"
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

              <!-- <MobileHomeActive /> -->
            </span>
          </p>
          <span class="">Home</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none links w-fit md:w-full">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 md:hover:border md:hover:border-black rounded-lg border border-transparent relative transition ease-out delay-500 duration-700"
          :to="{ name: 'talents.invited', query: { tab: 'All' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="users"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <MobileTalent class="inactive" />
            <span class="active hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M5.125 6.75C5.125 4.40614 7.03114 2.5 9.375 2.5C11.7185 2.5 13.6245 4.40562 13.625 6.74903C13.6155 9.04858 11.8218 10.9052 9.53598 10.99H9.53597H9.53594H9.53591H9.53588H9.53585H9.53582H9.53579H9.53576H9.53573H9.53571H9.53568H9.53565H9.53562H9.53559H9.53556H9.53553H9.5355H9.53547H9.53544H9.53541H9.53538H9.53535H9.53532H9.53529H9.53526H9.53523H9.5352H9.53518H9.53515H9.53512H9.53509H9.53506H9.53503H9.535H9.53497H9.53494H9.53491H9.53488H9.53485H9.53482H9.53479H9.53477H9.53474H9.53471H9.53468H9.53465H9.53462H9.53459H9.53456H9.53453H9.5345H9.53447H9.53444H9.53441H9.53438H9.53435H9.53432H9.53429H9.53427H9.53424H9.53421H9.53418H9.53415H9.53412H9.53409H9.53406H9.53403H9.534H9.53397H9.53394H9.53391H9.53388H9.53385H9.53382H9.53379H9.53376H9.53373H9.5337H9.53367H9.53364H9.53361H9.53358H9.53355H9.53352H9.53349H9.53346H9.53342H9.53339H9.53336H9.53333H9.5333H9.53327H9.53324H9.53321H9.53318H9.53315H9.53312H9.53309H9.53305H9.53302H9.53299H9.53296H9.53293H9.5329H9.53287H9.53284H9.5328H9.53277H9.53274H9.53271H9.53268H9.53264H9.53261H9.53258H9.53255H9.53252H9.53248H9.53245H9.53242H9.53239H9.53235H9.53232H9.53229H9.53225H9.53222H9.53219H9.53216H9.53212H9.53209H9.53206H9.53202H9.53199H9.53195H9.53192H9.53189H9.53185H9.53182H9.53179H9.53175H9.53172H9.53168H9.53165H9.53161H9.53158H9.53154H9.53151H9.53147H9.53144H9.5314H9.53137H9.53133H9.5313H9.53126H9.53123H9.53119H9.53116H9.53112H9.53108H9.53105H9.53101H9.53097H9.53094H9.5309H9.53086H9.53083H9.53079H9.53075H9.53072H9.53068H9.53064H9.5306H9.53057H9.53053H9.53049H9.53045H9.53041H9.53037H9.53034H9.5303H9.53026H9.53022H9.53018H9.53014H9.5301H9.53006H9.53002H9.52998H9.52994H9.5299H9.52986H9.52982H9.52978H9.52974H9.5297H9.52966H9.52962H9.52958H9.52954H9.5295H9.52945H9.52941H9.52937H9.52933H9.52929H9.52924H9.5292H9.52916H9.52912H9.52907H9.52903H9.52899H9.52894H9.5289H9.52886H9.52881H9.52877H9.52873H9.52868H9.52864H9.52859H9.52855H9.5285H9.52846H9.52841H9.52837H9.52832H9.52827H9.52823H9.52818H9.52814H9.52809H9.52804H9.528H9.52795H9.5279H9.52785H9.52781H9.52776H9.52771H9.52766H9.52761H9.52757H9.52752H9.52747H9.52742H9.52737H9.52732H9.52727H9.52722H9.52717H9.52712H9.52707H9.52702H9.52697H9.52692H9.52687H9.52681H9.52676H9.52671H9.52666H9.52661H9.52655H9.5265H9.52645H9.5264H9.52634H9.52629H9.52624H9.52618H9.52613H9.52607H9.52602H9.52596H9.52591H9.52585H9.5258H9.52574H9.52569H9.52563H9.52557H9.52552H9.52546H9.5254H9.52535H9.52529H9.52523H9.52517H9.52512H9.52506H9.525H9.52488H9.52477H9.52465H9.52453H9.52442H9.5243H9.52418H9.52407H9.52395H9.52384H9.52372H9.52361H9.5235H9.52338H9.52327H9.52315H9.52304H9.52293H9.52281H9.5227H9.52259H9.52248H9.52236H9.52225H9.52214H9.52203H9.52192H9.5218H9.52169H9.52158H9.52147H9.52136H9.52125H9.52114H9.52103H9.52092H9.52081H9.5207H9.52059H9.52049H9.52038H9.52027H9.52016H9.52005H9.51994H9.51984H9.51973H9.51962H9.51951H9.51941H9.5193H9.51919H9.51909H9.51898H9.51888H9.51877H9.51866H9.51856H9.51845H9.51835H9.51824H9.51814H9.51803H9.51793H9.51783H9.51772H9.51762H9.51751H9.51741H9.51731H9.5172H9.5171H9.517H9.51689H9.51679H9.51669H9.51659H9.51648H9.51638H9.51628H9.51618H9.51608H9.51598H9.51588H9.51577H9.51567H9.51557H9.51547H9.51537H9.51527H9.51517H9.51507H9.51497H9.51487H9.51477H9.51467H9.51457H9.51447H9.51438H9.51428H9.51418H9.51408H9.51398H9.51388H9.51378H9.51369H9.51359H9.51349H9.51339H9.5133H9.5132H9.5131H9.513H9.51291H9.51281H9.51271H9.51262H9.51252H9.51242H9.51233H9.51223H9.51214H9.51204H9.51194H9.51185H9.51175H9.51166H9.51156H9.51147H9.51137H9.51128H9.51118H9.51109H9.51099H9.5109H9.5108H9.51071H9.51062H9.51052H9.51043H9.51033H9.51024H9.51015H9.51005H9.50996H9.50987H9.50977H9.50968H9.50959H9.50949H9.5094H9.50931H9.50922H9.50912H9.50903H9.50894H9.50885H9.50876C9.41828 10.9796 9.32418 10.9808 9.23753 10.989C6.90038 10.8911 5.125 9.03575 5.125 6.75Z"
                  fill="url(#paint0_linear_4738_5076)"
                  stroke="url(#paint1_linear_4738_5076)"
                />
                <path
                  d="M4.57368 20.1748L4.57231 20.1739C3.41336 19.4012 2.83496 18.4016 2.83496 17.3799C2.83496 16.3578 3.41372 15.3484 4.582 14.5661C5.88856 13.7017 7.62677 13.2549 9.38746 13.2549C11.1488 13.2549 12.8817 13.702 14.1776 14.5659C15.333 15.3362 15.9059 16.3355 15.915 17.3619C15.9142 18.3934 15.3353 19.3927 14.1758 20.1751C12.875 21.0483 11.1377 21.4999 9.37496 21.4999C7.61201 21.4999 5.87457 21.0482 4.57368 20.1748Z"
                  fill="url(#paint2_linear_4738_5076)"
                  stroke="url(#paint3_linear_4738_5076)"
                />
                <path
                  d="M15.2542 10.3317C16.1251 9.33399 16.598 7.99411 16.4833 6.56023L16.4833 6.56023L16.483 6.55705C16.4243 5.87783 16.2326 5.2439 15.9425 4.67475C16.13 4.62228 16.3274 4.5861 16.5286 4.56818C18.2133 4.42234 19.7199 5.67845 19.8666 7.38198C20.0036 9.04737 18.8284 10.4992 17.2038 10.7101H17.1849C17.1824 10.7101 17.1792 10.7101 17.1753 10.71C17.1384 10.7096 17.0425 10.7085 16.9351 10.7331C16.314 10.7554 15.7388 10.6084 15.2542 10.3317Z"
                  fill="url(#paint4_linear_4738_5076)"
                  stroke="url(#paint5_linear_4738_5076)"
                />
                <path
                  d="M21.8674 16.5432L21.8674 16.5432L21.8669 16.5488C21.8041 17.311 21.3172 18.0205 20.3849 18.5314L20.3843 18.5318C19.7639 18.873 19.0219 19.0964 18.2381 19.1947C18.5721 18.6686 18.7763 18.0865 18.8331 17.4762L18.8331 17.4762L18.8336 17.4701C18.95 16.0273 18.255 14.6879 16.9788 13.6604L16.9788 13.6604L16.9754 13.6578C16.6771 13.4218 16.3596 13.2071 16.0261 13.0133C17.7412 12.9099 19.5517 13.381 20.7512 14.349L20.7519 14.3495C21.5793 15.0151 21.9377 15.794 21.8674 16.5432Z"
                  fill="url(#paint6_linear_4738_5076)"
                  stroke="url(#paint7_linear_4738_5076)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4738_5076"
                    x1="4.625"
                    y1="2"
                    x2="14.115"
                    y2="11.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4738_5076"
                    x1="4.625"
                    y1="2"
                    x2="14.115"
                    y2="11.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_4738_5076"
                    x1="2.33496"
                    y1="12.7549"
                    x2="10.8182"
                    y2="25.6747"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_4738_5076"
                    x1="2.33496"
                    y1="12.7549"
                    x2="10.8182"
                    y2="25.6747"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_4738_5076"
                    x1="14.4849"
                    y1="4.05664"
                    x2="21.5259"
                    y2="9.83626"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_4738_5076"
                    x1="14.4849"
                    y1="4.05664"
                    x2="21.5259"
                    y2="9.83626"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint6_linear_4738_5076"
                    x1="14.3652"
                    y1="12.4995"
                    x2="21.5823"
                    y2="20.471"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint7_linear_4738_5076"
                    x1="14.3652"
                    y1="12.4995"
                    x2="21.5823"
                    y2="20.471"
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
            </span>
            <!-- <MobileTalentActive class="active hidden" /> -->
          </p>
          <span class="">Talents</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>

      <li class="md:flex-grow links w-fit md:w-full md:hidden">
        <router-link
          class="flex flex-col md:flex-row items-center gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 md:hover:border md:hover:border-black rounded-lg border border-transparent relative transition ease-out delay-500 duration-700"
          :to="{ name: 'settings.profile', query: { tab: 'Profile' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="users"
          />
          <!-- mobile nav icons -->
          <p class="md:hidden">
            <span class="inactive">
              <MobileCommissions />
            </span>
            <span class="active hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M17.5035 13.7886L17.5035 13.7886L17.503 13.7827C17.458 13.3109 17.6371 12.8677 17.9545 12.5579L17.9546 12.558L17.9635 12.5489C18.2387 12.2662 18.6192 12.1001 19.0452 12.1001H21.0952C21.3923 12.1001 21.6252 12.3394 21.6252 12.6201V14.6801C21.6252 14.9608 21.3923 15.2001 21.0952 15.2001H19.1652C18.3058 15.2001 17.5688 14.5719 17.5035 13.7886Z"
                  fill="url(#paint0_linear_4738_2910)"
                  stroke="url(#paint1_linear_4738_2910)"
                />
                <path
                  d="M15.0068 14.0026L15.0069 14.0037C15.1909 16.0967 17.0209 17.6999 19.165 17.6999H19.5811C19.3197 19.3676 17.8715 20.6499 16.125 20.6499H6.125C4.19114 20.6499 2.625 19.0838 2.625 17.1499V10.1499C2.625 8.21604 4.19114 6.6499 6.125 6.6499H16.125C17.8624 6.6499 19.3196 7.93292 19.5811 9.5999H19.045C17.9533 9.5999 16.9357 10.032 16.2012 10.7766C15.3379 11.63 14.9041 12.8046 15.0068 14.0026ZM7.125 12.3999H13.125C13.8111 12.3999 14.375 11.836 14.375 11.1499C14.375 10.4638 13.8111 9.8999 13.125 9.8999H7.125C6.44321 9.8999 5.875 10.4494 5.875 11.1499C5.875 11.8504 6.44321 12.3999 7.125 12.3999Z"
                  fill="url(#paint2_linear_4738_2910)"
                  stroke="url(#paint3_linear_4738_2910)"
                />
                <path
                  d="M11.4652 3.3501C12.4067 3.3501 13.2222 3.64933 13.7919 4.1501H6.15515C5.01558 4.1501 3.94471 4.47096 3.03969 5.02705C3.57242 4.02725 4.63382 3.3501 5.84515 3.3501H11.4652Z"
                  fill="url(#paint4_linear_4738_2910)"
                  stroke="url(#paint5_linear_4738_2910)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4738_2910"
                    x1="16.9961"
                    y1="11.6001"
                    x2="20.9954"
                    y2="16.6032"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_4738_2910"
                    x1="16.9961"
                    y1="11.6001"
                    x2="20.9954"
                    y2="16.6032"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_4738_2910"
                    x1="2.125"
                    y1="6.1499"
                    x2="16.8843"
                    y2="23.8262"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_4738_2910"
                    x1="2.125"
                    y1="6.1499"
                    x2="16.8843"
                    y2="23.8262"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_4738_2910"
                    x1="2.42529"
                    y1="2.8501"
                    x2="3.63412"
                    y2="8.10375"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F18B1B" />
                    <stop
                      offset="1"
                      stop-color="#E52053"
                    />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_4738_2910"
                    x1="2.42529"
                    y1="2.8501"
                    x2="3.63412"
                    y2="8.10375"
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
              <!-- <MobileCommissionsActive /> -->
            </span>
          </p>
          <span class="">Commissions</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      

      <li class="flex-none links w-fit md:w-full md:border-t border-#3A2622 md:pt-4 hidden md:block">
        <router-link
          class="flex flex-col md:flex-row items-center w-full gap-y-1 gap-3 text-#7D7C80 md:text-white py-2 md:px-4 text-xs md:text-sm font-medium md:font-normal hover:bg-white hover:bg-opacity-10 md:hover:border md:hover:border-black rounded-lg border border-transparent relative transition ease-out delay-500 duration-700"
          :to="{ name: 'settings.profile', query: { tab: 'Profile' } }"
        >
          <Icon
            class="fill-current hidden md:block"
            name="settings"
          />
          <!-- mobile nav icons -->
          <!-- <p class="md:hidden">
            <MobileTalent class="inactive" />
            <MobileTalentActive class="active hidden" />
          </p> -->
          <span class="">Settings</span>
          <div class="absolute -top-[1px] inset-x-0 p-px bg-transparent md:hidden" />
        </router-link>
      </li>
      <li class="flex-none hidden md:flex items-end">
        <button
          class="flex flex-col md:flex-row items-center w-full gap-y-1 gap-3 text-#7D7C80 md:text-white py-[0.5rem] md:px-4 text-xs md:text-sm font-medium md:font-normal"
          href="/settings"
          @click="logout"
        >
          <Icon name="logout" />
          <span class="">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import Icon from "@/components/Icon.vue";
import { useManagerStore } from "@/stores/manager";
import MobileDashboard from "@/assets/icons/mobile/dashboard.svg?component"
// import MobileHome from "@/assets/icons/mobile/home.svg?component"
import MobileTalent from "@/assets/icons/mobile/talent.svg?component"
import MobileCommissions from "@/assets/icons/mobile/commissions.svg?component"
import MobileDashboardActive from "@/assets/icons/mobile/dashboard-active.svg?component"
// import MobileHomeActive from "@/assets/icons/mobile/home-active.svg?component"
// import MobileTalentActive from "@/assets/icons/mobile/talent-active.svg?component"
// import MobileCommissionsActive from "@/assets/icons/mobile/commissions-active.svg?component"


const managerStore = useManagerStore();

function logout() {
  managerStore.logout();
}
const router = useRouter()
</script>

<style scoped>
.links .router-link-active {
  @apply bg-gradient-to-br text-transparent bg-clip-text md:bg-clip-border from-orange to-red md:text-white rounded-lg
}

.links .router-link-active div {
  @apply bg-gradient-to-br from-orange to-red
}

.links .router-link-exact-active div {
  @apply bg-gradient-to-br from-orange to-red
}

.links .router-link-exact-active {
  @apply bg-gradient-to-br text-transparent bg-clip-text md:bg-clip-border from-orange to-red md:text-white rounded-lg border-0
}

.links .router-link-active .active {
  /* @apply block */
  display: block !important;
}

.links .router-link-active .inactive {
  display: none !important;
  /* @apply hidden */
}

/* .links .router-link-exact-active .active {
  @apply block
} */

/* .links .router-link-exact-active .inactive {
  @apply hidden
} */
</style>
