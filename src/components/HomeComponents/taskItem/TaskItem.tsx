"use client";
import React from "react";
import { months } from "../../SideBarComponents/calendar/Calendar";
import SubTaskItem from "../subTaskItem/SubTaskItem";
import styles from "./TaskItem.module.css";
import type { Task } from "./TaskItem.types";
import { useStore } from "@/store";

const TaskItem = <T extends Task>({ task }: { task: T }): React.JSX.Element => {
  const headerSearchValue = useStore((state) => state.headerSearchValue);

  const padZero = (num: number): string => num.toString().padStart(2, '0');

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${padZero(Number(month))}-${padZero(Number(day))}`);
  };

  const shortDayName = (date: Date, locale: string): string =>
    date.toLocaleDateString(locale, { weekday: "short" });

  const taskDate = parseDate(`${task.date.day}/${task.date.month}/${task.date.year}`);
  const taskDayName = shortDayName(taskDate, "en-US");

  return (
    <div className={styles.taskItem} key={task.id}>
      <div className={styles.taskDate}>
        <span className={styles.taskDay}>{task.date.day}</span>
        <span className={styles.taskMonth}>
          {months[task.date.month - 1].slice(0, 3)},
          {` ${taskDayName}`}
        </span>
        {headerSearchValue && <span className={styles.taskYear}>{task.date.year}</span>}
      </div>
      <div className={styles.taskBody}>
        {task.tasks?.map((subTask) => (
          <SubTaskItem key={subTask.task} subTask={subTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
