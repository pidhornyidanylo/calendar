import type { Document } from "mongoose";

export type TimeType = {
  timeFrom: string;
  timeTo: string;
};

export type TaskItemType = Document & {
  time: TimeType;
  info: string;
  addInfo: string;
  recurring: boolean;
  recurrenceEndDate?: {
    year: number;
    month: number;
    day: number;
  };
  recurrenceFrequency?: "daily" | "weekly" | "monthly";
};

export type MainTaskType = Document & {
  date: {
    year: number;
    month: number;
    day: number;
  };
  tasks: TaskItemType[];
  dateIdentifier: string;
};

export type UserType = Document & {
  token: string;
  autoDelete: string;
  theme: string;
  tasks: MainTaskType[];
};
