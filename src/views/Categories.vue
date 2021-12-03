<template>
	<div>
		<div>
			<div class="flex justify-end">
				<button
					class="create-button m-6"
					@click="$router.push('/create-category')"
				>
					Create
				</button>
			</div>
			<div
				v-for="(category, index) in data"
				:key="index"
			>
				<CategoryList :category="category" />
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import useQuery from '@/hooks/sb-hooks-select';
import CategoryList from '@/components/CategoryComponents/CategoryList';
export default defineComponent({
  name: 'Categories',
  components: { CategoryList },
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

<style scoped>

</style>
