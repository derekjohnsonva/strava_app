import { jsPDF } from 'jspdf';
import { token, startOfWeek, endOfWeek } from '../../store';
import { get } from 'svelte/store';
import autoTable, { type ColumnInput, type RowInput } from 'jspdf-autotable'
import { metersPerSecToMinPerMile, metersToMiles } from './utils';
import type { Activity } from 'src/types';

// TODO: Refactor this out
const daysOfTheWeekStartMonday = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

const getHeaders = (): ColumnInput[] => {
	return [
		{title: "Day", dataKey: "day"},
		{title: "Name", dataKey: "name"},
		{title: "Distance", dataKey: "distance"},
		{title: "Pace", dataKey: "pace"},
		{title: "Description", dataKey: "description"},
	]
};

const createRows = (activities: Map<string, Activity[]>): RowInput[] => {
	const result: RowInput[] = [];
	daysOfTheWeekStartMonday.forEach((day) => {
		const dayActivities = activities.get(day);
		if (dayActivities) {
			dayActivities.forEach((activity) => {
				result.push({
					"day": day,
					"name": activity.name,
					"distance": metersToMiles(activity.distance),
					"pace": metersPerSecToMinPerMile(activity.average_speed),
					"description": activity.description
				});
			});
		}
	});
	return result;
};

export const generatePDF = (activities: Map<string, Activity[]>) => {
	console.log('generating PDF');
	const doc = new jsPDF();
	// Make the title
	const startDate = new Date(get(startOfWeek));
	const endDate = new Date(get(endOfWeek));
	const dateRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
	const athlete_name = get(token)?.athlete?.firstname;
	doc.setFontSize(20);
	doc.text(`${athlete_name}'s Weekly Log`, 14, 22);
	doc.setFontSize(12);
	doc.text(dateRange, 14, 30);
	autoTable(doc, {
		columns: getHeaders(),
		body: createRows(activities),
		startY: 40,
	});
	doc.save('example.pdf');
};
