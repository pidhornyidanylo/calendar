import React, { useState } from "react";
import styles from "./EditForm.module.css";
import { SubTaskItemType } from "../SubTaskItem.dto";
import GenericFormItems from "@/components/reusable/GenericFormItems/GenericFormItems";

type EditFormProps = {
  subTask: SubTaskItemType;
};

const EditForm: React.FC<EditFormProps> = ({ subTask }) => {
  const [formState, setFormState] = useState({
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

  return (
    <form data-value="form" className={styles.createForm}>
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
