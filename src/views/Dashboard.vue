<template>
	<div class="container mx-auto">
		<div class="my-4">
			<Subscribers />
		</div>

		<div class="my-4">
			<ProductTable />
		</div>

		<div class="my-4">
			<CategoryTable />
		</div>

		<div class="my-4">
			<ServiceTable />
		</div>
	</div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import SlideOver from '@/components/Common/SlideOver';
import { useStore } from 'vuex';
import ProductTable from '@/components/ProductsComponents/ProductTable';
import CategoryTable from '@/components/CategoryComponents/CategoryTable';
import ServiceTable from '@/components/ServiceComponents/ServieTable';
import Subscribers from '@/components/partial/Subscribers';

export default defineComponent({
  name: 'Dashboard',
  components: { Subscribers, ServiceTable, CategoryTable, ProductTable, SlideOver },

  setup() {
    const store = useStore();
    console.log(store);
    const userEmail = computed(() => store.state.user);

    const signOut = () => {
      store.dispatch('signOutAction');
    };
    return {
      signOut,
      userEmail
    };
  }

});
</script>

<style>
</style>
