<script>
	import Accordion from '$lib/comps/Accordion.svelte';
</script>

<Accordion open accClass="accordion neutral max-w-xl">
	Hwy
	<Accordion open accClass="accordion blue">
		Hey
		<Accordion open accClass="accordion neutral max-w-xl">
			Hwy
			<Accordion open accClass="accordion emerald">
				Hey
			</Accordion>
		</Accordion>
	</Accordion>
</Accordion>
