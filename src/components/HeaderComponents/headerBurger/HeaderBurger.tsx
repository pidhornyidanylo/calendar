"use client";
import { useStore } from "@/store";
import React from "react";
import styles from "./HeaderBurger.module.css";

const HeaderBurger = () => {
	const toggleSideBar = useStore((state) => state.toggleExpandedSideBar);
	return (
		<div className={styles.burger} onClick={() => toggleSideBar()}>
			<span />
			<span />
			<span />
		</div>
	);
};

export default HeaderBurger;
