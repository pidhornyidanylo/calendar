import React from "react";
import { weekdays } from "../Calendar";
import styles from "./CalendarBody.module.css";

type CalendarBodyProps = {
  prevMonthDays: number[];
  monthDays: { day: number; isToday: boolean }[];
  nextMonthDays: number[];
  handleDateClick: (day: number, monthOffset: number) => void;
};

const CalendarBody: React.FC<CalendarBodyProps> = ({
  prevMonthDays,
  monthDays,
  nextMonthDays,
  handleDateClick,
}) => {
  return (
    <div className={styles.calendarBody}>
      <div className={styles.calendarWeekdays}>
        {weekdays.map((day) => (
          <div key={day}>{day[0]}</div>
        ))}
      </div>
      <div className={styles.calendarDays}>
        {prevMonthDays.map((day, index) => (
          <button
            type="button"
            onClick={() => handleDateClick(day, -1)}
            data-value={day}
            key={`prev-${day * index}`}
            className={styles.prevMonthDay}
          >
            <span>{day}</span>
          </button>
        ))}
        {monthDays.map(({ day, isToday }, index) => (
          <button
            type="button"
            onClick={() => handleDateClick(day, 0)}
            data-value={day}
            key={`current-${day * index}`}
          >
            <span className={isToday ? styles.today : ""}>{day}</span>
          </button>
        ))}
        {nextMonthDays.map((day, index) => (
          <button
            type="button"
            onClick={() => handleDateClick(day, 1)}
            data-value={day}
            key={`next-${day * index}`}
            className={styles.nextMonthDay}
          >
            <span>{day}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
