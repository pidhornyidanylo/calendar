import mongoose from "mongoose";

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
