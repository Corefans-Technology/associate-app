<template>
<!--  <DashboardLayout>-->
<!--    <div class="p-[2.5rem] space-y-8">-->
<!--      <div class="flex items-center space-x-4 justify-between">-->
<!--        &lt;!&ndash;  breabcrum  &ndash;&gt;-->
<!--        <div>-->
<!--          <div class="flex items-center space-x-1">-->
<!--            <button class="focus:outline-none" @click="$router.back()" to="/">-->
<!--              <Icon name="back-arrow" />-->
<!--            </button>-->
<!--            <nuxt-link class="text-sm text-[#626E8B]" to="#"-->
<!--              >Talents-->
<!--            </nuxt-link>-->
<!--          </div>-->
<!--          <div class="flex items-center space-x-2">-->
<!--            <h2 class="text-2xl font-medium text-black">Charlie Sheen</h2>-->
<!--            <Status name="Successful" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div>-->
<!--        <TabGroup>-->
<!--          <TabList class="flex space-x-5 900/20 border-b">-->
<!--            <Tab-->
<!--              v-for="(tab, index) in tabs"-->
<!--              as="template"-->
<!--              :key="index"-->
<!--              v-slot="{ selected }"-->
<!--            >-->
<!--              <button-->
<!--                type="button"-->
<!--                :class="[-->
<!--                  'text-[15px]',-->
<!--                  'focus:outline-none focus:ring-0 relative py-5 border-b-2 mr-5',-->
<!--                  selected-->
<!--                    ? 'border-primary text-primary'-->
<!--                    : 'border-transparent text-[#98A2B3]',-->
<!--                ]"-->
<!--              >-->
<!--                {{ tab }}-->
<!--              </button>-->
<!--            </Tab>-->
<!--          </TabList>-->

<!--          <TabPanels class="pt-4">-->
<!--            <TabPanel>-->
<!--              <div class="max-w-[27.938rem] w-full divide-y divide-[#F5F3F3]">-->
<!--                <div class="flex items-center justify-between py-4 text-sm">-->
<!--                  <p class="text-[#626E8B]">Referrence:</p>-->
<!--                  <p>100912340175</p>-->
<!--                </div>-->
<!--                <div class="flex items-center justify-between py-4 text-sm">-->
<!--                  <p class="text-[#626E8B]">Campaign:</p>-->
<!--                  <p>Chasing Paper EP</p>-->
<!--                </div>-->
<!--                <div class="flex items-center justify-between py-4 text-sm">-->
<!--                  <p class="text-[#626E8B]">Name:</p>-->
<!--                  <p>Charlie Sheen</p>-->
<!--                </div>-->
<!--                <div class="flex items-center justify-between py-4 text-sm">-->
<!--                  <p class="text-[#626E8B]">Email Address:</p>-->
<!--                  <p>charlie.sheen@outlook.com</p>-->
<!--                </div>-->
<!--                <div class="flex items-center justify-between py-4 text-sm">-->
<!--                  <p class="text-[#626E8B]">Payment Method:</p>-->
<!--                  <p>Card</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </TabPanel>-->
<!--            <TabPanel>-->
<!--              <div class="grid xl:grid-cols-3 2xl:grid-cols-5 gap-6">-->
<!--                <CampaignItem />-->
<!--              </div>-->
<!--            </TabPanel>-->
<!--          </TabPanels>-->
<!--        </TabGroup>-->
<!--      </div>-->
<!--    </div>-->
<!--  </DashboardLayout>-->
</template>

<script setup>
// import TableLite from "vue3-table-lite";
import { ref } from "vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const tabs = ref(["Bio", "Campaigns"]);

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
</script>

<style></style>

<style scoped>
::v-deep(.Successful) {
  color: #00c48c;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(0, 196, 140, 0.1);
  border-radius: 100px;
}
::v-deep(.Failed) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Unfulfilled) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Pending) {
  color: #e3a11b;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(227, 161, 27, 0.1);
  border-radius: 100px;
}
::v-deep(.Fulfilled) {
  color: #3d6abe;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(61, 106, 190, 0.1);
  border-radius: 100px;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #98a2b3;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  border-bottom: #98a2b31f 1px solid;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}

::v-deep(.vtl-thead div) {
  font-weight: normal !important;
  font-size: 14px;
}

::v-deep(.vtl-paging-info) {
  font-size: 12px;
  color: #565758;
}

::v-deep(.vtl-tbody-td div) {
  font-weight: normal !important;
  font-size: 14px;
  padding: 6px 0px;
}

::v-deep(.vtl-paging-change-div) {
  opacity: 0;
}
</style>
