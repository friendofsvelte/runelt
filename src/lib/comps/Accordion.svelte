<script lang="ts">
	import { slide } from 'svelte/transition';
	import ChevronDown from '~icons/bi/chevron-down';
	// import { twMerge } from 'tailwind-merge';

	let {
		children, title = 'slide down', open = $bindable(false),
		accClass = 'accordion neutral',
		h2Class = 'accordion-h2 group',
		contentClass = 'accordion-content',
		buttonClass = 'accordion-button'
	} = $props();

	let onclick = () => {
		open = !open;
	};
</script>

<div class="{accClass}" class:open>
	<h2 class="{h2Class}">
		<button
			{onclick}
			type="button"
			class="{buttonClass}"
			aria-expanded="true">
			{title}
			<ChevronDown class="accordion-chevron {open && 'rotate-180'}" />
		</button>
	</h2>
	{#if open}
		<div class={contentClass} transition:slide>
			{@render children()}
		</div>
	{/if}
</div>
