import { useStore } from "@/store";
import React, { type FormEvent, useState } from "react";
import { parseDate } from "@/utils/dateUtils";
import { addTask } from "@/lib/actions";
import { FormProps } from "./Form.types";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

const Form: React.FC<FormProps> = ({
  showCalendatInput,
}: {
  showCalendatInput: boolean;
}) => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const [timeFrom, setTimeFrom] = useState("00:01");
  const [timeTo, setTimeTo] = useState("23:59");
  const [taskInfo, setTaskInfo] = useState("some task");
  const [allDay, setAllDay] = useState(false);
  const [date, setDate] = useState("");
  const [addInfo, setAddInfo] = useState("some task details");
  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addTask({
      date: showCalendatInput
        ? parseDate(date)
        : (dateToCreateTask as { day: number; month: number; year: number }),
      task: {
        time: {
          timeFrom: allDay ? "00:00" : timeFrom,
          timeTo: allDay ? "00:00" : timeTo,
        },
        info: taskInfo,
        addInfo: addInfo,
      },
      dateIdentifier: showCalendatInput
        ? String(parseDate(date).day) +
          String(parseDate(date).month) +
          String(parseDate(date).year)
        : String(
            (dateToCreateTask as { day: number; month: number; year: number })
              .day
          ) +
          String(
            (dateToCreateTask as { day: number; month: number; year: number })
              .month
          ) +
          String(
            (dateToCreateTask as { day: number; month: number; year: number })
              .year
          ),
    });
    if (response.success) {
      toast.success("Task added successfully!");
      setTimeFrom("00:01");
      setTimeTo("23:59");
      setTaskInfo("some task");
      setDate("");
      setAddInfo("some task details");
    } else {
      toast.error(response.message as string);
    }
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
        <div
          className={`${styles.timeContainer} ${allDay ? styles.disabled : ""}`}
        >
          <div className={styles.timeItem}>
            <label htmlFor="time">From: </label>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              value={timeFrom}
              disabled={allDay}
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
              disabled={allDay}
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
            checked={allDay}
            onChange={() => setAllDay(!allDay)}
            type="checkbox"
            name="allday"
            id="all_day"
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.taskContainer}>
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              name="task"
              id="task"
              value={taskInfo}
              onChange={(e) => setTaskInfo(e.target.value)}
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
