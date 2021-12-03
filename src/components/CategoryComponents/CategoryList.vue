<template>
	<div class="max-w-md mx-4 mb-4 dark:bg-gray-700 dark:bg-opacity-[25%] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
		<div class="md:flex">
			<div class="md:flex-shrink-0">
				<ImageAssistant
					:image="category?.image"
					bucket="product-bucket"
					:imageClass="'object-cover w-full h-60'"
				/>
			</div>
			<div class="p-4 xl:p-8">
				<div class="uppercase tracking-wide text-lg font-bold">
					{{ category?.name }}
				</div>
				<p class="mt-2  text-sm xl:text-lg text-[#858685]">
					{{ category?.description }}
				</p>
			</div>

			<div class="flex justify-end">
				<router-link
					:to="`/categories/${category.id}`"
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
  name: 'CategoryList',
  components: { ImageAssistant },
  props: ['category'],
  setup() {
    return {};
  }
});
</script>
