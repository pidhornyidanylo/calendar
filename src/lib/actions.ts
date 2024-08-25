"use server";
import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.types";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.types";
import { addDays, addMonths, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";
import type {
	AddTaskActionPayloadType,
	AutoDeleteActionPayloadType,
	DeleteTaskActionPayloadType,
	UpdateTaskActionPayloadType,
	UpdateThemeActionPayloadType,
} from "./actions.types";
import { connectToDb } from "./db";
import { UserModel } from "./models";

export const addTask = async (data: AddTaskActionPayloadType) => {
	try {
		await connectToDb();

		const dbUser = await UserModel.findOne({ token: data.token });
		if (!dbUser) {
			return { success: false, message: "User not found." };
		}

		const isRecurringTask = data.task.recurring;
		const { day, month, year } = data.date;
		const startDate = startOfDay(new Date(year, month - 1, day));
		const endDate = data.task.recurrenceEndDate
			? new Date(
					data.task.recurrenceEndDate.year,
					data.task.recurrenceEndDate.month - 1,
					data.task.recurrenceEndDate.day,
				)
			: null;

		const generateRecurringDates = (
			startDate: Date,
			endDate: Date | null,
			frequency: string | null,
		): Date[] => {
			const dates: Date[] = [];
			let currentDate = startDate;

			while (!endDate || currentDate <= endDate) {
				dates.push(new Date(currentDate));

				switch (frequency) {
					case "daily":
						currentDate = addDays(currentDate, 1);
						break;
					case "weekly":
						currentDate = addDays(currentDate, 7);
						break;
					case "monthly":
						currentDate = addMonths(currentDate, 1);
						break;
					default:
						throw new Error(`Unsupported frequency: ${frequency}`);
				}
			}

			return dates;
		};

		const recurringDates = isRecurringTask
			? generateRecurringDates(
					startDate,
					endDate,
					data.task.recurrenceFrequency,
				)
			: [startDate];

		for (const date of recurringDates) {
			const dateIdentifier = `${date.getDate()}${
				date.getMonth() + 1
			}${date.getFullYear()}`;
			const taskAlreadyExistsInDB = dbUser.tasks.find(
				(task: TaskItemType) => task.dateIdentifier === dateIdentifier,
			);

			if (taskAlreadyExistsInDB) {
				const sameParametersTask = taskAlreadyExistsInDB.tasks.find(
					(subTask: SubTaskItemType) =>
						subTask.time.timeFrom === data.task.time.timeFrom &&
						subTask.time.timeTo === data.task.time.timeTo &&
						subTask.info === data.task.info &&
						subTask.recurring === data.task.recurring,
				);

				if (sameParametersTask) {
					sameParametersTask.time = {
						timeFrom: data.task.time.timeFrom,
						timeTo: data.task.time.timeTo,
					};
					sameParametersTask.info = data.task.info;
					sameParametersTask.addInfo = data.task.addInfo;
					sameParametersTask.recurring = data.task.recurring;
					sameParametersTask.recurrenceEndDate = data.task.recurrenceEndDate;
					sameParametersTask.recurrenceFrequency =
						data.task.recurrenceFrequency;
				} else {
					taskAlreadyExistsInDB.tasks.push({
						time: {
							timeFrom: data.task.time.timeFrom,
							timeTo: data.task.time.timeTo,
						},
						info: data.task.info,
						addInfo: data.task.addInfo,
						recurring: data.task.recurring,
						recurrenceEndDate: data.task.recurrenceEndDate,
						recurrenceFrequency: data.task.recurrenceFrequency,
					});
				}
			} else {
				dbUser.tasks.push({
					date: {
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						day: date.getDate(),
					},
					tasks: [
						{
							time: {
								timeFrom: data.task.time.timeFrom,
								timeTo: data.task.time.timeTo,
							},
							info: data.task.info,
							addInfo: data.task.addInfo,
							recurring: data.task.recurring,
							recurrenceEndDate: data.task.recurrenceEndDate,
							recurrenceFrequency: data.task.recurrenceFrequency,
						},
					],
					dateIdentifier: dateIdentifier,
				});
			}
		}

		await dbUser.save();
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.error("Error adding task:", error);
		return {
			success: false,
			message: "Error adding task!",
		};
	}
};

export const deleteTask = async (data: DeleteTaskActionPayloadType) => {
	try {
		await connectToDb();
		const dbUser = await UserModel.findOne({ token: data.token });

		if (!dbUser) {
			return { success: false, message: "User not found." };
		}
		const task = dbUser.tasks.id(data.taskID);

		if (!task) {
			return { success: false, message: "Task not found" };
		}

		task.tasks = task.tasks.filter(
			(subTask: SubTaskItemType) => subTask._id.toString() !== data.subTaskID,
		);

		if (task.tasks.length === 0) {
			dbUser.tasks.pull({ _id: data.taskID });
		}

		await dbUser.save();
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: "Error deleting task!",
		};
	}
};

export const updateTask = async (data: UpdateTaskActionPayloadType) => {
	try {
		await connectToDb();

		const dbUser = await UserModel.findOne({ token: data.token });
		if (!dbUser) {
			return { success: false, message: "User not found." };
		}

		const mainTask = dbUser.tasks.find((taskItem: TaskItemType) =>
			taskItem.tasks.some(
				(subTask: SubTaskItemType) => subTask._id.toString() === data.subTaskID,
			),
		);

		if (!mainTask) {
			return { success: false, message: "Task not found." };
		}

		const subTask = mainTask.tasks.find(
			(subTask: SubTaskItemType) => subTask._id.toString() === data.subTaskID,
		);

		if (!subTask) {
			return { success: false, message: "Subtask not found." };
		}

		subTask.time = {
			timeFrom: data.formState.timeFrom,
			timeTo: data.formState.timeTo,
		};
		subTask.info = data.formState.taskInfo;
		subTask.addInfo = data.formState.addInfo;

		await dbUser.save();

		revalidatePath("/");

		return { success: true, message: "Task updated successfully." };
	} catch (error) {
		return { success: false, message: "Error updating task!" };
	}
};

export const updateTheme = async (data: UpdateThemeActionPayloadType) => {
	try {
		await connectToDb();
		const userThemeFromDB = await UserModel.findOne({ token: data.token });
		userThemeFromDB.theme = data.theme;
		await userThemeFromDB.save();
		revalidatePath("/");
		revalidatePath("/login");
		revalidatePath("/register");
		revalidatePath("/settings");
		revalidatePath("/apps");
		revalidatePath("/user");
		revalidatePath("/help");
		return { success: true, message: "Theme changed!", theme: data.theme };
	} catch (error) {
		return { success: false, message: "Error changing theme!" };
	}
};

export const updateAutoDelete = async (data: AutoDeleteActionPayloadType) => {
	try {
		await connectToDb();
		const dbUser = await UserModel.findOne({ token: data.token });
		if (!dbUser) {
			return { success: false, message: "User not found." };
		}
		dbUser.autoDelete = data.frequency;
		await dbUser.save();

		revalidatePath("/");

		return {
			success: true,
			message: "Frequency updated successfully!",
		};
	} catch (error) {
		return { success: false, message: "Error setting auto delete frequency." };
	}
};
