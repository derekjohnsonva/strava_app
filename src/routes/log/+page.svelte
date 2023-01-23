<script lang="ts">
	import { token } from '../../store';
	import Activity from './Activity.svelte';
	import {metersToMiles } from './utils';
	import type { Activity as ActivityType } from '../../types'
	import type { PageData } from './$types';

	export let data: PageData;

	function clearToken() {
		console.log('Clearing token');
		$token = null;
		// navigate back to home page
		location.href = '/';
	}

	const daysOfTheWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	const daysOfTheWeekStartMonday = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];

	const getDayOfWeek = (date: Date) => {
		const day = date.getDay();
		return daysOfTheWeek[day];
	};

	// sort a list of activities into a map of days of the week
	const sortActivitiesByDay = (activities: ActivityType[]) => {
		const days = new Map();
		activities.forEach((activity) => {
			const day = getDayOfWeek(new Date(activity.start_date));
			if (!days.get(day)) {
				days.set(day, []);
			}
			days.get(day).push(activity);
		});
		return days;
	};

	// reduce to get total mileage for the week
	let totalMileage = 0;
	data.props.activities.forEach((activity) => {
		totalMileage += Number(metersToMiles(activity.distance));
	});

	const sortedActivities = sortActivitiesByDay(data.props.activities);

</script>


<div class="max-w-6xl flex flex-col gap-9">
	<!-- header -->
	<h1 class="font-bold text-7xl text-orange">Activities</h1>
	<h2 class="font-normal text-5xl text-green">
		Weekly Mileage: {totalMileage.toFixed(2)}
	</h2>
	{#each daysOfTheWeekStartMonday as day}
		{#if sortedActivities.get(day)}
		<div class="flex flex-col gap-5">
			<h3 class="font-normal text-3xl text-blue">{day}</h3>
			{#each sortedActivities.get(day) as activity}
				<Activity {activity} />
			{/each}
		</div>
		{/if}
	{/each}
	<!-- logout button -->
	<div class="w-full flex flex-col items-center">
		<button
			type="button"
			class="inline-block w-40 px-6 py-2.5 text-background bg-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue active:shadow-lg transition duration-150 ease-in-out"
			on:click={clearToken}
			>Log out
		</button>
	</div>
</div>
