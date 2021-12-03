<template>
	<div v-if="auth.user">
		<nav-bar />
		<aside-menu :menu="menu" />
		<router-view />
		<footer-bar />
		<overlay
			v-show="isAsideLgActive"
			zIndex="z-30"
			@overlay-click="overlayClick"
		/>
	</div>
	<SignIn v-else />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import menu from '@/menu.js';
import NavBar from '@/components/NavBar.vue';
import AsideMenu from '@/components/AsideMenu.vue';
import FooterBar from '@/components/FooterBar.vue';
import Overlay from '@/components/Overlay.vue';

import { auth } from '@/auth';

import useClient from '@/hooks/sb-hooks';
import SignIn from '@/views/SignIn.vue';

const supabase = useClient();
const store = useStore();
const isAsideLgActive = computed(() => store.state.isAsideLgActive);

const overlayClick = () => {
  store.dispatch('asideLgToggle', false);
};

auth.user = supabase.auth.user();

</script>
