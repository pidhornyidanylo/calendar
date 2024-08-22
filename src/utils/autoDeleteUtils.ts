import type { MainTaskType } from "@/lib/models.types";

export const autoDeleteHandler = (
	tasks: MainTaskType[],
	autoDelete: "daily" | "weekly" | "monthly" | "yearly",
) => {
	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	return tasks.filter((task: MainTaskType) => {
		switch (autoDelete) {
			case "daily":
				return task.date.day >= currentDay && task.date.month <= currentMonth;

			case "weekly":
				return currentDay - task.date.day <= 7;

			case "monthly":
				return task.date.month >= currentMonth && task.date.year <= currentYear;

			case "yearly":
				return task.date.year >= currentYear;

			default:
				return false;
		}
	});
};
