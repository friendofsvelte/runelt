<script lang="ts">
	import ChevronDown from '~icons/bi/chevron-down';
	import type { SvelteComponent, Snippet } from 'svelte';
	import type { Dropitem } from '$lib/types/dropitem.js';

	type Props = {
		children?: any;
		items?: Array<Dropitem>;
		show?: boolean;
		onclick?: () => void;
		title?: string;
		icon?: SvelteComponent | Snippet;
		class?: string;
		titleClass?: string;
		itemsClass?: string;
		itemClass?: string;
		open?: boolean;
		handled?: boolean;
	};
	let {
		children, items = [],
		open = $bindable(false),
		onclick = () => {
			open = !open;
		},
		title = 'Dropdown',
		icon,
		class: dropdownClass = 'dropdown neutral',
		titleClass = 'dropdown-title',
		itemsClass = 'dropdown-items amber',
		itemClass = 'dropdown-item',
		handled = false
	}: Props = $props();

	let elm: HTMLDivElement = $state();

	function onkeydown(event: KeyboardEvent) {
		if (handled && event.key === 'Escape') {
			open = false;
		}
	}

	function onmousedown(event: MouseEvent) {
		if (handled && !elm.contains(event.target as Node)) {
			open = false;
		}
	}
</script>

<svelte:window {onmousedown} />

<div class="{dropdownClass}" class:open bind:this={elm}>
	<button class={titleClass} {onclick} {onkeydown}>
		{#if icon && icon.length === 1}
			{@render icon()}
		{:else if icon}
			<svelte:component this={icon} class="w-4" />
		{:else}
			<ChevronDown class="w-4 duration-300 {open ? 'rotate-180' : ''}" />
		{/if}
		<span>{title}</span>
	</button>
	{#if open}
		{#if children}
			{@render children()}
		{:else}
			<div class={itemsClass}>
				{#each items as item}
					<a
						class="{itemClass}"
						href={item.href}
						class:active={item.active}
						class:disabled={item.disabled}
					>
						{#if item.icon}
							<svelte:component this={item.icon} class="w-4" />
						{/if}
						{item.title}
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</div>
