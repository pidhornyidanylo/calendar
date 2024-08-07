"use server";
import { connectToDb } from "./db";
import { TaskModel } from "./models";

export const getTasks = async () => {
  try {
    await connectToDb();
    const tasksFromDB = await TaskModel.find();
    return tasksFromDB;
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};
