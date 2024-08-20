type SubTaskItemTimeType = {
  timeFrom: string;
  timeTo: string;
};
type RecurrenceEndDate = {
  year: number;
  month: number;
  day: number;
};

export type SubTaskItemType = {
  info: string;
  addInfo: string;
  time: SubTaskItemTimeType;
  _id: string;
  recurring: boolean;
  recurrenceEndDate: RecurrenceEndDate | null;
  recurrenceFrequency: string | null;
};

export type SubTaskItemProps = {
  subTask: SubTaskItemType;
  taskID: string;
};
