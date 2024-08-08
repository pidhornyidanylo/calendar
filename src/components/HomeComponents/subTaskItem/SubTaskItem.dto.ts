type SubTaskItemTimeType = {
  timeFrom: string;
  timeTo: string;
};

export type SubTaskItemType = {
  info: string;
  addInfo: string;
  time: SubTaskItemTimeType;
  _id: string;
};

export type SubTaskItemProps = {
  subTask: SubTaskItemType;
  taskID: string;
};
