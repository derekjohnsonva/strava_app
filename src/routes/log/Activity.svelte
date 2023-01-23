<script lang="ts">
	import { metersPerSecToMinPerMile, metersToMiles } from './utils';
	import type { Activity } from '../../types';
	export let activity: Activity;

</script>
<!-- Add a margin to the div but not its children -->
<div class="flex flex-row gap-5 text-grey-light m-0">
	<!-- TODO: Find a more responsive way to keep things in line -->
	<h4 class="w-36 flex-none">
		{activity.name}
	</h4>
	<h4 class="w-36 flex-none">
		{metersToMiles(activity.distance)} miles
	</h4>
	<h4 class="w-16 flex-none">
		{metersPerSecToMinPerMile(activity.average_speed)}
	</h4>
	<body class="w-96 flex-none">
		{activity.description || ''}
	</body>
</div>
