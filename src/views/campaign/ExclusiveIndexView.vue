<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-medium">
        Exclusives
      </h3>
      <BaseButton
        v-if="exclusiveStore.data?.length"
        class="flex-none bg-gradient-to-r from-orange to-red text-white rounded text-sm"
        type="button"
        @click="$emit( 'ChangeView', 'FormView' )"
        @click.prevent="newExclusive = !newExclusive"
      >
        New Exclusive
      </BaseButton>
    </div>
    <div
      v-if="!exclusiveStore.data?.length"
      class="w-full h-[42.625rem] border border-[#F2F4F7] flex items-center justify-center flex-col space-y-2"
    >
      <Icon name="empty" />
      <p class="text-xl text-[#1D2939]">
        No Exclusives Yet
      </p>
      <p class="text-center text-[#98A2B3] w-[16.5rem] mx-auto">
        Get money for your next creative project with your first campaign
      </p>
      <!-- add button -->
      <BaseButton
        aria-label="Add Exclusives"
        class="text-orange text-sm"
        type="button"
        @click="$emit( 'ChangeView', 'FormView' )"
      >
        <span class="flex items-center justify-center space-x-2 font-normal">
          <Icon name="add" />
          <span>Add Exclusives</span>
        </span>
      </BaseButton>
    </div>


    <Suspense>
      <template #default>
        <div class="flex flex-wrap gap-6">
          <ExclusiveCard />
        </div>
      </template>
      <template #fallback>
        <div class="grid place-content-center  min-h-[42.625rem]">
          <LoaderComponent />
        </div>
      </template>
    </Suspense>


    <div class="w-full flex space-x-4 py-8 mt-6 border-t">
      <div class="flex-grow flex items-center">
        <BaseButton
          type="button"
          class="text-light-grey-2 text-sm rounded border border-light-grey-2"
          @click="$router.push({name: 'campaigns.content', params: {'id': $route.params.id }})"
        >
          Previous
        </BaseButton>
      </div>
      <BaseButton
        type="button"
        class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B]"
        @click.prevent="saveForLater"
      >
        <span>Save for Later</span>
      </BaseButton>
      <BaseButton
        :is-loading="isSubmitting"
        class="bg-gradient-to-r from-orange to-red text-white text-sm rounded"
        @click="submit"
      >
        Save & Proceed
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import ExclusiveCard from "@/components/ExclusiveCard.vue";
import Icon from "@/components/Icon.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

import { useCampaignStore } from "@/stores/campaign";
import { useExclusiveStore } from "@/stores/exclusives";

import BaseButton from "@/components/base/BaseButton.vue";
import { object, array  } from "yup";
import { useForm  } from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import {useGenericStore} from "@/stores/generic";
const router = useRouter();
const route = useRoute();

const campaignStore = useCampaignStore();
const genericStore = useGenericStore();
const exclusiveStore = useExclusiveStore();

genericStore.getExclusiveAttribute();
campaignStore.getCampaignExclusives( route.params.id );
let forLater = ref(false)

const schema = computed(() => {
  return object({
    exclusives: array(),
  })
});

const { handleSubmit, isSubmitting, setFieldValue  } = useForm({
  validationSchema: schema,
})


onMounted(() => {
  setFieldValue("exclusives", campaignStore.exclusives?.map(item => item.id) ?? []);
});


const saveForLater = async () => {
  forLater.value = true;
  await submit();
}

const submit = handleSubmit( async (values, actions) => {
  await campaignStore.syncSelectedExclusive({
    step: 4,
    ...values,
    id: route.params.id,
  }).then((response) => {
    Toast.fire({
      icon: "success",
      title:  "Saved!",
    });
    if (forLater.value) return router.push({ name: "campaigns.index" });
    return router.push({name: "campaigns.funding", params: {"id": response.data.id }});
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title:  error.data.message,
    });
    actions.setErrors(error.data.errors);
  })
});


</script>

