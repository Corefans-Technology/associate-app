<template>
  <Modal
    v-if="false"
    :is-open="true"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <template v-if="currentStep === 0">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-14 px-6 text-left shadow-xl transition-all space-y-8"
        >
          <DialogTitle
            as="h3"
            class="text-xl font-medium leading-6 text-black text-center"
          >
            How much do you want to withdraw?
          </DialogTitle>
          <div class="space-y-4">
            <div class="w-full mx-auto">
              <AmountInput
                v-model="amount"
                inputmode="numeric"
                placeholder="00.0"
                name="amount"
                :error="errors.amount"
              />
            </div>
  
            <p class="text-xs text-[#626E8B] text-center">
              Your Total Balance NGN
              <span class="font-bold"> {{ useCurrency(walletStore.balance) }} </span>
            </p>
            <!-- Account Details -->
            <BaseSelect
              :options="accountDetails"
              track-by="id"
              label-prop="name"
              value-prop="id"
              :can-deselect="false"
              name="account"
              label="Bank Account"
              class="rounded border border-light-grey focus:border-light-grey"
              :error="errors.account"
            />
            <div class="mt-2">
              <BaseTextArea
                name="narration"
                label="Description"
                rows="3"
                maxlength="80"
                :can-count-text="true"
                class="rounded border-light-grey focus:border-light-grey w-full"
                :error="errors.narration"
              />
            </div>


            <div class="flex items-center justify-end">
              <BaseButton
                class="bg-gradient-to-r from-orange to-red text-white rounded text-center font-light"
                :is-loading="isSubmitting"
              >
                Withdraw
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  Withdraw confirmation Modal -->
      <template v-if="currentStep === 2">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all divide-y"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black py-6 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y text-sm">
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Transfer Amount
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Fee
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Total Amount
              </p>
              <p class="text-333333 font-medium">
                {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Name
              </p>
              <p class="text-333333 font-medium line-clamp-1">
                {{ target.name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Details
              </p>
              <p class="text-333333 font-medium line-clamp-1">
                {{ target.number }} - {{ target.bank_name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Date
              </p>
              <p class="text-333333 font-medium">
                {{ format(new Date(), " dd MMM Y") }}
              </p>
            </div>
            <div class="pt-8 flex items-center space-x-4">
              <BaseButton 
                type="button"
                class="text-orange border flex-1 border-orange rounded text-center font-light w-full"
                @click.prevent="(currentStep = 0)"
              >
                Cancel
              </BaseButton>
              <BaseButton
                class="bg-gradient-to-r from-orange to-red text-white rounded text-center font-light w-full"
                :is-loading="isSubmitting"
              >
                Confirm
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  OTP code Modal-->
      <template v-if="currentStep === 1">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-14 h-14 object-cover mx-auto"
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
            <p class="text-center text-[#667085]">
              We sent a an OTP code
            </p>
            <p class="text-center text-[#667085]">
              {{ managerStore.getEmail }}
            </p>
          </div>

          <div class="pb-20 pt-5 flex items-center justify-center">
            <BaseOtpInput
              input-classes="otp-input-2 w-12 h-12 text-center focus:outline-none mx-2 rounded-xl text-2xl font-medium"
              name="pin_code"
              :error="errors.pin"
            />
          </div>

          <p class="text-[#626E8B] text-center">
            Code expires in {{ formatter( minutes, seconds ) }}
          </p>
          <div class="flex items-center justify-center">
            <BaseButton
              :is-loading="isSubmitting"
              class="bg-gradient-to-r from-orange to-red text-white text-sm w-full max-w-xs rounded"
            >
              Withdraw
            </BaseButton>
          </div>
        </DialogPanel>
      </template>

      <template v-if="currentStep === 3">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <img
              class="w-14 h-14 object-cover mx-auto"
              src="@/assets/images/check.png"
              alt=""
            />
            <div class="space-y-3 pb-6">
              <div>
                <DialogTitle
                  as="h3"
                  class="text-[#667085] text-center"
                >
                  Transfer to {{ target.name }}
                </DialogTitle>
                <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
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
            <BaseButton
              type="button"
              class="bg-gradient-to-r from-orange to-red text-white rounded w-full text-center"
              @click="$router.push({ name: 'wallet' })"
            >
              Close
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
    </form>
  </Modal>

  <Modal
    class="hidden md:block"
    :is-open="true"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <template v-if="currentStep === 0">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-8 px-6 text-left shadow-xl transition-all space-y-8"
        >
          <DialogTitle
            as="h3"
            class="text-xl font-semibold leading-6 text-#151419 text-center"
          >
            How much do you want to withdraw?
          </DialogTitle>
          <div class="space-y-4">
            <div class="w-full mx-auto">
              <AmountInput
                v-model="amount"
                inputmode="numeric"
                placeholder="₦0.00"
                name="amount"
                :error="errors.amount"
              />
            </div>

            <p class="text-sm text-#7D7C80 text-center font-semibold">
              Your Total Balance NGN
              <span class=""> {{ useCurrency(walletStore.balance) }} </span>
            </p>
            <!-- Account Details -->
            <BaseSelect
              :options="accountDetails"
              track-by="id"
              label-prop="name"
              value-prop="id"
              :can-deselect="false"
              name="account"
              label="Bank"
              class="rounded border border-light-grey focus:border-light-grey"
              :error="errors.account"
            />
            <div class="mt-2">
              <BaseTextArea
                name="narration"
                label="Description"
                rows="3"
                maxlength="80"
                :can-count-text="true"
                class="rounded border-light-grey focus:border-light-grey w-full"
                :error="errors.narration"
              />
            </div>


            <div class="flex items-center justify-end gap-4">
              <div class="rounded-lg w-fit bg-gradient-to-br from-orange to-red p-px hidden md:block">
                <BaseButton
                  type="button"
                  class="rounded-lg text-center font-light w-full md:w-fit h-11 bg-white"
                  @click="$router.push({ name: 'wallet' })"
                >
                  <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Cancel</span>
                </BaseButton>
              </div>
              <!-- <BaseButton
                type="button"
                class="text-orange md:text-#7D7C80 border border-orange md:border-#7D7C80 rounded-lg text-center font-light w-full md:w-fit h-11"
                @click="$router.push({ name: 'wallet' })"
              >
                Cancel
              </BaseButton> -->
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light h-11"
                :is-loading="isSubmitting"
              >
                <div class="flex items-center space-x-1 font-medium">
                  <span>Withdraw</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M8.00008 14.6666C7.87341 14.6666 7.74675 14.6199 7.64675 14.5199L3.60008 10.4732C3.40674 10.2799 3.40674 9.95992 3.60008 9.76658C3.79341 9.57325 4.11341 9.57325 4.30674 9.76658L8.00008 13.4599L11.6934 9.76658C11.8867 9.57325 12.2067 9.57325 12.4001 9.76658C12.5934 9.95992 12.5934 10.2799 12.4001 10.4732L8.35341 14.5199C8.25341 14.6199 8.12675 14.6666 8.00008 14.6666Z"
                      fill="white"
                    />
                    <path
                      d="M8 14.5535C7.72667 14.5535 7.5 14.3268 7.5 14.0535V2.8335C7.5 2.56016 7.72667 2.3335 8 2.3335C8.27333 2.3335 8.5 2.56016 8.5 2.8335V14.0535C8.5 14.3268 8.27333 14.5535 8 14.5535Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  Withdraw confirmation Modal -->
      <template v-if="currentStep === 2">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black pb-6 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y text-sm">
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Name
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target?.name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Details
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target?.number }} - {{ target?.bank_name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Date
              </p>
              <p class="text-1E1D24 font-medium">
                {{ format(new Date(), " dd MMM Y") }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Transfer Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Fee
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Total Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="pt-8 flex items-center justify-end space-x-4">
              <!-- <BaseButton
                type="button"
                class="text-#7D7C80 border border-#7D7C80 rounded-lg text-center font-light w-fit h-11"
                @click.prevent="(currentStep = 0)"
              >
                Cancel
              </BaseButton> -->

              <div class="rounded-lg w-fit bg-gradient-to-br from-orange to-red p-px hidden md:block">
                <BaseButton
                  type="button"
                  class="rounded-lg text-center font-light w-full md:w-fit h-11 bg-white"
                  @click.prevent="(currentStep = 0)"
                >
                  <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Cancel</span>
                </BaseButton>
              </div>
              
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light w-fit h-11"
                :is-loading="isSubmitting"
              >
                Confirm
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  OTP code Modal-->
      <template v-if="currentStep === 1">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-14 h-14 object-cover mx-auto"
            src="@/assets/images/info.png"
            alt=""
          />
          <div>
            <DialogTitle
              as="h3"
              class="text-2xl font-bold leading-6 text-#101828 text-center pb-3"
            >
              Check your inbox
            </DialogTitle>
            <p class="text-center text-[#667085]">
              We sent a code to {{ managerStore.getEmail }}
            </p>
            <!-- <p class="text-center text-[#667085]">
              
            </p> -->
          </div>

          <div class="pb-10 pt-5 flex items-center justify-center">
            <BaseOtpInput
              input-classes="otp-input-withdraw-pin w-[74px] h-[74px] text-center focus:outline-none focus:right-0 focus:border-[#F51211] mx-2 rounded-xl text-2xl font-medium"
              name="pin_code"
              :error="errors.pin"
              @is-complete="VerifyCode"
            />
          </div>

          <p class="text-[#626E8B] text-center">
            Code expires in {{ formatter(minutes, seconds) }}
          </p>
          <div class="flex items-center justify-center pb-10">
            <svg
              v-show="isSubmitting"
              class="w-7 h-7 animate-spin mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-75 text-red"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-100 text-red"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
            <!-- {{ isSubmitting ? 'loading.....' : '' }} -->
            <!-- <BaseButton
              :is-loading="isSubmitting"
              class="bg-gradient-to-br from-orange to-red text-white text-sm w-full max-w-xs rounded-lg h-10"
            >
              Withdraw
            </BaseButton> -->
          </div>
        </DialogPanel>
      </template>

      <template v-if="currentStep === 3">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <svg
              width="54"
              height="54"
              class="mx-auto"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                fill="#D1FADF"
              />
              <path
                d="M35.7857 25.2549V26.142C35.7845 28.2214 35.1112 30.2448 33.8661 31.9102C32.6211 33.5757 30.871 34.7941 28.877 35.3836C26.8829 35.9732 24.7516 35.9024 22.8011 35.1818C20.8506 34.4612 19.1852 33.1293 18.0534 31.3849C16.9216 29.6405 16.3841 27.5769 16.5209 25.502C16.6577 23.4271 17.4616 21.4521 18.8126 19.8713C20.1637 18.2906 21.9895 17.189 24.0178 16.7307C26.046 16.2725 28.1681 16.4821 30.0675 17.3285M35.7857 18.4277L26.1429 28.0802L23.25 25.1874"
                stroke="#039855"
                stroke-width="1.92857"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                stroke="#ECFDF3"
                stroke-width="5.78571"
              />
            </svg>

            <div class="space-y-4 pb-6 pt-4">
              <div>
                <DialogTitle
                  as="h3"
                  class="text-1E1D24 text-center text-lg font-medium font-power"
                >
                  Success
                  <!-- Transfer to {{ target?.name }} -->
                </DialogTitle>
                <p class=" text-center text-#7D7C80 text-sm">
                  Your withdrawal of <strong class="text-orange">{{ useCurrency(amount) }}</strong> of to <strong>{{
                    target?.name }}</strong> was successfull
                </p>
                <!-- <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
                </p> -->
              </div>
              <!-- <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p> -->
            </div>
          </div>

          <div class="flex-none">
            <BaseButton
              type="button"
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg w-full text-center"
              @click="$router.push({ name: 'wallet' })"
            >
              Close
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
    </form>
  </Modal>

  <Modal
    class="hidden md:block"
    :is-open="false"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <template v-if="currentStep === 0">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-8 px-6 text-left shadow-xl transition-all"
        >
          <DialogTitle
            as="div"
            class="text-xl font-semibold leading-6 text-#151419 text-center flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <h1 class="text-[32px] font-bold text-1E1D24">
                N5,000.00
              </h1>
              <p class="rounded-[100px] px-[10px] pt-[5px] bg-[#00C48C1A] text-[#00C48C] text-[11px] font-normal">
                Successful
              </p>
            </div>

            <XCircleIcon class="w-6 h-6 text-secondary" />
          </DialogTitle>
          <div class="mt-[10px]">
            <p class="text-sm text-black mb-6">
              <span>28 Jul, 2021</span><span class="text-626E8B"> 2:33 PM</span>
            </p>

            <div class="divide-y divide-[#E9E8E9]">
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Reference ID
                </p>
                <p>100912340175</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Name
                </p>
                <p>Charlie Sheen</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Email Address
                </p>
                <p>charlie.sheen@outlook.com</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Phone Number
                </p>
                <p>08094028400</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Payment Method
                </p>
                <p>Paystack</p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  Withdraw confirmation Modal -->
      <template v-if="currentStep === 2">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black pb-6 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y text-sm">
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Name
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target.name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Details
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target.number }} - {{ target.bank_name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Date
              </p>
              <p class="text-1E1D24 font-medium">
                {{ format(new Date(), " dd MMM Y") }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Transfer Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Fee
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Total Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="pt-8 flex items-center justify-end space-x-4">
              <BaseButton
                type="button"
                class="text-#7D7C80 border border-#7D7C80 rounded-lg text-center font-light w-fit h-11"
                @click.prevent="(currentStep = 0)"
              >
                Cancel
              </BaseButton>
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light w-fit h-11"
                :is-loading="isSubmitting"
              >
                Confirm
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  OTP code Modal-->
      <template v-if="currentStep === 1">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-14 h-14 object-cover mx-auto"
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
            <p class="text-center text-[#667085]">
              We sent a an OTP code
            </p>
            <p class="text-center text-[#667085]">
              {{ managerStore.getEmail }}
            </p>
          </div>

          <div class="pb-20 pt-5 flex items-center justify-center">
            <BaseOtpInput
              input-classes="otp-input-withdraw-pin w-[74px] h-[74px] text-center focus:outline-none focus:right-0 focus:border-[#F51211] mx-2 rounded-xl text-2xl font-medium"
              name="pin_code"
              :error="errors.pin"
            />
          </div>

          <p class="text-[#626E8B] text-center">
            Code expires in {{ formatter(minutes, seconds) }}
          </p>
          <div class="flex items-center justify-center ">
            <BaseButton
              :is-loading="isSubmitting"
              class="bg-gradient-to-br from-orange to-red text-white text-sm w-full max-w-xs rounded-lg h-10"
            >
              Withdraw
            </BaseButton>
          </div>
        </DialogPanel>
      </template>

      <template v-if="currentStep === 3">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <svg
              width="54"
              height="54"
              class="mx-auto"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                fill="#D1FADF"
              />
              <path
                d="M35.7857 25.2549V26.142C35.7845 28.2214 35.1112 30.2448 33.8661 31.9102C32.6211 33.5757 30.871 34.7941 28.877 35.3836C26.8829 35.9732 24.7516 35.9024 22.8011 35.1818C20.8506 34.4612 19.1852 33.1293 18.0534 31.3849C16.9216 29.6405 16.3841 27.5769 16.5209 25.502C16.6577 23.4271 17.4616 21.4521 18.8126 19.8713C20.1637 18.2906 21.9895 17.189 24.0178 16.7307C26.046 16.2725 28.1681 16.4821 30.0675 17.3285M35.7857 18.4277L26.1429 28.0802L23.25 25.1874"
                stroke="#039855"
                stroke-width="1.92857"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                stroke="#ECFDF3"
                stroke-width="5.78571"
              />
            </svg>

            <div class="space-y-4 pb-6 pt-4">
              <div>
                <DialogTitle
                  as="h3"
                  class="text-1E1D24 text-center text-lg font-medium font-power"
                >
                  Success
                  <!-- Transfer to {{ target?.name }} -->
                </DialogTitle>
                <p class=" text-center text-#7D7C80 text-sm">
                  Your withdrawal of <strong class="text-orange">{{ useCurrency(amount) }}</strong> of to <strong>{{
                    target?.name }}</strong> was successfull
                </p>
                <!-- <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
                </p> -->
              </div>
              <!-- <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p> -->
            </div>
          </div>

          <div class="flex-none">
            <BaseButton
              type="button"
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg w-full text-center"
              @click="$router.push({ name: 'wallet' })"
            >
              Close
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
    </form>
  </Modal>

  <Modal
    class="hidden md:block"
    :is-open="false"
  >
    <form
      class="w-full flex justify-center"
      @submit.prevent="onSubmit"
    >
      <template v-if="currentStep === 0">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-8 px-6 text-left shadow-xl transition-all"
        >
          <DialogTitle
            as="div"
            class="text-xl font-semibold leading-6 text-#151419 text-center flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <h1 class="text-[32px] font-bold text-1E1D24">
                Vinyl Disc
              </h1>
              <p class="rounded-[100px] px-[10px] pt-[5px] bg-[#00C48C1A] text-[#00C48C] text-[11px] font-normal">
                Successful
              </p>
            </div>

            <XCircleIcon class="w-6 h-6 text-secondary" />
          </DialogTitle>
          <div class="mt-[10px]">
            <p class="text-sm text-black mb-6">
              <span>28 Jul, 2021</span><span class="text-626E8B"> 2:33 PM</span>
            </p>

            <div class="divide-y divide-[#E9E8E9]">
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Items
                </p>
                <p>1</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Order ID
                </p>
                <p>100912340175</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Name
                </p>
                <p>Charlie Sheen</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Email Address
                </p>
                <p>charlie.sheen@outlook.com</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Exclusive Size
                </p>
                <p>Small</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Exclusive Colour
                </p>
                <p>Red</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Exclusive Cost
                </p>
                <p>₦10,000.00</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Shipping Fee
                </p>
                <p>₦3,000.00</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Order Total
                </p>
                <p
                  style="background: -webkit-linear-gradient(#f18b1b, #e52053);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;"
                >
                  ₦13,000.00
                </p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Payment Method
                </p>
                <p>Flutterwave</p>
              </div>
              <div class="text-sm text-1E1D24 font-medium py-4 flex items-center justify-between">
                <p class="font-normal text-7D7C80">
                  Shipping Address
                </p>
                <p class="max-w-[181px] text-right">
                  43b, Emina Crescent, Allen, Ikeja, Lagos, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  Withdraw confirmation Modal -->
      <template v-if="currentStep === 2">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="h3"
            class="text-xl text-left font-medium leading-6 text-black pb-6 px-6"
          >
            Review Transfer
          </DialogTitle>

          <div class="py-4 px-6 divide-y text-sm">
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Name
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target.name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Recipient Details
              </p>
              <p class="text-1E1D24 font-medium line-clamp-1">
                {{ target.number }} - {{ target.bank_name }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Date
              </p>
              <p class="text-1E1D24 font-medium">
                {{ format(new Date(), " dd MMM Y") }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Transfer Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Fee
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="flex justify-between py-4">
              <p class="text-727273">
                Total Amount
              </p>
              <p class="text-1E1D24 font-medium">
                {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
              </p>
            </div>
            <div class="pt-8 flex items-center justify-end space-x-4">
              <BaseButton
                type="button"
                class="text-#7D7C80 border border-#7D7C80 rounded-lg text-center font-light w-fit h-11"
                @click.prevent="(currentStep = 0)"
              >
                Cancel
              </BaseButton>
              <BaseButton
                class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light w-fit h-11"
                :is-loading="isSubmitting"
              >
                Confirm
              </BaseButton>
            </div>
          </div>
        </DialogPanel>
      </template>

      <!--  OTP code Modal-->
      <template v-if="currentStep === 1">
        <DialogPanel
          class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
        >
          <img
            class="w-14 h-14 object-cover mx-auto"
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
            <p class="text-center text-[#667085]">
              We sent a an OTP code
            </p>
            <p class="text-center text-[#667085]">
              {{ managerStore.getEmail }}
            </p>
          </div>

          <div class="pb-20 pt-5 flex items-center justify-center">
            <BaseOtpInput
              input-classes="otp-input-withdraw-pin w-[74px] h-[74px] text-center focus:outline-none focus:right-0 focus:border-[#F51211] mx-2 rounded-xl text-2xl font-medium"
              name="pin_code"
              :error="errors.pin"
            />
          </div>

          <p class="text-[#626E8B] text-center">
            Code expires in {{ formatter(minutes, seconds) }}
          </p>
          <div class="flex items-center justify-center ">
            <BaseButton
              :is-loading="isSubmitting"
              class="bg-gradient-to-br from-orange to-red text-white text-sm w-full max-w-xs rounded-lg h-10"
            >
              Withdraw
            </BaseButton>
          </div>
        </DialogPanel>
      </template>

      <template v-if="currentStep === 3">
        <DialogPanel
          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
        >
          <div class="flex-grow flex flex-col items-center justify-center">
            <svg
              width="54"
              height="54"
              class="mx-auto"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                fill="#D1FADF"
              />
              <path
                d="M35.7857 25.2549V26.142C35.7845 28.2214 35.1112 30.2448 33.8661 31.9102C32.6211 33.5757 30.871 34.7941 28.877 35.3836C26.8829 35.9732 24.7516 35.9024 22.8011 35.1818C20.8506 34.4612 19.1852 33.1293 18.0534 31.3849C16.9216 29.6405 16.3841 27.5769 16.5209 25.502C16.6577 23.4271 17.4616 21.4521 18.8126 19.8713C20.1637 18.2906 21.9895 17.189 24.0178 16.7307C26.046 16.2725 28.1681 16.4821 30.0675 17.3285M35.7857 18.4277L26.1429 28.0802L23.25 25.1874"
                stroke="#039855"
                stroke-width="1.92857"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="3"
                y="3"
                width="48"
                height="48"
                rx="24"
                stroke="#ECFDF3"
                stroke-width="5.78571"
              />
            </svg>

            <div class="space-y-4 pb-6 pt-4">
              <div>
                <DialogTitle
                  as="h3"
                  class="text-1E1D24 text-center text-lg font-medium font-power"
                >
                  Success
                  <!-- Transfer to {{ target?.name }} -->
                </DialogTitle>
                <p class=" text-center text-#7D7C80 text-sm">
                  Your withdrawal of <strong class="text-orange">{{ useCurrency(amount) }}</strong> of to <strong>{{
                    target?.name }}</strong> was successfull
                </p>
                <!-- <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
                </p> -->
              </div>
              <!-- <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p> -->
            </div>
          </div>

          <div class="flex-none">
            <BaseButton
              type="button"
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg w-full text-center"
              @click="$router.push({ name: 'wallet' })"
            >
              Close
            </BaseButton>
          </div>
        </DialogPanel>
      </template>
    </form>
  </Modal>

  <form
    class="w-full flex justify-center fixed top-40 h-screen md:hidden"
    @submit.prevent="onSubmit"
  >
    <template v-if="currentStep === 0">
      <div
        class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-8 px-6 text-left shadow-xl transition-all space-y-8"
      >
        <h3
          as="h3"
          class="text-lg md:text-xl font-semibold leading-6 text-#151419 text-center"
        >
          How much do you want to withdraw?
        </h3>
        <div class="space-y-4">
          <div class="w-full mx-auto">
            <AmountInput
              v-model="amount"
              inputmode="numeric"
              placeholder="₦0.00"
              name="amount"
              :error="errors.amount"
            />
          </div>

          <p class="text-xs text-[#626E8B] text-center">
            Your Total Balance NGN
            <span class="font-bold"> {{ useCurrency(walletStore.balance) }} </span>
          </p>
          <!-- Account Details -->
          <BaseSelect
            :options="accountDetails"
            track-by="id"
            label-prop="name"
            value-prop="id"
            :can-deselect="false"
            name="account"
            label="Bank Account"
            class="rounded border border-light-grey focus:border-light-grey"
            :error="errors.account"
          />
          <div class="mt-2">
            <BaseTextArea
              name="narration"
              label="Description"
              rows="3"
              maxlength="80"
              :can-count-text="true"
              class="rounded border-light-grey focus:border-light-grey w-full"
              :error="errors.narration"
            />
          </div>


          <div class="flex items-center justify-end pt-10 md:pt-0">
            <div class="rounded-lg w-fit bg-gradient-to-br from-orange to-red px-px hidden md:block">
              <BaseButton
                type="button"
                class="rounded-lg text-center font-light w-full md:w-fit h-11 bg-white"
                @click.prevent="(currentStep = 0)"
              >
                <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Cancel</span>
              </BaseButton>
            </div>
            
            <BaseButton
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light h-11 md:h-9 w-full md:w-fit"
              :is-loading="isSubmitting"
            >
              Withdraw
            </BaseButton>
          </div>
        </div>
      </div>
    </template>

    <!--  Withdraw confirmation Modal -->
    <template v-if="currentStep === 2">
      <div
        class="w-full max-w-lg transform overflow-hidden rounded-2xl py-4 bg-white text-left align-middle shadow-xl transition-all"
      >
        <h3
          as="h3"
          class="text-xl text-left font-medium leading-6 text-black pb-6 px-6 hidden md:block"
        >
          Review Transaction
        </h3>

        <div class="md:py-4 px-6 divide-y text-sm">
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Recipient Name
            </p>
            <p class="text-1E1D24 font-medium line-clamp-1">
              {{ target?.name }}
            </p>
          </div>
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Recipient Details
            </p>
            <p class="text-1E1D24 font-medium line-clamp-1">
              {{ target?.number }} - {{ target?.bank_name }}
            </p>
          </div>
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Date
            </p>
            <p class="text-1E1D24 font-medium">
              {{ format(new Date(), " dd MMM Y") }}
            </p>
          </div>
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Fee
            </p>
            <p class="text-1E1D24 font-medium">
              {{ useCurrency(40, "NGN", "en-NG", 'symbol') }}
            </p>
          </div>
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Transfer Amount
            </p>
            <p class="text-1E1D24 font-medium">
              {{ useCurrency(amount, "NGN", "en-NG", 'symbol') }}
            </p>
          </div>
          <div class="flex justify-between py-4">
            <p class="text-727273">
              Total Amount
            </p>
            <p class="font-medium text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">
              {{ useCurrency(totalAmount, "NGN", "en-NG", 'symbol') }}
            </p>
          </div>
          <div class="pt-16 md:pt-8 flex flex-col md:flex-row items-center justify-end gap-4 ">
            <div class="rounded-lg w-fit bg-gradient-to-br from-orange to-red p-px hidden md:block">
              <BaseButton
                type="button"
                class="rounded-lg text-center font-light w-full md:w-fit h-11 bg-white"
                @click.prevent="(currentStep = 1)"
              >
                <span class=" text-transparent bg-clip-text bg-gradient-to-br from-orange to-red font-medium">Cancel</span>
              </BaseButton>
            </div>
            <BaseButton
              class="bg-gradient-to-br from-orange to-red text-white rounded-lg text-center font-light w-full md:w-fit h-11"
              :is-loading="isSubmitting"
            >
              Confirm
            </BaseButton>
          </div>
        </div>
      </div>
    </template>

    <!--  OTP code Modal-->
    <template v-if="currentStep === 1">
      <div
        class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-14 px-6  text-left align-middle shadow-xl transition-all space-y-8"
      >
        <img
          class="w-14 h-14 object-cover mx-auto"
          src="@/assets/images/info.png"
          alt=""
        />
        <div>
          <h3
            as="h3"
            class="text-2xl font-bold leading-6 text-black text-center pb-3"
          >
            Check your inbox
          </h3>
          <p class="text-center text-[#667085]">
            We sent a an OTP code {{ managerStore.getEmail }}
          </p>
          <!-- <p class="text-center text-[#667085]">
            
          </p> -->
        </div>

        <div class="pb-6 md:pb-14 pt-5 flex items-center justify-center">
          <BaseOtpInput
            input-classes="otp-input-withdraw-pin w-[48px] md:w-[74px] h-[48px] md:h-[74px] text-center focus:outline-none focus:right-0 focus:border-[#F51211] mx-2 rounded-lg md:rounded-xl text-2xl font-medium"
            name="pin_code"
            :error="errors.pin"
          />
        </div>

        <p class="text-[#626E8B] text-center">
          Code expires in {{ formatter(minutes, seconds) }}
        </p>
        <div class="flex items-center justify-center ">
          <BaseButton
            :is-loading="isSubmitting"
            class="bg-gradient-to-br from-orange to-red text-white text-sm w-full max-w-xs rounded-lg h-10"
          >
            Withdraw
          </BaseButton>
        </div>
      </div>
    </template>

    <template v-if="currentStep === 3">
      <div
        class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all flex flex-col p-8"
      >
        <div class="flex-grow flex flex-col items-center justify-center">
          <svg
            width="54"
            height="54"
            class="mx-auto"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="48"
              height="48"
              rx="24"
              fill="#D1FADF"
            />
            <path
              d="M35.7857 25.2549V26.142C35.7845 28.2214 35.1112 30.2448 33.8661 31.9102C32.6211 33.5757 30.871 34.7941 28.877 35.3836C26.8829 35.9732 24.7516 35.9024 22.8011 35.1818C20.8506 34.4612 19.1852 33.1293 18.0534 31.3849C16.9216 29.6405 16.3841 27.5769 16.5209 25.502C16.6577 23.4271 17.4616 21.4521 18.8126 19.8713C20.1637 18.2906 21.9895 17.189 24.0178 16.7307C26.046 16.2725 28.1681 16.4821 30.0675 17.3285M35.7857 18.4277L26.1429 28.0802L23.25 25.1874"
              stroke="#039855"
              stroke-width="1.92857"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="3"
              y="3"
              width="48"
              height="48"
              rx="24"
              stroke="#ECFDF3"
              stroke-width="5.78571"
            />
          </svg>

          <div class="space-y-4 pb-6 pt-4">
            <div>
              <DialogTitle
                as="h3"
                class="text-1E1D24 text-center text-lg font-medium font-power"
              >
                Success
                <!-- Transfer to {{ target?.name }} -->
              </DialogTitle>
              <p class=" text-center text-#7D7C80 text-sm">
                Your withdrawal of <strong class="text-transparent bg-clip-text bg-gradient-to-br from-orange to-red">{{ useCurrency(amount) }}</strong> of to <strong>{{
                  target?.name }}</strong> was successfull
              </p>
              <!-- <p class="text-[2rem] font-bold text-center text-black">
                  {{ useCurrency(amount) }}
                </p> -->
            </div>
            <!-- <p
                class="w-[4.6875rem] mx-auto text-[11px] text-center py-1 rounded-full text-[#00C48C] bg-[#00C48C] bg-opacity-10"
              >
                Successful
              </p> -->
          </div>
        </div>

        <div class="flex-none">
          <BaseButton
            type="button"
            class="bg-gradient-to-br from-orange to-red text-white rounded-lg w-full text-center"
            @click="$router.push({ name: 'wallet' })"
          >
            Close
          </BaseButton>
        </div>
      </div>
    </template>
  </form>
</template>



<script setup>
import {
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { ref,  computed } from "vue";
import Modal from "@/components/ModalComponent.vue";
import { useSettingsStore } from "@/stores/settings";
import { number, object, string } from "yup";
import {useForm} from "vee-validate";
import AmountInput from "@/components/base/AmountInput.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseOtpInput from "@/components/base/BaseOtpInput.vue";
import { useManagerStore } from "@/stores/manager";
import {useWalletStore} from "@/stores/wallet";
import { useCurrency } from "@/composables/currency";
import { useCountdown } from "@/composables/countdown";
import { format  } from "date-fns"

const { formatter, minutes, seconds } = useCountdown(300)
const managerStore = useManagerStore();
const walletStore = useWalletStore();
const settingsStore = useSettingsStore();
settingsStore.getBanks();

const accountDetails = [ ...settingsStore.banks ];

let currentStep = ref(0);

const amount = ref(0);
const totalAmount = computed(() => parseInt(amount.value) + 40);

// eslint-disable-next-line vue/return-in-computed-property
const target = computed(() => {
  let id = values?.account;
  if (id) return settingsStore.banks.find((account) => account.id === id);
});


const schemas = [
  object({
    account: string().required().label("Bank Account"),
    amount:number("Not a Valid Account Number").required().label("Amount"),
    narration:string().required().label("Description"),
  }),
  object({
    pin_code: number("Invalid format").required().label("Pin Code"),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

const { handleSubmit, errors, isSubmitting, values } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})

const onSubmit = handleSubmit( async ( values, actions ) => {
  if (currentStep.value === 0) {
    return currentStep.value = 2
  }

  if (currentStep.value === 2) {
    await walletStore
      .confirmation(values)
      .catch((error) => {
        // eslint-disable-next-line no-undef
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        actions.setErrors(error.data.errors);
      });

    return currentStep.value = 1

  }


  if (currentStep.value === 1) {
    await walletStore
      .withdraw(values)
      .then((response) => {
        // eslint-disable-next-line no-undef
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        return currentStep.value = 3
      }).catch((error) => {
        // eslint-disable-next-line no-undef
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        actions.setErrors(error.data.errors);
      });
  }

});

const VerifyCode = () => {
  onSubmit()
}


</script>

<style>
.otp-input-withdraw-pin {
  padding: 5px;
  /* margin: 0 10px; */
  font-size: 20px;
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input-withdraw-pin {
  border-width: 1px;
  border-color: #E9E8E9 !important;
}
.otp-input-withdraw-pin.is-complete {
  border-color: #ff6666 !important;
}

.otp-input-withdraw-pin::-webkit-inner-spin-button,
.otp-input-withdraw-pin::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
