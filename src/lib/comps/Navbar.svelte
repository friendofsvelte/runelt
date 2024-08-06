<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		fixed?: boolean;
		sticky?: boolean;
		render?: boolean;
		'border-b'?: boolean | 'on-scroll';
		'shadow-lg'?: boolean | 'on-scroll';
		items?: Snippet;
		children: Snippet;
		class?: string;
		rp?: Record<string, unknown>; // rest props
	};
	let {
		fixed = false,
		sticky = false,
		render = true,
		'shadow-lg': shadowLg = false,
		'border-b': borderB = false,
		items,
		children,
		class: className = 'navbar neutral navbar-sizing',
		...rp
	}: Props = $props();
	let borderBApparent = $state(borderB && borderB !== 'on-scroll');
	let shadowLgApparent = $state(shadowLg && shadowLg !== 'on-scroll');

	function onscroll() {
		if (borderB === 'on-scroll') {
			borderBApparent = window.scrollY > 0;
		}
		if (shadowLg === 'on-scroll') {
			shadowLgApparent = window.scrollY > 0;
		}
	}
</script>

<svelte:window {onscroll} />

{#if render}
	<nav
		id="dNav"
		class:sticky
		class:fixed
		class={className}
		class:shadow-lg={shadowLgApparent}
		class:border-b={borderBApparent}
		{...rp}>
		{@render items?.()}

		<div class="flex flex-row items-center h-full gap-3">
			{@render children()}
		</div>
	</nav>
{/if}
{#if render && fixed}
	<div class="h-14 w-full"></div>
{/if}
