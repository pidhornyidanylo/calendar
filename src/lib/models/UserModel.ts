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

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

export const UserModel =
  mongoose.models?.User || mongoose.model("User", userSchema);
