"use server";
import { connectToDb } from "./db";
import { TaskModel } from "./models/TaskModel";
import { UserModel } from "./models/UserModel";

export const getTasks = async () => {
  try {
    await connectToDb();
    const tasksFromDB = await TaskModel.find();
    return tasksFromDB;
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};

export const getTheme = async (id: string) => {
  try {
    await connectToDb();
    const userTheme = await UserModel.findById(id);
    return userTheme.theme;
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};
