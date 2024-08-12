import React, { type FormEvent, useState } from "react";
import { SubTaskItemType } from "../SubTaskItem.dto";
import GenericFormItems from "@/components/reusable/GenericFormItems/GenericFormItems";
import { updateTask } from "@/lib/actions";
import toast from "react-hot-toast";
import styles from "./EditForm.module.css";

type EditFormProps = {
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

const EditForm: React.FC<EditFormProps> = ({ subTask, taskID, handleCloseModal }) => {
  const [formState, setFormState] = useState<FormStateType>({
    timeFrom: subTask.time.timeFrom,
    timeTo: subTask.time.timeTo,
    taskInfo: subTask.info,
    allDay:
      subTask.time.timeFrom === "00:00" && subTask.time.timeTo === "00:00",
    addInfo: subTask.addInfo,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormState((prevState) => ({
        ...prevState,
        // @ts-ignore
        [name]: e.target.checked,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    const response = await updateTask(formState, taskID, subTask._id);

    if (response.success) {
      handleCloseModal();
      toast.success("Task updated successfully!");
      setFormState({
        timeFrom: "00:01",
        timeTo: "23:59",
        taskInfo: "some task",
        allDay: false,
        addInfo: "some task details",
      });
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <form
      data-value="form"
      className={styles.editForm}
      onSubmit={handleSubmit}
    >
      <h5 className={styles.taskDetailsTitle}>Task details:</h5>
      <GenericFormItems
        formState={formState}
        handleInputChange={handleInputChange}
        type={"edit"}
      />
    </form>
  );
};

export default EditForm;
