<template>
    <header class="flex-none">
        <div class="max-w-[73.125rem] w-full space-y-20 lg:space-y-0 mx-auto lg:grid grid-cols-2 md:gap-x-10 xl:gap-x-[8.5rem] py-40 ">
            <div class="space-y-6 flex flex-col justify-center">
                <h1 class="text-[4rem] font-bold text-[#000000] leading-[4.5rem] relative">
                    Bring an idea to life one 
                    <span class="text-transparent bg-gradient-to-r from-orange to-red bg-clip-text">
                        donation
                        <img src="~/assets/images/decore.png" class="absolute  bottom-14 -right-10" alt="">
                    </span>
                    at a time
                </h1>
                <p class="text-[#667085] text-[1.375rem] leadig-[2.375rem]">
                    Make an income doing what you love. Let your truest fans - your core fans - support your art and provide the resources you need to keep creating
                </p>

                <div>
                    <button class="bg-gradient-to-r from-orange to-red text-white font-medium text-base  h-[44px] px-4 rounded-lg flex items-center justify-center">Start a campaign</button>
                </div>
            </div>

            <div class="grid grid-cols-2 grid-rows-2 gap-6">
                <img class="rounded-t-[3.125rem] rounded-bl-[3.125rem] w-full h-full" src="~/assets/images/gallery_1.png" alt="">
                <img class="rounded-t-[3.125rem] rounded-br-[3.125rem]  w-full h-full" src="~/assets/images/gallery_2.png" alt="">
                <img class="rounded-b-[3.125rem] rounded-tl-[3.125rem]  w-full h-full" src="~/assets/images/gallery_3.png" alt="">
                <img class="rounded-b-[3.125rem] rounded-tr-[3.125rem]  w-full h-full" src="~/assets/images/gallery_4.png" alt="">
            </div>
        </div>
    </header>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>