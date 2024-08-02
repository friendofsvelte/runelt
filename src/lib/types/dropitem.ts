import type { SvelteComponent } from 'svelte';

export type Dropitem = {
	title: string;
	href: string;
	active: boolean;
	disabled: boolean;
	icon?: SvelteComponent | unknown
}
