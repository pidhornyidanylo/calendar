"use server";
import { connectToDb } from "./db";
import { SubTaskModel, TaskModel } from "./models";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.dto";
import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.dto";
import { revalidatePath } from "next/cache";

type AddTaskPayloadType = Omit<
  Omit<Omit<TaskItemType, "_id">, "__v">,
  "tasks"
> & {
  task: Omit<SubTaskItemType, "_id">;
};

export const addTask = async (data: AddTaskPayloadType) => {
  try {
    await connectToDb();
    const taskAlreadyExistsInDB = await TaskModel.findOne({
      dateIdentifier: data.dateIdentifier,
    });

    if (taskAlreadyExistsInDB) {
      taskAlreadyExistsInDB.tasks.push({
        time: {
          timeFrom: data.task.time.timeFrom,
          timeTo: data.task.time.timeTo,
        },
        info: data.task.info,
        addInfo: data.task.addInfo,
      });
      await taskAlreadyExistsInDB.save();
      console.log("Updated existing date with new task");
    } else {
      const newTask = new TaskModel({
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
      await newTask.save();
      console.log("Saved new date with task to DB");
    }
    revalidatePath("/");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw new Error("Error connecting to DB");
  }
};

export const deleteTask = async (subTaskID: string, taskID: string) => {
  try {
    await connectToDb();
    const task = await TaskModel.findById(taskID);
    if (task) {
      task.tasks = task.tasks.filter(
        (subTask: SubTaskItemType) => subTask._id.toString() !== subTaskID
      );
      if (task.tasks.length === 0) {
        await TaskModel.findByIdAndDelete(taskID);
      } else {
        await task.save();
      }
      revalidatePath("/");
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    console.error("Error deleting task from DB:", error);
    throw new Error("Error deleting task from DB");
  }
};
