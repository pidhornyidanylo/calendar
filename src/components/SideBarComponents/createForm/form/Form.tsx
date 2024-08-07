import { useStore } from "@/store";
import React, { type FormEvent, useState } from "react";
import styles from "./Form.module.css";
import { parseDate } from "@/utils/dateUtils";
import { addTask } from "@/lib/actions";

const Form = ({ showCalendatInput }: { showCalendatInput: boolean }) => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  console.log(dateToCreateTask);
  const [timeFrom, setTimeFrom] = useState("00:01");
  const [timeTo, setTimeTo] = useState("23:59");
  const [task, setTask] = useState("some task");
  const [date, setDate] = useState("");
  const [addInfo, setAddInfo] = useState("some task details");

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTask({
      date: showCalendatInput
        ? parseDate(date)
        : (dateToCreateTask as { day: number; month: number; year: number }),
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
          {(dateToCreateTask?.month as number) < 10
            ? `0${dateToCreateTask?.month as number}`
            : (dateToCreateTask?.month as number)}{" "}
          / {dateToCreateTask?.year}
        </h4>
      )}
      <form
        onSubmit={(e) => handleSumbit(e)}
        data-value="form"
        className={`${styles.createForm} ${showCalendatInput ? styles.lg : ""}`}
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
              onChange={(e) => setAddInfo(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.submitBtn} type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default Form;
