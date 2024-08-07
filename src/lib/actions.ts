"use server";
import { connectToDb } from "./db";
import { SubTaskModel, TaskModel } from "./models";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.dto";
import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.dto";

type AddTaskPayloadType = Omit<
  Omit<Omit<TaskItemType, "_id">, "__v">,
  "tasks"
> & {
  task: SubTaskItemType;
};

export const addTask = async (data: AddTaskPayloadType) => {
  try {
    await connectToDb();
    const dateAlreadyExistsInDB = await TaskModel.findOne({
      dateIdentifier: data.dateIdentifier,
    });

    if (dateAlreadyExistsInDB) {
      dateAlreadyExistsInDB.tasks.push({
        time: {
          timeFrom: data.task.time.timeFrom,
          timeTo: data.task.time.timeTo,
        },
        info: data.task.info,
        addInfo: data.task.addInfo,
      });
      await dateAlreadyExistsInDB.save();
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
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw new Error("Error connecting to DB");
  }
};

export const deleteTask = async (subTaskID: string) => {
  try {
    await connectToDb();
    await SubTaskModel.findByIdAndDelete(subTaskID);
    console.log("Successfully deleted from DB");
  } catch (error) {
    throw new Error("Error deleting task from DB");
  }
};
