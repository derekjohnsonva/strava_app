<script lang="ts">
	import { token } from '../../store';
	import Activity from './Activity.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function clearToken() {
		console.log('Clearing token');
		$token = null;
		// navigate back to home page
		location.href = '/';
	}

	// Map to store days of the week and if they have been rendered
	const daysRendered = new Map();
	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	daysOfTheWeek.forEach((day) => {
		daysRendered.set(day, false);
	});

	const getDayOfWeek = (date: Date) => {
		const day = date.getDay();
		return daysOfTheWeek[day];
	};
	const getAndSetDayOfWeek = (date: Date) => {
		const day = date.getDay();
		daysRendered.set(daysOfTheWeek[day], true);
		return daysOfTheWeek[day];
	};
</script>

<button
	type="button"
	class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
	on:click={clearToken}
	>Log out
</button>

{#each [...data.props.activities].reverse() as activity}
	{#if !daysRendered.get(getDayOfWeek(new Date(activity.start_date)))}
		<h3>
			{getAndSetDayOfWeek(new Date(activity.start_date))}
		</h3>
	{/if}
	<Activity {activity} />
{/each}
