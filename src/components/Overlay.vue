<template>
	<div
		class="flex items-center flex-col justify-center overflow-hidden fixed inset-0"
		:class="zIndex"
	>
		<transition
			enterActiveClass="transition duration-150 ease-in"
			enterFromClass="opacity-0"
			enterToClass="opacity-100"
			leaveActiveClass="transition duration-150 ease-in"
			leaveFromClass="opacity-100"
			leaveToClass="opacity-0"
		>
			<div
				class="absolute inset-0 bg-gradient-to-tr from-gray-700 via-gray-900 to-gray-700 opacity-90"
				@click="overlayClick"
			/>
		</transition>
		<transition
			enterActiveClass="transition duration-100 ease-out"
			enterFromClass="transform scale-95 opacity-0"
			enterToClass="transform scale-100 opacity-100"
			leaveActiveClass="animate-fadeOut"
		>
			<slot />
		</transition>
	</div>
</template>

<script setup>
defineProps({
  zIndex: {
    type: String,
    default: 'z-50'
  }
});

const emit = defineEmits(['overlay-click']);

const overlayClick = event => {
  emit('overlay-click', event);
};
</script>
