<template>
  <TabGroup>
    <InputError :message="errors.image_one" />
    <InputError :message="errors.image_two" />
    <div class="flex flex-col lg:flex-row max-w-8xl">
      <TabList class="w-full lg:w-1/3 space-y-4">
        <h3 class="text-xl font-medium">
          Content
        </h3>
        <Tab
          v-slot="{ selected }"
          as="template"
        >
          <button
            :class="[
              'text-sm px-4 rounded py-1 ring-0 focus:ring-0 border-0 focus:border-0 focus:outline-none',
              selected
                ? 'bg-gradient-to-r from-orange to-red text-white '
                : 'text-7B7B7B',
            ]"
          >
            Video
          </button>
        </Tab>
        <Tab
          v-slot="{ selected }"
          as="template"
        >
          <button
            :class="[
              'text-sm px-4 rounded py-1 ring-0 focus:ring-0 border-0 focus:border-0 focus:outline-none',
              selected
                ? 'bg-gradient-to-r from-orange to-red text-white'
                : 'text-7B7B7B',
              errors.image_one ? 'focus:ring focus:ring-[#E52053]' : '',
              errors.image_two ? 'focus:ring focus:ring-[#E52053]' : '',
            ]"
          >
            Image
          </button>
        </Tab>
        <div class="text-sm text-98A2B3 space-y-4 leading-loose">
          <p>
            Use videos or images to tell your story to fans. You can add up
            to three images or videos. Here are some tips:
          </p>

          <ul class="list-disc pl-10">
            <li>
              Have your face show in the video or image for a deeper
              emotional connection
            </li>
            <li>Show examples or snippets of your work in your video</li>
            <li>
              Let your fans see the work you put into your art by showing
              your process in your video
            </li>
            <li>Make sure your video or image is clear and good quality</li>
            <li>
              Make sure your video or image is clear and good quality Be a
              storyteller. Tell fans what your art means to you, how you
              create, why you create, and what’s in it for them
            </li>
          </ul>

          <a
            class="text-orange block"
            href="#"
          >Need help?</a>
        </div>
      </TabList>
      <div class="w-24 h-20" />

      <TabPanels class="w-full lg:w-2/3 space-y-5">
        <form
          class="w-full  space-y-5"
          @submit="submit"
        >
          <TabPanel :unmount="false">
            <div class="space-y-5">
              <!-- url -->
              <BaseInput
                v-model="link"
                label="Youtube URL *"
                placeholder="Enter valid URL"
                name="url"
                type="url"
                maxlength="100"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                desc="Enter a Youtube URL to appear at the top of your campaign page  "
                :error="errors.url"
              />

              <YoutubeVideoPreview :url="link" />
            </div>
          </TabPanel>
          <TabPanel :unmount="false">
            <!-- onFeatureImage label text -->
            <BaseFile
              label="Campaign Image (A max number of 2 images is allowed)"
              name="image_one"
              height="h-[447px]"
              class="rounded border-light-grey focus:border-light-grey"
              desc="Upload an image to appear at the top of your campaign page."
              :error="errors.image_one"
            />
            <Spacer size="4" />
            <BaseFile
              label="Campaign Image (A max number of 2 images is allowed)"
              name="image_two"
              height="h-[447px]"
              class="rounded border-light-grey focus:border-light-grey"
              desc="Upload an image to appear at the top of your campaign page."
              :error="errors.image_two"
            />
          </TabPanel>
          <Spacer size="2" />
          <div class="space-y-1">
            <BaseTextArea
              label="Campaign Story"
              name="story"
              placeholder="Enter Campaign Story"
              rows="3"
              autofocus
              :can-count-text="true"
              desc="Evoke emotions by telling your story to your fans."
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.story"
            />
          </div>
          <Spacer size="2" />
          <div class="w-full flex space-x-4 py-8 mt-6 border-t">
            <div class="flex-grow flex items-center">
              <BaseButton
                type="button"
                class="text-light-grey-2 text-sm rounded border border-light-grey-2"
                @click="$router.push({name: 'campaigns.basic', params: {'id': $route.params.id }})"
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
      </TabPanels>
    </div>
  </TabGroup>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useCampaignStore } from "@/stores/campaign";
import InputError from "@/components/InputError.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseFile from "@/components/base/BaseFile.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import YoutubeVideoPreview from "@/components/YoutubeVideoPreview.vue";
import { object, string,  mixed  } from "yup";
import {useForm} from "vee-validate";
import Spacer from "@/components/Spacer.vue";
import { useRouter, useRoute } from "vue-router";


const campaignStore = useCampaignStore();
const router = useRouter()
const route = useRoute()

let link = ref("")
let forLater = ref(false)

const youtubeUrlRegExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/

const schema = computed(() => {
  return object({
    url: string().matches(youtubeUrlRegExp, "Youtube URL is not valid").label("Youtube URL"),
    story: string().required().typeError("Campaign story is required").label("Campaign Story"),
    image_one: mixed().required().label("Image 1"),
    image_two: mixed().required().label("Image 2"),
  })
});

const { handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: schema,
  initialValues: {
    url: campaignStore.form.content.videos,
    story: campaignStore.form.content.story,
    image_one: campaignStore.form.content.images[0],
    image_two: campaignStore.form.content.images[1],
  },
})

const saveForLater = async () => {
  forLater.value = true;
  await submit();
}

const submit = handleSubmit( async (values, actions) => {
  await campaignStore.content({
    ...values,
    step: 3,
    id: route.params.id,
  }).then((response) => {
    Toast.fire({
      icon: "success",
      title: "Saved!",
    });
    if (forLater.value) return router.push({ name: "campaigns.index" });
    return router.push({name: "campaigns.exclusive", params: {"id": response.data.id}});
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title: error.message,
    });
    actions.setErrors(error.data.errors);
  })
});

watch(values, (newVideo) => {
  link.value = newVideo.url;
})


</script>