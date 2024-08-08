"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/store";
import TaskItem from "../taskItem/TaskItem";
import type { TaskItemType } from "../taskItem/TaskItem.dto";

type HomeScheduleProps = {
  data: string;
};

const HomeSchedule: React.FC<HomeScheduleProps> = ({ data }) => {
  const [schedule, setSchedule] = useState<TaskItemType[]>([]);
  const showPastEvents = useStore((state) => state.showPastEvents);
  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const currentMonthForFiltering = useStore((state) => state.currentMonth);
  const currentYearForFiltering = useStore((state) => state.currentYear);

  useEffect(() => {
    const tasks: TaskItemType[] = JSON.parse(data);

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;

    const filteredTasks = tasks.filter((task) => {
      const isCurrentOrFuture =
        task.date.month > todayMonth ||
        (task.date.month === todayMonth && task.date.day >= todayDay);
      return showPastEvents || isCurrentOrFuture;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
      if (a.date.month !== b.date.month) return a.date.month - b.date.month;
      return a.date.day - b.date.day;
    });

    setSchedule(sortedTasks);
  }, [data, showPastEvents]);

  const filteredTasks = headerSearchValue
    ? schedule.filter((task) =>
        task.tasks.some((subTask) =>
          subTask.info.toLowerCase().includes(headerSearchValue.toLowerCase())
        )
      )
    : schedule.filter((task) => {
        const monthDifference = task.date.month - currentMonthForFiltering + 1;
        return (
          monthDifference < 5 &&
          monthDifference > 1 &&
          task.date.year === currentYearForFiltering
        );
      });

  const extraTasks =
    currentMonthForFiltering === 10 || currentMonthForFiltering === 11
      ? schedule.filter(
          (task) =>
            task.date.year === currentYearForFiltering + 1 &&
            task.date.month <= currentMonthForFiltering - 9
        )
      : [];

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
      {extraTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default HomeSchedule;
