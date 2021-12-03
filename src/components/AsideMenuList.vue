<template>
	<ul>
		<aside-menu-item
			v-for="(item, index) in menu"
			:key="index"
			:item="item"
			:isSubmenuList="isSubmenuList"
			@menu-click="menuClick"
		/>
	</ul>
</template>

<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue';

defineProps({
  isSubmenuList: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['menu-click']);

const menuClick = (event, item) => {
  emit('menu-click', event, item);
};
</script>
