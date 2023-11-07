<template>
  <Suspense>
    <template #default>
      <TalentItems />
    </template>
    <template #fallback>
      <div class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3">
        <LoaderComponent />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import TalentItems from "@/components/tables/TalentItems.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";



</script>
