import { useStore } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import expandLess from "../../../../public/icons/home/expand_less.svg";
import expandMore from "../../../../public/icons/home/expand_more.svg";
import styles from "./Calendar.module.css";

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);
  const setShowCreateForm = useStore((state) => state.setShowCreateForm);

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth < 991);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSmall(window.innerWidth < 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonthDays = [];
  const nextMonthDays = [];
  const monthDays = [];

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

  for (
    let empty = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    empty > 0;
    empty--
  ) {
    prevMonthDays.push(daysInPrevMonth - empty + 1);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push(day);
  }

  const totalDaysDisplayed = prevMonthDays.length + monthDays.length;
  const nextMonthDaysNeeded =
    totalDaysDisplayed % 7 === 0 ? 0 : 7 - (totalDaysDisplayed % 7);

  for (let day = 1; day <= nextMonthDaysNeeded; day++) {
    nextMonthDays.push(day);
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDateClick = (day: number, monthOffset: number) => {
    if (isWindowSmall) return;

    let targetMonth = currentMonth + monthOffset;
    let targetYear = currentYear;

    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    } else if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }

    setShowCreateForm(true);
    setDateToCreateTask({
      day,
      month: targetMonth + 1,
      year: targetYear,
    });
  };

  return (
    <div
      className={`${styles.calendarContainer} ${
        expandedSideBar ? styles.visible : ""
      }`}
    >
      <div className={styles.calendarHeader}>
        <div className={styles.headerInfo}>
          <span>{months[currentMonth]}</span>
          <span>{currentYear}</span>
        </div>
        <div className={styles.headerActions}>
          <button type="button" id="prevMonth" onClick={handlePrevMonth}>
            <Image className="svgIcon" src={expandLess} alt={"expandLess"} />
          </button>
          <button type="button" id="nextMonth" onClick={handleNextMonth}>
            <Image className="svgIcon" src={expandMore} alt={"expandMore"} />
          </button>
        </div>
      </div>
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
          {monthDays.map((day, index) => (
            <button
              type="button"
              onClick={() => handleDateClick(day, 0)}
              data-value={day}
              key={`current-${day * index}`}
            >
              <span
                className={
                  currentDate.getDate() === day &&
                  currentDate.getMonth() === currentMonth &&
                  currentDate.getFullYear() === currentYear
                    ? styles.today
                    : ""
                }
              >
                {day}
              </span>
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
    </div>
  );
};

export default Calendar;
