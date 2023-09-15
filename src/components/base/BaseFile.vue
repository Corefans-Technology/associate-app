<script setup>

import UniqueID from "@/composables/unique_id";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {useField} from "vee-validate";
import {toRef,  ref, computed } from "vue";
import  { XCircleIcon, InboxIcon }  from "@heroicons/vue/24/outline";
import Tippy from "@/components/Tippy.vue";
import BaseError from "@/components/base/BaseError.vue";
import Icon from "@/components/Icon.vue";
const emit = defineEmits(['ChangeView'])

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);
 const props = defineProps({
   name: {
     type: String,
     required: true,
   },
   label: {
     type: String,
     default: "",
   },
   width: {
     type: String,
     default: 'w-full'
   },
   height: {
     type: String,
     default: 'w-full'
   },
   error: {
     type: String,
     default: "",
   },
   desc: {
     type: String,
     default: "",
   },
 });




const myFiles = ref(['http://localhost:8000/storage/7/1662094770384.jpg']);
const file = ref('');
const nameRef = toRef(props, 'name');
const { value } = useField(nameRef);
const src = ref(value.value);
const uuid = UniqueID().getID();

const uploadFile = () => {
  value.value = pond.value.getFile().file

};

const handleFilePondInit = () => {

  console.log(pond.value);
  let test = {
        // the server file reference
        source: "http://localhost:8000/storage/7/1662094770384.jpg",

        // set type to limbo to tell FilePond this is a temp file
        options: {
          type: 'local',
        },
      };
  if (value.value) {
    pond.value.addFile(test);
  }
};



const onChangeFile = (event) => {
 value.value = event.target.files[0];
 let reader = new FileReader();
 reader.readAsDataURL( event.target.files[0]);
 reader.onload = (e) => {
   src.value = e.target.result;
   console.log(e.target.result)
 }

}

const className = computed(() => {
  return `mt-2.5 mb-1 ${props.width} ${props.height}`;
});

const togglePasswordAction = () => {

  input.value.focus()
};

</script>

<template>
  <div class="relative mt-2.5 mb-1">
    <label :for="uuid" class="text-black text-base font-medium">{{ label }}</label>
    <div :class="`${width} ${height} border border-[#D9D9D9] rounded-[0.8rem] mt-2.5 mb-1`">
      <div v-if="!value" class="w-full h-full flex flex-col items-center justify-center space-y-2">
      <span class="text-light-grey-2 text-sm flex flex-col items-center justify-center">
                     <svg width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M23.5002 25.1476L31.8094 33.4548L29.0383 36.2259L25.4585 32.646V43.5833H21.5418V32.6421L17.962 36.2259L15.191 33.4548L23.5002 25.1476ZM23.5002 4.41667C26.8626 4.41683 30.1077 5.6526 32.6185 7.88903C35.1294 10.1255 36.7308 13.2066 37.1184 16.5466C39.5551 17.2111 41.6808 18.7108 43.124 20.7835C44.5671 22.8562 45.236 25.3702 45.0137 27.8861C44.7913 30.402 43.6919 32.7597 41.9076 34.5472C40.1233 36.3348 37.7676 37.4384 35.2521 37.6653V33.7212C36.1533 33.5925 37.0198 33.2856 37.8011 32.8183C38.5823 32.3511 39.2627 31.7329 39.8024 30.9999C40.3422 30.2669 40.7305 29.4336 40.9447 28.5489C41.159 27.6642 41.1948 26.7456 41.0502 25.8468C40.9056 24.9481 40.5833 24.0872 40.1024 23.3143C39.6214 22.5414 38.9912 21.8721 38.2488 21.3454C37.5063 20.8187 36.6663 20.4452 35.778 20.2467C34.8895 20.0481 33.9705 20.0286 33.0745 20.1891C33.3811 18.7612 33.3646 17.2829 33.0259 15.8623C32.6873 14.4416 32.0351 13.1148 31.1173 11.9788C30.1994 10.8429 29.0391 9.92665 27.7213 9.29722C26.4035 8.66779 24.9616 8.34111 23.5011 8.34111C22.0407 8.34111 20.5988 8.66779 19.281 9.29722C17.9632 9.92665 16.8028 10.8429 15.885 11.9788C14.9671 13.1148 14.315 14.4416 13.9764 15.8623C13.6377 17.2829 13.6211 18.7612 13.9278 20.1891C12.1412 19.8536 10.2944 20.2415 8.79375 21.2677C7.29313 22.2938 6.2616 23.874 5.92608 25.6607C5.59056 27.4473 5.97853 29.2941 7.00465 30.7947C8.03077 32.2954 9.61099 33.3269 11.3977 33.6624L11.7502 33.7212V37.6653C9.23458 37.4387 6.87862 36.3353 5.09405 34.548C3.30947 32.7606 2.2098 30.4029 1.98723 27.887C1.76466 25.371 2.43335 22.8569 3.87642 20.784C5.3195 18.7111 7.44517 17.2112 9.88191 16.5466C10.2691 13.2064 11.8704 10.125 14.3813 7.88853C16.8923 5.65203 20.1376 4.4164 23.5002 4.41667Z" fill="#1E1D24"/>
                       </svg>
                       <span>Drag or drop</span>
                       <span>an image to upload.</span>
                    </span>
      </div>
      <img
          v-else
          class="h-full object-cover w-full rounded-[0.8rem] object-top"
          :src="src"
          :alt="name"
      />
      <input
          class="absolute inset-0 opacity-0"
          type="file"
          ref="file"
          accept="image/*"
          :id="uuid"
          @change="onChangeFile"
      />
    </div>
        <div v-if="desc" class="text-#7D7C80 text-xs flex items-center justify-between">
          <span v-text="desc"></span>
        </div>
        <BaseError :message="error" :id="uuid"/>
  </div>


            <!--  <div class="relative">-->
<!--    <div class="max-w-full max-h-full">-->
<!--      <div class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">-->
<!--        <img-->
<!--            class="rounded-md"-->
<!--            alt="Midone Tailwind HTML Admin Template"-->
<!--            :src="myFiles"/>-->
<!--        <Tippy-->
<!--            tag="div"-->
<!--            content="Remove this image?"-->
<!--            class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"-->
<!--        >-->
<!--          <XCircleIcon class="w-4 h-4" />-->
<!--        </Tippy>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="px-4 pb-4 flex items-center cursor-pointer relative">-->
<!--      <InboxIcon class="w-4 h-4 mr-2" />-->

<!--      <span class="text-primary mr-1">Upload a file</span> or-->
<!--      drag and drop-->
<!--      <input type="file" @change="onChangeFile" name="file" class="w-full h-full top-0 left-0 absolute opacity-0" />-->
<!--    </div>-->
<!--  </div>-->



<!--  <div class="relative">-->
<!--    <label :for="uuid" class="text-black text-base">{{ label }}</label>-->
<!--    <div class="max-w-full max-h-full">-->
<!--      <file-pond-->
<!--          v-bind="$attrs"-->
<!--          ref="pond"-->
<!--          v-model="value"-->
<!--          :id="uuid"-->
<!--          :aria-describedby="error ? `${uuid}-error` : null"-->
<!--          :aria-invalid="error ? true : null"-->
<!--          label-idle='-->
<!--          <span class="text-light-grey-2 h-20 flex flex-col items-center justify-center">-->
<!--              <svg width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M23.5002 25.1476L31.8094 33.4548L29.0383 36.2259L25.4585 32.646V43.5833H21.5418V32.6421L17.962 36.2259L15.191 33.4548L23.5002 25.1476ZM23.5002 4.41667C26.8626 4.41683 30.1077 5.6526 32.6185 7.88903C35.1294 10.1255 36.7308 13.2066 37.1184 16.5466C39.5551 17.2111 41.6808 18.7108 43.124 20.7835C44.5671 22.8562 45.236 25.3702 45.0137 27.8861C44.7913 30.402 43.6919 32.7597 41.9076 34.5472C40.1233 36.3348 37.7676 37.4384 35.2521 37.6653V33.7212C36.1533 33.5925 37.0198 33.2856 37.8011 32.8183C38.5823 32.3511 39.2627 31.7329 39.8024 30.9999C40.3422 30.2669 40.7305 29.4336 40.9447 28.5489C41.159 27.6642 41.1948 26.7456 41.0502 25.8468C40.9056 24.9481 40.5833 24.0872 40.1024 23.3143C39.6214 22.5414 38.9912 21.8721 38.2488 21.3454C37.5063 20.8187 36.6663 20.4452 35.778 20.2467C34.8895 20.0481 33.9705 20.0286 33.0745 20.1891C33.3811 18.7612 33.3646 17.2829 33.0259 15.8623C32.6873 14.4416 32.0351 13.1148 31.1173 11.9788C30.1994 10.8429 29.0391 9.92665 27.7213 9.29722C26.4035 8.66779 24.9616 8.34111 23.5011 8.34111C22.0407 8.34111 20.5988 8.66779 19.281 9.29722C17.9632 9.92665 16.8028 10.8429 15.885 11.9788C14.9671 13.1148 14.315 14.4416 13.9764 15.8623C13.6377 17.2829 13.6211 18.7612 13.9278 20.1891C12.1412 19.8536 10.2944 20.2415 8.79375 21.2677C7.29313 22.2938 6.2616 23.874 5.92608 25.6607C5.59056 27.4473 5.97853 29.2941 7.00465 30.7947C8.03077 32.2954 9.61099 33.3269 11.3977 33.6624L11.7502 33.7212V37.6653C9.23458 37.4387 6.87862 36.3353 5.09405 34.548C3.30947 32.7606 2.2098 30.4029 1.98723 27.887C1.76466 25.371 2.43335 22.8569 3.87642 20.784C5.3195 18.7111 7.44517 17.2112 9.88191 16.5466C10.2691 13.2064 11.8704 10.125 14.3813 7.88853C16.8923 5.65203 20.1376 4.4164 23.5002 4.41667Z" fill="#1E1D24"/>-->
<!--                </svg>-->
<!--                <span>Drag or drop</span>-->
<!--                <span>an image to upload.</span>-->
<!--             </span>'-->
<!--          :class-name="className"-->
<!--          :allow-drop="false"-->
<!--          :allow-paste="false"-->
<!--          :allow-multiple="false"-->
<!--          image-preview-transparency-indicator="grid"-->
<!--          :image-preview-markup-show="false"-->
<!--          :store-as-file="true"-->
<!--          :instant-upload="false"-->
<!--          image-preview-height="250"-->
<!--          image-preview-min-height="250"-->
<!--          image-preview-max-height="250"-->
<!--          image-crop-aspect-ratio="1:1"-->
<!--          style-panel-layout="compact square"-->
<!--          @updatefiles="uploadFile"-->
<!--          credits=""-->
<!--          accepted-file-types="image/jpeg, image/png"-->
<!--          v-bind:files="myFiles"-->
<!--          v-on:init="handleFilePondInit"-->
<!--      />-->
<!--    </div>-->

<!--    <div v-if="desc" class="text-light-grey-2 text-xs flex items-center justify-between">-->
<!--      <span v-text="desc"></span>-->
<!--    </div>-->
<!--    <BaseError :message="error" :id="uuid"/>-->
<!--  </div>-->
</template>
