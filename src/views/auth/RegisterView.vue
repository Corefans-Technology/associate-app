<script setup>
import useVuelidate from "@vuelidate/core";
import AuthLayout from "@/layouts/AuthLayout.vue";
import {computed, reactive, ref} from "vue";
import { required, email, maxLength, minLength } from "@vuelidate/validators";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
// import GradientTitle from "@/components/GradientTitle.vue";
// import SignUpStep from "@/components/SignUpStep.vue";
// import BaseButton from "@/components/BaseButton.vue";
import FormGroup from "@/components/FormGroup.vue";
import FormHeader from "@/components/FormHeader.vue";
import TextInput from "@/components/TextInput.vue";
import InputError from "@/components/InputError.vue";
import { useManagerStore } from "@/stores/manager";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useLoading } from "vue-loading-overlay";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

import { RouterLink } from "vue-router";
import Swal from "sweetalert2";
import {boolean, object, string} from "yup";
import {useForm} from "vee-validate";

const managerStore = useManagerStore();
managerStore.$reset();

const $loading = useLoading({});

const showpassword = ref(false);

// const hasVerify =

const form = reactive(managerStore.form);

const otpInput = ref(null);
const signUp = ref(null);
const success = ref(false);

const schema = computed(() => {
  return object({
    email: string().required().email().label('Email Address'),
    password: string().required().label('Password'),
    remember: boolean(),
  })
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

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
      success.value = true;
      // window.location.pathname = "/";
    })
    .catch((error) => {
      console.log(error.data);
      Toast.fire({
        icon: "error",
        title: `${error.data.message}!`,
      });
    });
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

const clearInput = () => {
  otpInput.value.clearInput();
};

const next = () => {
  managerStore.step += 1;
};

const previous = () => {
  managerStore.step -= 1;
};

const resetStep = () => {
  managerStore.step += 1;
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
  phone_number: {
    required,
  },
  invite_code: {
    required,
    maxLength: maxLength(5),
    minLength: minLength(5),
  },
  password: {
    required,
  },
};

const $v = useVuelidate(rules, form);

const handleVerify = () => {
  $v._value.$touch();
  if (!$v._value.invite_code.$invalid) {
    managerStore
      .verifyInviteCode(form.invite_code)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.massage,
        });
        // console.log(response.data);
        form.email = response.data.email;
        form.first_name = response.data.first_name;
        form.last_name = response.data.last_name;
        form.phone_number = response.data.phone_number;
        // form.invite_code = value;
        next();
      })
      .catch(( error ) => {
        console.log(error.data.errors);
        Toast.fire({
          icon: "error",
          title: `okay!`,
        });
      });
  }
};
</script>
<template>
  <auth-layout>
    <div class="grid grid-cols-2 h-screen">
      <div
        class="relative bg-cover bg-[url('@/assets/images/auth_bg.png')] p-20 flex flex-col"
      >
        <RouterLink to="/" class="text-orange flex-none">
          <img
            class="w-[6.813rem] bg-cover"
            src="@/assets/images/logo_2.png"
            alt=""
            srcset=""
          />
        </RouterLink>

        <div class="flex-grow flex flex-col justify-end text-white space-y-3">
          <h2 class="text-[40px] font-bold leading-[45px]">
            Turn your ideas <br />
            into reality
          </h2>
          <p class="text-xl font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center w-full mx-auto">
        <div v-if="success" class="space-y-5">
          <div
            class="w-[31.75rem] bg-white rounded-[1rem] p-[2rem] pt-2 pb-[2rem] space-y-[1.5rem]"
          >
            <div class="w-[19.77625rem] h-[18.830625rem] mx-auto">
              <img
                class="w-[316.42px] h-[301.29px] object-cover"
                src="@/assets/images/success.png"
                alt=""
              />
            </div>

            <div>
              <h1
                class="text-[1.75rem] font-semibold text-[#000000] text-center"
              >
                You’re in🚀
              </h1>
              <p
                @click="previous"
                class="text-[#434345] text-lg font-light text-center"
              >
                Let’s start raising funds for your next project.
              </p>
            </div>

            <div class="pt-8 pb-6">
              <a
                href="/"
                class="bg-gradient-to-r from-orange to-red text-white font-medium text-base h-[44px] px-4 rounded flex items-center justify-center w-full"
                >Let’s Go</a
              >
            </div>
          </div>
        </div>

        <div
          v-else
          class="w-[31.75rem] 2xl:w-[40rem] bg-white rounded-[1rem] p-[3rem] space-y-[1.8rem]"
          ref="signUp"
        >
          <div v-if="managerStore.step > 1 && managerStore.step < 4">
            <div class="space-y-3">
              <h1 class="text-4xl font-semibold text-black">
                Let’s get started
              </h1>
              <p class="text-black text-xl font-light">
                Tell us a bit about yourself
              </p>
            </div>
          </div>

          <div
            v-if="managerStore.step > 1 && managerStore.step < 4"
            class="space-y-2"
          >
            <div class="w-full h-1 rounded-[10px] bg-#D5D5D5 relative">
              <div
                :class="[
                  managerStore.step > 1 && managerStore.step === 2
                    ? 'w-2/4'
                    : 'w-full',
                ]"
                class="absolute inset-y-0 bg-orange rounded-[10px]"
              ></div>
            </div>
            <p class="">Personal Information: 1/2</p>
          </div>

          <form
            :class="[managerStore.step === 1 ? 'pb-10' : '']"
            @submit.prevent="submit"
          >
            <fieldset v-show="managerStore.step === 1" class="space-y-5">
              <FormHeader name="Create your Account" desc="Welcome back! Please fill in your details." />

              <BaseInput
                  name="invite_code"
                  label="Invitation Code"
                  pattern="\d*"
                  type="text"
                  minlength="6"
                  maxlength="6"
                  inputmode="numeric"
                  placeholder="888 888"
                  class="rounded border-beerus focus:border-beerus"
                  :error="errors.invite_code"
              />
              <spacer size="4" />
              <div class="space-y-6">
                <!-- Invitation Code -->
                <!-- @input="$v.email.$touch()"
                    :class="[
                      $v.email.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]" -->
                <FormGroup>
                  <label for="Invitation">Invitation Code</label>
                  <TextInput
                    pattern="\d*"
                    type="text"
                    minlength="6"
                    maxlength="6"
                    inputmode="numeric"
                    id="Invitation"
                    v-model="form.invite_code"
                    @input="$v.invite_code.$touch()"
                    :class="[
                      $v.invite_code.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]"
                    placeholder="888 888"
                    class="rounded px-[1rem] py-[0.813rem] w-full"
                    aria-label="Invitation"
                  />
                  <InputError
                    class="left-0 -bottom-5 text-sm"
                    :message="
                      $v.invite_code.required.$invalid ? 'Code is Required' : ''
                    "
                    v-show="$v.invite_code.$error"
                  />
                  <div
                    class="text-sm text-orange flex justify-end items-center pt-1"
                  >
                    <p class="text-right">Why you need an invitation code</p>
                    <ChevronRightIcon class="w-3 h-3" />
                  </div>
                </FormGroup>

                <div class="space-y-3">
                  <base-button
                    class="border border-orange text-orange rounded py-3 w-full"
                    :is-loading="loading"
                    >I don’t have an invitation</base-button
                  >

                  <base-button
                    class="bg-gradient-to-r from-orange to-red text-white rounded py-3 w-full"
                    :is-loading="loading"
                    @click="handleVerify"
                    type="button"
                    >Continue</base-button
                  >
                </div>

                <p class="text-center pt-5">
                  Already have an account?
                  <RouterLink to="login" class="text-orange">Login</RouterLink>
                </p>
              </div>
            </fieldset>

            <fieldset v-show="managerStore.step === 2" class="space-y-5">
              <div class="space-y-5">
                <!-- Names -->
                <div class="flex items-start space-x-6">
                  <FormGroup>
                    <label for="First_name">First Name</label>
                    <TextInput
                      type="text"
                      readonly
                      class="rounded px-[1rem] py-[0.813rem] w-full cursor-not-allowed"
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
                      readonly
                      v-model="form.last_name"
                      class="rounded px-[1rem] py-[0.813rem] w-full cursor-not-allowed"
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

                <!-- Phone -->
                <FormGroup>
                  <label for="Phone_number">Phone Number</label>
                  <TextInput
                    type="text"
                    id="Phone_number"
                    v-model="form.phone_number"
                    @input="$v.phone_number.$touch()"
                    :class="[
                      $v.phone_number.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]"
                    class="rounded px-[1rem] py-[0.813rem] w-full"
                    placeholder="70 397 6220"
                    aria-label="Phone_number"
                  />
                  <span
                    class="absolute inset-y-0 left-0 flex items-center pl-2"
                  >
                    <div
                      v-if="false"
                      class="w-24 relative mt-2 border rounded-lg z-10"
                    >
                      <Listbox v-if="false" v-model="selectedCountry">
                        <ListboxButton
                          class="relative cursor-default mx-auto h-full flex items-center space-x-2 justify-center pl-2"
                        >
                          <img
                            class="w-6 h-5 rounded-full object-cover object-center bg-no-repeat"
                            :src="selectedCountry.attributes.flag_url"
                            :alt="selectedCountry.attributes.name"
                          />
                          <span
                            class="pointer-events-none inset-y-0 right-0 flex items-center pr-2 text-grayscale-300"
                          >
                            <ChevronUpDownIcon class="h-4 w-4" />
                          </span>
                        </ListboxButton>
                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm absolute divide-y"
                          >
                            <!--
                                            v-slot="{ active, selected }" -->
                            <ListboxOption
                              v-for="country in countries"
                              :key="country.id"
                              :value="country"
                              as="template"
                            >
                              <div
                                class="flex items-center space-x-2 py-2 px-3 w-24"
                              >
                                <img
                                  class="w-6 h-5 rounded-full object-cover object-center bg-no-repeat"
                                  :src="country.attributes.flag_url"
                                  :alt="country.attributes.name"
                                />
                                <p>{{ country.attributes.dialing_code }}</p>
                              </div>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </Listbox>
                    </div>
                  </span>
                  <InputError
                    class="left-0 -bottom-5 text-sm"
                    :message="
                      $v.phone_number.required.$invalid
                        ? 'Phone number is Required'
                        : ''
                    "
                    v-show="$v.phone_number.$error"
                  />
                </FormGroup>

                <!-- Email Address -->
                <FormGroup>
                  <label for="email">Email Address</label>
                  <TextInput
                    type="email"
                    readonly
                    id="email"
                    v-model="form.email"
                    @input="$v.email.$touch()"
                    :class="[
                      $v.email.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]"
                    placeholder="Email Address"
                    class="rounded px-[1rem] py-[0.813rem] w-full cursor-not-allowed"
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
                <!-- Password -->
                <FormGroup>
                  <label for="password">Password</label>
                  <TextInput
                    :type="!showpassword ? 'password' : 'text'"
                    id="password"
                    v-model="form.password"
                    @input="$v.password.$touch()"
                    class="rounded px-[1rem] py-[0.813rem] w-full"
                    :class="[
                      $v.password.$error
                        ? 'border-red focus:border-red'
                        : 'border-#EBEBEB focus:border-#EBEBEB',
                    ]"
                    placeholder="Password"
                    aria-label="password"
                  />
                  <InputError
                    class="left-0 -bottom-5 text-sm"
                    :message="
                      $v.password.required.$invalid
                        ? 'password is Required'
                        : ''
                    "
                    v-show="$v.password.$error"
                  />

                  <span
                    @click="showpassword = !showpassword"
                    class="text-sm text-black underline absolute top-9 right-5"
                  >
                    {{ showpassword ? "Hide" : "Show" }}
                  </span>
                </FormGroup>

                <div class="pt-8 pb-3">
                  <base-button
                    class="bg-gradient-to-r from-orange to-red text-white rounded py-3"
                    :is-loading="loading"
                    @click.prevent="next"
                    type="button"
                    >Create Your Account
                  </base-button>
                </div>

                <p class="text-center pt-5">
                  Already have an account?
                  <RouterLink to="login" class="text-orange">Login</RouterLink>
                </p>

                <!-- <p class="text-sm text-[#818181] text-center">
                  By clicking ‘Continue’ you agree to Corefans’
                  <a class="text-[#F18B1B]" href="/terms_of_service"
                    >Terms of Service</a
                  >
                  and
                  <a class="text-[#F18B1B]" href="/privacy_policies"
                    >Privacy Policies</a
                  >
                </p> -->
              </div>
            </fieldset>

            <fieldset v-show="managerStore.step === 3" class="space-y-5">
              <!-- Username -->
              <FormGroup>
                <label for="Username">Username</label>
                <TextInput
                  type="text"
                  id="Username"
                  v-model="form.username"
                  class="rounded px-[1rem] py-[0.813rem] w-full border-#EBEBEB focus:border-#EBEBEB"
                  placeholder=""
                  aria-label="Username"
                />
              </FormGroup>

              <!-- Type of creator -->
              <div class="">
                <label for="creator">Type of creator</label>
                <select
                  name=""
                  aria-label="creator"
                  v-model="form.type"
                  id=""
                  class="text-sm placeholder-[#797979] text-left placeholder:text-left placeholder:font-normal border border-[#EBEBEB] rounded px-[1rem] py-[0.813rem] w-full focus:outline-none"
                >
                  <option selected value=""></option>
                  <option>Musician</option>
                  <option>Comedian</option>
                </select>
              </div>

              <!-- Username -->
              <FormGroup>
                <label for="url">URL</label>
                <TextInput
                  type="text"
                  id="url"
                  v-model="form.username"
                  class="rounded pl-[110px] px-[1rem] py-[0.813rem] w-full border-#EBEBEB focus:border-#EBEBEB"
                  placeholder="Username"
                  aria-label="url"
                />
                <span class="absolute top-9 left-0 text-[#797979] pl-[1rem]">
                  corefans.co/
                </span>
                <p
                  class="text-black text-sm font-medium text-left w-full block"
                >
                  No pressure. You can change this later in setttings
                </p>
              </FormGroup>
              <!-- @click.prevent="next" -->
              <div class="pt-8 pb-3">
                <base-button
                  class="bg-gradient-to-r from-orange to-red text-white rounded py-3"
                  :is-loading="loading"
                  type="submit"
                  >Create Your Account
                </base-button>
              </div>

              <p class="text-center pt-5">
                Already have an account?
                <RouterLink to="login" class="text-orange">Login</RouterLink>
              </p>
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
