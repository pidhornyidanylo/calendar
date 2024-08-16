const convertToAmPm = (time: string): string => {
	const [hours, minutes] = time.split(":").map(Number);
	const period = hours >= 12 ? "PM" : "AM";
	const adjustedHours = hours % 12 || 12;
	return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const convertTimeRange = (timeRange: string): string => {
	const [startTime, endTime] = timeRange.split(" - ");
	const startAmPm = convertToAmPm(startTime);
	const endAmPm = convertToAmPm(endTime);
	return `${startAmPm} - ${endAmPm}`;
};
