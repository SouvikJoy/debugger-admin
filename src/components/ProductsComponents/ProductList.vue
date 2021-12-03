<template>
	<div class="max-w-md mx-4 mb-4 dark:bg-gray-700 dark:bg-opacity-[25%] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
		<div class="md:flex">
			<div class="md:flex-shrink-0">
				<ImageAssistant
					:image="product?.image"
					bucket="product-bucket"
					:imageClass="'object-cover w-full h-60'"
				/>
			</div>
			<div class="p-4 xl:p-8">
				<div class="uppercase tracking-wide text-lg font-bold">
					{{ product?.name }}
				</div>
				<a
					href="#"
					target="_blank"
					rel="noopener"
					class="block mt-1 leading-tight font-medium hover:underline"
				>
					{{ product?.category }}
				</a>
				<p class="mt-2  text-sm xl:text-lg text-[#858685]">
					{{ product?.description }}
				</p>
			</div>

			<div class="flex justify-end">
				<router-link
					:to="`/products/${product.id}`"
					class="create-button m-6"
				>
					Edit
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import ImageAssistant from '../ImageAssistant';

export default defineComponent({
  name: 'ProductList',
  components: { ImageAssistant },
  props: ['product'],
  setup() {
    return {};
  }
});
</script>
