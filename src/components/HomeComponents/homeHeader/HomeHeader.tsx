"use client";
import { useStore } from "@/store";
import React from "react";
import HomeHeaderButton from "../homeHeaderButton/HomeHeaderButton";
import HomeHeaderInterval from "../homeHeaderInterval/HomeHeaderInterval";
import styles from "./HomeHeader.module.css";

const HomeHeader = () => {
	const headerSearchValue = useStore((state) => state.headerSearchValue);
	return (
		<div className={styles.mainHeader}>
			{headerSearchValue.length < 1 && (
				<>
					<HomeHeaderButton />
					<HomeHeaderInterval />
				</>
			)}
		</div>
	);
};

export default HomeHeader;
