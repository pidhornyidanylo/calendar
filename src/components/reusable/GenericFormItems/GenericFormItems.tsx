import React from "react";
import styles from "./GenericFormItems.module.css";

type GenericFormItemsProps = {
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

const GenericFormItems: React.FC<GenericFormItemsProps> = ({
  formState,
  handleInputChange,
  type,
}) => {
  return (
    <>
      <div
        className={`${styles.timeContainer} ${
          formState.allDay ? styles.disabled : ""
        }`}
      >
        <div className={styles.timeItem}>
          <label htmlFor="time">From: </label>
            <input
              onChange={handleInputChange}
              value={formState.timeFrom}
              disabled={formState.allDay}
              type="time"
              name="timeFrom"
              id="time-from"
              step={3600}
            />
        </div>
        <div className={styles.timeItem}>
          <label htmlFor="time">To: </label>
          <input
            onChange={handleInputChange}
            value={formState.timeTo}
            disabled={formState.allDay}
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
            type="text"
            name="taskInfo"
            id="task"
            value={formState.taskInfo}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.addInfoContainer}>
          <label htmlFor="add-info">Additional info:</label>
          <textarea
            name="addInfo"
            id="add-info"
            value={formState.addInfo}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        {type === "add" ? "Add task" : "Update task"}
      </button>
    </>
  );
};

export default GenericFormItems;
