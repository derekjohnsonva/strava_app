<script>
	import { token } from '../../store';
	import Activity from './Activity.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	function clearToken() {
		console.log('Clearing token');
		$token = null;
		// navigate back to home page
		location.href = '/';
	}
</script>

<button
	type="button"
	class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
	on:click={clearToken}
	>Log out
</button>

{#each [...data.props.activities].reverse() as activity}
	<Activity {activity} />
{/each}
