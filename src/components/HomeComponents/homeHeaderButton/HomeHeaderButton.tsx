import { useStore } from "@/store";
import Image from "next/image";
import type React from "react";
import today from "../../../../public/icons/home/today.svg";
import styles from "./HomeHeaderButton.module.css";

const HomeHeaderButton: React.FC = () => {
	const setCurrentMonth = useStore((state) => state.setCurrentMonth);
	const setCurrentYear = useStore((state) => state.setCurrentYear);
	const handleScheduleViewReset = () => {
		setCurrentMonth(new Date().getMonth());
		setCurrentYear(new Date().getFullYear());
	};
	return (
		<button
			onClick={() => handleScheduleViewReset()}
			type="button"
			className={styles.todayBtn}
		>
			<Image className="svgIcon" src={today} alt={"today"} />
			<span>Today</span>
		</button>
	);
};

export default HomeHeaderButton;
