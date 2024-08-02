import React, { useState } from "react";
import styles from "./Form.module.css";
import { useStore } from "@/store";

const Form = () => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const [timeFrom, setTimeFrom] = useState("00:00");
  const [timeTo, setTimeTo] = useState("23:59");
  const [task, setTask] = useState("go to meeting");
  const [addInfo, setAddInfo] = useState(
    "meeting will take place at 'Pozitron'"
  );
  return (
    <>
      <h4 className={styles.formDate}>
        Date:{" "}
        {(dateToCreateTask?.day as number) < 10
          ? `0${dateToCreateTask?.day}`
          : dateToCreateTask?.day}{" "}
        /{" "}
        {(dateToCreateTask?.month as number) + 1 < 10
          ? `0${(dateToCreateTask?.month as number) + 1}`
          : (dateToCreateTask?.month as number) + 1}{" "}
        / {dateToCreateTask?.year}
      </h4>
      <form data-value="form" className={styles.createForm}>
        <h5 className={styles.taskDetailsTitle}>Task details:</h5>
        <div className={styles.timeContainer}>
          <div className={styles.timeItem}>
            <label htmlFor="time">From: </label>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              value={timeFrom}
              type="time"
              name="timeFrom"
              id="time-from"
              step={3600}
            />
          </div>
          <div className={styles.timeItem}>
            <label htmlFor="time">To: </label>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              value={timeTo}
              type="time"
              name="timeTo"
              id="time-to"
              step={3600}
            />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.taskContainer}>
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              name="task"
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className={styles.addInfoContainer}>
            <label htmlFor="add-info">Additional info:</label>
            <textarea
              name="add-info"
              id="add-info"
              value={addInfo}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
