import { SubTaskItemType } from "../SubTaskItem.types";

export type EditFormProps = {
  subTask: SubTaskItemType;
  taskID: string;
  handleCloseModal: () => void;
};

export type FormStateType = {
  timeFrom: string;
  timeTo: string;
  taskInfo: string;
  allDay: boolean;
  addInfo: string;
};
