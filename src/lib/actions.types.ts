import type { FormStateType } from "@/components/HomeComponents/subTaskItem/editForm/EditForm.types";

export type AddTaskActionPayloadType = {
  date: {
    day: number;
    month: number;
    year: number;
  };
  task: {
    time: {
      timeFrom: string;
      timeTo: string;
    };
    info: string;
    addInfo: string;
    recurring: boolean;
    recurrenceEndDate: {
      day: number;
      month: number;
      year: number;
    } | null;
    recurrenceFrequency: string | null;
  };
  dateIdentifier: string;
  token: string;
};

export type DeleteTaskActionPayloadType = {
  subTaskID?: string;
  taskID: string;
  token: string;
};

export type UpdateTaskActionPayloadType = {
  formState: FormStateType;
  taskID: string;
  subTaskID: string;
  token: string;
};

export type UpdateThemeActionPayloadType = {
  theme: "dark" | "light";
  token: string;
};

export type AutoDeleteActionPayloadType = {
  token: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
};
