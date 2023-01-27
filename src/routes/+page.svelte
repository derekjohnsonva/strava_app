
<script lang="ts">
  import { page } from '$app/stores';
  console.log("hostename", $page.url.href)
  const url_base: string = $page.url.href.split('?')[0];

  const strava_search_params = {
    client_id: "99379",
    response_type: "code",
    redirect_uri: url_base + "/log",
    approval_prompt: "force",
    scope: "profile:read_all,activity:read_all",
  }
  const strava_signin_url_base = 'https://www.strava.com/oauth/authorize';
  const strava_signin_link = strava_signin_url_base + '?' + new URLSearchParams(strava_search_params).toString();
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
