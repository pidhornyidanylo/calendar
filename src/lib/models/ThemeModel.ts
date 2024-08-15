import mongoose, { Document } from "mongoose";

type ThemeDocument = Document & {
  theme: "light" | "dark";
};

const themeSchema = new mongoose.Schema({
  theme: { type: String, required: true },
});

export const ThemeModel =
  mongoose.models.Theme || mongoose.model<ThemeDocument>("Theme", themeSchema);
