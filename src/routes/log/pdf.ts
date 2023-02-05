import { jsPDF } from 'jspdf';
import { startOfWeek, endOfWeek } from '../../store';
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

export const generatePDF = (activities: Map<string, Activity[]>, total_miles: string, overview_text: string) => {
	console.log('generating PDF');
	const doc = new jsPDF();
	// Make the title
	const startDate = new Date(get(startOfWeek));
	const endDate = new Date(get(endOfWeek));
	const dateRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
	doc.setFontSize(20);
	doc.text(`Weekly Log`, 14, 22);
	doc.setFontSize(12);
	doc.text(dateRange, 14, 30);
	autoTable(doc, {
		columns: getHeaders(),
		body: createRows(activities),
		startY: 40,
	});

	// Add total distance
	doc.text(`Total Distance: ${total_miles} miles`, 14, doc.autoTable.previous.finalY + 10);
	const split_overview_text = doc.splitTextToSize(overview_text, 180);
	doc.setFontSize(10);
	doc.text(split_overview_text, 14, doc.autoTable.previous.finalY + 20);
	doc.save(`Weekly Log: ${dateRange}.pdf`);
};
