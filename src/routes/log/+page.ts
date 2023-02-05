import type { PageLoad } from './$types';
import { getActivities } from './utils';
import type { Fetch } from './utils';
import { token, startOfWeek, endOfWeek, strava_client_id, strava_client_secret } from '../../store';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

async function getToken(code: string, fetch: Fetch) {
	const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: get(strava_client_id),
			client_secret: get(strava_client_secret),
			code,
			grant_type: 'authorization_code'
		})
	});
	const token_new = await response.json();
	return token_new;
}

async function getRefreshToken(refreshToken: string, fetch: Fetch) {
	const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: get(strava_client_id),
			client_secret: get(strava_client_secret),
			refresh_token: refreshToken,
			grant_type: 'refresh_token'
		})
	});
	const token_new = await response.json();
	return token_new;
}

export const load = (async ({ fetch, url }) => {
	// TODO: check if token is expired
	const loginCode = url.searchParams.get('code');
	const token_is_set = get(token) != null;
	if (!token_is_set && loginCode) {
		console.log('Getting new token');
		const new_token = await getToken(loginCode, fetch);
		token.set(new_token);
	} else {
		// The token is set, so we should check that it is expired
		const expiredDate = get(token)?.expires_at;
		if (expiredDate && expiredDate * 1000 < new Date().getTime()) {
			console.log('Token is expired');
			// TODO: This may be bad practice, but I'm not sure how to do it better
			const token_value = get(token);
			if (token_value?.refresh_token) {
				const new_token = await getRefreshToken(token_value.refresh_token, fetch);
				token.set(new_token);
			} else {
				console.error('No refresh token present');
				throw redirect(300, '/');
			}
		}
	}
	if (!get(token)?.expires_at) {
		token.set(null);
		throw redirect(300, '/');
	}

	// get the most recent activities
	// const curr = new Date();
	// const startOfWeek =
	// const endOfWeek = new Date().setDate(curr.getDate() - (((curr.getDay() + 6) % 7) - 6));
	// We have to divide by 1000 because Strava expects seconds, not milliseconds
	const activities = await getActivities(
		fetch,
		Math.floor(get(endOfWeek).getTime() / 1000),
		Math.floor(get(startOfWeek).getTime() / 1000),
	);
	return {
		props: {
			activities: activities,
			fetch: fetch
		}
	};
}) satisfies PageLoad;
