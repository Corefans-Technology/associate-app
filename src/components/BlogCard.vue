<template>
  <div>
    <img
      class="h-[15rem] w-full object-cover"
      src="~/assets/images/blog.png"
      alt=""
    />

    <div class="py-6 space-y-4">
      <p class="text-sm text-[#FF9E0B]">Core news</p>
      <h2 class="text-2xl font-semibold flex items-center justify-between">
        <span>Asake raises ticket price</span>
        <Icon name="arrow-up" />
      </h2>

      <p class="text-[#667085]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
        phasellus malesuada convallis scelerisque varius. Aliquet sed.
      </p>

      <div class="flex items-center space-x-3">
        <img
          class="w-10 h-10 object-cover rounded-full"
          src="~/assets/images/photo.png"
          alt=""
        />
        <div>
          <h5 class="text-sm font-medium">Olivia Rhye</h5>
          <p class="text-sm text-[#667085]">21 Sep 2022</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["image"]);
</script>

<style lang="scss" scoped></style>
