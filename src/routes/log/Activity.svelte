<script lang="ts">
	import { metersPerSecToMinPerMile, metersToMiles } from './utils';
	import type { Activity } from '../../types';
	export let activity: Activity;
</script>

<!-- Add a margin to the div but not its children -->
<div class="flex flex-wrap text-grey-light text-lg">
	<!-- TODO: Find a more responsive way to keep things in line -->
	<div class="w-36">
		<h4>
			{activity.name}
		</h4>
	</div>
	<div class="w-36">
		<h4>
			{metersToMiles(activity.distance)} miles
		</h4>
	</div>
	<div class="w-16">
		<h4>
			{metersPerSecToMinPerMile(activity.average_speed)}
		</h4>
	</div>
	<div class="w-96 text-base">
		<body>
			{activity.description || ''}
		</body>
	</div>
</div>
