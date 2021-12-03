<template>
	<div>
		<div class="title">
			Category List
		</div>
		<div class="flex flex-col">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div
						class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
					>
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
									>
										Name
									</th>
									<th
										scope="col"
										class="relative px-6 py-3"
									>
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr
									v-for="(category, index) in data"
									:key="index"
								>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div class="flex-shrink-0 h-10 w-10">
												<ImageAssistant
													:image="category?.image"
													bucket="product-bucket"
													:imageClass="'w-24'"
												/>
											</div>
											<div class="ml-4">
												<div class="text-sm font-medium text-gray-900">
													{{ category?.name }}
												</div>
												<div class="text-sm text-gray-500">
													{{ category?.description }}
												</div>
											</div>
										</div>
									</td>
									<td
										class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
									>
										<router-link
											:to="`/categories/${category.id}`"
											class="create-button"
										>
											Edit
										</router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import ImageAssistant from '../ImageAssistant';
import useQuery from '@/hooks/sb-hooks-select';

export default defineComponent({
  name: 'CategoryTable',
  components: { ImageAssistant },
  props: ['category'],
  setup() {
    const { loading, error, data, doQuery } = useQuery(
      'categories',
      undefined,
      true
    );

    const getData = async() => {
      await doQuery();
    };

    return {
      loading,
      error,
      data,
      getData,
      doQuery
    };
  }
});
</script>

<style>

</style>
