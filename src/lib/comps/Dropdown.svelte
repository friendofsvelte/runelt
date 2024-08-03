<script lang="ts">
	import ChevronDown from '~icons/bi/chevron-down';
	import { type SvelteComponent, type Snippet, onMount } from 'svelte';
	import type { Dropitem } from '$lib/types/dropitem';

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
		placement?: keyof typeof placements;
		placementStyle?: string;
		width?: number;
	};
	let elm: HTMLDivElement = $state();

	const MARGIN = 12;

	let placements = {
		'top-end': () => {
			// if (elm) {
			// 	const rect = elm.getBoundingClientRect();
			// 	return `top: ${rect.top - rect.height}px; right: -${rect.width - MARGIN}px;`;
			// } else {
			// 	return `top: 0; margin-left: ${MARGIN}px; right: -100%;`;
			// } # this code is not window size aware
			// has a priority to be shown on top right corner, if not possible, then show on bottom right corner
			// check if it overflows on right side, if so, then show on bottom center

			if (elm) {
				const rect = elm.getBoundingClientRect();
				const right = window.innerWidth - rect.right;
				const top = rect.top - rect.height;
				if (right < rect.width) {
					return `top: ${rect.bottom}px; right: 50%; transform: translateX(50%);`;
				} else {
					return `top: ${top}px; right: -100%;`;
				}
			} else {
				return `top: -16px; right: -100%;`;
			}
		}
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
		handled = false,
		placement = 'top-end',
		placementStyle = ''
	}: Props = $props();

	function onresize() {
		placementStyle = placements[placement]();
	}


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

	onresize();
	onMount(onresize);
</script>

<svelte:window {onmousedown} {onresize} />

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
			<div class="{itemsClass} duration-150" style="{placementStyle}">
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
