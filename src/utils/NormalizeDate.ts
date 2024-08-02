export const normalizeDate = (day: number, month: number, year: number) => {
	const padZero = (num: number): string => num.toString().padStart(2, "0");
	const parseDate = (dateString: string): Date => {
		const [day, month, year] = dateString.split("/");
		return new Date(
			`${year}-${padZero(Number(month))}-${padZero(Number(day))}`,
		);
	};
	const shortDayName = (date: Date, locale: string): string =>
		date.toLocaleDateString(locale, { weekday: "short" });
	const taskDate = parseDate(`${day}/${month}/${year}`);
	const taskDayName = shortDayName(taskDate, "en-US");
	return taskDayName;
};
