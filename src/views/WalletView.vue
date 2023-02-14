<template>
  <layout>
    <div class="p-[2.5rem] space-y-8">
      <h2 class="text-2xl text-black font-medium pb-6 border-b">Wallet</h2>

      <div class="flex items-center space-x-4">
        <div class="flex-none text-sm text-[#272643] space-y-4">
          <p class="flex items-center space-x-2">
            <span>TOTAL AVAILABLE BALANCE</span>
            <span class="text-white">
              <Icon name="help" />
            </span>
          </p>
          <h3 class="text-[#333333] text-[2rem] font-bold">NGN 509,123.45</h3>
        </div>
        <div class="flex-grow flex justify-end">
          <div class="flex items-center space-x-2">
            <div class="bg-[#00A438] h-[6px] w-[20px]"></div>
            <p class="text-sm text-[#626E8B]">Inflows</p>
          </div>
        </div>
        <div class="flex-none">
          <input
            class="w-[7.875rem] h-[2.25rem] border border-[#D6DFE8] rounded-[4px] text-[#626E8B]"
            type="date"
            name=""
            :value="new Date()"
            id=""
          />
        </div>
      </div>

      <div>
        <button
          @click="openModal"
          class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2"
        >
          Withdraw
        </button>
      </div>

      <div>
        <VueApexCharts
          height="350"
          type="bar"
          :options="options"
          :series="series"
        ></VueApexCharts>
      </div>

      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-medium text-black flex-none pr-[2rem]">
          Transactions
        </h2>

        <label class="relative block max-w-[20.5rem] w-full flex-none">
          <span class="sr-only">Search</span>
          <span
            class="absolute inset-y-0 left-0 flex items-center px-[0.8125rem]"
          >
            <Icon name="search" />
          </span>
          <input
            class="placeholder:text-[#98A2B3] placeholder:text-[13px] placeholder:text-left block bg-white w-full border border-[#EDEDED] rounded py-2 pl-10 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder:font-normal"
            placeholder="Find Transactions"
            type="text"
            name="search"
          />
        </label>

        <div class="flex-grow flex items-center justify-end">
          <Popover class="relative">
            <PopoverButton
              class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
            >
              <Icon name="filter" />
              <span>Filter</span>
            </PopoverButton>

            <PopoverPanel class="absolute z-50 bg-white"> </PopoverPanel>
          </Popover>
        </div>

        <Popover class="relative">
          <PopoverButton
            class="focus:outline-none relative text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#F2F4F7]"
          >
            <Icon name="export" />
            <span>Export</span>
          </PopoverButton>

          <PopoverPanel class="absolute z-50 bg-white"> </PopoverPanel>
        </Popover>
      </div>

      <TabGroup>
        <TabList class="flex space-x-5 900/20 p-1">
          <Tab
            v-for="(tab, index) in tabs"
            as="template"
            :key="index"
            v-slot="{ selected }"
          >
            <button
              type="button"
              :class="[
                'text-[15px]',
                'focus:outline-none focus:ring-2 relative',
                selected ? 'text-[#FF9E0B]' : 'text-[#878787]',
              ]"
            >
              {{ tab }}
              <div
                :class="[selected ? 'opacity-100' : 'opacity-0']"
                class="absolute -bottom-3 inset-x-0 flex justify-center"
              >
                <span class="w-[6px] h-[6px] rounded-full bg-[#FF9E0B]"></span>
              </div>
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-8">
          <TabPanel>
            <!-- :is-loading="table.isLoading" -->
            <TableLite
              :has-checkbox="true"
              :columns="table.columns"
              :rows="table.rows"
              :total="table.totalRecordCount"
              :sortable="table.sortable"
              :messages="table.messages"
              @do-search="doSearch"
              @is-finished="table.isLoading = false"
            />
          </TabPanel>
          <TabPanel>
            <!-- :is-loading="table.isLoading" -->
            <TableLite
              :has-checkbox="true"
              :columns="table.columns"
              :rows="table.rows"
              :total="table.totalRecordCount"
              :sortable="table.sortable"
              :messages="table.messages"
              @do-search="doSearch"
              @is-finished="table.isLoading = false"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <Modal @close="isOpen = !isOpen" :isOpen="isOpen">
        <DialogPanel
          class="w-full max-w-[37.5rem] transform overflow-hidden rounded-2xl bg-white py-[3.625rem] px-[1.5rem] text-left align-middle shadow-xl transition-all space-y-8"
        >
          <DialogTitle
            as="h3"
            class="text-xl font-medium leading-6 text-black text-center"
          >
            How much do you want to withdraw?
          </DialogTitle>
          <div class="flex items-center justify-center space-x-4">
            <div class="flex items-start space-x-2">
              <h3 class="text-sm text-[#626E8B] leading-10">NGN</h3>
              <h3 class="text-[3rem] font-bold text-black p-0 m-0 leading-none">
                00.0
              </h3>
            </div>
          </div>

          <p class="text-xs text-[#626E8B] text-center">
            Your Total Balance NGN
            <span class="font-bold">509,123.45</span>
          </p>

          <form class="space-y-4" action="">
            <!-- Bank -->
            <div class="space-y-1 relative">
              <label for="bank">Bank Account</label>
              <Listbox v-slot="{ open }" v-model="formData.bank.bank">
                <div class="relative mt-1">
                  <ListboxButton
                    class="py-3 px-4 pr-8 w-full relative border rounded"
                  >
                    <div
                      v-if="formData.bank.bank.bank"
                      class="flex justify-between items-center w-full"
                    >
                      <div
                        class="font-semibold text-base text-#222222 text-left"
                      >
                        <h4>{{ formData.bank.bank.bank }}</h4>
                        <p class="text-sm font-normal text-#737373">
                          {{ formData.bank.bank.account_number }}
                        </p>
                      </div>
                      <p>{{ formData.bank.bank.name }}</p>
                    </div>
                    <!-- placeholder -->
                    <p v-else class="text-left text-#98A2B3">Select Account</p>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <ChevronDownIcon
                        :class="[
                          open ? 'rotate-180' : '',
                          'h-5 w-5 text-#1E1D24',
                        ]"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    class="absolute z-50 divide-y mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-for="bank in banks"
                      :key="bank.id"
                      :value="bank"
                    >
                      <div
                        class="flex relative rounded justify-between items-center py-3 px-4 pr-8 w-full"
                      >
                        <div
                          class="font-semibold text-base text-#222222 text-left"
                        >
                          <h4>{{ bank.bank }}</h4>
                          <p class="text-sm font-normal text-#737373">
                            {{ bank.account_number }}
                          </p>
                        </div>
                        <p class="uppercase">{{ bank.name }}</p>
                      </div>
                    </ListboxOption>
                    <ListboxOption value="bank" :disabled="true">
                      <button
                        type="button"
                        @click="newBank = !newBank"
                        class="text-orange text-[0.8125rem] flex items-center py-3 px-4 font-semibold space-x-2 text-sm"
                      >
                        <PlusIcon class="h-5" />
                        <span>Add Campaign</span>
                      </button>
                    </ListboxOption>
                  </ListboxOptions>
                </div>
              </Listbox>
              <!-- Error -->
              <p
                v-show="$v.bank.bank.$error"
                class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.bank.bank.required.$invalid
                    ? "Description is Required"
                    : "Text limit exceeded"
                }}
              </p>
            </div>

            <!-- Story -->
            <div class="space-y-1 relative">
              <label for="description">Description</label>
              <textarea
                class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                placeholder="Enter description"
                v-model="formData.bank.description"
                @input="$v.bank.description.$touch()"
                :class="[
                  $v.bank.description.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                name=""
                id="description"
                rows="3"
              >
              </textarea>
              <div
                class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
              >
                <p></p>
                <p>0/20</p>
              </div>
              <!-- Error -->
              <p
                v-show="$v.bank.description.$error"
                class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.bank.description.required.$invalid
                    ? "Description is Required"
                    : "Text limit exceeded"
                }}
              </p>
            </div>

            <div class="flex items-center justify-end">
              <button
                type="button"
                @click="submitWithdraw"
                class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2"
              >
                <span> Withdraw </span>
              </button>
            </div>
          </form>
        </DialogPanel>
      </Modal>

      <Modal @close="newBank = !newBank" :isOpen="newBank">
        <DialogPanel
          class="w-full max-w-[34.5rem] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all divide-y"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black py-4 px-6"
          >
            New Account
          </DialogTitle>

          <form class="space-y-4 py-4 px-6" action="">
            <!-- Bank -->
            <div class="space-y-1 relative">
              <label for="bank">Bank Name</label>
              <Listbox v-slot="{ open }" v-model="formData.bank.bank">
                <div class="relative mt-1">
                  <ListboxButton
                    class="py-3 px-4 pr-8 w-full relative border rounded"
                  >
                    <div
                      v-if="formData.bank.bank.bank"
                      class="flex justify-between items-center w-full"
                    >
                      <p>{{ formData.bank.bank.bank }}</p>
                    </div>
                    <!-- placeholder -->
                    <p v-else class="text-left text-#98A2B3">Select Bank</p>
                    <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                      <ChevronDownIcon
                        :class="[
                          open ? 'rotate-180' : '',
                          'h-5 w-5 text-#1E1D24',
                        ]"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>
                  <ListboxOptions
                    class="absolute z-50 divide-y mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-for="bank in banks"
                      :key="bank.id"
                      :value="bank"
                    >
                      <div
                        class="flex relative rounded justify-between items-center py-3 px-4 pr-8 w-full"
                      >
                        <p class="uppercase">{{ bank.bank }}</p>
                      </div>
                    </ListboxOption>
                  </ListboxOptions>
                </div>
              </Listbox>
              <!-- Error -->
              <p
                v-show="$v.bank.bank.$error"
                class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.bank.bank.required.$invalid
                    ? "Description is Required"
                    : "Text limit exceeded"
                }}
              </p>
            </div>

            <!-- Account number -->
            <div class="space-y-1 relative">
              <label for="account_number">Account number</label>
              <input
                id="account_number"
                v-model="formData.bank.account_number"
                @input="$v.bank.account_number.$touch()"
                :class="[
                  $v.bank.account_number.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                placeholder="Enter account number "
                type="text"
              />
              <!-- Error -->
              <p
                v-show="$v.bank.account_number.$error"
                class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.bank.account_number.required.$invalid
                    ? "Account number is Required"
                    : ""
                }}
              </p>
            </div>

            <div class="flex items-center space-x-3 justify-end">
              <button
                type="button"
                @click="newBank = !newBank"
                class="border border-#626E8B text-#626E8B text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2"
              >
                <span> Cancel </span>
              </button>
              <button
                type="button"
                @click="submitWithdraw"
                class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2"
              >
                <span> Add Account </span>
              </button>
            </div>
          </form>
        </DialogPanel>
      </Modal>

      <Modal @close="otpModal = !otpModal" :isOpen="otpModal">
        <DialogPanel
          class="w-full max-w-[37.5rem] transform overflow-hidden rounded-2xl bg-white py-[3.625rem] px-[1.5rem] text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-[3.5rem] h-[3.5rem] object-cover mx-auto"
            src="@/assets/images/info.png"
            alt=""
          />
          <div>
            <DialogTitle
              as="h3"
              class="text-2xl font-medium leading-6 text-black text-center pb-3"
            >
              Check your messages
            </DialogTitle>
            <p class="text-center text-[#667085]">We sent a an OTP code</p>
            <p class="text-center text-[#667085]">Oloyedetobi45@gmail.com</p>
          </div>

          <form class="pb-20 pt-5 flex items-center justify-center" action="">
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input-2 w-[4.625rem] h-[4.625rem] text-center focus:outline-none mx-2 rounded-xl text-2xl font-medium"
              separator=""
              :num-inputs="5"
              :should-auto-focus="true"
              :is-input-num="true"
              :conditionalClass="['one', 'two', 'three', 'four', 'five']"
              :placeholder="['', '', '', '', '', '']"
              @on-change="handleOnChange"
              @on-complete="handleOnPinComplete"
            />
          </form>

          <p class="text-[#626E8B] text-center">Code expires in 19:59</p>
        </DialogPanel>
      </Modal>

      <Modal @close="pinModal = !pinModal" :isOpen="pinModal">
        <DialogPanel
          class="w-full max-w-[37.5rem] h-[45.4375rem] transform overflow-hidden rounded-2xl bg-white py-[3.625rem] px-[1.5rem] text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-[3.5rem] h-[3.5rem] object-cover mx-auto"
            src="@/assets/images/key.png"
            alt=""
          />
          <div>
            <DialogTitle
              as="h3"
              class="text-2xl font-medium leading-6 text-black text-center pb-3"
            >
              Create Passcode
            </DialogTitle>
            <p class="text-center text-[#667085]">
              This PIN would be use to process all
            </p>
            <p class="text-center text-[#667085]">your monetary transactions</p>
          </div>

          <form class="pb-20 pt-5 flex items-center justify-center" action="">
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input-3 focus:outline-none"
              separator=""
              :num-inputs="4"
              :should-auto-focus="true"
              :is-input-num="true"
              :conditionalClass="['one', 'two', 'three', 'four']"
              :placeholder="['*', '*', '*', '*']"
              @on-change="handleOnChange"
              @on-complete="handleOnPinComplete"
            />
          </form>

          <p class="text-[#626E8B] text-center">Code expires in 19:59</p>
        </DialogPanel>
      </Modal>

      <Modal @close="confirm = !confirm" :isOpen="confirm">
        <DialogPanel
          class="w-full max-w-[31.75rem] transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all divide-y"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black py-4 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y" action="">
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Transfer Amount</p>
              <p class="text-[#333333] font-medium">₦ 509,123</p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Fee</p>
              <p class="text-[#333333] font-medium">₦ 40</p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Total Amount</p>
              <p class="text-[#333333] font-medium">₦ 509,123.50</p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Receipient Name</p>
              <p class="text-[#333333] font-medium">OLOYEDE TOBI E</p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Receipient Details</p>
              <p class="text-[#333333] font-medium">2120795158 - UBA</p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-[#727273]">Date</p>
              <p class="text-[#333333] font-medium">₦ 509,123.45</p>
            </div>
            <div class="pt-8 flex items-center space-x-4">
              <button
                @click.prevent="(confirm = !confirm)"
                class="text-orange border flex-1 border-orange text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2 w-full text-center focus:outline-none"
              >
                Cancel
              </button>
              <button
                @click.prevent="confirmPay"
                class="bg-gradient-to-r flex-1 from-orange to-red text-white text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2 w-full text-center focus:outline-none"
              >
              Confirm
              </button>
            </div>
          </div>
        </DialogPanel>
      </Modal>

      <Modal @close="success = !success" :isOpen="success">
        <DialogPanel
          class="w-full max-w-[31.75rem] h-[37.5rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <img
              class="w-[3.5rem] h-[3.5rem] object-cover mx-auto"
              src="@/assets/images/check.png"
              alt=""
            />
            <div class="space-y-3 pb-6">
              <div>
                <DialogTitle as="h3" class="text-[#667085] text-center">
                  Transfer to OLOYEDE TOBI E.
                </DialogTitle>
                <p class="text-[2rem] font-bold text-center text-black">
                  -NGN 509,123.50
                </p>
              </div>
              <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p>
            </div>
          </div>

          <div class="flex-none">
            <button
              @click.prevent="success = false"
              class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[40px] px-4 rounded flex items-center justify-center space-x-2 w-full text-center focus:outline-none"
            >
              Continue
            </button>
          </div>
        </DialogPanel>
      </Modal>
    </div>
  </layout>
</template>

<script setup>
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import VOtpInput from "vue3-otp-input";
import { ref, reactive } from "vue";
import Layout from "@/layouts/DashboardLayout.vue";
import VueApexCharts from "vue3-apexcharts";
import TableLite from "@/components/TableLite.vue";
import Modal from "@/components/ModalComponent.vue";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/24/outline";

const banks = [
  { id: 1, name: "Micheal Adeyeye", bank: "Gtb", account_number: "9739002838" },
  { id: 1, name: "Benson Momodu", bank: "Fcmb", account_number: "9739002838" },
];
const isOpen = ref(false);
const pinModal = ref(false);
const newBank = ref(false);
const otpModal = ref(false);
const success = ref(false);
const confirm = ref(false);
// const selectedPerson = ref(banks[0])

let options = ref({
  chart: {
    id: "vuechart",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
      columnWidth: "50%",
      barHeight: "70%",
      distributed: false,
      rangeBarOverlap: false,
      rangeBarGroupRows: false,
      colors: {
        // ranges: [
        //   {
        //     from: 0,
        //     to: 0,
        //     color: "#1E1D24",
        //   },
        // ],
        backgroundBarColors: ["#EDF2EF"],
        backgroundBarOpacity: 1,
        backgroundBarRadius: 10,
      },
    },
  },
  colors: ["#00A438"],
  title: {
    enabled: false,
  },
  xaxis: {
    categories: [
      1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1995, 1996, 1997, 1998,
    ],
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    nabled: false,
  },
  toolbar: {
    enabled: false,
  },
});
let series = ref([
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 81, 49, 60, 70, 81],
  },
]);

const tabs = ref(["Campaigns", "Inflows"]);

const formData = reactive({
  bank: {
    description: "",
    bank: {},
    account_number: "",
    account_name: "",
  },
});

const rules = {
  bank: {
    description: {
      required,
      maxLengthValue: maxLength(20),
    },
    bank: {
      required,
    },
    account_number: {
      required,
    },
    account_name: {
      required,
    },
  },
};

const $v = useVuelidate(rules, formData);

const otpInput = ref(null);
// const pinInput = ref(null);

// const handleOnOtpComplete = (value) => {
//   otpModal.value = false;
//   pinModal.value = true;

//   console.log("OTP completed: ", value);
// };
const handleOnPinComplete = () => {
  otpModal.value = false;
  confirm.value = true;
  // console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

// const clearInput = () => {
//   otpInput.value.clearInput();
// };

const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Reference",
      field: "id",
      // width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Name",
      field: "name",
      // width: "10%",
      sortable: true,
    },
    {
      label: "Email",
      field: "email",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Amount",
      field: "amount",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Campaign",
      field: "campaign",
      // width: "15%",
      sortable: true,
    },
    {
      label: "Status",
      field: "status",
      // width: "15%",
      sortable: true,
      display: function (row) {
        return (
          '<span data-id="' +
          row.id +
          '" class="' +
          row.status +
          '">' +
          row.status +
          "</span>"
        );
      },
    },
    {
      label: "Date",
      field: "date",
      // width: "15%",
      sortable: true,
    },
  ],
  rows: [
    {
      id: "3r3hfa44343",
      name: "Benson Momodu",
      email: "ben@gmail.com",
      amount: "4000.00",
      campaign: "falz night out",
      status: "Successful",
      date: "28 Jul, 2021 2:33 PM",
    },
    {
      id: "100912340175",
      name: "Charlie Sheen",
      email: "charlie.sheen@outlook.com",
      amount: "NGN 509,123.45",
      campaign: "Chasing Paper EP",
      status: "Failed",
      date: "28 Jul, 2021 2:33 PM",
    },
    {
      id: "100912340175",
      name: "Charlie Sheen",
      email: "charlie.sheen@outlook.com",
      amount: "NGN 509,123.45",
      campaign: "Chasing Paper EP",
      status: "Pending",
      date: "28 Jul, 2021 2:33 PM",
    },
  ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

// const doSearch = (offset, limit, order, sort) => {
//   table.isLoading = true;

//   // Start use axios to get data from Server
//   // let url =
//   //   "https://www.example.com/api/some_endpoint?offset=" +
//   //   offset +
//   //   "&limit=" +
//   //   limit +
//   //   "&order=" +
//   //   order +
//   //   "&sort=" +
//   //   sort;
//   // axios.get(url).then((response) => {
//   //   table.rows = response.rows;
//   //   table.totalRecordCount = response.count;
//   //   table.sortable.order = order;
//   //   table.sortable.sort = sort;
//   // });
//   // End use axios to get data from Server
// };

// function closeModal() {
//   isOpen.value = false;
// }
function openModal() {
  isOpen.value = true;
}

function submitWithdraw() {
  isOpen.value = false;
  otpModal.value = true;
}

function confirmPay() {
  success.value = true;
  confirm.value = false;
}

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
</script>
<!-- otp-input -->
<style>
.otp-input-2 {
  border: 1px solid #d9d9d9 !important;
}
.otp-input-2.is-complete {
  border-color: #b9b9b9 !important;
}

.otp-input-2::-webkit-inner-spin-button,
.otp-input-2::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

.otp-input-3 {
  width: 74px;
  height: 74px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 12px;
  border: 1px solid #b9b9b9;
  text-align: center;
}
.otp-input-3.is-complete {
  border-color: #ff9e0b;
}

.otp-input-3.is-complete::-webkit-inner-spin-button,
.otp-input-3::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<style>
.apexcharts-toolbar {
  display: none !important;
}
</style>

<style scoped>
::v-deep(.Successful) {
  color: #00c48c;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(0, 196, 140, 0.1);
  border-radius: 100px;
}
::v-deep(.Failed) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Unfulfilled) {
  color: #f6655a;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(246, 101, 90, 0.1);
  border-radius: 100px;
}
::v-deep(.Pending) {
  color: #e3a11b;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(227, 161, 27, 0.1);
  border-radius: 100px;
}
::v-deep(.Fulfilled) {
  color: #3d6abe;
  font-size: 11px;
  font-weight: 400;
  padding: 5px 10px;
  background: rgba(61, 106, 190, 0.1);
  border-radius: 100px;
}
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #98a2b3;
  background-color: #f9fafb;
  border-color: #f9fafb;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  border-bottom: #98a2b31f 1px solid;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}

::v-deep(.vtl-thead div) {
  font-weight: normal !important;
  font-size: 14px;
}

::v-deep(.vtl-paging-info) {
  font-size: 12px;
  color: #565758;
}

::v-deep(.vtl-tbody-td div) {
  font-weight: normal !important;
  font-size: 14px;
  padding: 6px 0px;
}

::v-deep(.vtl-paging-change-div) {
  opacity: 0;
}

::v-deep(.vtl-thead-checkbox) {
  border-radius: 4px;
}
::v-deep(.vtl-tbody-checkbox) {
  border-radius: 4px;
}
</style>
