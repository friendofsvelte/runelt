<script>
	import '../app.css';
	import '$lib/styles/dropdown.css';

	let { children } = $props();
</script>

<div class="px-5 py-7 max-w-screen">
	{@render children()}
</div>
