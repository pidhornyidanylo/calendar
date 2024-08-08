"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/store";
import TaskItem from "../taskItem/TaskItem";
import type { TaskItemType } from "../taskItem/TaskItem.dto";
import type { SubTaskItemType } from "../subTaskItem/SubTaskItem.dto";

type HomeScheduleProps = {
  data: string;
};

const HomeSchedule: React.FC<HomeScheduleProps> = ({
  data,
}: {
  data: string;
}) => {
  const [schedule, setSchedule] = useState<TaskItemType[] | []>([]);
  useEffect(() => {
    setSchedule(JSON.parse(data));
  }, [data]);

  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const currentMonthForFiltering = useStore((state) => state.currentMonth);
  const currentYearForFiltering = useStore((state) => state.currentYear);

  const getInitFilteredTasks = () => {
    return headerSearchValue.length < 1
      ? schedule.filter((task: TaskItemType) => {
          const validInterval =
            task.date.month - currentMonthForFiltering + 1 < 5 &&
            task.date.month - currentMonthForFiltering + 1 > 1 &&
            task.date.year === currentYearForFiltering;
          return validInterval;
        })
      : schedule.filter((task: TaskItemType) =>
          task.tasks.find((task: SubTaskItemType) =>
            task.info.includes(headerSearchValue)
          )
        );
  };

  return (
    <div>
      {getInitFilteredTasks().map((task: TaskItemType) => (
        <TaskItem key={task._id} task={task} />
      ))}
      {currentMonthForFiltering === 10 &&
        schedule
          .filter(
            (task: TaskItemType) =>
              task.date.month <= 1 &&
              task.date.year === currentYearForFiltering + 1
          )
          .map((task: TaskItemType) => <TaskItem key={task._id} task={task} />)}
      {currentMonthForFiltering === 11 &&
        schedule
          .filter(
            (task: TaskItemType) =>
              task.date.month <= 2 &&
              task.date.year === currentYearForFiltering + 1
          )
          .map((task: TaskItemType) => <TaskItem key={task._id} task={task} />)}
    </div>
  );
};

export default HomeSchedule;
