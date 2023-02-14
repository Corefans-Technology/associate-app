<template>
  <div class="flex flex-col lg:flex-row max-w-8xl">
    <div class="w-full lg:w-1/3 space-y-3">
      <h3 class="text-xl font-medium">
        Exclusives
      </h3>
      <div class="text-sm text-98A2B3 space-y-4 leading-loose">
        <p>
          Offer sweet exclusives to reward your fans. Here are some
          tips:
        </p>

        <div>
          <ul class="list-disc pl-10">
            <li>
              Have exclusives that are related to your art, brand or the
              project you are raising for
            </li>
            <li>Include high ticket exclusives for large donations</li>
            <li>
              Create different exclusives for different donation amounts
            </li>
            <li>
              Make sure your video or image is clear and good quality
            </li>
            <li>Add photos that represent your perk</li>
            <li>Be very descriptive with your perk description</li>
          </ul>
          <p>
            Note: Delivery of your perk is solely your responsibility
            Need help?
          </p>
        </div>

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
        label="Exclusive Title"
        placeholder="e.g backstage pass to my June concert"
        name="title"
        type="text"
        autofocus
        :can-count-text="true"
        class="rounded border-light-grey focus:border-light-grey"
        desc="What is the title of your exclusive?"
        :error="errors.title"
      />
      <!-- Campaign description -->
      <BaseTextArea
        label="Exclusive Description"
        name="description"
        placeholder="Enter description"
        rows="3"
        autofocus
        :can-count-text="true"
        desc="Provide a short description that best describes benefits of claiming this perk to your audience."
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.description"
      />
      <!-- Exclusive Thumbnail -->
      <div class="max-w-sm">
        <BaseFile
          label="Exclusive Thumbnail"
          name="thumbnail"
          width="w-[15.625rem]"
          height="h-[15.625rem]"
          desc="Upload a square image of your exclusive."
          :error="errors.thumbnail"
        />
      </div>
      <!-- Quantity Available -->
      <BaseInput
        label="Quantity Available"
        placeholder="Enter quantity"
        name="quantity"
        type="number"
        autofocus
        desc="Limit the quantity available based on the production volume."
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.quantity"
      />
      <!-- Price -->
      <BaseInput
        label="Price"
        placeholder="Enter Price"
        name="price"
        type="number"
        autofocus
        desc="Set an amount you want to collect from fans who claim this perk."
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.price"
      />
      <!-- Discount Price -->
      <BaseInput
        label="Discount Price (Optional)"
        placeholder="Enter Discount"
        name="discount"
        type="number"
        autofocus
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.discount"
      />
      <BaseInput
        label="Delivery Date"
        placeholder="Enter Delivery Date"
        name="delivery_estimate"
        type="date"
        autofocus
        desc="Set an amount you want to collect from fans who claim this perk."
        class="rounded border-light-grey focus:border-light-grey"
        :error="errors.delivery_estimate"
      />
      <!-- Shipping details   -->
      <div class="space-y-1 relative">
        <label for="is_shippable">Shipping details </label>
        <div class="text-light-trunks text-sm flex items-center justify-between">
          <p>Does this perk contain items you need to ship?</p>
        </div>

        <div class="pt-4 space-y-4">
          <BaseRadio
            v-model="isShippable"
            name="is_shippable"
            label="No, It does not."
            :value="0"
          />
          <BaseRadio
            v-model="isShippable"
            name="is_shippable"
            label="Yes, It does"
            :value="1"
          />
        </div>

        <div v-if="isShippable">
          <div
            v-for="(field, key) in shippingFields"
            :key="field.key"
          >
            <div class="flex items-center justify-center space-x-4 pt-5 max-w-lg">
              <!-- Location -->
              <BaseSelect
                label="Shipping location"
                :options="locations"
                :searchable="false"
                :name="`shipping[${key}].location`"
                placeholder="Select location"
                class="rounded border border-light-grey focus:border-light-grey"
                :error="errors.shipping"
              />
              <!-- Discount Price -->
              <BaseInput
                label="Shipping fee"
                placeholder="Enter Shipping fee"
                :name="`shipping[${key}].amount`"
                type="number"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                :error="errors.shipping"
              />
              <!-- Remove Button -->
              <button
                type="button"
                aria-label="minus"
                @click="removeShipping(key)"
              >
                <span class="rounded-full border border-orange w-6 h-6 flex items-center justify-center text-orange"> <Icon name="minus" /> </span>
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="isShippable"
          aria-label="add"
          type="button"
          class="focus:outline-none  text-orange flex items-center space-x-2 text-sm pt-2"
          @click="pushShipping({ location: '', amount: '' })"
        >
          <span class="rounded-full border border-orange w-6 h-6 flex items-center justify-center"> <Icon name="add" /> </span>
          <span>Add new variant</span>
        </button>
      </div>

      <Spacer size="2" />
      <!-- Variations  -->
      <div class="space-y-1 relative">
        <label for="has_attribute"> Variations </label>
        <div class="text-light-trunks text-sm flex items-center justify-between">
          <p>Do supporters have options to choose from this item e.g color, size etc?</p>
        </div>

        <div class="pt-4 space-y-4">
          <BaseRadio
            v-model="hasAttribute"
            name="has_attribute"
            label="No, There are no options for this item"
            :value="0"
          />
          <BaseRadio
            v-model="hasAttribute"
            name="has_attribute"
            label="Yes, I am offering options for this item."
            :value="1"
          />
        </div>

        <div v-if="hasAttribute">
          <div
            v-for="(field, key) in attributeFields"
            :key="field.key"
          >
            <div class="flex items-center justify-center space-x-4 pt-5 max-w-lg">
              <!-- Location -->
              <br />
              <BaseSelect
                label="Variant name"
                label-prop="name"
                :options="genericStore.attributes"
                :searchable="true"
                :placeholder="`Select Variant name`"
                :name="`attributes[${key}].name`"
                value-prop="id"
                track-by="id"
                class="rounded border border-light-grey focus:border-light-grey "
                :error="errors.attributes"
              />

              <!-- Discount Price -->
              <BaseInput
                label="Variant value"
                placeholder="Enter Variant value"
                :name="`attributes[${key}].value`"
                type="text"
                autofocus
                class="rounded border-light-grey focus:border-light-grey"
                :error="errors.attributes"
              />
              <!-- Remove Button -->
              <button
                type="button"
                aria-label="minus"
                @click="removeAttribute(key)"
              >
                <span class="rounded-full border border-orange w-6 h-6 flex items-center justify-center text-orange"> <Icon name="minus" /> </span>
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="hasAttribute"
          aria-label="add"
          type="button"
          class="focus:outline-none  text-orange flex items-center space-x-2 text-sm pt-2"
          @click="pushAttribute({ name: '', value: '' })"
        >
          <span class="rounded-full border border-orange w-6 h-6 flex items-center justify-center"> <Icon name="add" /> </span>
          <span>Add new variant</span>
        </button>
      </div>

      <Spacer size="2" />
      <div class="w-full flex space-x-4 py-8 mt-6 border-t">
        <div class="flex-grow flex items-center">
          <BaseButton
            type="button"
            class="text-light-grey-2 text-sm rounded border border-light-grey-2"
            @click="$emit('ChangeView', 'IndexView')"
          >
            Close
          </BaseButton>
        </div>
        <BaseButton
          :is-loading="isSubmitting"
          class="bg-gradient-to-r from-orange to-red text-white text-sm rounded"
        >
          Add
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Icon from "@/components/Icon.vue";
import Title from "@/components/Title.vue";

import { useCampaignStore } from "@/stores/campaign";
import { useManagerStore } from "@/stores/manager";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseFile from "@/components/base/BaseFile.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import {boolean, object, string, date, array, mixed, number  } from "yup";
import { useForm, useFieldArray  } from "vee-validate";
import BaseSelect from "@/components/base/BaseSelect.vue";
import Spacer from "@/components/Spacer.vue";
import {useRoute, useRouter} from "vue-router";
import BaseRadio from "@/components/base/BaseRadio.vue";
import {useGenericStore} from "@/stores/generic";
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["ChangeView"])
const campaignStore = useCampaignStore();
const genericStore = useGenericStore();
genericStore.getExclusiveAttribute();

let isShippable = ref(false)
let hasAttribute = ref(false)


const schema = computed(() => {
  return object({
    title: string().required().label("Title"),
    description: string().required().label("Description"),
    quantity: number().required().label("Quantity"),
    price: number().required().label("Price"),
    delivery_estimate: date().required().label("Delivery Date"),
    discount: string().nullable().typeError("This Discount should be a number").label("Discount"),
    is_shippable: boolean(),
    has_attribute: boolean(),
    shipping: array().label("shipping"),
    attributes: array().label("attributes"),
    thumbnail: mixed().required().label("Image"),
  })
});

const { handleSubmit, errors, isSubmitting } = useForm({
  initialValues: {
    is_shippable: false,
    has_attribute: false,
    delivery_estimate: new Date(),
    shipping: [{ location: "", amount: "" }],
    attributes: [{ name: "", value: "" }],
  },
  validationSchema: schema,
})

const { remove: removeShipping, push: pushShipping, fields: shippingFields } = useFieldArray("shipping");
const { remove: removeAttribute, push: pushAttribute, fields: attributeFields } = useFieldArray("attributes");

const submit = handleSubmit( async (values, actions) => {
  await campaignStore.exclusive({
    step: 4,
    ...values,
    id: route.params.id,
  }).then( async (response) => {

    Toast.fire({
      icon: "success",
      title: "New Exclusive Created!",
    });
    emit("ChangeView", "IndexView")
    await campaignStore.getCampaignExclusives(route.params.id);
  }).catch((error) => {
    Toast.fire({
      icon: "error",
      title:  error.data.message,
    });
    actions.setErrors(error.data.errors);
  })
});


const locations = ref(["Nigeria", "Ghana", "United State Of American", "South Africa"]);


</script>
