<template>
  <div class="aspect-w-16 aspect-h-9 w-full h-[27.938rem] bg-F6F6F6 rounded border border-D0C9C9 border-dashed">
    <iframe :src="youTubeGetID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script setup>
    import {computed} from "vue";

    const props = defineProps(['url',])

    const youTubeGetID = computed(() => {
      var LINK = '';
      let url = props.url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if(url[2] !== undefined) {
        LINK = url[2].split(/[^0-9a-z_\-]/i);
        LINK = "https://www.youtube.com/embed/" + LINK[0];
      }
      else {
        LINK = '';
      }
      return LINK;
    });

    // url = props.url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    // return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
</script>

<style lang="scss" scoped>

</style>