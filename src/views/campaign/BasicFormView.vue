<template>
  <div class="flex flex-col lg:flex-row max-w-8xl">
    <div class="w-full lg:w-1/3 space-y-3">
      <h3 class="text-xl font-medium">
        Basics
      </h3>
      <div class="text-sm text-98A2B3 space-y-4">
        <p>
          Tell your story to your fans and make a great firs impression.
          This is what fans will first see on your campaign page. Here are
          some tips:
        </p>

        <ul class="list-disc pl-10">
          <li>Make it clear what you are raising funds for</li>
          <li>Entice people to learn more</li>
          <li>Use keywords that will help you stand out</li>
          <li>
            Stuck for ideas? Check out other campaigns in Explore for
            inspiration.
          </li>
        </ul>

        <a
          class="text-orange block"
          href="#"
        >Need help?</a>
      </div>
    </div>
    <div class="w-24 h-20" />
    <form
      class="w-full lg:w-2/3 space-y-5"
      @submit="submit"
    >
      <!-- title -->
      <BaseInput
        label="Campaign Title"
        placeholder="Enter title"
        name="title"
        type="text"
        autofocus
        :can-count-text="true"
        class="rounded border border-light-grey focus:border-light-grey"
        desc="What is the title of your campaign"
        :error="errors.title"
      />
      <!-- Campaign description -->
      <BaseTextArea
        label="Campaign description"
        name="description"
        placeholder="Enter description"
        rows="3"
        autofocus
        :can-count-text="true"
        desc="Provide some more info about your campaign"
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.description"
      />
      <!-- Category -->
      <BaseSelect
        label="Category"
        :options="categories"
        :can-deselect="false"
        :searchable="false"
        name="category"
        placeholder="Select category"
        desc="To help fans find your campaign, select a category that best represents your project."
        class="rounded border border-light-grey focus:border-light-grey"
        :error="errors.category"
      />
      <!-- Location -->
      <BaseSelect
        label="Location"
        :options="locations"
        :searchable="false"
        :can-deselect="false"
        name="location"
        placeholder="Select Location"
        desc="Select the location where you are running the campaign"
        class="rounded border border-light-grey focus:border-light-grey"
        :error="errors.location"
      />
      <!-- Campaign Duration -->
      <BaseInput
        label="Campaign Duration"
        placeholder="Enter Duration"
        name="duration"
        type="date"
        autofocus
        desc="You can run campaigns for a maximum of 90 days."
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.duration"
      />
      <!-- Tags -->
      <BaseSelect
        label="Tag"
        :options="tagList"
        :searchable="true"
        placeholder="Select tags"
        :create-option="true"
        :close-on-select="false"
        name="tags"
        mode="tags"
        :max="5"
        desc="Enter up to five keywords that best describe your campaign. These tags will help with organization and discoverability."
        class="rounded border border-light-grey focus:border-light-grey"
        :error="errors.tag"
      />

      <!-- onFeatureImage label text -->
      <BaseFile
        label="Campaign Thumbnail"
        name="thumbnail"
        class="mt"
        width="w-[15.625rem]"
        height="h-[15.625rem]"
        desc="Upload a square image of your campaign."
        :error="errors.thumbnail"
      />

      <Spacer size="2" />
      <div class="w-full flex space-x-4 py-8 mt-6 border-t">
        <div class="flex-grow flex items-center">
          <BaseButton
            type="button"
            class="text-light-grey-2 text-sm rounded border border-light-grey-2 invisible"
          >
            Previous
          </BaseButton>
        </div>
        <BaseButton
          type="button"
          class="text-light-grey-2 text-sm rounded border border-light-grey-2"
          @click.prevent="saveForLater"
        >
          Save for Later
        </BaseButton>
        <BaseButton
          :is-loading="isSubmitting"
          class="bg-gradient-to-r from-orange to-red text-white text-sm rounded"
        >
          Save & Proceed
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCampaignStore } from "@/stores/campaign";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseFile from "@/components/base/BaseFile.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import { object, string, date, array, mixed  } from "yup";
import {useForm} from "vee-validate";
import BaseSelect from "@/components/base/BaseSelect.vue";
import Spacer from "@/components/Spacer.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()



const campaignStore = useCampaignStore();

let forLater = ref(false)


const schema = computed(() => {
  return object({
    title: string().required().label("Title"),
    category: string().required().label("Category"),
    description: string().required().label("Campaign Description"),
    location: string().required().label("Location"),
    duration: date().required().label("Duration"),
    tags: array().required().label("Tag"),
    thumbnail: mixed().required().label("Image"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    title: campaignStore.form.basic.title,
    description: campaignStore.form.basic.description,
    category: campaignStore.form.basic.category,
    duration: campaignStore.form.basic.duration,
    location: campaignStore.form.basic.location,
    tags: campaignStore.form.basic.tags,
    thumbnail: campaignStore.form.basic.thumbnail,
  },
})


const saveForLater = async () => {
  forLater.value = true;
  await submit();
}

const submit = handleSubmit( async (values, actions) => {
  if ( route.params.id ) {
    await campaignStore.basic({
      ...values,
      step: 2,
      id: route.params.id,
    }).then((response) => {
      Toast.fire({
        icon: "success",
        title:  "Saved!",
      });
      if (forLater.value) return router.push({ name: "campaigns.index" });
      return router.push({name: "campaigns.content", params: {"id": response.data.id }});
    }).catch((error) => {
      Toast.fire({
        icon: "error",
        title:  error.data.message,
      });
      actions.setErrors(error.data.errors);
    })
  } else {
    await campaignStore.create({
      step: 2,
      ...values,
    }).then((response) => {
      Toast.fire({
        icon: "success",
        title:  "Saved!",
      });
      if (forLater.value) return router.push({ name: "campaigns.index" });
      return router.push({name: "campaigns.content", params: {"id": response.data.id }});
    }).catch((error) => {
      Toast.fire({
        icon: "error",
        title:  error.data.message,
      });
      actions.setErrors(error.data.errors);
    })
  }

});



const tagList = ref([ "Batman", "Robin", "Joker" ]);
const categories = ref(["Music", "Support"]);
const locations = ref(["Nigeria", "Ghana", "United State Of American", "South Africa"]);

</script>
