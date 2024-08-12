import type { FormStateType } from "@/components/HomeComponents/subTaskItem/editForm/EditForm.types";

export type addTaskActionPayloadType = {
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
  };
  dateIdentifier: string;
};

export type deleteTaskActionPayloadType = {
  subTaskID: string;
  taskID: string;
};

export type updateTaskActionPayloadType = {
  formState: FormStateType;
  taskID: string;
  subTaskID: string;
};
