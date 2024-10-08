"use client";
import { useStore } from "@/store";
import Image from "next/image";
import React from "react";
import inf from "../../../../public/icons/home/infinite.svg";
import styles from "./HomeHeaderShowAllButton.module.css";

const HomeHeaderShowAllButton = () => {
	const showPastEvents = useStore((state) => state.showPastEvents);
	const setShowPastEvents = useStore((state) => state.setShowPastEvents);
	return (
		<button
			type="button"
			onClick={() => setShowPastEvents()}
			className={styles.showAllBtn}
		>
			<Image className="svgIcon" width={20} height={20} src={inf} alt={"inf"} />
			<span>{showPastEvents ? "Nearest" : "All"}</span>
		</button>
	);
};

export default HomeHeaderShowAllButton;
