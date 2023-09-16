<template>
  <Suspense>
    <template #default>
      <TalentArtistTable />
    </template>
    <template #fallback>
      <div class="border rounded border-#F2F4F7 flex flex-col items-center justify-center min-h-[42.625rem] space-y-3">
        <LoaderComponent />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import LoaderComponent from "@/components/LoaderComponent.vue";
import TalentArtistTable from "@/components/tables/TalentArtistTable.vue";

</script>
