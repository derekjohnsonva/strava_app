import { writable, readable } from 'svelte/store';
import { persistBrowserSession } from '@macfja/svelte-persistent-store';
import type { PersistentStore } from '@macfja/svelte-persistent-store';
import type { StravaToken } from './types';

export const token: PersistentStore<null | StravaToken> = persistBrowserSession(writable(null), 'token');
const curr = new Date();
export const startOfWeek = writable(new Date().setDate(curr.getDate() - ((curr.getDay() + 6) % 7)))
export const endOfWeek = writable(new Date().setDate(curr.getDate() - (((curr.getDay() + 6) % 7) - 6)));
export const strava_client_id = readable(99379);
export const strava_client_secret = readable('d0234d7acd6201da562cc3727730c1cbfb0d903a');
