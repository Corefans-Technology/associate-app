<template>
  <dashboard-layout>
    <div class="p-[2.5rem] space-y-6">
      <div class="flex items-center space-x-4 justify-between">
        <!-- breabcrum -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <RouterLink
                :to="{ name: 'campaigns.index' }"
                class="text-sm text-[#626E8B]"
            >Campaigns
            </RouterLink>
            <button class="focus:outline-none">
              <Icon name="right-arrow" />
            </button>
            <a class="text-sm text-[#626E8B]" href="#">New Campaigns </a>
          </div>
          <h2 class="text-2xl font-medium text-black pr-[2rem]">
            New Campaign
          </h2>
        </div>

        <div class="flex items-center justify-end hidden">
          <button
              class="bg-gradient-to-r from-orange to-red text-white text-[0.8125rem] h-[44px] px-4 rounded flex items-center justify-center space-x-2"
          >
            <Icon name="preview" />
            <span>Preview Campaign</span>
          </button>
        </div>
      </div>
      <!-- <CheckOutStep :step="step" /> -->
      <FormStep :steps="campaignStore.steps" :step="campaignStore.step" />

      <form class="border-t border-[#EDEDED] py-[1.5rem]">
        <fieldset
            v-show="campaignStore.step === 1"
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

              <a class="text-[#F18B1B] block" href="#">Need help?</a>
            </div>
          </div>

          <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
            <!-- title -->
            <FormGroup>
              <label for="title">Campaign Title</label>
              <TextInput
                  type="text"
                  id="title"
                  v-model="campaignForm.basic.title"
                  @input="$v.basic.title.$touch()"
                  :class="[
                  $v.basic.title.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  placeholder="Enter title"
                  class="rounded px-[1rem] py-[0.813rem]"
                  aria-label="title"
              />
              <div
                  class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
              >
                <p>What is the title of your campaign?</p>
                <p>{{ campaignForm.basic.title.length }}/30</p>
              </div>
              <InputError
                  class="absolute right-0 top-0 text-sm text-right"
                  :message="
                  $v.basic.title.required.$invalid
                    ? 'Campaign Title is Required'
                    : 'Text limit exceeded'
                "
                  v-show="$v.basic.title.$error"
              />
            </FormGroup>

            <!-- description -->
            <FormGroup>
              <label for="description">Campaign description</label>
              <TextArea
                  rows="3"
                  id="description"
                  v-model="campaignForm.basic.description"
                  @input="$v.basic.description.$touch()"
                  :class="[
                  $v.basic.description.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  placeholder="Enter description"
                  class="rounded px-[1rem] py-[0.813rem]"
                  aria-label="description"
              />
              <div
                  class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
              >
                <p>
                  Provide a short description that best describes your campaign
                  to your audience.
                </p>
                <p>{{ campaignForm.basic.description.length }}/300</p>
              </div>
              <InputError
                  class="absolute right-0 top-0 text-sm text-right"
                  :message="
                  $v.basic.description.$error
                    ? 'Description is Required'
                    : 'Text limit exceeded'
                "
                  v-show="$v.basic.description.$error"
              />
            </FormGroup>

            <!-- Category -->
            <div class="space-y-1 relative">
              <label for="Category">Category</label>
              <select
                  name="Category"
                  class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24] capitalize"
                  v-model="campaignForm.basic.category"
                  @input="$v.basic.category.$touch()"
                  :class="[
                  $v.basic.category.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  id="Category"
              >
                <option selected disabled value="">Select category</option>
                <option
                    v-for="(category, index) in categories"
                    :key="index"
                    v-text="category"
                ></option>
              </select>
              <div
                  class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
              >
                <p>
                  To help backers find your campaign, select a category that
                  best represents your project.
                </p>
              </div>
              <!-- Error -->
              <p
                  v-show="$v.basic.category.$error"
                  class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.basic.category.required.$invalid
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
                  class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24] capitalize"
                  v-model="campaignForm.basic.location"
                  @input="$v.basic.location.$touch()"
                  :class="[
                  $v.basic.location.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  id="Location"
              >
                <option selected disabled value="">Select Location</option>
                <option
                    v-for="(location, index) in locations"
                    :key="index"
                    v-text="location"
                ></option>
              </select>
              <!-- Error -->
              <p
                  v-show="$v.basic.location.$error"
                  class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.basic.location.required.$invalid
                      ? "Location is Required"
                      : ""
                }}
              </p>
            </div>

            <!-- Campaign Duration -->
            <FormGroup>
              <label for="duration">Campaign Duration</label>
              <TextInput
                  type="number"
                  id="duration"
                  v-model="campaignForm.basic.duration"
                  @input="$v.basic.duration.$touch()"
                  :class="[
                  $v.basic.duration.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  placeholder="Enter duration"
                  class="rounded px-[1rem] py-[0.813rem]"
                  aria-label="duration"
              />
              <div
                  class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
              >
                <p>You can run campaigns for a maximum of 90 days.</p>
              </div>
              <InputError
                  class="absolute right-0 top-0 text-sm text-right"
                  :message="
                  $v.basic.duration.required.$invalid
                    ? 'Duration is Required'
                    : 'Max duration day exceeded'
                "
                  v-show="$v.basic.duration.$error"
              />
            </FormGroup>

            <!-- Tag -->
            <div class="space-y-1 relative">
              <label for="tag">Tag</label>

              <Multiselect
                  v-model="campaignForm.basic.tags"
                  @input="$v.basic.tags.$touch()"
                  :class="[
                  $v.basic.tags.$error
                    ? 'border-[#E52053]'
                    : 'border-[#D9D9D9]',
                ]"
                  mode="tags"
                  :close-on-select="false"
                  :searchable="true"
                  placeholder="Select tags"
                  :create-option="true"
                  :classes="{
                  container:
                    'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-[#D9D9D9] rounded bg-white text-base leading-snug outline-none py-2 px-2',
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
                  Enter up to five keywords that best describe your campaign.
                  These tags will help with organization and discoverability.
                </p>
              </div>
              <!-- Error -->
              <p
                  v-show="$v.basic.tags.$error"
                  class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.basic.tags.required.$invalid
                      ? "Tags is Required"
                      : "Max tag number exceeded"
                }}
              </p>
            </div>

            <!-- onFeatureImage label text -->
            <div class="space-y-1 relative w-[15.625rem]">
              <label for="tag">Input label text</label>

              <div
                  class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
              >
                <div
                    v-if="!feature_image_preview"
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
                    :src="feature_image_preview"
                    alt=""
                />
                <input
                    @change="onFeatureImage"
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
                  v-show="$v.basic.thumbnail.$error"
                  class="absolute right-0 -top-1 text-[#E52053]"
              >
                {{
                  $v.basic.thumbnail.requiredIfImage.$invalid
                      ? "Photo is Required"
                      : ""
                }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset
            v-show="campaignStore.step === 2"
            class="flex justify-between 2xl:justify-start 2xl:space-x-40"
        >
          <div class="max-w-[20.25rem] w-full space-y-3">
            <div>
              <h3 class="text-xl font-medium">Content</h3>
              <!-- content type toggle buttons -->
              <div class="flex space-x-3">
                <button
                    type="button"
                    @click="content_type = 'video'"
                    :class="[
                    content_type === 'video'
                      ? 'bg-gradient-to-r from-orange to-red text-white'
                      : 'text-[#7B7B7B]',
                  ]"
                    class="text-[11px] px-4 rounded py-1"
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
                    class="text-[11px] px-4 rounded py-1"
                >
                  Image
                </button>
              </div>
            </div>

            <div class="text-sm text-[#98A2B3] space-y-4">
              <p>
                Use videos or images to tell your story to fans. You can add up
                to three images or videos. Here are some tips:
              </p>

              <ul class="list-disc pl-10">
                <li>
                  Have your face show in the video or image for a deeper
                  emotional connection
                </li>
                <li>Show examples or snippets of your work in your video</li>
                <li>
                  Let your fans see the work you put into your art by showing
                  your process in your video
                </li>
                <li>Make sure your video or image is clear and good quality</li>
                <li>
                  Make sure your video or image is clear and good quality Be a
                  storyteller. Tell fans what your art means to you, how you
                  create, why you create, and what’s in it for them
                </li>
              </ul>

              <a class="text-[#F18B1B] block" href="#">Need help?</a>
            </div>
          </div>

          <div class="max-w-[42.8125rem] w-full relative">
            <div v-show="content_type === 'video'" class="space-y-5">
              <!-- url -->
              <div class="space-y-1 relative">
                <label for="url">Youtube URL *</label>
                <div class="flex space-x-4">
                  <input
                      id="url"
                      v-model="videoUrl"
                      @input="$v.videoUrl.$touch()"
                      :class="[
                      $v.videoUrl.$error
                        ? 'border-[#E52053]'
                        : 'border-[#D9D9D9]',
                    ]"
                      class="placeholder:text-[#98A2B3] flex-grow placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
                      placeholder="Enter valid URL"
                      type="text"
                  />
                  <button
                      @click.prevent="addVideo"
                      type="button"
                      class="bg-gradient-to-r flex-none from-orange to-red text-white text-[11px] px-8 rounded py-1"
                  >
                    Add Video
                  </button>
                </div>
                <div
                    class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
                >
                  <p>
                    Enter a Youtube URL to appear at the top of your campaign
                    page
                  </p>
                </div>
                <!-- Error -->
                <p
                    v-show="$v.videoUrl.$error"
                    class="absolute right-36 top-0 text-[#E52053]"
                >
                  {{
                    $v.videoUrl.required.$invalid
                        ? "Video url is Required"
                        : " The value is not a valid URL address"
                  }}
                </p>
              </div>

              <div
                  v-if="campaignForm.content.videos.length < 1"
                  class="w-full h-[27.938rem] bg-#F7F7F7 rounded border border-#D0C9C9"
              ></div>
              <div v-else class="space-y-6">
                <!-- <iframe
                  v-for="(url, index) in campaignForm.content.videos"
                  :key="index"
                  class="w-full h-[27.938rem] bg-#F7F7F7 rounded border border-#D0C9C9"
                  :src="url"
                >
                </iframe> -->
              </div>

              <div>
                <button
                    class="text-#FF9E0B text-[0.8125rem] flex items-center space-x-2 text-sm"
                >
                  <PlusCircleIcon class="h-6" />
                  <span>Add another video</span>
                </button>
              </div>
            </div>

            <div v-show="content_type === 'image'" class="space-y-5">
              <!-- Campaign Image -->
              <div class="space-y-1 relative">
                <label for="tag">Campaign Image</label>

                <div
                    class="w-full h-[27.938rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
                >
                  <div
                      v-if="!campaign_image_preview"
                      class="w-full h-[27.938rem] flex flex-col items-center justify-center space-y-2"
                  >
                    <Icon name="upload" />
                    <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                      Drag or drop an image to upload.
                    </p>
                    <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                      You can upload up to three (3) Campaign images for your
                      campaign.
                    </p>
                  </div>

                  <img
                      v-else
                      class="h-[27.938rem] object-cover w-full rounded-[0.8rem] object-top"
                      :src="campaign_image_preview"
                      alt=""
                  />
                  <input
                      @change="onCampaignImage"
                      multiple
                      class="absolute inset-0 opacity-0"
                      type="file"
                      name=""
                      id=""
                  />
                </div>
                <div
                    class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
                >
                  <p>
                    Upload an image to appear at the top of your campaign page.
                  </p>
                </div>
                <!-- Error -->
                <p
                    v-show="$v.content.images.$error"
                    class="absolute right-0 -top-1 text-[#E52053]"
                >
                  {{
                    $v.content.images.required.$invalid
                        ? "Photo is Required"
                        : ""
                  }}
                </p>
              </div>

              <div>
                <button
                    class="text-#FF9E0B text-[0.8125rem] flex items-center space-x-2 text-sm"
                >
                  <PlusCircleIcon class="h-6" />
                  <span>Add another image</span>
                </button>
              </div>
            </div>

            <!-- Story -->
            <div class="space-y-1 relative mt-6">
              <label for="story">Campaign Story</label>
              <textarea
                  class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
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
                <p>Evoke emotions by telling your story to your fans.</p>
                <p>{{ campaignForm.content.story.length }}/300</p>
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
          </div>
        </fieldset>

        <fieldset v-show="campaignStore.step === 3">
          <div
              v-if="newExclusive"
              class="flex justify-between 2xl:justify-start 2xl:space-x-40"
          >
            <div class="max-w-[20.25rem] w-full space-y-3">
              <h3 class="text-xl font-medium">Exclusives</h3>
              <div class="text-sm text-[#98A2B3] space-y-4">
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

                <a class="text-[#F18B1B] block" href="#">Need help?</a>
              </div>
            </div>

            <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
              <!-- Perk Title -->
              <div class="space-y-1 relative">
                <label for="perk_title">Exclusive Title</label>
                <input
                    id="perk_title"
                    v-model="campaignForm.exclusives.title"
                    @input="$v.exclusives.title.$touch()"
                    :class="[
                    $v.exclusives.title.$error
                      ? 'border-[#E52053]'
                      : 'border-[#D9D9D9]',
                  ]"
                    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
                    placeholder="e.g backstage pass to my June concert"
                    type="text"
                />
                <div
                    class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
                >
                  <p>What is the title of your exclusive?</p>
                  <p>{{ campaignForm.exclusives.title.length }}/60</p>
                </div>
                <!-- Error -->
                <p
                    v-show="$v.exclusives.title.$error"
                    class="absolute right-0 top-0 text-[#E52053]"
                >
                  {{
                    $v.exclusives.title.required.$invalid
                        ? "Title is Required"
                        : "Text limit exceeded"
                  }}
                </p>
              </div>

              <!-- Perk Description -->
              <div class="space-y-1 relative">
                <label for="perk_description">Exclusive Description</label>
                <textarea
                    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none border-[#D9D9D9] px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
                    v-model="campaignForm.exclusives.description"
                    @input="$v.exclusives.description.$touch()"
                    :class="[
                    $v.exclusives.description.$error
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
                    Provide a short description that best describes your
                    campaign to your audience.
                  </p>
                  <p>{{ campaignForm.exclusives.description.length }}/300</p>
                </div>
                <!-- Error -->
                <p
                    v-show="$v.exclusives.description.$error"
                    class="absolute right-0 top-0 text-[#E52053]"
                >
                  {{
                    $v.exclusives.description.required.$invalid
                        ? "Description is Required"
                        : "Text limit exceeded"
                  }}
                </p>
              </div>

              <!-- Perk Image -->
              <div class="space-y-1 relative w-[15.625rem]">
                <label for="tag">Exclusive Thumbnail</label>

                <div
                    class="w-full h-[12.5rem] border border-[#D9D9D9] rounded-[0.8rem] relative"
                >

                  <div
                      v-if="!exclusive_image_preview"
                      class="w-full h-[12.5rem] flex flex-col items-center justify-center space-y-2"
                  >
                    <Icon name="upload" />
                    <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                      Drop an image here, or select a file.
                    </p>
                    <p class="w-[9.0625rem] text-center text-[#98A2B3] text-xs">
                      It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than
                      200 MB.
                    </p>
                  </div>
                  <img
                      v-else
                      class="h-[12.5rem] object-cover w-full rounded-[0.8rem] object-top"
                      :src="exclusive_image_preview"
                      alt=""
                  />
                  <input
                      @change="onExclusiveImage"
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
                    v-show="$v.exclusives.thumbnail.$error"
                    class="absolute right-0 -top-1 text-[#E52053]"
                >
                  {{
                    $v.exclusives.thumbnail.required.$invalid
                        ? "Photo is Required"
                        : ""
                  }}
                </p>
              </div>

              <!-- Quantity Available -->
              <div class="space-y-1 relative">
                <label for="Quantity">Quantity Available</label>
                <input
                    id="Quantity"
                    v-model="campaignForm.exclusives.quantity"
                    @input="$v.exclusives.quantity.$touch()"
                    :class="[
                    $v.exclusives.quantity.$error
                      ? 'border-[#E52053]'
                      : 'border-[#D9D9D9]',
                  ]"
                    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
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
                    v-show="$v.exclusives.quantity.$error"
                    class="absolute right-0 top-0 text-[#E52053]"
                >
                  {{
                    $v.exclusives.quantity.required.$invalid
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
                      v-model="campaignForm.exclusives.price"
                      @input="$v.exclusives.price.$touch()"
                      :class="[
                      $v.exclusives.price.$error
                        ? 'border-[#E52053]'
                        : 'border-[#D9D9D9]',
                    ]"
                      class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] pl-[1.8rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
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
                    Set an amount you want to collect from supporters who claim
                    this perk.
                  </p>
                </div>
                <!-- Error -->
                <p
                    v-show="$v.exclusives.price.$error"
                    class="absolute right-0 top-0 text-[#E52053]"
                >
                  {{
                    $v.exclusives.price.required.$invalid
                        ? "Price is Required"
                        : ""
                  }}
                </p>
              </div>

              <!-- Discount Price (Optional) -->
              <div class="space-y-1 relative">
                <label for="retail_title">Discount Price (Optional)</label>
                <div class="w-full relative">
                  <input
                      id="retail_title"
                      v-model="campaignForm.exclusives.discount"
                      class="placeholder:text-[#98A2B3] border-[#D9D9D9] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] pl-[1.8rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
                      type="text"
                  />
                  <span
                      class="absolute left-0 py-[0.75rem] pl-[1rem] text-sm text-[#98A2B3]"
                  >₦</span
                  >
                </div>
                <!-- Error -->
              </div>

              <!-- Delivery Date -->
              <div class="space-y-1 relative">
                <label for="Delivery">Delivery Date</label>
                <input
                    id="Delivery"
                    v-model="campaignForm.exclusives.delivery_estimate"
                    @input="$v.exclusives.delivery_estimate.$touch()"
                    :class="[
                      $v.exclusives.delivery_estimate.$error
                        ? 'border-[#E52053]'
                        : 'border-[#D9D9D9]',
                    ]"
                    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-full text-sm text-[#1E1D24]"
                    placeholder="Enter quantity"
                    type="text"
                />
                <div
                    class="text-[#999CA0] text-[0.75rem] flex items-center justify-between"
                >
                  <p>
                    Estimeate a delivery date of this perk to prospective
                    claimers.
                  </p>
                </div>
                <p
                    v-show="$v.exclusives.delivery_estimate.$error"
                    class="absolute right-0 top-0 text-[#E52053]"
                >
                  {{
                    $v.exclusives.delivery_estimate.required.$invalid
                        ? "Delivery Estimate is Required"
                        : ""
                  }}
                </p>
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
                        v-model="campaignForm.exclusives.is_shippable"
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
                        v-model="campaignForm.exclusives.is_shippable"
                    />
                    <label class="text-xs" for="shipping_details"
                    >Yes, It does.</label
                    >
                  </div>
                </div>

                <div
                    v-show="campaignForm.exclusives.is_shippable"
                    class="pt-5 space-y-4"
                >
                  <div
                      v-for="(shipping_fee, index) in campaignForm.exclusives
                      .shipping_fees"
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
                            v-model="shipping_fee.location"
                            class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] rounded w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9] capitalize"
                            placeholder="Enter quantity"
                            type="text"
                        >
                          <option selected disabled value="">
                            Select Location
                          </option>
                          <option value="nigeria">
                            Nigeria
                          </option>
                          <option value="ghana">
                            Ghana
                          </option>
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
                            v-model="shipping_fee.amount"
                            class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1.7rem] rounded w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
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
                        campaignForm.exclusives.shipping_fees.push({
                          location: '',
                          amount: '',
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
                    Do supporters have options to choose from this item e.g
                    color, size etc?
                  </p>
                </div>

                <div class="pt-4 space-y-2">
                  <div class="flex items-center space-x-4">
                    <input
                        class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                        type="radio"
                        id="variation"
                        :value="false"
                        v-model="campaignForm.exclusives.has_attribute"
                    />
                    <label class="text-xs" for="variation"
                    >No, It does not.</label
                    >
                  </div>

                  <div class="flex items-center space-x-4">
                    <input
                        class="w-[1.25rem] h-[1.25rem] border-[#E1E1E1] text-[#FF9E0B] focus:ring-0 focus:border-0"
                        type="radio"
                        id="variation"
                        :value="true"
                        v-model="campaignForm.exclusives.has_attribute"
                    />
                    <label class="text-xs" for="variation">Yes, It does.</label>
                  </div>
                </div>

                <div
                    v-show="campaignForm.exclusives.has_attribute"
                    class="pt-5 space-y-4"
                >
                  <div
                      v-for="(attribute, index) in campaignForm.exclusives
                      .attributes"
                      :key="index"
                      class="flex items-center space-x-4"
                  >
                    <div class="space-y-1 relative flex flex-col">
                      <label class="text-[13px]" for="size">Variant name</label>
                      <div class="max-w-[9.9375rem]">
                        <input
                            id="variannt_name"
                            v-model="attribute.name"
                            class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1rem] rounded w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
                            placeholder="Enter name"
                            type="text"
                        />
                      </div>
                    </div>

                    <div class="space-y-1 relative flex flex-col">
                      <label class="text-[13px]" for="variannt_value"
                      >Variannt value</label
                      >
                      <div class="relative max-w-[9.9375rem]">
                        <input
                            id="variannt_value"
                            v-model="attribute.value"
                            class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1rem] rounded w-[9.9375rem] text-sm text-[#1E1D24] border-[#D9D9D9]"
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
                        campaignForm.exclusives.attributes.push({
                          name: '',
                          value: '',
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
            </div>
          </div>

          <div v-else class="space-y-5">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-medium">Exclusives</h3>
              <button
                  type="button"
                  @click.prevent="newExclusive = !newExclusive"
                  class="flex-none bg-gradient-to-r from-orange to-red text-white text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2"
              >
                <span> New Exclusive</span>
              </button>
            </div>
            <table-lite
                :is-slot-mode="true"
                :has-checkbox="true"
                :columns="table.columns"
                :rows="table.rows"
                :total="table.totalRecordCount"
                :sortable="table.sortable"
                :messages="table.messages"
                @is-finished="table.isLoading = false"
            >
              <template v-slot:action="data">
                <div :key="data" class="">
                  <EllipsisVerticalIcon class="h-5" />
                </div>
              </template>
            </table-lite>
          </div>
        </fieldset>

        <fieldset
            v-show="campaignStore.step === 4"
            class="flex justify-between 2xl:justify-start 2xl:space-x-40"
        >
          <div class="max-w-[20.25rem] w-full space-y-3">
            <h3 class="text-xl font-medium">Funding</h3>
            <div class="text-sm text-[#98A2B3] space-y-4">
              <p>
                Enter your bank details and your campaign target anount. Here
                are some tips:
              </p>

              <div>
                <ul class="list-disc pl-10">
                  <li>
                    Make a list of everything you would need to pay for to
                    achieve your goal
                  </li>
                  <li>Estimate the costs and create a budget</li>
                  <li>Consider the cost of producing your perks</li>
                  <li>
                    Make sure your video or image is clear and good quality
                  </li>
                  <li>
                    Set your goal higher than your budget to cater for Corefans
                    15% transaction fee
                  </li>
                </ul>
              </div>

              <a class="text-[#F18B1B] block" href="#">Need help?</a>
            </div>
          </div>

          <div class="max-w-[42.8125rem] w-full space-y-[2rem]">
            <!-- Campaign Goal Amount -->
            <div class="space-y-1 relative">
              <label for="goal_amount">Campaign Goal Amount</label>
              <div class="relative">
                <input
                    id="goal_amount"
                    v-model="campaignForm.funding.goal"
                    @input="$v.funding.goal.$touch()"
                    :class="[
                    $v.funding.goal.$error
                      ? 'border-[#E52053]'
                      : 'border-[#D9D9D9]',
                  ]"
                    class="placeholder:text-[#98A2B3] placeholder:text-sm placeholder:text-left placeholder:font-normal border focus:outline-none px-[1rem] py-[0.75rem] pl-[1.8rem] rounded w-full text-sm text-[#1E1D24]"
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
                  v-show="$v.funding.goal.$error"
                  class="absolute right-0 top-0 text-[#E52053]"
              >
                {{
                  $v.funding.goal.required.$invalid
                      ? "Goal Amount is Required"
                      : ""
                }}
              </p>
            </div>

            <!-- Bank -->
            <div class="space-y-1 relative">
              <label for="bank">Bank Account</label>
              <Listbox v-slot="{ open }" v-model="campaignForm.funding.bank">
                <div class="relative mt-1">
                  <ListboxButton
                      class="py-3 px-4 pr-8 w-full relative border rounded"
                      @click="open = !open"
                  >
                    <div
                        v-if="campaignForm.funding.bank"
                        class="flex justify-between items-center w-full"
                    >
                      <div
                          class="font-semibold text-base text-#222222 text-left"
                      >
                        <h4>{{ campaignForm.funding.bank.bank_name }}</h4>
                        <p class="text-sm font-normal text-#737373">
                          {{ campaignForm.funding.bank.number }}
                        </p>
                      </div>
                      <p>{{ campaignForm.funding.bank.name }}</p>
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
                  <div v-show="open">
                    <ListboxOptions
                        class="absolute z-50 divide-y mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        static
                    >
                      <ListboxOption
                          v-for="bank in settingsStore.banks"
                          :key="bank.id"
                          :value="bank"
                      >
                        <div
                            class="flex relative rounded justify-between items-center py-3 px-4 pr-8 w-full"
                        >
                          <div
                              class="font-semibold text-base text-#222222 text-left"
                          >
                            <h4>{{ bank.bank_name }}</h4>
                            <p class="text-sm font-normal text-#737373">
                              {{ bank.number }}
                            </p>
                          </div>
                          <p class="uppercase">{{ bank.name }}</p>
                        </div>
                      </ListboxOption>
                      <ListboxOption value="" :disabled="true">
                        <AddBank buttonClass="" :withIcon="true" :buttonTitle="'Add Bank'" />
                      </ListboxOption>
                    </ListboxOptions>
                  </div>
                </div>
              </Listbox>
              <!-- Error -->
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

            <!-- DISCLAIMER -->
            <div class="space-y-1 relative">
              <p class="font-medium">DISCLAIMER</p>
              <div
                  class="text-[#020955] w-full bg-[#DDE0FE] border border-[#8D9DD4] rounded py-[1.25rem] px-[1rem]"
              >
                <span class="font-semibold">Platform Fee:</span> Corefans
                charges a 15% platform fee across all campaigns.
                <a class="underline" href="#">Learn more</a>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Review -->
        <div v-show="campaignStore.step === 5">
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
                        :src="campaignForm.basic.thumbnail"
                        alt=""
                    />
                  </div>

                  <div class="flex-grow flex flex-col justify-between">
                    <div class="flex items-center">
                      <img
                          class="h-10 w-10 object-cover rounded-t-[1.5rem]"
                          :src="managerStore.photo_path"
                      />
                      <div class="pl-3 space-y-1">
                        <p
                            class="text-sm font-semibold flex items-center space-x-2 capitalize"
                        >
                          <span>{{managerStore.username}}</span>
                          <span>
                            <Icon name="verify" />
                          </span>
                        </p>
                        <div class="flex items-center">
                          <div class="flex items-center space-x-2">
                            <Icon class="" name="campaign-2" />
                            <!-- {{ managerStore.campaigns }} -->
                            <span class="text-[#1E1D24] text-[10px]"
                            > Campaign</span
                            >
                          </div>
                          <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                          <div class="flex items-center space-x-2">
                            <Icon class="" name="location" />
                            <span class="text-[#1E1D24] text-[10px] capitalize">
                              {{campaignForm.basic.location}}
                            </span>
                          </div>
                          <div class="h-3 w-px mx-2 bg-[#1E1D24]"></div>
                          <div class="flex items-center space-x-2">
                            <Icon class="" name="genre" />
                            <span class="text-[#1E1D24] text-[10px] capitalize"
                            >
                              {{campaignForm.basic.category}}
                              </span
                              >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="pt-6">
                      <Title class="text-2xl" :name="campaignForm.basic.title" />
                      <p class="text-[#667085] text-base font-normal">
                        {{
                          campaignForm.basic.description
                        }}
                      </p>
                    </div>

                    <CampaignStatus :campaign="campaignForm" />

                    <div class="flex space-x-4 pt-6">
                      <button
                          type="button"
                          @click="campaignStore.step--"
                          class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B] font-medium"
                      >
                        <span>Previous</span>
                      </button>
                      <BaseButton
                          class="bg-gradient-to-r from-orange to-red text-white w-[6rem] rounded"
                      >
                        Go Live
                      </BaseButton>
                    </div>
                  </div>
                </div>
                <!-- image slide -->
                <div class="flex items-center space-x-2 mt-4">
                  <img
                      class="w-[1.875rem] h-[1.875rem] object-cover rounded-[3px]"
                      :src="campaignForm.basic.thumbnail"
                      alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- exclusives -->
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
                      selected
                        ? 'text-[#FF9E0B] border-b-2 border-[#FF9E0B]'
                        : 'text-[#878787]',
                    ]"
                  >
                    {{ tab }}
                  </button>
                </Tab>
              </TabList>

              <TabPanels class="mt-8">
                <TabPanel>
                  <p class="text-base text-#667085">
                    {{ campaignForm.basic.description }}
                  </p>
                </TabPanel>
                <TabPanel>
                  <p class="text-base text-#667085">
                    {{ campaignForm.content.story }}
                  </p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            <div
                class="flex-none w-full max-w-[370px] space-y-6 pt-8 space-y-4"
            >
              <p class="text-2xl font-semibold">Pick an option</p>
              <PerkCard v-for="exclusive in exclusiveStore.exclusives" :exclusive="exclusive" :key="exclusive.id" class="" />
            </div>
          </div>
        </div>

        <div
            :class="[newExclusive ? '2xl:justify-start' : '']"
            class="flex 2xl:space-x-40 justify-between"
        >
          <!-- buttons -->
          <div class="max-w-[20.25rem] w-full"></div>
          <div
              v-show="campaignStore.step < 5"
              class="max-w-[42.8125rem] w-full flex space-x-4 pt-6 mt-6 border-t"
          >
            <div class="flex-grow flex items-center">
              <button
                  v-show="campaignStore.step > 1"
                  type="button"
                  @click="campaignStore.step--"
                  class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B]"
              >
                <span>Previous</span>
              </button>
            </div>
            <BaseButton
                type="button"
                @click.prevent="campaignStore.step = 3"
                class="flex-none text-[#626E8B] text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2 border border-[#626E8B]"
            >
              <span>Save for Later</span>
            </BaseButton>
            <BaseButton
                type="button"
                @click="checkIfValid"
                :is-loading="loading"
                class="flex-none bg-gradient-to-r from-orange to-red text-white text-sm h-[44px] px-4 rounded flex items-center justify-center space-x-2"
            >
              <span>Save & Proceed</span>
            </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </dashboard-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Icon from "@/components/Icon.vue";
import PerkCard from "@/components/PerkCard.vue";
import FormStep from "@/components/FormStep.vue";
import AddBank from "@/components/AddBank.vue";
import Title from "@/components/Title.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import CampaignStatus from "@/components/CampaignStatus.vue";
// import TableLite from "vue3-table-lite";
import { RouterLink } from "vue-router";
import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import TableLite from "@/components/TableLite.vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";

import {
  required,
  maxLength,
  maxValue,
  requiredIf
} from "@vuelidate/validators";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useCampaignStore } from "@/stores/campaign";
import { useSettingsStore } from "@/stores/settings";
import { useExclusiveStore } from "@/stores/exclusives";
import { useManagerStore } from "@/stores/manager";
import { createImageUrl } from "@/composables/unility";
import FormGroup from "@/components/FormGroup.vue";
import TextInput from "@/components/TextInput.vue";
import TextArea from "@/components/TextArea.vue";
import InputError from "@/components/InputError.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const campaignStore = useCampaignStore();
const settingsStore = useSettingsStore();
const exclusiveStore = useExclusiveStore();
const managerStore = useManagerStore();


let newExclusive = ref(false);
let loading = ref(false)

const tabs = ref(["About Talent", "Story"]);

let feature_image_preview = ref("");
let campaign_image_preview = ref("");
let exclusive_image_preview = ref("");


let content_type = ref("video");

let videoUrl = ref("");

function validateYouTubeUrl(value) {
  console.log(value);
  if (value) {
    var regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (value.match(regExp)) {
      return true;
    }
  }
  return false;
}

const addVideo = () => {
  $v._value.videoUrl.$touch();
  if (!$v._value.videoUrl.$invalid) {
    // console.log(campaignStore.form.content.video_urls);
    campaignStore.form.content.videos.push(videoUrl.value);
    videoUrl.value = "";
    $v._value.videoUrl.$reset();
  }
};

const campaignForm = reactive(campaignStore.form);

const rules = {
  basic: {
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
    thumbnail: {
      requiredIfImage: requiredIf(typeof campaignForm.basic.thumbnail === 'string'),
    },
  },
  content: {
    story: {
      required,
      maxLengthValue: maxLength(300),
    },
    images: {
      required,
    },
    videos: {
      required,
    },
  },
  exclusives: {
    title: {
      required,
      maxLengthValue: maxLength(60),
    },
    description: {
      required,
      maxLengthValue: maxLength(300),
    },
    quantity: {
      required,
    },
    price: {
      required,
    },
    delivery_estimate: {
      required
    },
    thumbnail: {
      required,
    },
    shipping_fees: {
      requiredIf: requiredIf(campaignForm.exclusives.is_shippable)
    },
    attributes: {
      requiredIf: requiredIf(campaignForm.exclusives.has_attribute)
    },
  },
  funding: {
    goal: {
      required,
    },
    bank: {
      required,
    },
  },
  videoUrl: {
    required,
    validateUrl: validateYouTubeUrl,
  },
};

// form datas
const getBasicFormData = () => {
  let formData = new FormData();
  formData.append("title", campaignForm.basic.title);
  formData.append("description", campaignForm.basic.description);
  formData.append("category", campaignForm.basic.category);
  formData.append("location", campaignForm.basic.location);
  formData.append("duration", campaignForm.basic.duration);
  formData.append("step", campaignForm.basic.step);
  formData.append("tags", campaignForm.basic.tags.toString());
  if(typeof campaignForm.basic.thumbnail === 'string') {
    formData.append("image", null);
  }else {
    formData.append("image", campaignForm.basic.thumbnail);
  }

  return formData;
};

const getContentFormData = () => {
  let formData = new FormData();
  formData.append("step", campaignForm.content.step);
  formData.append("story", campaignForm.content.story);
  for (let i = 0; i < campaignForm.content.videos.length; i++) {
    formData.append('videos', campaignForm.content.videos[i])
  }

  if(campaignForm.content.images.length > 0) {
    if(typeof campaignForm.content.images[0] === 'string') {
      formData.append("images", []);
    }else {
      for (let i = 0; i < campaignForm.content.images.length; i++) {
        formData.append('images', campaignForm.content.images[i])
      }
    }
  }

  return formData;
};

const getFundingFormData = () => {
  let formData = new FormData();
  formData.append("step", campaignForm.funding.step);
  formData.append("bank_account", campaignForm.funding.bank.id);
  formData.append("goal", campaignForm.funding.goal);


  return formData;
};

const getExclusiveFormData = () => {
  let formData = new FormData();
  formData.append("step", campaignForm.exclusives.step);
  formData.append("title", campaignForm.exclusives.title);
  formData.append("description", campaignForm.exclusives.description);
  formData.append("quantity", campaignForm.exclusives.quantity);
  formData.append("price", campaignForm.exclusives.price);
  formData.append("discount", campaignForm.exclusives.discount);
  formData.append("delivery_estimate", campaignForm.exclusives.delivery_estimate);
  formData.append("is_shippable", campaignForm.exclusives.is_shippable ? 1 : 0);
  formData.append("has_attribute", campaignForm.exclusives.has_attribute ? 1 : 0);
  if(typeof campaignForm.exclusives.thumbnail === 'string') {
    formData.append("thumbnail", null);
  }else {
    formData.append("thumbnail", campaignForm.exclusives.thumbnail);
  }
  if(campaignForm.exclusives.is_shippable) {
    for (let i = 0; i < campaignForm.exclusives.shipping_fees.length; i++) {
      formData.append(`shipping[${i}][location]`, campaignForm.exclusives.shipping_fees[i].location)
      formData.append(`shipping[${i}][amount]`, campaignForm.exclusives.shipping_fees[i].amount)
    }
  }

  if(campaignForm.exclusives.has_attribute) {
    for (let i = 0; i < campaignForm.exclusives.attributes.length; i++) {
      formData.append(`attributes[${i}][name]`, campaignForm.exclusives.attributes[i].name)
      formData.append(`attributes[${i}][value]`, campaignForm.exclusives.attributes[i].value)
    }
  }


  return formData;
};

const $v = useVuelidate(rules, { ...campaignForm, videoUrl });

const next = (current_step, form) => {
  if ($v.value[current_step].$invalid) {
    return;
  } else {
    campaignStore.saveAndProceed(current_step, form)
        .then(async ({data}) => {
          if(current_step === 'exclusives') {

            campaignStore.form[current_step].title = data.exclusive.title
            campaignStore.form[current_step].description = data.exclusive.description
            campaignStore.form[current_step].quantity = data.exclusive.quantity
            campaignStore.form[current_step].price = data.exclusive.price
            campaignStore.form[current_step].discount = data.exclusive.discount
            campaignStore.form[current_step].delivery_estimate = data.exclusive.delivery_estimate
            campaignStore.form[current_step].is_shippable = data.exclusive.is_shippable
            campaignStore.form[current_step].has_attribute = data.exclusive.has_attribute
            campaignStore.form[current_step].thumbnail = data.exclusive.thumbnail
            campaignStore.form[current_step].step = data.step
            if(data.exclusive.is_shippable) {
              campaignStore.form[current_step].shipping_fees = data.exclusive.shipping_fees
            }
            if(data.exclusive.has_attribute) {
              campaignStore.form[current_step].attributes = data.exclusive.attributes
            }

          }else {

            campaignStore.form.id = data.id
            campaignStore.form.status = data.status
            campaignStore.form[current_step] = data[current_step]
            campaignStore.form[current_step].step = data.step

            if(data.step === 1) {
              campaignStore.form[current_step].tags = data[current_step].tags.split(",")
            }
          }

          campaignStore.step += 1;
          // console.log(data);
        })
        .finally(() => {
          loading.value = false;
          // setTimeout(() => {
          //   $loading.hide();
          // }, 5000);
        });;

  }
};

const checkIfValid = () => {
  // get the current step to touch on it input field
  const current_step =
      campaignStore.step === 1
          ? "basic"
          : campaignStore.step === 2
              ? "content"
              : campaignStore.step === 3
                  ? "exclusives"
                  : campaignStore.step === 4
                      ? "funding"
                      : "review";

  const form =
      campaignStore.step === 1
          ? getBasicFormData()
          : campaignStore.step === 2
              ? getContentFormData()
              : campaignStore.step === 3
                  ? getExclusiveFormData()
                  : campaignStore.step === 4
                      ? getFundingFormData()
                      : "review";

  $v.value[current_step].$touch();
  next(current_step, form);
};

const onCampaignImage = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  for (let i = 0; i < files.length; i++) {
    campaignForm.content.images.push(files[i]);
  }
  campaign_image_preview.value = url;
};

const onFeatureImage = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.basic.thumbnail = files[0];

  feature_image_preview.value = url;
};

const onExclusiveImage = async (e) => {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const url = await createImageUrl(files[0]);
  campaignForm.exclusives.thumbnail = files[0];

  exclusive_image_preview.value = url;
};

const categories = ref(["Music", "Support"]);
const locations = ref(["nigeria", "ghana"]);

const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Title",
      field: "title",
      // width: "3%",
      isKey: true,
    },
    {
      label: "Quantity",
      field: "quantity",
      // width: "10%",
    },
    {
      label: "Price",
      field: "price",
      // width: "15%",
    },
    {
      label: "Revenue",
      field: "revenue",
      // width: "15%",
    },
    {
      label: "Delivery Date",
      field: "Delivery_date",
      // width: "15%",
    },
    {
      label: "",
      field: "action",
      width: "15%",
    },
  ],
  rows: [
  ],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const getPreviewImage = (image) => {
  if(typeof image === "string") {
    return image
  }
  return null
}

onMounted(() => {

  exclusiveStore.getExclusives(campaignForm.id)
  table.rows = exclusiveStore.exclusives.map( exclusive => {
    return {
      title: exclusive.title,
      quantity: exclusive.quantity,
      price: exclusive.price,
      revenue: '0',
      Delivery_date: exclusive.delivery_estimate,
      action: "",
    }
  })
  settingsStore.getBanks()
  feature_image_preview.value = getPreviewImage(campaignForm.basic.thumbnail)
  campaign_image_preview.value = getPreviewImage(campaignForm.content.images[0])
  exclusive_image_preview.value = getPreviewImage(campaignForm.exclusives.thumbnail)


})

// const saveForLater = () => {
//   campaignStore.saveForLater();
// };
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
