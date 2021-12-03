<template>
	<div>
		<div class="container mx-auto mt-6">
			<div
				class="px-4"
			>
				<div>
					<label
						for="category-name"
						class="label-class"
					>
						Category Name
					</label>
					<input
						id="category-name"
						ref="categoryName"
						type="text"
						class="input-class"
						placeholder="Name"
					>
				</div>

				<div>
					<label
						for="category-description"
						class="label-class"
					>
						Category Description
					</label>
					<textarea
						id="category-description"
						ref="categoryDescription"
						type="text"
						row="4"
						class="input-class"
						placeholder="Description"
					/>
				</div>

				<div class="my-8">
					<label class="label-class">
						Category Image
					</label>
					<div
						class="file-upload-container"
					>
						<div class="space-y-1 text-center">
							<svg
								class="mx-auto h-12 w-12 text-gray-400"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 48 48"
								aria-hidden="true"
							>
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<div class="flex text-sm text-gray-600">
								<label
									for="category-image"
									class="file-upload"
								>
									<span>Upload a file</span>
									<input
										id="category-image"
										name="category-image"
										type="file"
										class="sr-only"
										@change="handleFileChange"
									>

								</label>
								<p class="pl-1">
									or drag and drop
								</p>
							</div>
							<p class="text-xs text-gray-500">
								PNG, JPG, GIF up to 10MB
							</p>
						</div>
					</div>
				</div>

				<div>
					<button
						class="create-button"
						@click.prevent="save"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useUpsert from '@/hooks/sb-hooks-upsert';
import useUploadBucket from '@/hooks/sb-hooks-upload';
import useSelectBucket from '@/hooks/sb-hooks-select-bucket';

import { Form, Field, ErrorMessage } from 'vee-validate';
import { initRule } from '@/utils';

import { useRouter } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';

export default defineComponent({
  name: 'CreateCategory',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    initRule(['min', 'max', 'required']);

    const categoryName = ref('');
    const categoryDescription = ref('');
    const selectedFile = ref([]);

    const router = useRouter();
    const { data, loading, error, doUpsert } = useUpsert();
    const { doUpload } = useUploadBucket('product-bucket');
    const { image } = useSelectBucket(
      'product-bucket',
      '',
      true,
      {}
    );

    const save = async() => {
      const file = selectedFile.value[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const imagePath = `${fileName}`;

      await doUpload(file, imagePath);

      const response = await doUpsert('categories', [
        {
          name: categoryName.value.value,
          description: categoryDescription.value.value,
          image: imagePath
        }
      ]);

      if (response || !error.value) {
        createToast('Category Creation Success',
          {
            type: 'success',
            transition: 'slide',
            showIcon: 'true',
            hideProgressBar: 'true'
          });
        await router.push('/categories');
      }
    };

    const handleFileChange = (event) => {
      selectedFile.value = event.target.files;
    };

    return {
      data,
      loading,
      error,
      image,
      categoryName,
      categoryDescription,
      selectedFile,
      handleFileChange,
      save,
      doUpsert,
      doUpload
    };
  },
  data: () => ({
    test: {}
  }),

  methods: {
    fieldClasses(hasError) {
      const cls = 'border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150';

      return !hasError
        ? cls
        : `${cls} is-error`;
    }
  }

});
</script>

<style scoped>

</style>
