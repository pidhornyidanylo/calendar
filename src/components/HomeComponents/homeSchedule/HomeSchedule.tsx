"use client";

import Spinner from "@/components/reusable/Spinner/Spinner";
import { useStore } from "@/store";
import type React from "react";
import { useEffect, useState } from "react";
import TaskItem from "../taskItem/TaskItem";
import type { TaskItemType } from "../taskItem/TaskItem.types";

type HomeScheduleProps = {
  data: string;
};

const HomeSchedule: React.FC<HomeScheduleProps> = ({ data }) => {
  const [schedule, setSchedule] = useState<TaskItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const showPastEvents = useStore((state) => state.showPastEvents);
  const headerSearchValue = useStore((state) => state.headerSearchValue);
  const currentMonthForFiltering = useStore((state) => state.currentMonth);
  const currentYearForFiltering = useStore((state) => state.currentYear);

  useEffect(() => {
    const tasks: TaskItemType[] = JSON.parse(data);

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;

    const taskMap: Record<string, TaskItemType> = {};

    tasks.forEach((task) => {
      const baseDateKey = `${task.date.year}-${task.date.month}-${task.date.day}`;

      if (!taskMap[baseDateKey]) {
        taskMap[baseDateKey] = {
          _id: task._id,
          date: task.date,
          tasks: [],
          dateIdentifier: task.dateIdentifier,
          __v: task.__v,
        };
      }

      task.tasks.forEach((subTask) => {
        if (subTask.recurring && subTask.recurrenceEndDate) {
          const recurrenceStart = new Date(
            task.date.year,
            task.date.month - 1,
            task.date.day
          );
          const recurrenceEnd = new Date(
            subTask.recurrenceEndDate.year,
            subTask.recurrenceEndDate.month - 1,
            subTask.recurrenceEndDate.day
          );

          let currentOccurrence = new Date(recurrenceStart);

          while (currentOccurrence <= recurrenceEnd) {
            const recurrenceKey = `${currentOccurrence.getFullYear()}-${
              currentOccurrence.getMonth() + 1
            }-${currentOccurrence.getDate()}`;

            if (!taskMap[recurrenceKey]) {
              taskMap[recurrenceKey] = {
                _id: `${task._id}-${
                  subTask._id
                }-${currentOccurrence.getTime()}`,
                date: {
                  day: currentOccurrence.getDate(),
                  month: currentOccurrence.getMonth() + 1,
                  year: currentOccurrence.getFullYear(),
                },
                tasks: [],
                dateIdentifier: task.dateIdentifier,
                __v: task.__v,
              };
            }

            taskMap[recurrenceKey].tasks.push({ ...subTask });

            switch (subTask.recurrenceFrequency) {
              case "daily":
                currentOccurrence.setDate(currentOccurrence.getDate() + 1);
                break;
              case "weekly":
                currentOccurrence.setDate(currentOccurrence.getDate() + 7);
                break;
              case "monthly":
                currentOccurrence.setMonth(currentOccurrence.getMonth() + 1);
                break;
              default:
                break;
            }
          }
        } else {
          taskMap[baseDateKey].tasks.push(subTask);
        }
      });
    });

    const groupedTasks = Object.values(taskMap).filter((task) => {
      const isCurrentOrFuture =
        task.date.month > todayMonth ||
        (task.date.month === todayMonth && task.date.day >= todayDay);
      return showPastEvents || isCurrentOrFuture;
    });

    const sortedTasks = groupedTasks.sort((a, b) => {
      if (a.date.month !== b.date.month) return a.date.month - b.date.month;
      return a.date.day - b.date.day;
    });

    setSchedule(sortedTasks);
    setLoading(false);
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

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

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
