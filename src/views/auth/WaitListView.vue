<script setup>
import useVuelidate from "@vuelidate/core";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { reactive, ref } from "vue";
import { required, email } from "@vuelidate/validators";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
// import GradientTitle from "@/components/GradientTitle.vue";
// import SignUpStep from "@/components/SignUpStep.vue";
import Icon from "@/components/Icon.vue";
import FormGroup from "@/components/FormGroup.vue";
import TextInput from "@/components/TextInput.vue";
import InputError from "@/components/InputError.vue";
import { useManagerStore } from "@/stores/manager";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { useLoading } from "vue-loading-overlay";
import BaseButton from "@/components/base/BaseButton.vue";
import AuthSideLayout from "@/components/AuthSideLayout.vue";

const managerStore = useManagerStore();

const $loading = useLoading({});
const selectedSocial = ref({});
const socials = ref([
  {
    name: "Preferences",
    icon: "Preferences",
  },
  {
    name: "Preferences",
    icon: "Preferences",
  },
]);

const form = reactive(managerStore.form);

const submit = (value) => {
  managerStore
    .signUp(form)
    .then(async (response) => {
      Toast.fire({
        icon: "success",
        title: response.data?.massage,
      });
      signUp.value.classList.add("invisible");
      managerStore.$reset();
      await managerStore.profile();
      window.location.pathname = "/";
    })
    .catch((error) => {
      console.log(error.data);
      Toast.fire({
        icon: "error",
        title: `${error.data.message}!`,
      });
    });
};

const rules = {
  first_name: {
    required,
  },
  last_name: {
    required,
  },
  email: {
    required,
    email,
  },
  social_proof: {
    required,
  },
};

const $v = useVuelidate(rules, form);
</script>
<template>
  <auth-layout>
    <div class="grid grid-cols-2 h-screen">
      <AuthSideLayout />
      <div class="flex items-center justify-center w-full mx-auto">
        <div
          class="w-[31.75rem] 2xl:w-[40rem] bg-white rounded-[1rem] p-[3rem] space-y-[1.8rem]"
          ref="signUp"
        >
          <div>
            <div class="space-y-3">
              <h1 class="text-4xl font-semibold text-black">
                Join the waiting list
              </h1>
              <p class="text-black text-xl font-light">
                Tell us a bit about yourself
              </p>
            </div>
          </div>

          <form @submit.prevent="submit">
            <fieldset class="space-y-5">
              <div class="space-y-5">
                <!-- Names -->
                <div class="flex items-start space-x-6">
                  <FormGroup>
                    <label for="First_name">First Name</label>
                    <TextInput
                      type="text"
                      class="rounded px-[1rem] py-[0.813rem] w-full"
                      id="First_name"
                      v-model="form.first_name"
                      @input="$v.first_name.$touch()"
                      :class="[
                        $v.first_name.$error
                          ? 'border-red focus:border-red'
                          : 'border-#EBEBEB focus:border-#EBEBEB',
                      ]"
                      :has-error="$v.first_name.$error"
                      placeholder="First name"
                      aria-label="First_name"
                    />
                    <InputError
                      class="text-sm"
                      :message="
                        $v.first_name.required.$invalid
                          ? 'First name is Required'
                          : ''
                      "
                      v-show="$v.first_name.$error"
                    />
                  </FormGroup>
                  <!-- Last name -->
                  <FormGroup>
                    <label for="Last_name">Last Name</label>
                    <TextInput
                      type="text"
                      id="Last_name"
                      v-model="form.last_name"
                      class="rounded px-[1rem] py-[0.813rem] w-full"
                      @input="$v.last_name.$touch()"
                      :class="[
                        $v.last_name.$error
                          ? 'border-red focus:border-red'
                          : 'border-#EBEBEB focus:border-#EBEBEB',
                      ]"
                      placeholder="Last name"
                      aria-label="Last_name"
                    />
                    <InputError
                      class="left-0 -bottom-5 text-sm"
                      :message="
                        $v.last_name.required.$invalid
                          ? 'Last name is Required'
                          : ''
                      "
                      v-show="$v.last_name.$error"
                    />
                  </FormGroup>
                </div>

                <!-- Email Address -->
                <FormGroup>
                  <label for="email">Email Address</label>
                  <TextInput
                    type="email"
                    id="email"
                    v-model="form.email"
                    @input="$v.email.$touch()"
                    :class="[
                      $v.email.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]"
                    placeholder="Email Address"
                    class="rounded px-[1rem] py-[0.813rem] w-full"
                    aria-label="email"
                  />
                  <InputError
                    class="left-0 -bottom-5 text-sm"
                    :message="
                      $v.email.required.$invalid
                        ? 'Email Address is Required'
                        : 'Email not Valid'
                    "
                    v-show="$v.email.$error"
                  />
                </FormGroup>

                <!-- Social Proof -->
                <FormGroup>
                  <label for="social_proof">Social Proof</label>
                  <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                      <Listbox
                        v-slot="{ open }"
                        as="div"
                        v-model="selectedSocial"
                      >
                        <ListboxButton
                          class="relative cursor-default w-[6.563rem] border rounded py-[14px] h-full flex items-center space-x-2 justify-between px-4"
                        >
                          <Icon
                            class="fill-current text-black"
                            name="instagram"
                          />
                          <span
                            class="pointer-events-none flex items-center text-grayscale-300"
                          >
                            <ChevronDownIcon :class="[open ? ' rotate-180' : '']" class="h-4 w-4" />
                          </span>
                        </ListboxButton>
                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="mt-1 max-h-60 w-[10rem] overflow-auto rounded bg-white py-1 text-base focus:outline-none sm:text-sm absolute z-50 shadow"
                          >
                            <ListboxOption
                              v-for="(social, index) in socials"
                              :key="index"
                              :value="social"
                              as="template"
                            >
                              <div class="flex items-center space-x-2 py-3 px-3">
                                <Icon
                                  class="fill-current text-black"
                                  name="instagram"
                                />
                                <p>{{ social.name }}</p>
                              </div>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </Listbox>
                      <TextInput
                        type="text"
                        id="social_proof"
                        v-model="form.social_proof"
                        class="border-#EBEBEB focus:border-#EBEBEB flex-grow rounded px-[1rem] py-[0.813rem] w-full"
                        placeholder=""
                        aria-label="social_proof"
                      />
                    </div>
                    <div class="flex items-center space-x-4">
                      <Listbox
                        v-slot="{ open }"
                        as="div"
                        v-model="selectedSocial"
                      >
                        <ListboxButton
                          class="relative cursor-default w-[6.563rem] border rounded py-[14px] h-full flex items-center space-x-2 justify-between px-4"
                        >
                          <Icon
                            class="fill-current text-black"
                            name="instagram"
                          />
                          <span
                            class="pointer-events-none flex items-center text-grayscale-300"
                          >
                            <ChevronDownIcon :class="[open ? ' rotate-180' : '']" class="h-4 w-4" />
                          </span>
                        </ListboxButton>
                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="mt-1 max-h-60 w-[10rem] overflow-auto rounded bg-white py-1 text-base focus:outline-none sm:text-sm absolute z-50 shadow"
                          >
                            <ListboxOption
                              v-for="(social, index) in socials"
                              :key="index"
                              :value="social"
                              as="template"
                            >
                              <div class="flex items-center space-x-2 py-3 px-3">
                                <Icon
                                  class="fill-current text-black"
                                  name="instagram"
                                />
                                <p>{{ social.name }}</p>
                              </div>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </Listbox>
                      <TextInput
                        type="text"
                        id="social_proof"
                        v-model="form.social_proof"
                        class="border-#EBEBEB focus:border-#EBEBEB flex-grow rounded px-[1rem] py-[0.813rem] w-full"
                        placeholder=""
                        aria-label="social_proof"
                      />
                    </div>
                  </div>
                  <!-- <InputError
                    class="left-0 -bottom-5 text-sm"
                    :message="
                      $v.phone_number.required.$invalid
                        ? 'Phone number is Required'
                        : ''
                    "
                    v-show="$v.phone_number.$error"
                  /> -->
                </FormGroup>

                <div class="pt-8 pb-3">
                  <base-button
                    class="bg-gradient-to-r from-orange to-red text-white rounded py-3 w-full"
                    :is-loading="loading"
                    @click.prevent="next"
                    type="button"
                    >Join the waitlist
                  </base-button>
                </div>

                <p class="text-center pt-5">
                  Already have an account?
                  <RouterLink :to="{ name: 'login' }" class="text-orange"
                    >Login</RouterLink
                  >
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<style>
.otp-input-invitation {
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input-invitation {
  border-width: 1px;
  border-color: #b9b9b9;
}
.otp-input-invitation.is-complete {
  border-color: #ff6666;
}

.otp-input-invitation::-webkit-inner-spin-button,
.otp-input-invitation::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
