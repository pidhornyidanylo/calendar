import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
  {
    timeFrom: {
      type: String,
      required: true,
    },
    timeTo: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const taskItemSchema = new mongoose.Schema(
  {
    time: timeSchema,
    info: { type: String, required: true },
    addInfo: { type: String, required: true },
  },
  { _id: true }
);

const mainTaskSchema = new mongoose.Schema({
  date: {
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
  },
  tasks: [taskItemSchema],
  dateIdentifier: {
    type: String,
    required: true,
  },
});

export const SubTaskModel =
  mongoose.models?.SubTask || mongoose.model("SubTask", taskItemSchema);

export const TaskModel =
  mongoose.models?.Task || mongoose.model("Task", mainTaskSchema);
