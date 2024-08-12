import React, { type FormEvent, useState } from "react";
import GenericFormItems from "@/components/reusable/GenericFormItems/GenericFormItems";
import { updateTask } from "@/lib/actions";
import toast from "react-hot-toast";
import type { EditFormProps, FormStateType } from "./EditForm.types";
import styles from "./EditForm.module.css";

const EditForm: React.FC<EditFormProps> = ({
  subTask,
  taskID,
  handleCloseModal,
}) => {

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
    const { name, value, type } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
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
    <form data-value="form" className={styles.editForm} onSubmit={handleSubmit}>
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
