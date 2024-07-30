"use client";
import { useStore } from "@/store";
import Image from "next/image";
import React from "react";
import plus from "../../../../public/icons/plus.svg";
import Calendar from "../calendar/Calendar";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
	const expandedSideBar = useStore((state) => state.expandedSideBar);
	return (
		<aside
			className={`${styles.sidebar} ${expandedSideBar ? styles.expanded : ""}`}
		>
			<button type="button" className={styles.createBtn}>
				<Image src={plus} alt="plus" />
				<span>Create</span>
			</button>
			<Calendar />
		</aside>
	);
};

export default Sidebar;
