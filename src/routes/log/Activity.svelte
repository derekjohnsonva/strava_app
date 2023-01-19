<script lang="ts">
	import type { Activity } from '../../types';
	export let activity: Activity;

	const metersToMiles = (meters: number) => {
		return (meters * 0.000621371).toFixed(2);
	};

	const metersPerSecToMinPerMile = (metersPerSec: number) => {
		const fractionalMinutes = 1 / (metersPerSec * 0.0372822715);
		// convert fractional minutes to minutes and seconds
		const minutes = Math.floor(fractionalMinutes);
		const seconds = Math.floor((fractionalMinutes - minutes) * 60).toFixed(0);
		return `${minutes}:${seconds}`;
	};

	const getDayOfWeek = (date: Date) => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const day = date.getDay();
		return days[day];
	};
</script>

<h3>
	{getDayOfWeek(new Date(activity.start_date))}
</h3>
<div class="flex flex-row p-0 gap-5 ">
	<h4 class="w-36">
		{activity.name}
	</h4>
	<h4 class="w-36">
		{metersToMiles(activity.distance)} miles
	</h4>
	<h4 class="w-16">
		{metersPerSecToMinPerMile(activity.average_speed)}
	</h4>
	<body class="w-96">
		{activity.description || ''}
	</body>
</div>
