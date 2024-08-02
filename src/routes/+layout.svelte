<script>
	import '../app.css';
	import Button from '$lib/comps/Button.svelte';
	import '$lib/styles/buttons.css';
	import MailboxIcon from 'virtual:icons/ion/mail-outline';
	import SpinnerIcon from 'virtual:icons/line-md/loading-twotone-loop';

	let { children } = $props();
</script>

{@render children()}

<Button spinner class="button button-green">
	Work
</Button>
