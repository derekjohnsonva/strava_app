<script>
	const strava_signin_link =
		'https://www.strava.com/oauth/authorize?client_id=99379&response_type=code&redirect_uri=http://localhost:5173/log&approval_prompt=force&scope=profile:read_all,activity:read_all';

	function handleClick() {
		// reload to the strava signin link
		location.href = strava_signin_link;
	}
</script>

<button
	on:click={handleClick}
	class="inline-block px-6 py-2.5 text-background bg-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue active:shadow-lg transition duration-150 ease-in-out"
	>Login with Strava
</button>
