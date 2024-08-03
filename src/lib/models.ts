import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: false,
    min: 3,
    max: 50,
  },
  addInfo: {
    type: String,
    required: true,
    unique: false,
    min: 3,
    max: 150,
  },
  date: {
    type: dateSchema,
    required: true,
  },
  timeFrom: {
    type: String,
    required: false,
  },
  timeTo: {
    type: String,
    required: false,
  },
});

export const Task = mongoose.models?.Task || mongoose.model("Task", taskSchema);
