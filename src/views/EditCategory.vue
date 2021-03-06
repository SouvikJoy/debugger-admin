<template>
	<div
		v-for="(category, index) in data"
		:key="index"
	>
		<div class="flex justify-center min-h-screen">
			<Form
				ref="formRef"
				v-slot="{ errors }"
				class="form-widget"
				@submit="updateCategory"
			>
				<div class="flex justify-center my-6">
					<Logo
						v-model:path="image"
						@upload="updateCategory"
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
				</div>

				<div>
					<input
						type="submit"
						class="create-button"
					>

					<button
						class="danger-button mx-4"
						@click="deleteCategory"
					>
						Delete
					</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
import useQueryById from '../hooks/sb-hooks-select-one';
import useDeleteById from '../hooks/sb-hooks-delete-one';

import { Field, Form, ErrorMessage } from 'vee-validate';

import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useClient from '@/hooks/sb-hooks';
import { createToast } from 'mosha-vue-toastify';
import { initRule } from '@/utils';
import Logo from '@/components/Logo';

export default defineComponent({
  name: 'EditCategory',
  components: {
    Logo,
    Field,
    Form,
    ErrorMessage
  },
  props: {
    id: String
  },
  setup(props) {
    initRule(['min', 'max', 'required']);

    const supabase = useClient();
    const name = ref('');
    const description = ref('');
    const image = ref('');
    const router = useRouter();
    const {
      loading: deleteLoading,
      error: deleteError,
      doDelete
    } = useDeleteById();
    const { loading, error, data } = useQueryById('categories', '*', props.id);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const categoryId = props.id;

    onMounted(() => {
      getCategory();
    });

    async function getCategory() {
      try {
        const { data, error, status } = await supabase
          .from('categories')
          .select('name, description, image')
          .eq('id', props.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          name.value = data.name;
          description.value = data.description;
          image.value = data.image;
        }
      } catch (error) {
        alert(error.message);
      }
    }

    async function updateCategory(props) {
      try {
        const updates = {
          name: name.value,
          image: image.value,
          description: description.value,
          updated_at: new Date()
        };

        const { data, error } = await supabase
          .from('categories')
          .update([updates])
          .eq('id', categoryId);

        createToast('Category Updated',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'success'
          });

        if (error) throw error;
      } catch (error) {
        createToast('Category Can not be Changed',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'danger'
          });

        console.log(error);
      }
    }

    const deleteCategory = async() => {
      const resp = await doDelete('categories', props.id);
      if (!deleteError.value) {
        await router.push('/categories');
      }
    };

    return {
      loading: loading || deleteLoading,
      error: error || deleteError,
      data,
      deleteCategory,
      updateCategory,
      supabase,
      name,
      description,
      image,
      categoryId
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls =
          'border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150';
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
