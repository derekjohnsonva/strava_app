<script lang="ts">
	import { token, startOfWeek, endOfWeek } from '../../store';
	import { getActivities } from './utils';
	import { getWeekRange } from '../../utils';
	import Activity from './Activity.svelte';
	import { metersToMiles } from './utils';
	import { DateInput } from 'date-picker-svelte';
	import type { Activity as ActivityType } from '../../types';
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

	const sortActivitiesByDay = (activities: ActivityType[]) => {
		// Sort activities by day of the week. Each day will by sorten by start time
		const days: Map<string, ActivityType[]> = new Map();
		activities.forEach((activity) => {
			const day = getDayOfWeek(new Date(activity.start_date));
			if (!days.get(day)) {
				days.set(day, []);
			}
			days.get(day)?.push(activity);
		});
		// Sort each day by start time
		days.forEach((day) => {
			day.sort((a, b) => {
				return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
			});
		});
		return days;
	};

	let totalMileage = 0;
	let sortedActivities = sortActivitiesByDay(data.props.activities);
	$: {
		totalMileage = 0;
		data.props.activities.forEach((activity) => {
			totalMileage += Number(metersToMiles(activity.distance));
		});
		sortedActivities = sortActivitiesByDay(data.props.activities);
	}

	let selectedDate = new Date();
	$: {
		console.log('selectedDate changed', selectedDate);
		const newWeekRange = getWeekRange(selectedDate);
		if (newWeekRange.start !== $startOfWeek) {
			$startOfWeek = newWeekRange.start;
			$endOfWeek = newWeekRange.end;
			getActivities(fetch, $endOfWeek.getTime() / 1000, $startOfWeek.getTime() / 1000)
				.then((activities) => {
					data.props.activities = activities;
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}
</script>

<div class="max-w-6xl flex flex-col gap-9">
	<!-- header -->
	<h1 class="font-bold text-7xl text-orange">Activities</h1>
	<h2 class="font-normal text-5xl text-green">
		Weekly Mileage: {totalMileage.toFixed(2)}
	</h2>
	<DateInput bind:value={selectedDate} closeOnSelection={true} />
	{#each daysOfTheWeekStartMonday as day}
		<div class="flex flex-col gap-5">
			<h3 class="font-normal text-3xl text-blue">{day}</h3>
			{#if sortedActivities.get(day)}
				{#each sortedActivities.get(day) as activity}
					<Activity {activity} />
				{/each}
			{/if}
		</div>
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
