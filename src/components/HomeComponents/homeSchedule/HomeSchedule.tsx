"use client";
import { useStore } from "@/store";
import React from "react";
import schedule from "../../../events.json";
import TaskItem from "../taskItem/TaskItem";

const HomeSchedule = () => {
  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const currentMonthForFiltering = useStore((state) => state.currentMonth);
  const currentYearForFiltering = useStore((state) => state.currentYear);

  const getInitFilteredTasks = () => {
    return headerSearchValue.length < 1
      ? schedule.filter((task) => {
          const validInterval =
            task.date.month - currentMonthForFiltering + 1 < 5 &&
            task.date.month - currentMonthForFiltering + 1 > 1 &&
            task.date.year === currentYearForFiltering;
          return validInterval;
        })
      : schedule.filter((task) =>
          task.tasks.find((task) => task.task.includes(headerSearchValue))
        );
  };

  return (
    <div>
      {getInitFilteredTasks().map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {currentMonthForFiltering === 10 &&
        schedule
          .filter(
            (task) =>
              task.date.month <= 1 &&
              task.date.year === currentYearForFiltering + 1
          )
          .map((task) => <TaskItem key={task.id} task={task} />)}
      {currentMonthForFiltering === 11 &&
        schedule
          .filter(
            (task) =>
              task.date.month <= 2 &&
              task.date.year === currentYearForFiltering + 1
          )
          .map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
};

export default HomeSchedule;
