<template>
  <TabPanel>
    <form @submit="submit">
      <div class="space-y-20 border-b pb-14">
        <div class="flex space-x-20">
          <div class="max-w-[20.25rem] w-full space-y-3">
            <h3 class="text-xl font-medium">
              Social Links
            </h3>
            <p class="text-sm text-[#98A2B3]">
              Make a good first impression: introduce your campaign
              objectives and entice people to learn more. This basic
              information will represent your campaign on your campaign
              page, on your campaign card, and in searches.
            </p>
          </div>

          <div class="max-w-[31.9375rem] w-full space-y-[1.2rem]">
            <!-- Apple Music Link -->
            <BaseInput
              label="Apple Music Link"
              name="apple_music"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.apple_music"
            />

            <!-- Twitter Link -->
            <BaseInput
              label="Twitter Link"
              name="twitter"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.twitter"
            />

            <!-- Audio Mack Link -->
            <BaseInput
              label="Audio Mack Link"
              name="audio_mack"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.audio_mack"
            />

            <!-- Instagram Link -->
            <BaseInput
              label="Instagram Link"
              name="instagram"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.instagram"
            />

            <!-- Spotify Link -->
            <BaseInput
              label="Spotify Link"
              name="spotify"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.spotify"
            />

            <!-- Boom Play Link -->
            <BaseInput
              label="Boomplay Link"
              name="boom_play"
              type="text"
              autofocus
              class="rounded border-light-grey focus:border-light-grey"
              :error="errors.boom_play"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          :is-loading="loading"
          class="rounded bg-gradient-to-r from-orange to-red text-white text-sm w-32"
        >
          Save
        </BaseButton>
      </div>
    </form>
  </TabPanel>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import {ref, reactive, onMounted, computed} from "vue";
import { useManagerStore } from "@/stores/manager";
import { useSettingsStore } from "@/stores/settings";
import {number, object, string} from "yup";
import {useForm} from "vee-validate";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const creative = useManagerStore();
const settingsStore = useSettingsStore();
settingsStore.getFanLink();

const loading = ref(false);

const schema = computed(() => {
  return object({
    twitter: string().label("Facebook"),
    apple_music: string().label("Apple Music"),
    instagram: string().label("Instagram"),
    audio_mack: string().label("Audio Mack"),
    spotify: string().label("Spotify"),
    boom_play: string().label("Boom Play"),
  })
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    twitter: settingsStore.links.twitter,
    apple_music: settingsStore.links.apple_music,
    instagram: settingsStore.links.instagram,
    audio_mack: settingsStore.links.audio_mack,
    spotify: settingsStore.links.spotify,
    boom_play: settingsStore.links.boom_play,
  },
})


const submit = handleSubmit( async (values, actions) => {
  loading.value = true;
  await settingsStore.updateFanLink(values).then((response) => {
    Toast.fire({
      icon: "success",
      title: "Account Added!",
    });
  }).catch((error) => {
    console.log(error.data)
    Toast.fire({
      icon: "error",
      title: error,
    });
    //   actions.setErrors(error.data.errors);
  }).finally(() => loading.value = false);
});

</script>

