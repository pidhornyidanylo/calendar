"use server";
import { connectToDb } from "./db";
import { TaskModel } from "./models";
import type { TaskItemType } from "@/components/HomeComponents/taskItem/TaskItem.dto";
import type { SubTaskItemType } from "@/components/HomeComponents/subTaskItem/SubTaskItem.dto";
import { revalidatePath } from "next/cache";
import { FormStateType } from "@/components/HomeComponents/subTaskItem/editForm/EditForm";

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
      const sameParametersTask = taskAlreadyExistsInDB.tasks.find(
        (subTask: SubTaskItemType) =>
          subTask.time.timeFrom === data.task.time.timeFrom &&
          subTask.time.timeTo === data.task.time.timeTo &&
          subTask.info === data.task.info
      );
      if (sameParametersTask) {
        return { success: false, message: "Task already exists." };
      }
      taskAlreadyExistsInDB.tasks.push({
        time: {
          timeFrom: data.task.time.timeFrom,
          timeTo: data.task.time.timeTo,
        },
        info: data.task.info,
        addInfo: data.task.addInfo,
      });
      await taskAlreadyExistsInDB.save();
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
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Error connecting to DB" };
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
      return { success: true };
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    return { success: false, message: "Error deleting task from DB." };
  }
};

export const updateTask = async (
  formState: FormStateType,
  taskID: string,
  subTaskID: string
) => {
  try {
    await connectToDb();

    const task = await TaskModel.findById(taskID);
    if (!task) {
      return { success: false, message: "Task not found" };
    }

    const subTask = task.tasks.find(
      (subTask: SubTaskItemType) => subTask._id.toString() === subTaskID
    );

    if (!subTask) {
      return { success: false, message: "Subtask not found" };
    }
    subTask.time = {
      timeFrom: formState.timeFrom,
      timeTo: formState.timeTo,
    };
    subTask.info = formState.taskInfo;
    subTask.addInfo = formState.addInfo;

    await task.save();
    revalidatePath("/");
    return { success: true, message: "Task updated successfully" };
  } catch (error) {
    console.error("Error updating task from DB:", error);
    return { success: false, message: "Error updating task from DB" };
  }
};
