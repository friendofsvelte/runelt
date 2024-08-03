<script lang="ts">
	import ChevronDown from '~icons/bi/chevron-down';
	import { type SvelteComponent, type Snippet, onMount } from 'svelte';
	import type { DropItem } from '$lib/types/dropItem';

	type Props = {
		children?: Snippet;
		items?: Array<DropItem>;
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
		track?: boolean;
		btnSec?: Snippet
	};
	let elm: HTMLDivElement | undefined = $state();
	let itemsElm: HTMLDivElement | undefined = $state();

	function pos(default_position: string) {
		if (elm && itemsElm && track) {
			const dropdownRect = elm.getBoundingClientRect();
			const itemsRect = itemsElm.getBoundingClientRect();
			const overflowBottom = window.innerHeight - dropdownRect.bottom - itemsRect.height < 0;
			const overflowRight = window.innerWidth - dropdownRect.right - itemsRect.width < 0;
			const overflowTop = dropdownRect.top - itemsRect.height < 0;
			const overflowLeft = dropdownRect.left - itemsRect.width < 0;

			if (overflowTop && overflowRight) {
				console.log('heyx');
				return `top: -${dropdownRect.height}px; right: 50%; transform: translate(50%, 55%);`;
			}
			if (overflowTop && overflowLeft) {
				return `top: -${dropdownRect.height}px; left: -100%; transform: translate(0, -100%);`;
			}
			if (overflowLeft || (overflowLeft && overflowBottom)) {
				return `bottom: -${dropdownRect.height}px; right: -100%; transform: translate(0, 50%);`;
			}
			if (overflowRight || (overflowRight && overflowBottom) || overflowBottom) {
				return `bottom: -${dropdownRect.height}px; left: -100%; transform: translate(0, 50%);`;
			}
			// if it overflows from top
			if (overflowTop) {
				// We change the placement to bottom in case of overflow from the top
				return `bottom: -${dropdownRect.height}px; left: 50%; transform: translate(-50%, 100%);`;
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
		},
		'bottom-end': () => {
			return pos('bottom: -100%; right: 0; transform: translate(0, 100%);');
		},
		'bottom-start': () => {
			return pos('bottom: -100%; left: 0; transform: translate(0, 100%);');
		},
		'left': () => {
			return pos('left: -100%; top: 50%; transform: translate(-100%, -50%);');
		},
		'left-end': () => {
			return pos('left: -100%; top: 0; transform: translate(0%, 0);');
		},
		'left-start': () => {
			return pos('left: -100%; bottom: 0; transform: translate(-100%, 0);');
		},
		'right': () => {
			return pos('right: -100%; top: 50%; transform: translate(100%, -50%);');
		},
		'right-end': () => {
			return pos('right: -100%; top: 0; transform: translate(0%, 0);');
		},
		'right-start': () => {
			return pos('right: -100%; bottom: 0; transform: translate(100%, 0);');
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
		btnSec,
		handled = false,
		placement = 'top-end',
		placementStyle = '',
		track = false
	}: Props = $props();

	let icon_rotates = {
		'bottom': 'transform: rotate(0deg)',
		'top': 'transform: rotate(180deg)',
		'left': 'transform: rotate(90deg)',
		'right': 'transform: rotate(-90deg)'
	};

	function handlePlacement() {
		placementStyle = placements[placement]();
		return '';
	}


	function onkeydown(event: KeyboardEvent) {
		if (handled && event.key === 'Escape') {
			open = false;
		}
	}

	function handleOpen(event: FocusEvent & { currentTarget: EventTarget & Window; }) {
		if (handled && !elm.contains(event.target as Node)) {
			open = false;
		}
	}

	handlePlacement();
	onMount(handlePlacement);
</script>

<svelte:window onresize={handlePlacement} onscroll={handlePlacement} onfocusin={handleOpen} onmousedown={handleOpen} />

<div class="{dropdownClass}" class:open bind:this={elm}>
	<button class={titleClass} {onclick} {onkeydown}>
		{#if btnSec}
			{@render btnSec()}
		{:else}
			{#if icon && icon.length === 1}
				{@render icon()}
			{:else if icon}
				<svelte:component this={icon} class="w-4" />
			{:else}
				<div style="{icon_rotates[placement.split('-')[0]]}">
					<ChevronDown class="w-4 duration-300 {open ? 'rotate-180' : ''}" />
				</div>
			{/if}
			{#if title}
				<span>{title}</span>
			{/if}
		{/if}
	</button>
	{#if open}
		{#if children}
			{@render children()}
		{:else}
			{handlePlacement()}
			<div class="{itemsClass} duration-100" style="{placementStyle}" bind:this={itemsElm}>
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
