import { error } from '@sveltejs/kit';
import { page } from '$app/stores'
import { authenticated, token, strava_client_id, strava_client_secret } from '../../store.ts'
import { get } from 'svelte/store'
import { browser } from '$app/environment'
async function getToken(code, fetch) {
  /* 
  Here's the code from Strava's documentation:
  curl -X POST https://www.strava.com/api/v3/oauth/token \
 -d client_id=ReplaceWithClientID \
 -d client_secret=ReplaceWithClientSecret \
 -d code=ReplaceWithCode \
 -d grant_type=authorization_code
 */
  let response = await fetch(
    'https://www.strava.com/api/v3/oauth/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          client_id: get(strava_client_id),
          client_secret: get(strava_client_secret),
          code,
          grant_type: 'authorization_code'
        }
      )
    }
  );
  let token_new = await response.json();
  return token_new;
}

async function getActivities(fetch, page = 1, per_page = 60, before = 0, after = 0) {
  let query = `https://www.strava.com/api/v3/activities?page=${page}&per_page=${per_page}`;
  if (before) {
    query = query + `&before=${before}`
  }
  if (after) {
    query = query + `&after=${after}`
  }
  let response = await fetch(
    query,
    {
      headers: {
        Authorization: "Bearer " + get(token).access_token,
      },
    }
  );
  let activities = await response.json();
  // console.log('getActivities=>', activities)
  return activities
}

async function setToken(fetch, code: string) {
  const new_token = await getToken(code, fetch)
  token.set(new_token);

}

export async function load({ fetch, url }) {
  let loginCode = url.searchParams.get('code');
  if (!get(authenticated) && loginCode) {
    console.log("Getting new token");
    setToken(fetch, loginCode)
  }
}


