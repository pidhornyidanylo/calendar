import React, { FormEvent, useState } from "react";
import { useStore } from "@/store";
import { parseDate } from "@/utils/dateUtils";
import styles from "./Form.module.css";

const Form = ({ showCalendatInput }: { showCalendatInput: boolean }) => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const [timeFrom, setTimeFrom] = useState("00:00");
  const [timeTo, setTimeTo] = useState("23:59");
  const [task, setTask] = useState("go to meeting");
  const [date, setDate] = useState("1999-06-02");
  const [addInfo, setAddInfo] = useState(
    "meeting will take place at 'Pozitron'"
  );
  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      date: parseDate(date),
      timeFrom: timeFrom,
      timeTo: timeTo,
      task: task,
      addInfo: addInfo,
    });
  };
  return (
    <>
      {!showCalendatInput && (
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
      )}
      <form
        onSubmit={(e) => handleSumbit(e)}
        data-value="form"
        className={`${styles.createForm} ${showCalendatInput ? styles.lg : ''}`}
      >
        <h5 className={styles.taskDetailsTitle}>Task details:</h5>
        {showCalendatInput && (
          <div className={styles.dateContainer}>
            <label htmlFor="time">Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder={`${
                dateToCreateTask ? dateToCreateTask : "01.01.2025"
              }`}
            />
          </div>
        )}
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
        <button className={styles.submitBtn} type="submit">Add</button>
      </form>
    </>
  );
};

export default Form;
