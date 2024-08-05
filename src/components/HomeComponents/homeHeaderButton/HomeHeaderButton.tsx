import { useStore } from "@/store";
import Image from "next/image";
import React from "react";
import today from "../../../../public/icons/home/today.svg";
import styles from "./HomeHeaderButton.module.css";

const HomeHeaderButton = () => {
	const updateSchedule = useStore((state) => state.updateSchedule);

	return (
		<button
			onClick={() => updateSchedule()}
			type="button"
			className={styles.todayBtn}
		>
			<Image className="svgIcon" src={today} alt={"today"} />
			<span>Today</span>
		</button>
	);
};

export default HomeHeaderButton;
