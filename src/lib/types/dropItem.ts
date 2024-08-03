import type { SvelteComponent } from 'svelte';

export type DropItem = {
	title: string;
	href: string;
	active: boolean;
	disabled: boolean;
	icon?: SvelteComponent | unknown
}
