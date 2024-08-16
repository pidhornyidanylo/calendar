import Image from "next/image";
import type React from "react";
import expandLess from "../../../../../public/icons/home/expand_less.svg";
import expandMore from "../../../../../public/icons/home/expand_more.svg";
import styles from "./CalendarHeader.module.css";

type CalendarHeaderProps = {
	currentMonth: string;
	currentYear: number;
	handleNextMonth: () => void;
	handlePrevMonth: () => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	currentMonth,
	currentYear,
	handleNextMonth,
	handlePrevMonth,
}) => {
	return (
		<div className={styles.calendarHeader}>
			<div className={styles.headerInfo}>
				<span>{currentMonth}</span>
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
	);
};

export default CalendarHeader;
