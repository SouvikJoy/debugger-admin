<template>
	<div class="pt-14">
		<div class="container mx-auto mt-6">
			<div
				class="mx-4"
			>
				<div>
					<label
						for="product-name"
						class="label-class"
					>
						Product Name
					</label>
					<input
						id="product-name"
						ref="productName"
						type="text"
						class="input-class"
						placeholder="Product Name"
					>
				</div>

				<div>
					<label
						for="product-brief"
						class="label-class"
					>
						Product Brief
					</label>
					<textarea
						id="product-brief"
						ref="productBrief"
						type="text"
						row="4"
						class="input-class"
						placeholder="Product Brief"
					/>
				</div>

				<div>
					<label
						for="product-description"
						class="label-class"
					>
						Product Description
					</label>
					<textarea
						id="product-description"
						ref="productDescription"
						type="text"
						row="4"
						class="input-class"
						placeholder="Product Description"
					/>
				</div>

				<div>
					<label
						for="product-price"
						class="label-class"
					>
						Product Price
					</label>
					<input
						id="product-price"
						ref="productPrice"
						type="number"
						class="input-class"
						placeholder="Product Price"
					>
				</div>

				<div>
					<label
						for="product-category"
						class="label-class"
					>
						Product Category
					</label>
					<select
						id="product-category"
						ref="productCategory"
						name="product-category"
						class="input-class my-1"
					>
						<option
							v-for="(category, index) in categories"
							:key="index"
							:value="category.name"
						>
							{{ category.name }}
						</option>
					</select>
				</div>

				<div class="my-8">
					<label class="label-class">
						Product Image
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
									for="product-image"
									class="file-upload"
								>
									<span>Upload a file</span>
									<input
										id="product-image"
										name="product-image"
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

				<div class="mt-2 mb-6">
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
import { defineComponent, ref, onMounted, computed } from 'vue';
import useUpsert from '@/hooks/sb-hooks-upsert';
import useUploadBucket from '@/hooks/sb-hooks-upload';
import useSelectBucket from '@/hooks/sb-hooks-select-bucket';

import { Form, Field, ErrorMessage } from 'vee-validate';
import { initRule } from '@/utils';

import { useStore } from 'vuex';

import { useRouter } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';

export default defineComponent({
  name: 'CreateProduct',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('getAllCategories');
    });

    initRule(['min', 'max', 'required']);

    const productName = ref('');
    const productCategory = ref('');
    const productBrief = ref('');
    const productDescription = ref('');
    const productPrice = ref('');

    const categories = computed(() => store.state.categories);

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

      const response = await doUpsert('products', [
        {
          name: productName.value.value,
          category: productCategory.value.value,
          brief: productBrief.value.value,
          description: productDescription.value.value,
          price: productPrice.value.value,
          image: imagePath
        }
      ]);

      if (response || !error.value) {
        createToast('Creation Success',
          {
            type: 'success',
            transition: 'slide',
            showIcon: 'true',
            hideProgressBar: 'true'
          });
        await router.push('/products');
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
      productName,
      productCategory,
      productBrief,
      productDescription,
      productPrice,
      selectedFile,
      categories,
      handleFileChange,
      save,
      doUpsert,
      doUpload
    };
  },
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
