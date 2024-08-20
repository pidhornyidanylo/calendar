import mongoose, { Schema } from "mongoose";
import type {
  MainTaskType,
  TaskItemType,
  TimeType,
  UserType,
} from "./models.types";

const timeSchema = new Schema<TimeType>(
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

const taskItemSchema = new Schema<TaskItemType>(
  {
    time: timeSchema,
    info: { type: String, required: true },
    addInfo: { type: String, required: true },
    recurring: {
      type: Boolean,
      default: false,
    },
    recurrenceEndDate: {
      type: {
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        day: { type: Number, required: true },
      },
      required: function (this: TaskItemType) {
        return this.recurring === true;
      },
    },
    recurrenceFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: function (this: TaskItemType) {
        return this.recurring === true;
      },
    },
  },
  { _id: true }
);

const mainTaskSchema = new Schema<MainTaskType>({
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

const userSchema = new Schema<UserType>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  theme: {
    type: String,
    required: true,
  },
  tasks: {
    type: [mainTaskSchema],
    required: true,
  },
});

export const UserModel =
  mongoose.models?.User || mongoose.model<UserType>("User", userSchema);
