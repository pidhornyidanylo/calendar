import { TaskType } from "@/components/SideBarComponents/createForm/form/Form.types";
import { connectToDb } from "./db";
import { TaskModel } from "./models";

export const addTask = async (data: TaskType) => {
  try {
    await connectToDb();
    const newTask = new TaskModel({ data });
    await newTask.save();
    console.log("Saved to DB");
  } catch (error) {
    throw new Error("Error connecting to DB");
  }
};
