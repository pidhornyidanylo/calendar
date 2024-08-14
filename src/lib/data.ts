"use server";
import { connectToDb } from "./db";
import { TaskModel, ThemeModel } from "./models";

export const getTasks = async () => {
  try {
    await connectToDb();
    const tasksFromDB = await TaskModel.find();
    return tasksFromDB;
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};

export const getTheme = async () => {
  try {
    await connectToDb();
    const theme = await ThemeModel.findOne();
    return theme.theme;
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};
