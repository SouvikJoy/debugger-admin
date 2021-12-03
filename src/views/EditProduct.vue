<template>
	<div class="pt-14">
		<div>
			<div
				v-for="(product, index) in data"
				:key="index"
			>
				<div class="grid place-items-center">
					<Form
						ref="formRef"
						v-slot="{ errors }"
						class="form-widget"
						@submit="updateProduct"
					>
						<div class="flex justify-center my-6">
							<Logo
								v-model:path="image"
								:avatarImage="'w-56'"
								@upload="updateProduct"
							/>
						</div>

						<div>
							<div>
								<label
									for="name"
									class="title"
								>Name</label>
								<Field
									v-model="name"
									name="name"
									type="text"
									class="input-class"
									:class="fieldClasses(!!errors.name)"
									rules="required"
								/>

								<ErrorMessage
									class="text-xs text-red-600 font-bold tracking-wider"
									name="name"
								/>
							</div>

							<div>
								<label
									for="product-category"
									class="title"
								>
									Product Category
								</label>
								<select
									v-model="category"
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

								<ErrorMessage
									class="text-xs text-red-600 font-bold tracking-wider"
									name="product-category"
								/>
							</div>

							<div>
								<label
									for="price"
									class="title"
								>Price</label>
								<Field
									v-model="price"
									name="price"
									type="number"
									class="input-class"
									:class="fieldClasses(!!errors.price)"
									rules="required"
								/>

								<ErrorMessage
									class="text-xs text-red-600 font-bold tracking-wider"
									name="price"
								/>
							</div>

							<div>
								<label
									for="description"
									class="title"
								>Description</label>
								<Field
									v-model="description"
									as="textarea"
									name="description"
									:class="fieldClasses(!!errors.description)"
									rows="6"
									class="input-class"
									rules="required|max:180"
								/>

								<ErrorMessage
									class="text-xs text-red-600 font-bold tracking-wider"
									name="description"
								/>
							</div>

							<div>
								<label
									for="brief"
									class="title"
								>Brief</label>
								<Field
									v-model="brief"
									as="textarea"
									name="brief"
									:class="fieldClasses(!!errors.brief)"
									rows="6"
									class="input-class"
									rules="required|max:180"
								/>

								<ErrorMessage
									class="text-xs text-red-600 font-bold tracking-wider"
									name="brief"
								/>
							</div>
						</div>

						<div>
							<input
								type="submit"
								class="create-button"
							>

							<button
								class="danger-button"
								@click="deleteProduct"
							>
								Delete
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useQueryById from '../hooks/sb-hooks-select-one';
import useDeleteById from '../hooks/sb-hooks-delete-one';

import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/components/Logo';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { initRule } from '@/utils';
import useClient from '@/hooks/sb-hooks';
import { createToast } from 'mosha-vue-toastify';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EditProduct',
  components: {
    Logo,
    Field,
    Form,
    ErrorMessage
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    initRule(['min', 'max', 'required']);

    const store = useStore();

    onMounted(() => {
      store.dispatch('getAllCategories');
    });

    const supabase = useClient();
    const name = ref('');
    const category = ref('');
    const description = ref('');
    const brief = ref('');
    const price = ref('');
    const image = ref('');
    const router = useRouter();
    const {
      loading: deleteLoading,
      error: deleteError,
      doDelete
    } = useDeleteById();
    const { loading, error, data } = useQueryById('products', '*', props.id);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const productId = props.id;

    onMounted(() => {
      getProducts();
    });

    const categories = computed(() => store.state.categories);

    async function getProducts() {
      try {
        const { data, error, status } = await supabase
          .from('products')
          .select('name, category, description, price, brief, image')
          .eq('id', props.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          name.value = data.name;
          category.value = data.category;
          description.value = data.description;
          brief.value = data.brief;
          price.value = data.price;
          image.value = data.image;
        }
      } catch (error) {
        alert(error.message);
      }
    }

    async function updateProduct(props) {
      try {
        const updates = {
          name: name.value,
          category: category.value,
          description: description.value,
          brief: brief.value,
          price: price.value,
          image: image.value,
          updated_at: new Date()
        };

        const { data, error } = await supabase
          .from('products')
          .update([updates])
          .eq('id', productId);

        createToast('Product Updated',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'success'
          });

        if (error) throw error;
      } catch (error) {
        createToast('Product Can not be Changed',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'danger'
          });

        console.log(error);
      }
    }

    const deleteProduct = async() => {
      await doDelete('products', props.id);
      if (!deleteError.value) {
        await router.push('/products');
      }
    };

    return {
      loading: loading || deleteLoading,
      error: error || deleteError,
      data,
      deleteProduct,
      updateProduct,
      supabase,
      name,
      category,
      description,
      brief,
      price,
      image,
      productId,
      categories
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls =
          'border-0 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150';
      return !hasError ? cls : `${cls} is-error`;
    }
  }
});
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
