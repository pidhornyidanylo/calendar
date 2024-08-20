import { useStore } from "@/store";
import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import CalendarBody from "./calendarBody/CalendarBody";
import CalendarHeader from "./calendarHeader/CalendarHeader";

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

const Calendar: React.FC = () => {
	const expandedSideBar = useStore((state) => state.expandedSideBar);
	const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);
	const setShowCreateForm = useStore((state) => state.setShowCreateForm);

	const currentDate = new Date();
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
	const [isWindowSmall, setIsWindowSmall] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsWindowSmall(window.innerWidth < 1220);

			const handleResize = () => {
				setIsWindowSmall(window.innerWidth < 1220);
			};

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
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
		let empty = firstDayOfMonth === 0 ? 6 : firstDayOfMonth;
		empty > 0;
		empty--
	) {
		prevMonthDays.push(daysInPrevMonth - empty + 1);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const dateToCompare = new Date(currentYear, currentMonth, day);
		monthDays.push({
			day,
			isToday: dateToCompare.toDateString() === currentDate.toDateString(),
		});
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
			<CalendarHeader
				currentMonth={months[currentMonth]}
				currentYear={currentYear}
				handlePrevMonth={handlePrevMonth}
				handleNextMonth={handleNextMonth}
			/>
			<CalendarBody
				prevMonthDays={prevMonthDays}
				monthDays={monthDays}
				nextMonthDays={nextMonthDays}
				handleDateClick={handleDateClick}
			/>
		</div>
	);
};

export default Calendar;
