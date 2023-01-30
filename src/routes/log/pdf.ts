import { jsPDF } from 'jspdf';
import { metersPerSecToMinPerMile, metersToMiles } from './utils';
import type { CellConfig } from 'jspdf';
import type { Activity } from 'src/types';

interface Header {
	id: string;
	name: string;
	prompt: string;
	width: number;
	align: string;
	padding: number;
}

interface ActivityRow {
	name: string;
	distance: string;
	average_speed: string;
	description: string;
}

const daysOfTheWeekStartMonday = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

const createHeaders = (keys: string[]) => {
	const result = [];
	for (let i = 0; i < keys.length; i += 1) {
		result.push({
			id: keys[i],
			name: keys[i],
			prompt: keys[i],
			width: '65',
			align: 'left',
			padding: '0'
		});
	}
	return result;
};

const headers = ['day', 'name', 'distance', 'pace', 'description'];

const createRows = (activities: Map<string, Activity[]>) => {
	const result = [];
	daysOfTheWeekStartMonday.forEach((day) => {
		const dayActivities = activities.get(day);
		if (dayActivities) {
			dayActivities.forEach((activity) => {
				result.push({
					day,
					name: activity.name,
					distance: metersToMiles(activity.distance),
					pace: metersPerSecToMinPerMile(activity.average_speed),
					description: activity.description
				});
			});
		}
	});
	return result;
};

export const generatePDF = (activities: Map<string, Activity[]>) => {
	const doc = new jsPDF();
	doc.table(10, 10, createRows(activities), headers, { autoSize: false });
	doc.save('example.pdf');
};
