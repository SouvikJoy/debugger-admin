<template>
	<div>
		<div
			:style="{ width: size }"
			class="m-5"
		>
			<label>
				<input
					style="visibility: hidden; position: absolute"
					type="file"
					accept="image/*"
					:disabled="uploading"
					@change="uploadBackgroundImage"
				>
				<img
					v-if="src"
					:src="src"
					alt="background"
					class="background"
					:style="{ height: size, width: size }"
				>
				<img
					v-else
					src="@/assets/no_image_available.jpeg"
					class="avatar no-image"
					:style="{ height: size, width: size }"
					alt=""
				>
			</label>
		</div>
	</div>
</template>

<script>
import { ref, toRefs, watch } from 'vue';
import useClient from '@/hooks/sb-hooks';

export default {
  name: 'BackgroundImage',
  props: {
    path: String
  },
  emits: ['upload', 'update:path'],
  setup(prop, { emit }) {
    const supabase = useClient();

    const { path } = toRefs(prop);
    const size = ref('10em');
    const uploading = ref(false);
    const src = ref('');
    const files = ref();

    const downloadImage = async() => {
      try {
        const { data, error } = await supabase.storage
          .from('product-bucket')
          .download(path.value);
        if (error) throw error;
        src.value = URL.createObjectURL(data);
      } catch (error) {
        console.error('Error downloading image: ', error.message);
      }
    };

    const uploadBackgroundImage = async(evt) => {
      files.value = evt.target.files;
      try {
        uploading.value = true;
        if (!files.value || files.value.length === 0) {
          throw new Error('You must select an image to upload.');
        }

        const file = files.value[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-bucket')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        emit('update:path', filePath);
        emit('upload');
      } catch (error) {
        alert(error.message);
      } finally {
        uploading.value = false;
      }
    };

    watch(path, () => {
      // eslint-disable-next-line no-unused-expressions
      path.value ? downloadImage() : '';
    });

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      path,
      size,
      uploading,
      src,
      files,

      uploadBackgroundImage
    };
  }
};
</script>
