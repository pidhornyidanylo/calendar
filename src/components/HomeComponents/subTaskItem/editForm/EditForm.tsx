import React, { useState } from "react";
import styles from "./EditForm.module.css";
import { SubTaskItemType } from "../SubTaskItem.dto";

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
      <div
        className={`${styles.timeContainer} ${
          formState.allDay ? styles.disabled : ""
        }`}
      >
        <div className={styles.timeItem}>
          <label htmlFor="time">From: </label>
          <input
            value={formState.timeFrom}
            onChange={handleInputChange}
            type="time"
            name="timeFrom"
            id="time-from"
            step={3600}
          />
        </div>
        <div className={styles.timeItem}>
          <label htmlFor="time">To: </label>
          <input
            value={formState.timeTo}
            onChange={handleInputChange}
            type="time"
            name="timeTo"
            id="time-to"
            step={3600}
          />
        </div>
      </div>
      <div className={styles.wholeDay}>
        <label htmlFor="all_day">All day</label>
        <input
          checked={formState.allDay}
          onChange={handleInputChange}
          type="checkbox"
          name="allDay"
          id="all_day"
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.taskContainer}>
          <label htmlFor="task">Task:</label>
          <input
            value={formState.taskInfo}
            onChange={handleInputChange}
            type="text"
            name="taskInfo"
            id="task"
          />
        </div>
        <div className={styles.addInfoContainer}>
          <label htmlFor="add-info">Additional info:</label>
          <textarea
            value={formState.addInfo}
            onChange={handleInputChange}
            name="addInfo"
            id="add-info"
          />
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        Update task
      </button>
    </form>
  );
};

export default EditForm;
