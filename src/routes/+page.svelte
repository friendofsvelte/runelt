<script lang="ts">
	import Dropdown from '$lib/comps/Dropdown.svelte';
	import type { DropItem } from '$lib/types/dropItem.js';
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
	] as DropItem[];
</script>


<div class="py-72 px-28 flex items-center justify-center w-full">
	<div class="flex flex-row gap-2 w-full max-w-xl items-center">
		<Dropdown {items} class="dropdown w-full" titleClass="dropdown-title red whitespace-nowrap w-full"
							title="Left End"
							itemClass="dropdown-item amber" placement="left-end" handled track>
		</Dropdown>
		<div class="flex flex-col gap-2">
			<Dropdown {items} class="dropdown w-full" titleClass="dropdown-title red whitespace-nowrap w-full"
								title="Top Dropdown"
								itemClass="dropdown-item amber" placement="top" handled track>
			</Dropdown>
			<Dropdown {items} class="dropdown" titleClass="dropdown-title red whitespace-nowrap w-full"
								title="Bottom Dropdown"
								itemClass="dropdown-item amber" placement="bottom" handled track>
			</Dropdown>
		</div>

		<Dropdown {items} class="dropdown w-full" titleClass="dropdown-title red whitespace-nowrap w-full"
							title="Right end"
							itemClass="dropdown-item amber" placement="right-end" handled track>
		</Dropdown>
	</div>

</div>
