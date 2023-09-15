<template>
  <TabPanel>
    <Suspense>
      <template #default>
        <UpdateView />
      </template>
      <template #fallback>
        <div class="mt-40 grid place-items-center place-content-center">
          <LoaderComponent />
        </div>
      </template>
    </Suspense>
  </TabPanel>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import UpdateView from "./UpdateView.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";


</script>

