export type TaskType = {
    task: string;
    addInfo: string;
    date: {
      day: number;
      month: number;
      year: number;
    };
    timeFrom: string;
    timeTo: string;
  };