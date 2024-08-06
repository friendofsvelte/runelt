<script>
	import '../app.css';
	import '../lib/styles/navbar.css';
	import '$lib/styles/dropdown.css';
	import Navbar from '$lib/comps/Navbar.svelte';

	let { children } = $props();
</script>

<div class="px-5 py-7 max-w-screen">
	<Navbar shadow-lg="on-scroll"
					border-b="on-scroll"
					class="navbar emerald navbar-sizing emerald-border top-7 left-0"
					sticky>
		{#snippet items()}
		<ul class="flex flex-row items-center gap-3">
			<li class="text-lg font-bold"><a href="/">Home</a></li>
			<li class="text-lg font-bold"><a href="/about">About</a></li>
			<li class="text-lg font-bold"><a href="/contact">Contact</a></li>
		</ul>
		{/snippet}
		<div class="flex flex-row items-center h-full gap-3">
			<a href="/login" class="text-lg font-bold">Login</a>
			<a href="/register" class="text-lg font-bold">Register</a>
		</div>
	</Navbar>
	{@render children()}
</div>
