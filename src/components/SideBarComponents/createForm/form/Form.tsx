import { useStore } from "@/store";
import React, { type FormEvent, useState } from "react";
import { parseDate } from "@/utils/dateUtils";
import { addTask } from "@/lib/actions";
import { FormProps } from "./Form.types";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

const Form: React.FC<FormProps> = ({ showCalendatInput }) => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);

  const [formState, setFormState] = useState({
    timeFrom: "00:01",
    timeTo: "23:59",
    taskInfo: "some task",
    allDay: false,
    date: "",
    addInfo: "some task details",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    const { name, value, type, checked } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await addTask({
      date: showCalendatInput
        ? parseDate(formState.date)
        : (dateToCreateTask as { day: number; month: number; year: number }),
      task: {
        time: {
          timeFrom: formState.allDay ? "00:00" : formState.timeFrom,
          timeTo: formState.allDay ? "00:00" : formState.timeTo,
        },
        info: formState.taskInfo,
        addInfo: formState.addInfo,
      },
      dateIdentifier: showCalendatInput
        ? String(parseDate(formState.date).day) +
          String(parseDate(formState.date).month) +
          String(parseDate(formState.date).year)
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
      setFormState({
        timeFrom: "00:01",
        timeTo: "23:59",
        taskInfo: "some task",
        allDay: false,
        date: "",
        addInfo: "some task details",
      });
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
        onSubmit={handleSumbit}
        data-value="form"
        className={`${styles.createForm} ${showCalendatInput ? styles.lg : ""}`}
      >
        <h5 className={styles.taskDetailsTitle}>Task details:</h5>
        {showCalendatInput && (
          <div className={styles.dateContainer}>
            <label htmlFor="time">Date: </label>
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleInputChange}
              placeholder={`${
                dateToCreateTask ? dateToCreateTask : "01.01.2025"
              }`}
            />
          </div>
        )}
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
          Add
        </button>
      </form>
    </>
  );
};

export default Form;
