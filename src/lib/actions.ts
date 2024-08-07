"use server";
import { connectToDb } from "./db";
import { TaskModel } from "./models";

export const addTask = async (data: any) => {
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
