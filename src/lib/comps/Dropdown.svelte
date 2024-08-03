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
	let elm: HTMLDivElement | undefined = $state();
	let itemsElm: HTMLDivElement | undefined = $state();

	function pos(default_position: string) {
		if (elm) {
			const rect = elm.getBoundingClientRect();
			const overflowBottom = window.innerHeight - rect.bottom - rect.height < 0;
			const overflowRight = window.innerWidth - rect.right < 0;
			// const overflowTop = rect.top < 0 // compare it according to innerWidth
			const overflowTop = rect.top < 0;
			const overflowLeft = rect.left < 0;
			if (overflowLeft || (overflowLeft && overflowBottom)) {
				return `bottom: -${rect.height}px; right: -100%; transform: translate(0, 50%);`;
			}
			if (overflowRight || (overflowRight && overflowBottom) || overflowBottom || overflowTop) {
				return `bottom: -${rect.height}px; left: -100%; transform: translate( 0, 50%);`;
			}
		}
		return default_position;
	}

	let placements = {
		'top': () => {
			return pos('top: -100%; left: 50%; transform: translate(-50%, -100%);');
		},
		'top-end': () => {
			return pos('top: -100%; right: 0; transform: translate(0, -100%);');
		},
		'top-start': () => {
			return pos('top: -100%; left: 0; transform: translate(0, -100%);');
		},
		'bottom': () => {
			return pos('bottom: -100%; float:left; left: 50%; transform: translate(-50%, 100%);');
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

<svelte:window {onmousedown} {onresize} onscroll={onresize} />

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
			<div class="{itemsClass} duration-150" style="{placementStyle}" bind:this={itemsElm}>
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
