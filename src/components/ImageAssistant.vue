<template>
	<div class="wrapper">
		<img
			v-if="imageUrl"
			:src="imageUrl"
			alt=""
			:class="imageClass"
		>
		<img
			v-else
			src="@/assets/no_image_available.jpeg"
			alt=""
			:class="imageClass"
		>
	</div>
</template>

<script>
import { ref } from '@vue/runtime-core';
import missingImage from '@/assets/no_image_available.jpeg';
import useClient from '@/hooks/sb-hooks';
export default {
  name: 'ImageAssistant',
  components: {},
  props: {
    image: String,
    bucket: String,
    imageClass: {
      type: String,
      default: 'w-32 h-32'
    }
  },
  setup(props) {
    const client = useClient();
    const imageUrl = ref(null);
    /**
     *
     */
    const downloadImage = async(path, bucket) => {
      if (!path) {
        imageUrl.value = missingImage;
        return;
      }
      const { data, error } = await client.storage
        .from(bucket)
        .createSignedUrl(path, 600);
      if (error) throw error;

      imageUrl.value = data?.signedURL;
    };

    downloadImage(props?.image, props?.bucket);
    return {
      imageUrl
    };
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
