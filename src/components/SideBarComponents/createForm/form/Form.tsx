import { useStore } from "@/store";
import React, { type FormEvent, useState } from "react";
import { createDateIdentifier, parseDate } from "@/utils/dateUtils";
import { addTask } from "@/lib/actions";
import { FormProps } from "./Form.types";
import styles from "./Form.module.css";
import toast from "react-hot-toast";
import GenericFormItems from "@/components/reusable/GenericFormItems/GenericFormItems";

const Form: React.FC<FormProps> = ({ showCalendatInput, handleCloseModal }) => {
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
    const { name, value, type } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
      dateIdentifier: createDateIdentifier(
        showCalendatInput,
        formState,
        dateToCreateTask
      ),
    });

    if (response.success) {
      if (handleCloseModal) {
        handleCloseModal();
      }
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
        <GenericFormItems
          type="add"
          formState={formState}
          handleInputChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default Form;
