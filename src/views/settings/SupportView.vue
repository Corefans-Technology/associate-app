<template>
  <TabPanel class="">
    <!-- <pre>
      {{ creativeStore.data }}
    </pre> -->
    <form @submit="submit">
      <div class="space-y-20 border-b pb-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-5 max-w-[1120px]">
          <div class="w-full max-w-[25rem] space-y-3">
            <h3 class="text-xl font-bold font-power">
              Support
            </h3>
            <p class="text-sm text-[#7D7C80]">
              Questions or assistance needed? Reach out to our customer support team for prompt help and a seamless experience.
            </p>
          </div>

          <div class="w-full space-y-[1.2rem]">
            <BaseInput
              label="Subject"
              name="subject"
              type="text"
              autofocus
              readonly
              placeholder="Enter subject"
              class="rounded-lg border-light-grey focus:border-light-grey capitalize"
              :error="errors.campaign_name"
            />

            <!-- Genres -->
            <BaseSelect
              label="Support Request Type"
              label-prop="name"
              :options="[
                { id: 'General Inquiry', name: 'General Inquiry'},
                { id: 'Campaign Issue', name: 'Campaign Issue'},
                { id: 'Payment Issue', name: 'Payment Issue'},
                { id: 'Refund Issuey', name: 'Refund Issuey'},
                { id: 'Other', name: 'Other'},
              ]"
              value-prop="id"
              track-by="name"
              placeholder="Select request type"
              name="type"
              class="rounded-lg border border-light-grey focus:border-light-grey"
              :error="errors.type"
            />
            <!-- Genres -->
            <!-- <pre>
              {{ campaigns }}
            </pre> -->
            <BaseSelect
              v-if="controlledValues.type === 'Campaign Issue'"
              label="Campaign"
              label-prop="name"
              :options="campaigns"
              value-prop="id"
              track-by="name"
              placeholder="Select Campaign"
              name="campaign_id"
              class="rounded-lg border border-light-grey focus:border-light-grey"
              :error="errors.campaign_id"
            />
            
            <!-- About you -->
            <BaseTextArea
              label="Support Request Description"
              name="description"
              rows="4"
              autofocus
              placeholder="Enter description"
              class="rounded-lg border-light-grey focus:border-light-grey"
              :error="errors.description"
              desc="Please describe your support request in as much detail as possible"
            />

            <BaseFileWithoutPreview
              name="attachment"
              label="Attachment (optional)"
              width="w-full md:w-[343px]"
              height="h-[63px]"
              :error="errors.attachment"
              desc="Attach any relevant screenshots or other files to your support request"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end py-10">
        <BaseButton
          :is-loading="loading"
          class="px-4 py-3 rounded-lg bg-gradient-to-br from-orange to-red text-white text-[0.8125rem] w-full md:w-fit h-11"
        >
          Save Changes
        </BaseButton>
      </div>
    </form>
  </TabPanel>
</template>

<script setup>
import { TabPanel } from "@headlessui/vue";
import {ref,  onMounted, computed} from "vue";
import { useManagerStore } from "@/stores/manager";
// import { useGenericStore } from "@/stores/generic";
import {mixed, object, string} from "yup";
import { useForm } from "vee-validate";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseFileWithoutPreview from "@/components/base/BaseFileWithoutPreview.vue";
import {useWalletStore} from "@/stores/wallet";
import {storeToRefs} from "pinia";



const walletStore = useWalletStore();
walletStore.getCreativeCampaign();
const { campaigns } = storeToRefs(walletStore);

const creativeStore = useManagerStore();
// const genericStore = useGenericStore();


// genericStore.getGenres();

const loading = ref(false);


const schema = computed(() => {
  return object({
    subject: string().required().label("Subject"),
    campaign_id: string().label("Campaign").nullable(),
    type: string().required().label("Support Request Type"),
    description: string().required().label("Support Request Description"),
    attachment: mixed().label("Attachment (optional)"),
  })
});

const { handleSubmit, errors, resetForm, controlledValues } = useForm({
  validationSchema: schema,
  initialValues: {
    attachment: [],
    campaign_id: null,
  },
})

const submit = handleSubmit( async (values, actions) => {
  loading.value = true;
  await creativeStore.support({
    ...values,
  }).then(() => {
    // eslint-disable-next-line no-undef
    resetForm()
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "success",
      title:  "Saved!",
    });
  }).catch(error => {
    // eslint-disable-next-line no-undef
    Toast.fire({
      icon: "error",
      title: error.data.message,
    });
    actions.setErrors(error.data.errors);
  }).finally(() => loading.value = false );
});

onMounted( async() => {
  await walletStore.getCreativeCampaign();
})
</script>

