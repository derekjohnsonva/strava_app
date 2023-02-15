export interface APIError {
	message: string;
	errors: Error[];
}
interface Error {
	code: string;
	field: string;
	resource: string;
}
export interface StravaToken {
	token_type: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
	access_token: string;
	athlete: Athlete;
}

export interface Athlete {
	id: number;
	username: null;
	resource_state: number;
	firstname: string;
	lastname: string;
	bio: string;
	city: string;
	state: string;
	country: null;
	sex: string;
	premium: boolean;
	summit: boolean;
	created_at: Date;
	updated_at: Date;
	badge_type_id: number;
	weight: number;
	profile_medium: string;
	profile: string;
	friend: null;
	follower: null;
}

export interface ActivitySummary {
	resource_state: number;
	athlete: AthleteSummary;
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string;
	sport_type: string;
	workout_type: number;
	id: number;
	start_date: Date;
	start_date_local: Date;
	timezone: string;
	utc_offset: number;
	location_city: null;
	location_state: null;
	location_country: null;
	achievement_count: number;
	kudos_count: number;
	comment_count: number;
	athlete_count: number;
	photo_count: number;
	map: Map;
	trainer: boolean;
	commute: boolean;
	manual: boolean;
	private: boolean;
	visibility: string;
	flagged: boolean;
	gear_id: null;
	start_latlng: any[];
	end_latlng: any[];
	average_speed: number;
	max_speed: number;
	has_heartrate: boolean;
	heartrate_opt_out: boolean;
	display_hide_heartrate_option: boolean;
	upload_id: null;
	external_id: null;
	from_accepted_tag: boolean;
	pr_count: number;
	total_photo_count: number;
	has_kudoed: boolean;
}

export interface AthleteSummary {
	id: number;
	resource_state: number;
}

export interface Map {
	id: string;
	summary_polyline: string;
	resource_state: number;
}

export interface Activity {
	id: number;
	resource_state: number;
	external_id: string;
	upload_id: number;
	athlete: Athlete;
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string;
	sport_type: string;
	start_date: Date;
	start_date_local: Date;
	timezone: string;
	utc_offset: number;
	start_latlng: number[];
	end_latlng: number[];
	achievement_count: number;
	kudos_count: number;
	comment_count: number;
	athlete_count: number;
	photo_count: number;
	map: Map;
	trainer: boolean;
	commute: boolean;
	manual: boolean;
	private: boolean;
	flagged: boolean;
	gear_id: string;
	from_accepted_tag: boolean;
	average_speed: number;
	max_speed: number;
	average_cadence: number;
	average_temp: number;
	average_watts: number;
	weighted_average_watts: number;
	kilojoules: number;
	device_watts: boolean;
	has_heartrate: boolean;
	max_watts: number;
	elev_high: number;
	elev_low: number;
	pr_count: number;
	total_photo_count: number;
	has_kudoed: boolean;
	workout_type: number;
	suffer_score: null;
	description: string;
	calories: number;
	segment_efforts: Lap[];
	splits_metric: SplitsMetric[];
	laps: Lap[];
	gear: Gear;
	partner_brand_tag: null;
	photos: Photos;
	highlighted_kudosers: HighlightedKudoser[];
	hide_from_home: boolean;
	device_name: string;
	embed_token: string;
	segment_leaderboard_opt_out: boolean;
	leaderboard_opt_out: boolean;
}

export interface Athlete {
	id: number;
	resource_state: number;
}

export interface Gear {
	id: string;
	primary: boolean;
	name: string;
	resource_state: number;
	distance: number;
}

export interface HighlightedKudoser {
	destination_url: string;
	display_name: string;
	avatar_url: string;
	show_name: boolean;
}

export interface Lap {
	id: number;
	resource_state: number;
	name: string;
	activity: Athlete;
	athlete: Athlete;
	elapsed_time: number;
	moving_time: number;
	start_date: Date;
	start_date_local: Date;
	distance: number;
	start_index: number;
	end_index: number;
	total_elevation_gain?: number;
	average_speed?: number;
	max_speed?: number;
	average_cadence: number;
	device_watts: boolean;
	average_watts: number;
	lap_index?: number;
	split?: number;
	segment?: Segment;
	kom_rank?: null;
	pr_rank?: null;
	achievements?: any[];
	hidden?: boolean;
}

export interface Segment {
	id: number;
	resource_state: number;
	name: string;
	activity_type: string;
	distance: number;
	average_grade: number;
	maximum_grade: number;
	elevation_high: number;
	elevation_low: number;
	start_latlng: number[];
	end_latlng: number[];
	climb_category: number;
	city: string;
	state: string;
	country: string;
	private: boolean;
	hazardous: boolean;
	starred: boolean;
}

export interface Map {
	id: string;
	polyline: string;
	resource_state: number;
	summary_polyline: string;
}

export interface Photos {
	primary: Primary;
	use_primary_photo: boolean;
	count: number;
}

export interface Primary {
	id: null;
	unique_id: string;
	urls: { [key: string]: string };
	source: number;
}

export interface SplitsMetric {
	distance: number;
	elapsed_time: number;
	elevation_difference: number;
	moving_time: number;
	split: number;
	average_speed: number;
	pace_zone: number;
}
