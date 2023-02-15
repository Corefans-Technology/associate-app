<template>
 <dashboard-layout>
   <div class="p-[2.5rem] space-y-6">
     <div class="flex items-center space-x-4 justify-between">
       <!-- breabcrum -->
       <div>
         <div class="flex items-center space-x-1">
           <a class="text-sm text-[#626E8B]" href="/creative/campaign"
           >Campaigns
           </a>
           <button class="focus:outline-none" @click="$router.back()">
             <Icon name="right-arrow" />
           </button>
           <a class="text-sm text-[#626E8B]" href="#"
           >New Campaigns
           </a>
         </div>
         <h2 class="text-2xl font-medium text-black pr-[2rem]">New Campaign</h2>
       </div>

       <div class="flex items-center justify-end">
         <button
             class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
         >
           <Icon name="preview" />
           <span>Preview Campaign</span>
         </button>
       </div>
     </div>
     <!-- <CheckOutStep :step="step" /> -->
     <FormStep :steps="steps" :step="step" />

     <form class="border-t border-[#EDEDED] py-[1.5rem]">
       <fieldset
           v-show="step === 1"
           class="flex justify-between 2xl:justify-start 2xl:space-x-40"
       >
         <div class="max-w-[20.25rem] w-full space-y-3">
           <h3 class="text-xl font-medium">Basics</h3>
           <div class="text-sm text-[#98A2B3] space-y-4">
             <p>
               Tell your story to your fans and make a great firs impression.
               This is what fans will first see on your campaign page. Here are
               some tips:
             </p>

             <ul class="list-disc pl-10">
               <li>Make it clear what you are raising funds for</li>
               <li>Entice people to learn more</li>
               <li>Use keywords that will help you stand out</li>
               <li>
                 Stuck for ideas? Check out other campaigns in Explore for
                 inspiration.
               </li>
             </ul>

             <a class="text-[#F18B1B] block" href="#"
             >Need help?</a
             >
           </div>
         </div>

         <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
           <!-- title -->
           <div class="space-y-1 relative">
             <label for="title">Campaign Title</label>
             <input
                 id="title"
                 v-model="campaignForm.basics.title"
                 @input="$v.basics.title.$touch()"
                 :class="[
                $v.basics.title.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="Enter title"
                 type="text"
             />
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>What is the title of your campaign?</p>
               <p>0/30</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.title.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.title.required.$invalid
                     ? "Title is Required"
                     : "Text limit exceeded"
               }}
             </p>
           </div>

           <!-- description -->
           <div class="space-y-1 relative">
             <label for="description">Campaign description</label>
             <textarea
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 v-model="campaignForm.basics.description"
                 @input="$v.basics.description.$touch()"
                 :class="[
                $v.basics.description.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 placeholder="Enter title"
                 name=""
                 id="description"
                 rows="3"
             >
            </textarea>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Provide a short description that best describes your campaign to
                 your audience.
               </p>
               <p>300/300</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.description.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.description.required.$invalid
                     ? "Description is Required"
                     : "Text limit exceeded"
               }}
             </p>
           </div>

           <!-- Category -->
           <div class="space-y-1 relative">
             <label for="Category">Category</label>
             <select
                 name="Category"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 v-model="campaignForm.basics.category"
                 @input="$v.basics.category.$touch()"
                 :class="[
                $v.basics.category.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 id="Category"
             >
               <option selected disabled value="">Select category</option>
             </select>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 To help backers find your campaign, select a category that best
                 represents your project.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.category.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.category.required.$invalid
                     ? "Category is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- Location -->
           <div class="space-y-1 relative">
             <label for="Location">Location</label>
             <select
                 name="Location"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 v-model="campaignForm.basics.location"
                 @input="$v.basics.location.$touch()"
                 :class="[
                $v.basics.location.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 id="Location"
             >
               <option selected disabled value="">Select Location</option>
             </select>
             <!-- Error -->
             <p
                 v-show="$v.basics.location.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.location.required.$invalid
                     ? "Location is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- Campaign Duration -->
           <div class="space-y-1 relative">
             <label for="Duration">Campaign Duration</label>
             <input
                 id="Duration"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="Enter duration"
                 v-model="campaignForm.basics.duration"
                 @input="$v.basics.duration.$touch()"
                 :class="[
                $v.basics.duration.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 type="number"
             />
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 How many days will you be running your campaign for? You can run
                 a campaign for any number of days, with a 90 day duration
                 maximum.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.duration.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.duration.required.$invalid
                     ? "Duration is Required"
                     : "Max duration day exceeded"
               }}
             </p>
           </div>

           <!-- Tag -->
           <div class="space-y-1 relative">
             <label for="tag">Tag</label>

             <Multiselect
                 v-model="campaignForm.basics.tags"
                 @input="$v.basics.tags.$touch()"
                 :class="[
                $v.basics.tags.$error ? 'border-[#E52053]' : 'border-[#D9D9D9]',
              ]"
                 mode="tags"
                 :close-on-select="false"
                 :searchable="true"
                 placeholder="Select tags"
                 :create-option="true"
                 :classes="{
                container:
                  'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-[#D9D9D9] rounded-[0.5rem] bg-white text-base leading-snug outline-none py-2 px-2',
                tag: 'bg-gradient-to-r from-orange to-red flex text-white rounded-[6px] text-xs py-1 px-2',
                tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2 space-x-3',
              }"
                 :options="[
                { value: 'batman', label: 'Batman' },
                { value: 'robin', label: 'Robin' },
                { value: 'joker', label: 'Joker' },
              ]"
             >
             </Multiselect>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 How many days will you be running your campaign for? You can run
                 a campaign for any number of days, with a 90 day duration
                 maximum.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.tags.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.basics.tags.required.$invalid
                     ? "Tags is Required"
                     : "Max tag number exceeded"
               }}
             </p>
           </div>

           <!-- Input label text -->
           <div class="space-y-1 relative w-[15.625rem]">
             <label for="tag">Input label text</label>

             <div
                 class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
             >
               <div
                   v-if="!main_image_preview"
                   class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
               >
                 <Icon name="upload" />
                 <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                   Drop an image here, or select a file.
                 </p>
                 <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                   It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200
                   MB.
                 </p>
               </div>
               <img
                   v-else
                   class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                   :src="main_image_preview"
                   alt=""
               />
               <input
                   @change="onFileChange"
                   class="absolute inset-0 opacity-0"
                   type="file"
                   name=""
                   id=""
               />
             </div>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>Upload a square image that represents your campaign.</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.basics.feature_image.$error"
                 class="absolute right-0 -top-1 text-[#E52053]"
             >
               {{
                 $v.basics.feature_image.required.$invalid
                     ? "Photo is Required"
                     : ""
               }}
             </p>
           </div>
         </div>
       </fieldset>

       <fieldset
           v-show="step === 2"
           class="flex justify-between 2xl:justify-start 2xl:space-x-40"
       >
         <div class="max-w-[20.25rem] w-full space-y-3">
           <h3 class="text-xl font-medium">Content</h3>
           <div class="text-sm text-[#98A2B3] space-y-4">
             <p>
               Use videos or images to tell your story to fans. You can add up to
               three images or videos. Here are some tips:
             </p>

             <ul class="list-disc pl-10">
               <li>
                 Have your face show in the video or image for a deeper emotional
                 connection
               </li>
               <li>Show examples or snippets of your work in your video</li>
               <li>
                 Let your fans see the work you put into your art by showing your
                 process in your video
               </li>
               <li>Make sure your video or image is clear and good quality</li>
               <li>
                 Make sure your video or image is clear and good quality Be a
                 storyteller. Tell fans what your art means to you, how you
                 create, why you create, and what’s in it for them
               </li>
             </ul>

             <a class="text-[#F18B1B] block" href="#"
             >Need help?</a
             >
           </div>
         </div>

         <div class="max-w-[42.8125rem] w-full space-y-[2rem] relative">
           <div v-show="content_type === 'video'" class="space-y-[2rem]">
             <!-- url -->
             <div class="space-y-1 relative">
               <label for="url">Video URL</label>
               <input
                   id="url"
                   v-model="campaignForm.content.video_urls.url_one"
                   @input="$v.content.video_urls.url_one.$touch()"
                   :class="[
                  $v.content.video_urls.url_one.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                   placeholder="Enter valid URL"
                   type="text"
               />
               <div
                   class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
               >
                 <p>
                   Enter a Youtube URL to appear at the top of your campaign page
                 </p>
               </div>
               <!-- Error -->
               <p
                   v-show="$v.content.video_urls.url_one.$error"
                   class="absolute right-36 top-0 text-[#E52053]"
               >
                 {{
                   $v.content.video_urls.url_one.required.$invalid
                       ? "Video url is Required"
                       : " The value is not a valid URL address"
                 }}
               </p>
             </div>

             <!-- Video URL (optional) -->
             <div class="space-y-1 relative">
               <label for="url">Video URL (optional)</label>
               <input
                   id="url"
                   v-model="campaignForm.content.video_urls.url_two"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24] border-[#D9D9D9]"
                   placeholder="Enter valid URL"
                   type="text"
               />
               <div
                   class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
               >
                 <p>
                   Enter a Youtube URL to appear at the top of your campaign page
                 </p>
               </div>
             </div>

             <!-- Video URL (optional) -->
             <div class="space-y-1 relative">
               <label for="url">Video URL (optional)</label>
               <input
                   id="url"
                   v-model="campaignForm.content.video_urls.url_three"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24] border-[#D9D9D9]"
                   placeholder="Enter valid URL"
                   type="text"
               />
               <div
                   class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
               >
                 <p>
                   Enter a Youtube URL to appear at the top of your campaign page
                 </p>
               </div>
             </div>
           </div>

           <div v-show="content_type === 'image'" class="space-y-[2rem]">
             <!-- Pitch Image One -->
             <div class="space-y-1 relative w-[15.625rem]">
               <label for="tag">Pitch Image *</label>

               <div
                   class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
               >
                 <div
                     v-if="!pitch_one_image_preview"
                     class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
                 >
                   <Icon name="upload" />
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     Drop an image here, or select a file.
                   </p>
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     You can upload up to three (3) pitch images for your
                     campaign.
                   </p>
                 </div>
                 <img
                     v-else
                     class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                     :src="pitch_one_image_preview"
                     alt=""
                 />
                 <input
                     @change="onPitchImageOne"
                     class="absolute inset-0 opacity-0"
                     type="file"
                     name=""
                     id=""
                 />
               </div>
               <div
                   class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
               >
                 <p>Upload a square image that represents your campaign.</p>
               </div>
               <!-- Error -->
               <p
                   v-show="$v.content.images.image_one.$error"
                   class="absolute right-0 -top-1 text-[#E52053]"
               >
                 {{
                   $v.content.images.image_one.required.$invalid
                       ? "Photo is Required"
                       : ""
                 }}
               </p>
             </div>

             <!-- Pitch Image Two -->
             <div class="space-y-1 relative w-[15.625rem]">
               <label for="tag">Pitch Image 2 (optional)</label>

               <div
                   class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
               >
                 <div
                     v-if="!pitch_two_image_preview"
                     class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
                 >
                   <Icon name="upload" />
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     Drop an image here, or select a file.
                   </p>
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     You can upload up to three (3) pitch images for your
                     campaign.
                   </p>
                 </div>
                 <img
                     v-else
                     class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                     :src="pitch_two_image_preview"
                     alt=""
                 />
                 <input
                     @change="onPitchImageTwo"
                     class="absolute inset-0 opacity-0"
                     type="file"
                     name=""
                     id=""
                 />
               </div>
             </div>

             <!-- Pitch Image Three -->
             <div class="space-y-1 relative w-[15.625rem]">
               <label for="tag">Pitch Image 3 (optional)</label>

               <div
                   class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
               >
                 <div
                     v-if="!pitch_three_image_preview"
                     class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
                 >
                   <Icon name="upload" />
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     Drop an image here, or select a file.
                   </p>
                   <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                     You can upload up to three (3) pitch images for your
                     campaign.
                   </p>
                 </div>
                 <img
                     v-else
                     class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                     :src="pitch_three_image_preview"
                     alt=""
                 />
                 <input
                     @change="onPitchImageThree"
                     class="absolute inset-0 opacity-0"
                     type="file"
                     name=""
                     id=""
                 />
               </div>
             </div>
           </div>

           <!-- Story -->
           <div class="space-y-1 relative">
             <label for="story">Story</label>
             <textarea
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="Enter description"
                 v-model="campaignForm.content.story"
                 @input="$v.content.story.$touch()"
                 :class="[
                $v.content.story.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 name=""
                 id="story"
                 rows="3"
             >
            </textarea>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Provide a short description that best describes your campaign to
                 your audience.
               </p>
               <p>300/300</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.content.story.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.content.story.required.$invalid
                     ? "Description is Required"
                     : "Text limit exceeded"
               }}
             </p>
           </div>

           <!-- content type toggle buttons -->
           <div class="absolute right-0 -top-[2.5rem] flex space-x-3">
             <button
                 type="button"
                 @click="content_type = 'video'"
                 :class="[
                content_type === 'video'
                  ? 'bg-gradient-to-r from-orange to-red text-white'
                  : 'text-[#7B7B7B]',
              ]"
                 class="text-[11px] px-4 rounded-[1.25rem] py-1"
             >
               Video
             </button>

             <button
                 type="button"
                 @click="content_type = 'image'"
                 :class="[
                content_type === 'image'
                  ? 'bg-gradient-to-r from-orange to-red text-white'
                  : 'text-[#7B7B7B]',
              ]"
                 class="text-[11px] px-4 rounded-[1.25rem] py-1"
             >
               Image
             </button>
           </div>
         </div>
       </fieldset>

       <fieldset
           v-show="step === 3"
           class="flex justify-between 2xl:justify-start 2xl:space-x-40"
       >
         <div class="max-w-[20.25rem] w-full space-y-3">
           <h3 class="text-xl font-medium">Perks</h3>
           <div class="text-sm text-[#98A2B3] space-y-4">
             <p>Offer sweet perks to reward your fans. Here are some tips:</p>

             <div>
               <ul class="list-disc pl-10">
                 <li>
                   Have perks that are related to your art, brand or the project
                   you are raising for
                 </li>
                 <li>Include high ticket perks for large donations</li>
                 <li>Create different perks for different donation amounts</li>
                 <li>Make sure your video or image is clear and good quality</li>
                 <li>Add photos that represent your perk</li>
                 <li>Be very descriptive with your perk description</li>
               </ul>
               <p>
                 Note: Delivery of your perk is solely your responsibility Need
                 help?
               </p>
             </div>

             <a class="text-[#F18B1B] block" href="#"
             >Need help?</a
             >
           </div>
         </div>

         <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
           <!-- Perk Title -->
           <div class="space-y-1 relative">
             <label for="perk_title">Perk Title</label>
             <input
                 id="perk_title"
                 v-model="campaignForm.perks.title"
                 @input="$v.perks.title.$touch()"
                 :class="[
                $v.perks.title.$error ? 'border-[#E52053]' : 'border-[#D9D9D9]',
              ]"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="e.g backstage pass to my June concert"
                 type="text"
             />
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>What is the title of your perk?</p>
               <p>0/60</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.title.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.perks.title.required.$invalid
                     ? "Title is Required"
                     : "Text limit exceeded"
               }}
             </p>
           </div>

           <!-- Perk Description -->
           <div class="space-y-1 relative">
             <label for="perk_description">Perk Description</label>
             <textarea
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 v-model="campaignForm.perks.description"
                 @input="$v.perks.description.$touch()"
                 :class="[
                $v.perks.description.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 placeholder="Enter description"
                 name=""
                 id="perk_description"
                 rows="3"
             >
            </textarea>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Provide a short description that best describes your campaign to
                 your audience.
               </p>
               <p>300/300</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.description.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.perks.description.required.$invalid
                     ? "Description is Required"
                     : "Text limit exceeded"
               }}
             </p>
           </div>

           <!-- Perk Image -->
           <div class="space-y-1 relative w-[15.625rem]">
             <label for="tag">Perk Image</label>

             <div
                 class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
             >
               <div
                   v-if="!main_image_preview"
                   class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
               >
                 <Icon name="upload" />
                 <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                   Drop an image here, or select a file.
                 </p>
                 <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                   It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200
                   MB.
                 </p>
               </div>
               <img
                   v-else
                   class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                   :src="main_image_preview"
                   alt=""
               />
               <input
                   @change="onPerkImage"
                   class="absolute inset-0 opacity-0"
                   type="file"
                   name=""
                   id=""
               />
             </div>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>Upload a square image of your perk.</p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.image.$error"
                 class="absolute right-0 -top-1 text-[#E52053]"
             >
               {{ $v.perks.image.required.$invalid ? "Photo is Required" : "" }}
             </p>
           </div>

           <!-- Quantity Available -->
           <div class="space-y-1 relative">
             <label for="Quantity">Quantity Available</label>
             <input
                 id="Quantity"
                 v-model="campaignForm.perks.quantity"
                 @input="$v.perks.quantity.$touch()"
                 :class="[
                $v.perks.quantity.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="Enter quantity"
                 type="text"
             />
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Limit the quantity available based on the production volume.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.quantity.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.perks.quantity.required.$invalid
                     ? "Quantity is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- Price -->
           <div class="space-y-1 relative">
             <label for="perk_title">Price</label>
             <div class="w-full relative">
               <input
                   id="perk_title"
                   v-model="campaignForm.perks.price"
                   @input="$v.perks.price.$touch()"
                   :class="[
                  $v.perks.price.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] pl-[1.8rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                   type="text"
               />
               <span
                   class="absolute left-0 py-[0.75rem] pl-[1rem] text-sm text-[#98A2B3]"
               >₦</span
               >
             </div>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Set an amount you want to collect from supporters who claim this
                 perk.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.price.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{ $v.perks.price.required.$invalid ? "Price is Required" : "" }}
             </p>
           </div>

           <!-- Retail Price -->
           <div class="space-y-1 relative">
             <label for="retail_title">Retail Price</label>
             <div class="w-full relative">
               <input
                   id="retail_title"
                   v-model="campaignForm.perks.retail_price"
                   @input="$v.perks.retail_price.$touch()"
                   :class="[
                  $v.perks.retail_price.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] pl-[1.8rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                   type="text"
               />
               <span
                   class="absolute left-0 py-[0.75rem] pl-[1rem] text-sm text-[#98A2B3]"
               >₦</span
               >
             </div>
             <!-- Error -->
             <p
                 v-show="$v.perks.retail_price.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.perks.retail_price.required.$invalid
                     ? "Retail Price is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- Delivery Date -->
           <div class="space-y-1 relative">
             <label for="Delivery">Delivery Date</label>
             <input
                 id="Delivery"
                 v-model="campaignForm.perks.delivery_date"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24] border-[#D9D9D9]"
                 placeholder="Enter quantity"
                 type="text"
             />
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Estimeate a delivery date of this perk to prospective claimers.
               </p>
             </div>
           </div>

           <!-- Shipping details   -->
           <div class="space-y-1 relative">
             <label for="shipping_details">Shipping details </label>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>Does this perk contain items you need to ship?</p>
             </div>

             <div class="pt-4 space-y-2">
               <div class="flex items-center space-x-4">
                 <input
                     class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                     type="radio"
                     id="shipping_details"
                     :value="false"
                     v-model="campaignForm.perks.shipping"
                 />
                 <label class="text-xs" for="shipping_details"
                 >No, It does not.</label
                 >
               </div>

               <div class="flex items-center space-x-4">
                 <input
                     class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                     type="radio"
                     id="shipping_details"
                     :value="true"
                     v-model="campaignForm.perks.shipping"
                 />
                 <label class="text-xs" for="shipping_details"
                 >Yes, It does.</label
                 >
               </div>
             </div>

             <div v-show="campaignForm.perks.shipping" class="pt-5 space-y-4">
               <div
                   v-for="(shipping_detail, index) in campaignForm.perks
                .shipping_details"
                   :key="index"
                   class="flex items-center space-x-4"
               >
                 <div class="space-y-1 relative flex flex-col">
                   <label class="text-[13px]" for="shipping_location"
                   >Shipping location</label
                   >
                   <div class="max-w-[9.9375rem]">
                     <select
                         id="shipping_location"
                         v-model="shipping_detail.location"
                         class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
                         placeholder="Enter quantity"
                         type="text"
                     >
                       <option selected disabled value="">Select Country</option>
                     </select>
                   </div>
                 </div>

                 <div class="space-y-1 relative flex flex-col">
                   <label class="text-[13px]" for="shipping_fee"
                   >Shipping fee</label
                   >
                   <div class="relative max-w-[9.9375rem]">
                     <input
                         id="shipping_fee"
                         v-model="shipping_detail.fee"
                         class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1.7rem] rounded-[0.5rem] w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
                         placeholder="Enter quantity"
                         type="text"
                     />
                     <span
                         class="absolute left-0 py-[0.75rem] pl-[1rem] text-sm text-[#98A2B3]"
                     >₦</span
                     >
                   </div>
                 </div>
               </div>

               <!-- add button -->
               <div class="text-[15px] flex items-center space-x-3">
                 <button
                     type="button"
                     @click="
                    campaignForm.perks.shipping_details.push({
                      location: '',
                      fee: '',
                    })
                  "
                     class="focus:outline-none w-[2rem] h-[2rem] rounded-full border border-[#FF9E0B] text-[#FF9E0B] flex items-center justify-center"
                 >
                   <Icon name="add" />
                 </button>
                 <p class="text-[#FF9E0B]">Add new variant</p>
               </div>
             </div>
           </div>

           <!-- Variations     -->
           <div class="space-y-1 relative">
             <label for="shipping_details">Variations </label>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 Do supporters have options to choose from this item e.g color,
                 size etc?
               </p>
             </div>

             <div class="pt-4 space-y-2">
               <div class="flex items-center space-x-4">
                 <input
                     class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                     type="radio"
                     id="variation"
                     :value="false"
                     v-model="campaignForm.perks.variation"
                 />
                 <label class="text-xs" for="variation">No, It does not.</label>
               </div>

               <div class="flex items-center space-x-4">
                 <input
                     class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                     type="radio"
                     id="variation"
                     :value="true"
                     v-model="campaignForm.perks.variation"
                 />
                 <label class="text-xs" for="variation">Yes, It does.</label>
               </div>
             </div>

             <div v-show="campaignForm.perks.variation" class="pt-5 space-y-4">
               <div
                   v-for="(variation, index) in campaignForm.perks.variations"
                   :key="index"
                   class="flex items-center space-x-4"
               >
                 <div class="space-y-1 relative flex flex-col">
                   <label class="text-[13px]" for="size">Variant name</label>
                   <div class="max-w-[9.9375rem]">
                     <select
                         id="size"
                         v-model="variation.size"
                         class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
                         placeholder="Enter quantity"
                         type="text"
                     >
                       <option selected disabled value="">Select Size</option>
                     </select>
                   </div>
                 </div>

                 <div class="space-y-1 relative flex flex-col">
                   <label class="text-[13px]" for="variannt_value"
                   >Variannt value</label
                   >
                   <div class="relative max-w-[9.9375rem]">
                     <input
                         id="variannt_value"
                         v-model="variation.value"
                         class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1rem] rounded-[0.5rem] w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
                         placeholder="Enter value"
                         type="text"
                     />
                   </div>
                 </div>
               </div>

               <!-- add button -->
               <div class="text-[15px] flex items-center space-x-3">
                 <button
                     type="button"
                     @click="
                    campaignForm.perks.variations.push({ size: '', value: '' })
                  "
                     class="focus:outline-none w-[2rem] h-[2rem] rounded-full border border-[#FF9E0B] text-[#FF9E0B] flex items-center justify-center"
                 >
                   <Icon name="add" />
                 </button>
                 <p class="text-[#FF9E0B]">Add new variant</p>
               </div>
             </div>
           </div>
         </div>
       </fieldset>

       <fieldset
           v-show="step === 4"
           class="flex justify-between 2xl:justify-start 2xl:space-x-40"
       >
         <div class="max-w-[20.25rem] w-full space-y-3">
           <h3 class="text-xl font-medium">Funding</h3>
           <p class="text-sm text-[#98A2B3]">
             Make a good first impression: introduce your campaign objectives and
             entice people to learn more. This basic information will represent
             your campaign on your campaign page, on your campaign card, and in
             searches.
           </p>
         </div>

         <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
           <!-- Campaign Goal Amount -->
           <div class="space-y-1 relative">
             <label for="goal_amount">Campaign Goal Amount</label>
             <div class="relative">
               <input
                   id="goal_amount"
                   v-model="campaignForm.funding.goal_amount"
                   @input="$v.funding.goal_amount.$touch()"
                   :class="[
                  $v.funding.goal_amount.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                   class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1.8rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                   type="text"
               />
               <span
                   class="absolute left-0 py-[0.75rem] pl-[1rem] text-sm text-[#98A2B3]"
               >₦</span
               >
             </div>
             <div
                 class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
             >
               <p>
                 How much money would you like to raise on this campaign? A
                 minimum goal of ₦500,000 is required.
               </p>
             </div>
             <!-- Error -->
             <p
                 v-show="$v.funding.goal_amount.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.funding.goal_amount.required.$invalid
                     ? "Goal Amount is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- Bank -->
           <div class="space-y-1 relative">
             <label for="bank">Bank</label>
             <select
                 name="Category"
                 v-model="campaignForm.funding.bank"
                 @input="$v.funding.bank.$touch()"
                 :class="[
                $v.funding.bank.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 id="Category"
             >
               <option selected disabled value="">Select category</option>
               <option value="Fcmb">FCMB</option>
             </select>
             <!-- Error -->
             <p
                 v-show="$v.funding.bank.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.funding.bank.required.$invalid
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
                 v-model="campaignForm.funding.account_number"
                 @input="$v.funding.account_number.$touch()"
                 :class="[
                $v.funding.account_number.$error
                  ? 'border-[#E52053]'
                  : 'border-[#D9D9D9]',
              ]"
                 class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded-[0.5rem] w-full text-sm text-[#1E1D24]"
                 placeholder="Enter account number "
                 type="text"
             />
             <!-- Error -->
             <p
                 v-show="$v.funding.account_number.$error"
                 class="absolute right-0 top-0 text-[#E52053]"
             >
               {{
                 $v.funding.account_number.required.$invalid
                     ? "Account number is Required"
                     : ""
               }}
             </p>
           </div>

           <!-- DISCLAIMER -->
           <div class="space-y-1 relative">
             <p class="font-medium">DISCLAIMER</p>
             <div
                 class="text-[#020955] max-w-[24.1875rem] w-full bg-[#DDE0FE] border border-[#8D9DD4] rounded-[0.6875rem] py-[1.25rem] px-[1rem]"
             >
               <span class="font-semibold">Platform Fee:</span> Corefans charges
               a 15% platform fee across all campaigns.
               <a class="underline" href="#">Learn more</a>
             </div>
           </div>
         </div>
       </fieldset>

       <!-- Review -->
       <div v-show="step === 5">
         <div class="pb-6">
           <div class="max-w-[64.25rem] w-full space-y-8">
             <div class="space-y-3">
               <h3 class="text-2xl font-medium">Review</h3>
               <p class="text-sm text-[#98A2B3]">
                 Check through your campaign for errors before publishing.
               </p>
             </div>

             <div>
               <div class="flex space-x-8">
                 <!-- image -->
                 <div class="max-w-[32.125rem] w-full flex-none">
                   <img
                       class="h-full max-h-[23.375rem] w-full object-cover rounded-[0.625rem]"
                       src="@/assets/images/campaign2.png"
                       alt=""
                   />
                 </div>

                 <div class="flex-grow flex flex-col justify-between">
                   <div class="flex items-center">
                     <img
                         class="h-10 w-10 object-cover rounded-t-[1.5rem]"
                         src="@/assets/images/compaign_avatar.png" />
                     <div class="pl-3 space-y-1">
                       <p class="text-sm font-semibold flex items-center space-x-2">
                         <span>Omah Lay</span>
                         <span>
                          <Icon name="verify"/>
                        </span>
                       </p>
                       <div class="flex items-center ">
                         <div class="flex items-center space-x-2">
                           <Icon class="" name="campaign-2" />
                           <span class="text-[#1E1D24] text-[10px]">10 Campaign</span>
                         </div>
                         <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                         <div class="flex items-center space-x-2">
                           <Icon class="" name="location"/>
                           <span class="text-[#1E1D24] text-[10px]">USA</span>
                         </div>
                         <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                         <div class="flex items-center space-x-2">
                           <Icon class="" name="genre" />
                           <span class="text-[#1E1D24] text-[10px]">Hip-Hop</span>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div class="pt-6">
                     <Title class="text-2xl" :name="'Yeezy Season Album'" />
                     <p class="text-[#667085] text-base font-normal">
                       {{ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' }}
                     </p>
                   </div>

                   <CampaignStatus />

                   <div class="flex space-x-4 pt-6">
                     <button
                         type="button"
                         @click="step--"
                         class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B] font-medium"
                     >
                       <span>Previous</span>
                     </button>
                     <BaseButton>
                       Go Live
                     </BaseButton>
                   </div>
                 </div>
               </div>
               <!-- image slide -->
               <div class="flex items-center space-x-2 mt-4">
                 <img
                     class="w-[1.875rem] h-[1.875rem] object-cover rounded-[3px]"
                     src="@/assets/images/campaign2.png"
                     alt=""
                 />
               </div>
             </div>
           </div>
         </div>

         <!-- perks -->
         <div class="py-6 max-w-[64.25rem] w-full flex space-x-4">
           <TabGroup as="div" class="flex-grow">
             <TabList class="flex space-x-5 900/20 border-b">
               <Tab
                   v-for="(tab, index) in tabs"
                   as="template"
                   :key="index"
                   v-slot="{ selected }"
               >
                 <button
                     type="button"
                     :class="[
                    'text-base',
                    'focus:outline-none  focus:ring-0 relative pb-3 -mb-[1px]',
                    selected ? 'text-[#FF9E0B] border-b-2 border-[#FF9E0B]' : 'text-[#878787]',
                  ]"
                 >
                   {{ tab }}
                   <!-- <div
                     :class="[selected ? 'opacity-100' : 'opacity-0']"
                     class="absolute -bottom-3 inset-x-0 flex justify-center"
                   >
                     <span
                       class="w-[6px] h-[6px] rounded-full bg-[#FF9E0B]"
                     ></span>
                   </div> -->
                 </button>
               </Tab>
             </TabList>

             <TabPanels class="mt-8">
               <TabPanel>
                 <p class="text-lg text-[#2C2C2C]">
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                   Ut enim ad minim veniam, quis nostrud exercitation ullamco
                   laboris nisi ut aliquip ex ea
                 </p>
               </TabPanel>
               <TabPanel>

               </TabPanel>
             </TabPanels>
           </TabGroup>
           <div class="flex-none w-full max-w-[370px] space-y-6 pt-8 space-y-4">
             <p class="text-2xl font-semibold">Pick an option</p>
             <PerkCard class="" />
             <PerkCard />
             <PerkCard />
             <PerkCard />
             <PerkCard />
           </div>

         </div>
       </div>

       <div class="flex justify-between 2xl:justify-start 2xl:space-x-40">
         <!-- buttons -->
         <div class="max-w-[20.25rem] w-full"></div>
         <div
             v-show="step < 5"
             class="max-w-[42.8125rem] w-full flex space-x-4 pt-6 mt-6 border-t"
         >
           <div class="flex-grow flex items-center">
             <button
                 v-show="step > 1"
                 type="button"
                 @click="step--"
                 class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded-[0.5rem] flex items-center justify-center space-x-2 border border-[#626E8B]"
             >
               <span>Previous</span>
             </button>
           </div>
           <button
               class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded-[0.5rem] flex items-center justify-center space-x-2 border border-[#626E8B]"
           >
             <span>Save for Later</span>
           </button>
           <button
               type="button"
               @click="checkIfValid"
               class="flex-none bg-gradient-to-r from-orange to-red text-white text-sm h-[44px] px-4 rounded-[0.5rem] flex items-center justify-center space-x-2"
           >
             <span>Save & Proceed</span>
           </button>
         </div>
       </div>
     </form>
   </div>
 </dashboard-layout>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
import PerkCard from '@/components/PerkCard.vue'
import FormStep from '@/components/FormStep.vue'
import Title from '@/components/Title.vue'
import BaseButton from '@/components/BaseButton.vue'
// import TableLite from "vue3-table-lite";
import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import {
  required,
  maxLength,
  maxValue,
  url,
  minLength,
} from "@vuelidate/validators";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";


const tabs = ref(["About Talent", "Story"]);

const steps = ref([
  { title: 'Basics', step: 1 },
  { title: 'Content', step: 2 },
  { title: 'Perks', step: 3 },
  { title: 'Funding', step: 4 },
  { title: 'Review', step: 5 }
])
let step = ref(5);

let main_image_preview = ref("");
let pitch_one_image_preview = ref("");
let pitch_two_image_preview = ref("");
let pitch_three_image_preview = ref("");

let content_type = ref("video");

const campaignForm = reactive({
  basics: {
    title: "",
    description: "",
    category: "Music",
    location: "lagos",
    duration: "",
    tags: [],
    feature_image: null,
  },
  content: {
    images: {
      image_one: "",
      image_two: "",
      image_three: "",
    },
    story: "",
    video_urls: {
      url_one: "",
      url_two: "",
      url_three: "",
    },
  },
  perks: {
    title: "",
    description: "",
    image: "",
    quantity: "",
    price: "",
    retail_price: "",
    delivery_date: "",
    shipping: false,
    shipping_details: [{ location: "", fee: "" }],
    variation: false,
    variations: [{ name: "", value: "" }],
  },
  funding: {
    goal_amount: "",
    bank: "",
    account_number: "",
    account_name: "Benson Momodu",
  },
});

const rules = {
  basics: {
    title: {
      required,
      maxLengthValue: maxLength(30),
    },
    description: {
      required,
      maxLengthValue: maxLength(300),
    },
    category: {
      required,
    },
    location: {
      required,
    },
    duration: {
      required,
      maxValueValue: maxValue(90),
    },
    tags: {
      required,
      maxLengthValue: maxLength(7),
    },
    feature_image: {
      required,
    },
  },
  content: {
    story: {
      required,
      maxLengthValue: maxLength(300),
    },
    images: {
      image_one: {
        required,
      },
    },
    video_urls: {
      url_one: {
        required,
        url,
      },
    },
  },
  perks: {
    title: {
      required,
      maxLengthValue: maxLength(60),
    },
    description: {
      required,
      maxLengthValue: maxLength(300),
    },
    image: {
      required,
    },
    quantity: {
      required,
    },
    price: {
      required,
    },
    retail_price: {
      required,
      minLengthValue: minLength(campaignForm.perks.price),
    },
  },
  funding: {
    goal_amount: {
      required,
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

const $v = useVuelidate(rules, campaignForm);

const next = (current_step) => {
  if ($v.value[current_step].$invalid) {
    return;
  } else {
    step.value++;
  }
};

const checkIfValid = () => {
  // get the current step to touch on it input field
  const current_step =
    step.value === 1
      ? "basics"
      : step.value === 2
      ? "content"
      : step.value === 3
      ? "perks"
      : step.value === 4
      ? "funding"
      : "review";

  $v.value[current_step].$touch();
  next(current_step);
};

const onPitchImageOne = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.content.images.image_one = files[0];

  pitch_one_image_preview.value = url;
};

const onPitchImageTwo = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.content.images.image_two = files[0];

  pitch_two_image_preview.value = url;
};

const onPitchImageThree = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.content.images.image_three = files[0];

  pitch_three_image_preview.value = url;
};

const onFileChange = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.basics.feature_image = files[0];

  main_image_preview.value = url;
};

const onPerkImage = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.perks.image = files[0];

  main_image_preview.value = url;
};

const valueM = [{ name: "Javascript", code: "js" }];
const options = ref([
  { name: "Vue.js", code: "vu" },
  { name: "Javascript", code: "js" },
  { name: "Open Source", code: "os" },
]);

const addTag = (newTag) => {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
  };
  options.value.push(tag);
  valueM.value.push(tag);
};

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

const doSearch = (offset, limit, order, sort) => {
  table.isLoading = true;

  // Start use axios to get data from Server
  let url =
    "https://www.example.com/api/some_endpoint?offset=" +
    offset +
    "&limit=" +
    limit +
    "&order=" +
    order +
    "&sort=" +
    sort;
  axios.get(url).then((response) => {
    table.rows = response.rows;
    table.totalRecordCount = response.count;
    table.sortable.order = order;
    table.sortable.sort = sort;
  });
  // End use axios to get data from Server
};

// const { $breadcrumbs } = useNuxtApp()
// console.log('Breadcrumbs array', $breadcrumbs)
</script>

<style></style>

<style src="@vueform/multiselect/themes/default.css"></style>

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
</style>
