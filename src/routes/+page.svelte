<script lang="ts">
	import Dropdown from '$lib/comps/Dropdown.svelte';
	import type { Dropitem } from '$lib/types/dropitem.js';
	import MailboxIcon from '~icons/mdi/mailbox';

	let items = [
		{
			title: 'Item 1',
			href: '/item1',
			active: false,
			disabled: false,
			icon: MailboxIcon
		},
		{
			title: 'Item 2',
			href: '/item2',
			active: true,
			disabled: false,
			icon: MailboxIcon
		},
		{
			title: 'Item 3',
			href: '/item3',
			active: false,
			disabled: false,
			icon: MailboxIcon
		},
		{
			title: 'Item 4',
			href: '/item4',
			active: false,
			disabled: false,
			icon: MailboxIcon
		}
	] as Dropitem[];
</script>


<div class="h-[200vh] py-72 pl-72">
	<Dropdown open {items} class="dropdown w-40" titleClass="dropdown-title red"
						itemClass="dropdown-item amber" placement="top" handled>
	</Dropdown>
</div>
