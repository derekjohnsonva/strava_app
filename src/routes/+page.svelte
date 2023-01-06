
<script>
  const strava_signin_link = 'https://www.strava.com/oauth/authorize?client_id=99379&response_type=code&redirect_uri=http://localhost:5173/log&approval_prompt=force&scope=profile:read_all,activity:read_all';

  function handleClick() {
    alert('no more alerts')
  }
</script>

<h1>Welcome to Strava App</h1>
<a href = {strava_signin_link}>Click here to login with Strava</a>
