<template>
	<div class="pt-14">
		<div>
			<div class="flex justify-end">
				<button
					class="create-button m-6"
					@click="$router.push('/create-product')"
				>
					Create
				</button>
			</div>
			<div
				v-for="(product, index) in data"
				:key="index"
			>
				<ProductList :product="product" />
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import ProductList from '@/components/ProductsComponents/ProductList';
import useQuery from '@/hooks/sb-hooks-select';
export default defineComponent({
  name: 'Products',
  components: { ProductList },
  setup() {
    const { loading, error, data, doQuery } = useQuery(
      'products',
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
