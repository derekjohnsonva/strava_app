import type { PageLoad } from './$types';
import type { ActivitySummary, Activity } from '../../types';
import { token, strava_client_id, strava_client_secret } from '../../store';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

async function getToken(code: string, fetch) {
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

async function getRefreshToken(refreshToken: string, fetch) {
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

async function getActivities(fetch, page = 1, per_page = 60, before = 0, after = 0) {
	let query = `https://www.strava.com/api/v3/activities?page=${page}&per_page=${per_page}`;
	if (before) {
		query = query + `&before=${before}`;
	}
	if (after) {
		query = query + `&after=${after}`;
	}
	console.log('query', query);
	const response = await fetch(query, {
		headers: {
			Authorization: 'Bearer ' + get(token)?.access_token
		}
	});
	const activitySummaries: ActivitySummary[] = await response.json();
	// for each of the activities, get the detailed information
	const activities = await Promise.all(
		activitySummaries.map(async (activitySummary) => {
			const response = await fetch(
				`https://www.strava.com/api/v3/activities/${activitySummary.id}`,
				{
					headers: {
						Authorization: 'Bearer ' + get(token)?.access_token
					}
				}
			);
			const activity: Activity = await response.json();
			return activity;
		})
	);
	return activities;
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
			const new_token = await getRefreshToken(get(token)?.refresh_token, fetch);
			token.set(new_token);
		}
	}
	if (!get(token)?.expires_at) {
		token.set(null);
		throw redirect(300, '/');
	}

	// get the most recent activities
	const curr = new Date();
	const startOfWeek = new Date().setDate(curr.getDate() - ((curr.getDay() + 6) % 7));
	const endOfWeek = new Date().setDate(curr.getDate() - (((curr.getDay() + 6) % 7) - 6));
	// We have to divide by 1000 because Strava expects seconds, not milliseconds
	const activities = await getActivities(
		fetch,
		1,
		60,
		Math.floor(endOfWeek / 1000),
		Math.floor(startOfWeek / 1000)
	);
	console.log('numberOfActivities', activities.length);
	return {
		props: {
			activities: activities
		}
	};
}) satisfies PageLoad;
