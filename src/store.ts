import { writable, readable } from 'svelte/store';
import { browser } from "$app/environment"

export const token = writable(browser && localStorage.getItem("token"));

token.subscribe(val => {
  if (browser) return (localStorage.setItem("token", val))
})
export const authenticated = writable(false);

export const strava_client_id = readable(99379);
export const strava_client_secret = readable("d0234d7acd6201da562cc3727730c1cbfb0d903a")

