import { get } from 'svelte/store';
import { token } from '../../store';
import { redirect } from '@sveltejs/kit';

import type { Activity, ActivitySummary, APIError } from '../../types';

export const metersToMiles = (meters: number) => {
	return (meters * 0.000621371).toFixed(2);
};

export const metersPerSecToMinPerMile = (metersPerSec: number) => {
	const fractionalMinutes = 1 / (metersPerSec * 0.0372822715);
	// convert fractional minutes to minutes and seconds
	const minutes = Math.floor(fractionalMinutes);
	const seconds = Math.floor((fractionalMinutes - minutes) * 60).toFixed(0);
	// add leading zero if seconds is less than 10 using padStart
	return `${minutes}:${seconds.padStart(2, '0')}`;
};
// make a type that can be applied to the fetch function
export type Fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
export async function getActivities(
	fetch: Fetch,
	before = 0,
	after = 0,
	page = 1,
	per_page = 60
): Promise<Activity[]> {
	console.log('Getting activities');
	let query = `https://www.strava.com/api/v3/activities?page=${page}&per_page=${per_page}`;
	if (before) {
		query = query + `&before=${before}`;
	}
	if (after) {
		query = query + `&after=${after}`;
	}
	const response = await fetch(query, {
		headers: {
			Authorization: 'Bearer ' + get(token)?.access_token
		}
	});
	const activitySummaries: ActivitySummary[] | APIError = await response.json();
	// if this is an APIError, then log and return to login page
	if ('message' in activitySummaries) {
		console.log('Error getting activities: ', activitySummaries);
		throw redirect(300, '/');
	}

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
