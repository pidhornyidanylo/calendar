import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { useStore } from "@/store";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import arrowBack from "../../../../public/icons/home/arrow_back_ios_new.svg";
import arrowForward from "../../../../public/icons/home/arrow_forward_ios.svg";
import { months } from "../../SideBarComponents/calendar/Calendar";
import styles from "./HomeHeaderInterval.module.css";

const HomeHeaderInterval: React.FC = () => {
	const [shortenInterval, setShortenInterval] = useState(false);

	const currentMonth = useStore((state) => state.currentMonth);
	const setCurrentMonth = useStore((state) => state.setCurrentMonth);

	const nextMonth = useStore((state) => state.nextMonth);
	const prevMonth = useStore((state) => state.prevMonth);

	const currentYear = useStore((state) => state.currentYear);
	const nextYear = useStore((state) => state.nextYear);
	const prevYear = useStore((state) => state.prevYear);

	const handleTimeBack = () => {
		prevMonth();
		if (currentMonth === 0) {
			setCurrentMonth(11);
			prevYear();
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const handleTimeForward = () => {
		nextMonth();
		if (currentMonth === 11) {
			setCurrentMonth(0);
			nextYear();
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const handleMonthsView = () => {
		if (currentMonth === 10) {
			return months[0];
		}
		if (currentMonth === 11) {
			return months[1];
		}
		return months[currentMonth + 2];
	};

	return (
		<>
			<GenericResize
				size={425}
				setState={setShortenInterval}
				valueIf={true}
				valueElse={false}
			/>
			<h2 className={styles.timeInterval}>
				{shortenInterval
					? months[currentMonth].slice(0, 3)
					: months[currentMonth]}
				{""}
				{currentMonth === 10 || currentMonth === 11
					? `${`, ${currentYear}`}`
					: ""}{" "}
				-{" "}
				{shortenInterval ? handleMonthsView().slice(0, 3) : handleMonthsView()}
				{", "}
				{currentMonth === 10 || currentMonth === 11
					? currentYear + 1
					: currentYear}
			</h2>
			<div className={styles.arrows}>
				<button type="button" onClick={() => handleTimeBack()}>
					<Image src={arrowBack} className="svgIcon" alt={"arrow-back"} />
				</button>
				<button type="button" onClick={() => handleTimeForward()}>
					<Image src={arrowForward} className="svgIcon" alt={"arrow-forward"} />
				</button>
			</div>
		</>
	);
};

export default HomeHeaderInterval;
