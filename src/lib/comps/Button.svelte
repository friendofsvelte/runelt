<script lang="ts">
	import type { Snippet, SvelteComponent } from 'svelte';
	import AnimatedLoading from '~icons/line-md/loading-twotone-loop';

	type Props = {
		loading?: boolean;
		animClass?: 'animate-pulse' | 'animate-bounce' | 'animate-spin' | 'animate-ping' | 'animate-none' | string;
		formaction?: string;
		class?: string;
		color?: string | boolean;
		children: Snippet;
		spinner: boolean | SvelteComponent;
		type: 'button' | 'submit' | 'reset';
		style?: string;
	}

	let {
		loading = false,
		formaction = '',
		class: className = `button button-neutral button-gap`,
		animClass = 'animate-pulse',
		spinner = false,
		children,
		type = 'button',
		style = ''
	}: Props = $props();

	let loading_text = $state('...');
	if (spinner && typeof spinner === 'boolean') {
		let interval: undefined | number = $state();
		let typing_effect = () => {
			if (loading_text.length < 3) {
				loading_text += '.';
			} else {
				loading_text = '';
			}
		};
		$effect(() => {
			if (loading) {
				interval = setInterval(typing_effect, 500);
			} else {
				clearInterval(interval);
				loading_text = '';
			}
			return () => clearInterval(interval);
		});
	}
</script>

<button
	{formaction}
	{style}
	{type}
	disabled={loading}
	class="{className} disabled:cursor-not-allowed {loading && animClass}">
	{#if loading && typeof spinner !== 'boolean' && spinner}
		{@render spinner()}
	{:else if loading && spinner}
		<AnimatedLoading />
	{/if}
	{#if loading && spinner}
		Loading{loading_text}
	{:else}
		{@render children()}
	{/if}
</button>
