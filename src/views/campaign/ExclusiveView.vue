<template>
  <component
    :is="views[currentView]"
    @change-view="changeView"
  />
</template>

<script setup>
import {ref} from "vue";
import IndexView from "@/views/campaign/ExclusiveIndexView.vue";
import FormView from "@/views/campaign/ExclusiveFormView.vue";


const currentView = ref("IndexView")

const views = {
  IndexView,
  FormView,
}

const changeView = (view) => {
  currentView.value = view
}





</script>