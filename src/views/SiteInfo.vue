<template>
	<Form
		ref="formRef"
		v-slot="{ errors }"
		class="form-widget"
		@submit="updateSiteInfo"
	>
		<div class="flex justify-center my-6">
			<Logo
				v-model:path="app_logo_url"
				@upload="updateSiteInfo"
			/>
		</div>

		<div>
			<label
				for="name"
				class="title"
			>Name</label>
			<Field
				id="name"
				v-model="app_name"
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
				for="email"
				class="title"
			>Email</label>
			<Field
				id="email"
				v-model="app_email"
				name="email"
				:class="fieldClasses(!!errors.brief)"
				type="email"
				class="input-class"
				rules="required"
			/>
		</div>

		<ErrorMessage
			class="text-xs text-red-600 font-bold tracking-wider"
			name="email"
		/>

		<div>
			<label
				for="telephone"
				class="title"
			>Telephone</label>
			<Field
				id="telephone"
				v-model="app_telephone"
				name="telephone"
				:class="fieldClasses(!!errors.telephone)"
				type="text"
				class="input-class"
				rules="required"
			/>

			<ErrorMessage
				class="text-xs text-red-600 font-bold tracking-wider"
				name="telephone"
			/>
		</div>

		<div>
			<label
				for="cellphone"
				class="title"
			>Cellphone</label>
			<Field
				id="cellphone"
				v-model="app_cellphone"
				name="cellphone"
				:class="fieldClasses(!!errors.cellphone)"
				type="text"
				class="input-class"
				rules="required"
			/>

			<ErrorMessage
				class="text-xs text-red-600 font-bold tracking-wider"
				name="cellphone"
			/>
		</div>

		<div>
			<label
				for="address"
				class="title"
			>Address</label>
			<Field
				id="address"
				v-model="app_address"
				name="address"
				:class="fieldClasses(!!errors.address)"
				type="text"
				class="input-class"
				rules="required"
			/>

			<ErrorMessage
				class="text-xs text-red-600 font-bold tracking-wider"
				name="address"
			/>
		</div>

		<div class="py-4">
			<label
				for="brief"
				class="title"
			>Brief</label>
			<Field
				id="brief"
				v-model="app_brief"
				name="brief"
				:class="fieldClasses(!!errors.brief)"
				type="text"
				class="input-class"
				rules="required|max:80"
			/>

			<ErrorMessage
				class="text-xs text-red-600 font-bold tracking-wider"
				name="brief"
			/>
		</div>

		<div>
			<label
				for="description"
				class="title"
			>Description</label>
			<Field
				v-model="app_description"
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

		<label
			for="background-image"
			class="title"
		>Landing Page Image</label>
		<div class="flex justify-center my-6">
			<BackgroundImage
				v-model:path="app_landing_image_url"
				@upload="updateSiteInfo"
			/>
		</div>

		<div class="mb-6">
			<input
				type="submit"
				class="create-button"
				:value="loading ? 'Loading ...' : 'Update'"
				:disabled="loading"
			>
		</div>
	</Form>
</template>

<script>
import useClient from '@/hooks/sb-hooks';
import { onMounted, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { initRule } from '@/utils';
import { createToast } from 'mosha-vue-toastify';
import Logo from '@/components/Logo';
import BackgroundImage from '@/components/BackgroundImage';
export default {
  name: 'SiteInfo',
  components: {
    BackgroundImage,
    Logo,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    initRule(['min', 'max', 'required']);
    const supabase = useClient();
    const loading = ref(true);
    const app_name = ref('');
    const app_description = ref('');
    const app_address = ref('');
    const app_telephone = ref('');
    const app_cellphone = ref('');
    const app_email = ref('');
    const app_logo_url = ref('');
    const app_landing_image_url = ref('');
    const app_brief = ref('');
    async function getSiteInfos() {
      try {
        loading.value = true;
        const { data, error, status } = await supabase
          .from('site_infos')
          .select(
            'app_name, app_logo_url, app_description, app_address, app_telephone, app_cellphone, app_email, app_brief, app_landing_image_url'
          )
          .single();
        if (error && status !== 406) throw error;
        if (data) {
          app_name.value = data.app_name;
          app_logo_url.value = data.app_logo_url;
          app_landing_image_url.value = data.app_landing_image_url;
          app_description.value = data.app_description;
          app_address.value = data.app_address;
          app_telephone.value = data.app_telephone;
          app_cellphone.value = data.app_cellphone;
          app_email.value = data.app_email;
          app_brief.value = data.app_brief;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }
    async function updateSiteInfo() {
      try {
        loading.value = true;
        // eslint-disable-next-line no-unused-vars
        const { id } = '1d62bf60-05a8-4b0c-96df-64771a91f87f';
        const updates = {
          id: '1d62bf60-05a8-4b0c-96df-64771a91f87f',
          app_name: app_name.value,
          app_logo_url: app_logo_url.value,
          app_landing_image_url: app_landing_image_url.value,
          app_description: app_description.value,
          app_address: app_address.value,
          app_telephone: app_telephone.value,
          app_cellphone: app_cellphone.value,
          app_email: app_email.value,
          app_brief: app_brief.value,
          updated_at: new Date()
        };
        const { error } = await supabase.from('site_infos').upsert(updates, {
          returning: 'minimal' // Don't return the value after inserting
        });
        createToast('Informations Changed',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'success'
          });
        if (error) throw error;
      } catch (error) {
        createToast('Informations Can not be Changed',
          {
            showIcon: 'true',
            transition: 'bounce',
            type: 'danger'
          });
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      getSiteInfos();
    });
    return {
      loading,
      app_name,
      app_logo_url,
      app_landing_image_url,
      app_description,
      app_address,
      app_telephone,
      app_cellphone,
      app_email,
      app_brief,
      updateSiteInfo
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls =
          'border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150';
      return !hasError ? cls : `${cls} is-error`;
    }
  }
};
</script>
