import mongoose from "mongoose";

const taskItemSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    task: { type: String, required: true },
    addInfo: { type: String, required: true },
  },
  { _id: false }
);

const mainTaskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: {
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
  },
  tasks: [taskItemSchema],
});

export const TaskModel =  mongoose.models?.Task || mongoose.model("Task", mainTaskSchema);
