<template>
	<card-component rounded="">
		<level type="justify-around lg:justify-center">
			<user-avatar class="lg:mx-12" />
			<div class="space-y-3 text-center md:text-left lg:mx-12">
				<h1 class="text-2xl">
					Howdy, <b>{{ userEmail }}</b>!
				</h1>
				<p>Last login at <b> {{ useLastSignInTime }} </b> from <b>127.0.0.1</b></p>
				<div class="flex justify-center md:block">
					<pill
						text="Verified"
						type="info"
						:icon="mdiCheckDecagram"
					/>
				</div>
			</div>
		</level>
	</card-component>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { mdiCheckDecagram } from '@mdi/js';
import Level from '@/components/Level.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import CardComponent from '@/components/CardComponent.vue';
import Pill from '@/components/Pill.vue';

const store = useStore();

const userEmail = computed(() => store.state.user.email);

const useLastSignInTime = computed(() => store.state.user.last_sign_in_at);

</script>
