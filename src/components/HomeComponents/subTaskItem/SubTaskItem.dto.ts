type SubTaskItemTimeType = {
  timeFrom: string;
  timeTo: string;
};

export type SubTaskItemType = {
  info: string;
  addInfo: string;
  time: SubTaskItemTimeType;
};
