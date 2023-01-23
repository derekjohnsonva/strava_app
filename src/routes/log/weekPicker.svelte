<script lang="ts">
	import { DateInput } from 'date-picker-svelte';
	// get the most recently passed monday and the next Sunday
	const curr = new Date();
	export let selectedDate = new Date();
</script>

<div>
	<DateInput bind:value={selectedDate} closeOnSelection={true} />
</div>
