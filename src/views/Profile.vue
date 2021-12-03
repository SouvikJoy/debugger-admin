<template>
	<main-section class="pt-14">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 tracking-wider">
			<card-component
				title="Edit Profile"
				:icon="mdiAccountCircle"
				form
				@submit.prevent="updateProfile"
			>
				<Logo
					v-model:path="avatar_url"
					:avatarImage="'rounded-full w-76'"
					@upload="updateProfile"
				/>

				<field
					label="E-mail"
					help="Email cannot be changed"
				>
					<input
						v-model="auth.user.email"
						class="input-class"
						type="email"
						name="email"
						disabled
					>
				</field>

				<field
					label="Name"
					help="Your name is optional"
				>
					<control
						v-model="username"
						:icon="mdiAccount"
						name="username"
						required
						autocomplete="username"
					/>
				</field>

				<field
					label="Designation"
					help="Your designation is optional"
				>
					<control
						v-model="website"
						:icon="mdiAccount"
						name="website"
						required
						autocomplete="website"
					/>
				</field>

				<divider />

				<jb-buttons>
					<jb-button
						color="info"
						type="submit"
						label="Submit"
					/>
				</jb-buttons>
			</card-component>
		</div>
	</main-section>

	<user-card />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';

import { auth } from '@/auth';

import useClient from '@/hooks/sb-hooks';

const supabase = useClient();

import { mdiAccount, mdiAccountCircle, mdiLock, mdiMail, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js';
import MainSection from '@/components/MainSection.vue';
import CardComponent from '@/components/CardComponent.vue';
import Divider from '@/components/Divider.vue';
import Field from '@/components/Field.vue';
import Control from '@/components/Control.vue';
import JbButton from '@/components/JbButton.vue';
import JbButtons from '@/components/JbButtons.vue';
import UserCard from '@/components/UserCard.vue';
import Logo from '@/components/Logo';

const store = useStore();
const loading = ref(true);
const username = ref('');
const website = ref('');
// eslint-disable-next-line camelcase
const avatar_url = ref('');

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    auth.user = supabase.auth.user();

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', auth.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    auth.user = supabase.auth.user();

    const updates = {
      id: auth.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date()
    };

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal'
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
