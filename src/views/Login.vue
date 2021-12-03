<template>
	<full-screen-section
		v-slot="{ cardClass, cardRounded }"
		bg="login"
	>
		<card-component
			:class="cardClass"
			:rounded="cardRounded"
			form
			@submit.prevent="signIn"
		>
			<field
				label="email"
				help="Please enter your email"
			>
				<control
					v-model="form.email"
					:icon="mdiAccount"
					name="email"
					autocomplete="email"
				/>
			</field>

			<field
				label="Password"
				help="Please enter your password"
			>
				<control
					v-model="form.password"
					:icon="mdiAsterisk"
					type="password"
					name="password"
					autocomplete="current-password"
				/>
			</field>

			<check-radio-picker
				v-model="form.remember"
				name="remember"
				:options="{ remember: 'Remember' }"
			/>

			<divider />

			<jb-buttons>
				<jb-button
					type="submit"
					color="info"
					label="Login"
				/>
				<jb-button
					to="/"
					color="info"
					outline
					label="Back"
				/>
			</jb-buttons>
		</card-component>
	</full-screen-section>
</template>

<script setup>
import { reactive } from 'vue';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import FullScreenSection from '@/components/FullScreenSection.vue';
import CardComponent from '@/components/CardComponent.vue';
import CheckRadioPicker from '@/components/CheckRadioPicker.vue';
import Field from '@/components/Field.vue';
import Control from '@/components/Control.vue';
import Divider from '@/components/Divider.vue';
import JbButton from '@/components/JbButton.vue';
import JbButtons from '@/components/JbButtons.vue';
import { useStore } from 'vuex';

const form = reactive({
  email: '',
  password: ''
});
const store = useStore();

const signIn = () => {
  store.dispatch('signInAction', form);
};
</script>
