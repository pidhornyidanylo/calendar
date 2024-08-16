"use server";
import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.types";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.types";
import { revalidatePath } from "next/cache";
import type {
	AddTaskActionPayloadType,
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
		const taskAlreadyExistsInDB = dbUser.tasks.find(
			(task: TaskItemType) => task.dateIdentifier === data.dateIdentifier,
		);

		if (taskAlreadyExistsInDB) {
			const sameParametersTask = taskAlreadyExistsInDB.tasks.find(
				(subTask: SubTaskItemType) =>
					subTask.time.timeFrom === data.task.time.timeFrom &&
					subTask.time.timeTo === data.task.time.timeTo &&
					subTask.info === data.task.info,
			);

			if (sameParametersTask) {
				return {
					success: false,
					message: "Task with these parameters already exists.",
				};
			}
			taskAlreadyExistsInDB.tasks.push({
				time: {
					timeFrom: data.task.time.timeFrom,
					timeTo: data.task.time.timeTo,
				},
				info: data.task.info,
				addInfo: data.task.addInfo,
			});
		} else {
			dbUser.tasks.push({
				date: {
					year: data.date.year,
					month: data.date.month,
					day: data.date.day,
				},
				tasks: [
					{
						time: {
							timeFrom: data.task.time.timeFrom,
							timeTo: data.task.time.timeTo,
						},
						info: data.task.info,
						addInfo: data.task.addInfo,
					},
				],
				dateIdentifier: data.dateIdentifier,
			});
		}

		await dbUser.save();
		revalidatePath("/");
		return { success: true };
	} catch (error) {
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
			return { success: false, message: "Task not found." };
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
