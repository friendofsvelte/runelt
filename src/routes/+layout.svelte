<script>
	import '../app.css';
	import '$lib/styles/accordion.css';
	// import MailboxIcon from 'virtual:icons/ion/mail-outline';
	// import SpinnerIcon from 'virtual:icons/line-md/loading-twotone-loop';
	import Accordion from '$lib/comps/Accordion.svelte';

	let { children } = $props();
</script>

<div class="px-5 py-7">
{@render children()}

</div>
