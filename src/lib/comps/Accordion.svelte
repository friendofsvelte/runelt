<script lang="ts">
	import { slide } from 'svelte/transition';
	import ChevronUp from '~icons/bi/chevron-up';
	// import { twMerge } from 'tailwind-merge';

	let {
		children, title = 'slide down', open = $bindable(false),
		accClass = 'accordion emerald',
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
			<ChevronUp class="accordion-chevron {open && 'rotate-180'}" />
		</button>
	</h2>
	{#if open}
		<div class={contentClass} transition:slide>
			{@render children()}
		</div>
	{/if}
</div>
