<template>
    <div class="flex flex-col items-center justify-center space-y-16">
        <div class="space-y-3">
            <GradientTitle class="text-base font-semibold text-center" :name="'Contact us'" />
            <Title class="text-4xl text-center" name="Get in touch" />
            <p class="text-[#667085] text-xl font-normal leading-8">
                 We’d love to hear from you.Please fill out this form.
            </p>
        </div>
        <form class="max-w-[685px] w-full mx-auto space-y-10">
            <div class="grid grid-col-2 gap-6">
                <FormGroup>
                    <label class="after:content-['*'] after:ml-0.5 after:text-red" for="">
                        First Name
                    </label>
                    <TextInput 
                        type="text" 
                        class="rounded-lg w-full" 
                        aria-label="password" 
                        placeholder="Enter name"
                    />
                </FormGroup>
                <FormGroup>
                    <label class="after:content-['*'] after:ml-0.5 after:text-red" for="">
                        Last name
                    </label>
                    <TextInput 
                        type="text" 
                        class="rounded-lg w-full" 
                        aria-label="password" 
                        placeholder="Enter Name"
                    />
                </FormGroup>
                <FormGroup>
                    <label class="after:content-['*'] after:ml-0.5 after:text-red" for="">
                        Email Address
                    </label>
                    <TextInput 
                        type="text" 
                        class="rounded-lg w-full" 
                        aria-label="password" 
                        placeholder="Enter email"
                    />
                </FormGroup>
                <FormGroup>
                    <label class="after:content-['*'] after:ml-0.5 after:text-red" for="">
                        Phone Number
                    </label>
                    <TextInput 
                        type="text" 
                        class="rounded-lg w-full" 
                        aria-label="password" 
                        placeholder="Enter number"
                    />
                </FormGroup>
                <FormGroup class="col-span-2">
                    <label class="after:content-['*'] after:ml-0.5 after:text-red" for="">
                        How may we help you
                    </label>
                    <TextArea placeholder="Enter description" rows="3" class="rounded-lg w-full" aria-label="password" />
                </FormGroup>
            </div>

            <BaseButton class="px-8" type="button"> Submit </BaseButton>
        </form>
    </div>
</template>

<script setup>
    
</script>

<style lang="scss" scoped>

</style>