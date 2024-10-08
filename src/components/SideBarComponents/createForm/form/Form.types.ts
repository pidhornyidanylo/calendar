export type FormProps = {
  showCalendatInput: boolean;
  handleCloseModal?: () => void;
  token: string;
};

export type FormStateType = {
  timeFrom: string;
  timeTo: string;
  taskInfo: string;
  allDay: boolean;
  date: "";
  addInfo: string;
};
