export type GenericFormItemsProps = {
  formState: {
    timeFrom: string;
    timeTo: string;
    taskInfo: string;
    allDay: boolean;
    addInfo: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: "add" | "edit";
};
