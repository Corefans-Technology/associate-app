<script setup>
import {computed, ref} from "vue";
import Spacer from "@/components/Spacer.vue";
import FormHeader from "@/components/FormHeader.vue";
import { useManagerStore } from "@/stores/manager";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

import { object, number } from "yup";
import {useForm} from "vee-validate";
import { useRouter } from 'vue-router'

const loading = ref(false);
const managerStore = useManagerStore();
const router = useRouter()

const schema = computed(() => {
  return object({
    invite_code: number().required().label('Invitation Code'),
  })
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const handleVerify = handleSubmit( async ( values, actions ) =>  {
  loading.value = true;
  managerStore
      .verifyInviteCode(values)
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.massage,
        });
         console.log(response.data);
        managerStore.form.email = response.data.email;
        managerStore.form.first_name = response.data.first_name;
        managerStore.form.last_name = response.data.last_name;
        managerStore.form.phone_number = response.data.phone_number;
        managerStore.form.invite_code = values.invite_code;
        return router.push({name: "sign.up.personal.info"});

      })
      .catch(( error ) => {
        actions.setFieldError('invite_code', error.data.message);
        console.log(error.data.errors);
      }).finally(() => loading.value = false );
});
</script>
<template>
  <div class="w-[31.75rem] 2xl:w-[40rem] rounded-[1rem] p-[3rem] space-y-[1.8rem]">
    <form @submit.prevent="handleVerify">
      <FormHeader name="Create your Account" desc="Welcome back! Please fill in your details." />
      <Spacer size="10" />
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
      <Spacer size="2" />
      <div
          class="text-sm text-orange flex justify-end items-center pt-1"
      >
        <p class="text-right">Why you need an invitation code</p>
        <ChevronRightIcon class="w-3 h-3" />
      </div>
      <Spacer size="10" />
      <div>
        <div class="space-y-3">
          <RouterLink :to="{ name: 'awaiting.list' }" class="flex items-center justify-center border border-orange text-orange rounded text-base font-medium h-12">
                  <span
                  >I don’t have an invitation</span>
          </RouterLink>


          <BaseButton
              class="bg-gradient-to-r from-orange to-red text-white rounded w-full"
              :is-loading="loading"
              @click="handleVerify"
              type="button"
          >Continue</BaseButton
          >
        </div>
        <Spacer size="8" />
        <p class="text-center">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="text-orange">Login</RouterLink>
        </p>
      </div>
    </form>
  </div>
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
