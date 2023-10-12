<script setup>

import UniqueID from "@/composables/unique_id";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import {useField} from "vee-validate";
import {toRef,  ref } from "vue";

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
    default: "w-full",
  },
  height: {
    type: String,
    default: "w-full",
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


function removeFile(name) {
  value.value = value.value.filter((file) => file.name !== name)
}

const nameRef = toRef(props, "name");
const { value } = useField(nameRef);
const src = ref(value.value);
const uuid = UniqueID().getID();


const onChangeFile = (event) => {
  // for( let i = 0; event.target.files.length)
  // let arr = []
  for (let i = 0; i < event.target.files.length; i++) {
    if(value.value.length > 4) {
      // alert("You have max limit")
    }else {
      value.value.push(event.target.files[i])
    }
    
  }
  // value.value = [...value.value, ...arr]
  // eslint-disable-next-line no-console
  // console.log(value.value, ..value.value)
  let reader = new FileReader();
  reader.readAsDataURL( event.target.files[0]);
  reader.onload = (e) => {
    src.value = e.target.result;
  }

}

function formatFileSize(bytes,decimalPoint) {
  if(bytes == 0) return "0 Bytes";
  var k = 1000,
    dm = decimalPoint || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

</script>

<template>
  <div class="mt-2.5">
    <label
      v-if="label"
      :for="uuid"
      class="text-black text-base font-medium"
    >{{ label }}</label>
    
    <!-- <pre
      v-for="(item, index) in value"
      :key="index"
    >
      {{ item }} {{ item.size }} {{ index }}
    </pre> -->
    <div class="space-y-3">
      <div
        v-for="(item, index) in value"
        :key="index"
        class="p-4 border rounded border-#D0C9C9 bg-#E9E8E9 flex items-center gap-3 relative"
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 22.499H15C20 22.499 22 20.499 22 15.499V9.49902C22 4.49902 20 2.49902 15 2.49902H9C4 2.49902 2 4.49902 2 9.49902V15.499C2 20.499 4 22.499 9 22.499Z"
            stroke="url(#paint0_linear_3981_139738)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.99988 10.5C10.1044 10.5 10.9999 9.60457 10.9999 8.5C10.9999 7.39543 10.1044 6.5 8.99988 6.5C7.89531 6.5 6.99988 7.39543 6.99988 8.5C6.99988 9.60457 7.89531 10.5 8.99988 10.5Z"
            stroke="url(#paint1_linear_3981_139738)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.67004 19.4496L7.60004 16.1396C8.39004 15.6096 9.53004 15.6696 10.24 16.2796L10.57 16.5696C11.35 17.2396 12.61 17.2396 13.39 16.5696L17.55 12.9996C18.33 12.3296 19.59 12.3296 20.37 12.9996L22 14.3996"
            stroke="url(#paint2_linear_3981_139738)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3981_139738"
              x1="2"
              y1="2.49902"
              x2="22"
              y2="22.499"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F18B1B" />
              <stop
                offset="1"
                stop-color="#E52053"
              />
            </linearGradient>
            <linearGradient
              id="paint1_linear_3981_139738"
              x1="6.99988"
              y1="6.5"
              x2="10.9999"
              y2="10.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F18B1B" />
              <stop
                offset="1"
                stop-color="#E52053"
              />
            </linearGradient>
            <linearGradient
              id="paint2_linear_3981_139738"
              x1="2.67004"
              y1="12.4971"
              x2="7.09843"
              y2="24.8093"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F18B1B" />
              <stop
                offset="1"
                stop-color="#E52053"
              />
            </linearGradient>
          </defs>
        </svg>

        <div class="space-y-2 text-sm text-#444349">
          <p>{{ item.name }}</p>
          <p>{{ formatFileSize(item.size) }}</p>
        </div>

        <button
          class="absolute right-5 top-5 focus:outline-none focus:border"
          @click="removeFile(item.name)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4749 11.1824L4.81808 5.5255C4.6248 5.33223 4.6248 5.01167 4.81808 4.8184C5.01135 4.62512 5.33191 4.62512 5.52518 4.8184L11.182 10.4753C11.3753 10.6685 11.3753 10.9891 11.182 11.1824C10.9888 11.3756 10.6682 11.3756 10.4749 11.1824Z"
              fill="#1E1D24"
            />
            <path
              d="M4.81796 11.1824C4.62469 10.9891 4.62469 10.6685 4.81796 10.4753L10.4748 4.8184C10.6681 4.62512 10.9886 4.62512 11.1819 4.8184C11.3752 5.01167 11.3752 5.33223 11.1819 5.5255L5.52507 11.1824C5.33179 11.3756 5.01124 11.3756 4.81796 11.1824Z"
              fill="#1E1D24"
            />
          </svg>
        </button>
      </div>
    </div>

    <div :class="`${width} ${height} border border-[#D9D9D9] border-dashed rounded-[0.8rem] relative mb-1 mt-2`">
      <div
        class="w-full h-full flex flex-col items-center justify-center space-y-2"
      >
        <span class="text-light-grey-2 text-sm flex gap-2 items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99341 11.6663H11.0001C13.0134 11.6663 14.6667 10.0197 14.6667 7.99967C14.6667 5.98634 13.0201 4.33301 11.0001 4.33301H9.99341"
              stroke="#7D7C80"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.99992 4.33301H4.99992C2.97992 4.33301 1.33325 5.97967 1.33325 7.99967C1.33325 10.013 2.97992 11.6663 4.99992 11.6663H5.99992"
              stroke="#7D7C80"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.33325 8H10.6666"
              stroke="#7D7C80"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Add up to 5 files</span>
        </span>
      </div>
      <input
        :id="uuid"
        ref="file"
        class="absolute inset-0 opacity-0"
        type="file"
        accept="image/*"
        multiple
        @change="onChangeFile"
      />
    </div>
    <div
      v-if="desc"
      class="text-#7D7C80 text-xs flex items-center justify-between"
    >
      <span v-text="desc" />
    </div>
  </div>
</template>