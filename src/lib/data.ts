"use server";
import { autoDeleteHandler } from "@/utils/autoDeleteUtils";
import { connectToDb } from "./db";
import { UserModel } from "./models";

export const getTasks = async (token: string) => {
	try {
		await connectToDb();
		const dbUSer = await UserModel.findOne({ token: token });
		if (dbUSer) {
			const upToDateTasks = autoDeleteHandler(dbUSer.tasks, dbUSer.autoDelete);
			dbUSer.tasks = upToDateTasks;
			await dbUSer.save();
			return { success: true, tasks: dbUSer.tasks };
		}
		return { success: false, tasks: [] };
	} catch (error) {
		throw new Error("Error fetching tasks!");
	}
};

export const getTheme = async (token: string) => {
	try {
		await connectToDb();
		const dbUSer = await UserModel.findOne({ token: token });
		if (dbUSer) {
			return { success: true, theme: dbUSer.theme };
		}
		const newDbUser = new UserModel({
			token: token,
			autoDelete: "monthly",
			theme: "light",
			tasks: [],
		});
		await newDbUser.save();
		return { success: true, theme: "light" };
	} catch (error) {
		return { success: false, message: "Error fetching theme!" };
	}
};

export const getAutoDelete = async (token: string) => {
	try {
		await connectToDb();
		const dbUser = await UserModel.findOne({ token: token });
		if (!dbUser) {
			return { success: false, message: "Error fetching data." };
		}
		return {
			success: true,
			message: "Successfully fetched data.",
			autoDelete: dbUser.autoDelete,
		};
	} catch (error) {
		return { success: false, message: "Error connecting to DB." };
	}
};
