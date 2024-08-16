"use server";
import { connectToDb } from "./db";
import { UserModel } from "./models";

export const getTasks = async (token: string) => {
	try {
		await connectToDb();
		const dbUSer = await UserModel.findOne({ token: token });
		return dbUSer.tasks;
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
			theme: "light",
			tasks: [],
		});
		await newDbUser.save();
		return { success: true, theme: "light" };
	} catch (error) {
		return { success: false, message: "Error fetching theme!" };
	}
};
