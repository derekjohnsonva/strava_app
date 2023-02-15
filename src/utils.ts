interface WeekRange {
	start: Date;
	end: Date;
}

export const getWeekRange = (date: Date): WeekRange => {
	const start = new Date(date);
	const end = new Date(date);
	start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
	start.setHours(0, 0, 0, 0);
	end.setDate(end.getDate() - (((end.getDay() + 6) % 7) - 6));
	end.setHours(23, 59, 59, 999);
	return { start, end };
};
