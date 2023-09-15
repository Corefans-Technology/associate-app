<script>
export default {
  inheritAttrs: false,
}
</script>

<script setup>

import UniqueID from "@/composables/unique_id";
import {useField} from "vee-validate";
import {toRef,  ref } from "vue";
import Multiselect from "@vueform/multiselect";
import BaseError from "@/components/base/BaseError.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  canDeselect: {
    type: Boolean,
    default: true,
  },
  canClear: {
    type: Boolean,
    default: false,
  },
  createOption: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    required: false,
    default: "single",
  },
  error: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
  desc: {
    type: String,
    default: undefined,
  },
  max: {
    type: Number,
    required: false,
    default: -1,
  },
  trackBy: {
    type: String,
    required: false,
    default: undefined,
  },
  valueProp: {
    type: String,
    required: false,
    default: "value",
  },
  labelProp: {
    type: String,
    required: false,
    default: "label",
  },
});

const input = ref("");
const nameRef = toRef(props, "name");
const { value } = useField(nameRef);

const uuid = UniqueID().getID();

</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="uuid"
      class="text-1E1D24 text-base font-medium"
    >{{ label }}</label>
    <Multiselect
      v-bind="$attrs"
      ref="input"
      v-model="value"
      :mode="mode"
      :close-on-select="closeOnSelect"
      :can-deselect="canDeselect"
      :searchable="searchable"
      :create-option="createOption"
      :can-clear="canClear"
      :options="options"
      :max="max"
      :value-prop="valueProp"
      :label="labelProp"
      :track-by="trackBy"
      class="placeholder:text-98A2B3 placeholder:text-sm placeholder:text-left placeholder:font-normal focus:outline-none w-full text-sm text-1E1D24 focus:ring-0 h-12 px-4 aria-[invalid=true]:border-error mt-2.5 mb-1"
      :classes="{
        tag: 'bg-gradient-to-r from-orange to-red text-white text-sm font-semibold h-9 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
        tagRemove: 'flex items-center justify-center p-1 mx-2 border-2 rounded-full hover:bg-black hover:bg-opacity-10 group',
        tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-sm box-border w-full',
        container: 'relative mx-auto w-full flex items-center justify-end cursor-pointer leading-snug outline-none capitalize',
        optionSelected: 'bg-orange text-white',
        caret: 'bg-multiselect-caret bg-center bg-no-repeat h-5 w-5 text-#1E1D24 py-px box-content relative z-10 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
        caretOpen: 'rotate-180 pointer-events-auto',





      }"
    />
    <div
      v-if="desc"
      class="text-light-grey-2 text-xs flex items-center justify-between"
    >
      <span v-text="desc" />
    </div>
    <BaseError
      :id="uuid"
      :message="error"
    />
  </div>
</template>


<style src="../../../node_modules/@vueform/multiselect/themes/default.css"></style>

