<!-- eslint-disable no-console -->
<!-- eslint-disable no-undef -->
<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { ref, watch } from "vue";
import { useManagerStore } from "@/stores/manager";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import Spacer from "@/components/Spacer.vue";
import Icon from "@/components/Icon.vue";
import FormHeader from "@/components/FormHeader.vue";
import {RouterLink, useRouter} from "vue-router";
import {object, string, array} from "yup";
import {useForm} from "vee-validate";
import AuthSideLayout from "@/components/AuthSideLayout.vue";
import {useGenericStore} from "@/stores/generic";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue"
// import spotify from '../my-icon.svg?url'
import spotify from "../../assets/icons/socials/spotify.svg?raw"
import apple from "../../assets/icons/socials/apple.svg?raw"
import deezer from "../../assets/icons/socials/deezer.svg?raw"
import facebook from "../../assets/icons/socials/facebook.svg?raw"
import instagram from "../../assets/icons/socials/instagram.svg?raw"
import sound from "../../assets/icons/socials/sound.svg?raw"
import tiktok from "../../assets/icons/socials/tiktok.svg?raw"
import twitter from "../../assets/icons/socials/twitter.svg?raw"
const socials = ref([
  { id: 1, name: "Spotify", placeholder: "https://spotify.com/yourpage", icon: spotify, unavailable: false },
  { id: 2, name: "Deezer", placeholder: "https://deezer.com/yourpage", icon: deezer, unavailable: false },
  { id: 3, name: "Apple Music", placeholder: "https://apple.com/yourpage", icon: apple, unavailable: false },
  { id: 4, name: "Soundcloud", placeholder: "https:/soundcloud/.com/yourpage", icon: sound, unavailable: false },
  { id: 5, name: "Facebook", placeholder: "https://facebook.com/yourpage", icon: facebook, unavailable: false },
  { id: 6, name: "Twitter", placeholder: "https://twitter.com/yourpage", icon: twitter, unavailable: false },
  { id: 7, name: "Instagram", placeholder: "https://instagram.com/yourpage", icon: instagram, unavailable: false },
  { id: 8, name: "Tik Tok", placeholder: "https://tiktok.com/yourpage", icon: tiktok, unavailable: false },
])

const linkForms = ref([{ icon: socials.value[0], value: "" }])
const managerStore = useManagerStore();
const genericStore = useGenericStore();
genericStore.getCountries();
genericStore.getBanks()
const router = useRouter()

// let currentStep = ref(0);

const accountName = ref("");

const schemas = object({
  email: string().required().email().label("Email Address"),
  first_name: string().required().label("First Name"),
  last_name: string().required().label("Last Name"),
  socials: array().min(1).required().label("Social Proof"),
})

watch(
  () => linkForms,
  (count) => {
    console.log(`count is: ${count}`)
  },
)

const { handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: schemas,
  keepValuesOnUnmount: true,
  initialValues: {
    socials: [{ icon: socials.value[0], value: "" }],
  },
})

const onSubmit = handleSubmit( async (values, actions) => {
  console.log(values)
  return
  await managerStore
    .signUp({ name: accountName.value, ...values })
    .then(() => {
      Toast.fire({
        icon: "success",
        title: "You are in!",
      });
      return router.push({name: "sign.up.success"});
    }).catch((error) => {
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
      actions.setErrors(error.response.data.errors);
    });

});
</script>
<template>
  <auth-layout>
    <div class="flex items-center justify-center w-full mx-auto md:relative order-2 md:order-1 pt-2 md:pt-28">
      <div class="w-full max-w-md rounded-[1rem] p-4">
        <form @submit.prevent="onSubmit">
          <FormHeader
            name="Join the waiting list"
            desc="Provide social proof and tell us a bit about yourself"
          />
          <Spacer size="8" />
          <div class="space-y-4">
            <div class="flex items-start space-x-6">
              <!-- First name -->
              <BaseInput
                readonly
                name="first_name"
                label="First Name"
                type="text"
                class="rounded-lg border-#DCDCE4 focus:border-#DCDCE4 cursor-not-allowed"
                :error="errors.first_name"
              />
              <!-- Last name -->
              <BaseInput
                readonly
                name="last_name"
                label="Last Name"
                type="text"
                class="rounded-lg border border-#DCDCE4 focus:border-#DCDCE4 cursor-not-allowed"
                :error="errors.last_name"
              />
            </div>

            <BaseInput
              name="email"
              type="email"
              label="Email Address"
              class="rounded-lg border-#DCDCE4 focus:border-#DCDCE4 w-full"
              aria-autocomplete="inline"
              autofocus
              :error="errors.email"
            />

            <div class="max-w-[31.9375rem] w-full space-y-[1.2rem]">
              <p class="font-medium text-sm text-1E1D24 mb-2">
                Social Proof
              </p>
              <!-- {{ values.socials }} -->
              <div
                v-for="(item, index) in values.socials"
                :key="index"
                class="pr-5"
              >
                <Listbox v-model="item.icon">
                  <div class="relative mt-1">
                    <div class="flex gap-3">
                      <ListboxButton
                        class="relative cursor-default inline-flex gap-3 justify-center rounded-lg px-4 py-3 focus:outline-none border border-#DCDCE4"
                      >
                        <Icon
                          class="fill-black text-lg"
                          :name="item.icon.icon"
                        />
                        <!-- <img :src="spotify" alt="" srcset=""> -->
                        <span v-html="item.icon.icon" />
                        
                        <ChevronDownIcon
                          class="h-6 w-6 text-1E1D24"
                          aria-hidden="true"
                        />
                      </ListboxButton>
                      <input
                        v-model="item.value"
                        :placeholder="item?.icon?.placeholder"
                        name="social"
                        type="text"
                        autofocus
                        class="rounded border-light-grey focus:border-light-grey w-full placeholder:text-#A3A2A5 placeholder:text-left"
                        :error="errors.social"
                      />
                    </div>

                    <transition
                      leave-active-class="transition duration-100 ease-in"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white z-20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <ListboxOption
                          v-for="social in socials"
                          :key="social.id"
                          :value="social"
                          class="hover:bg-black/5 group flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-1E1D24 cursor-pointer"
                          :disabled="social.unavailable"
                        >
                          <!-- <Icon
                            class="fill-black text-lg"
                            :name="social.icon"
                          /> -->
                          <span v-html="social.icon" />
                          {{ social.name }}
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>

                    <button
                      class="absolute -right-5 top-4"
                      @click.prevent="values.socials = values.socials.filter( icon => icon?.icon?.id !== item?.icon?.id )"
                    >
                      <!-- {{ item?.icon?.id }} -->
                      <XMarkIcon class="w-5 h-5 text-error" />
                    </button>
                  </div>
                </Listbox>
              </div>
              <p class="text-sm text-error">
                {{ errors.socials }}
              </p>

              <button
                class="font-medium text-sm flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-br from-orange to-red"
                @click.prevent="values.socials.push({ icon: {}, value: '' })"
              >
                <span class="text-lg">+</span>
                <span>New Link</span>
              </button>
            </div>
        
            <div class="pt-5">
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white rounded-lg py-3 w-full"
                :is-loading="isSubmitting"
              >
                Join the waitlist
              </BaseButton>
            </div>
          </div>
          <Spacer size="8" />
          <p class="text-center">
            Already have an account?
            <RouterLink
              :to="{ name: 'login' }"
              class="text-transparent bg-clip-text bg-gradient-to-b from-orange to-red underline font-medium"
            >
              Login
            </RouterLink>
          </p>
        </form>

        <RouterLink
          to="/"
          class="text-orange flex-none"
        >
          <img
            class="w-[6.813rem] bg-cover absolute left-20 top-11"
            src="@/assets/images/logo_3.png"
            alt="Corefans"
          />
        </RouterLink>
      </div>
    </div>
    <AuthSideLayout class="order-1 md:order-2" />
  </auth-layout>
</template>