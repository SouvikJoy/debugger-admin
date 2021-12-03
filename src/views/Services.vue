<template>
	<div>
		<Header />
		<div>
			<div class="flex justify-end">
				<button
					class="create-button m-6"
					@click="$router.push('/create-service')"
				>
					Create
				</button>
			</div>
			<div
				v-for="(service, index) in data"
				:key="index"
			>
				<ServiceList :service="service" />
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import useQuery from '@/hooks/sb-hooks-select';
import ServiceList from '@/components/ServiceComponents/ServiceList';
export default defineComponent({
  name: 'Services',
  components: { ServiceList },
  setup() {
    const { loading, error, data, doQuery } = useQuery(
      'services',
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
