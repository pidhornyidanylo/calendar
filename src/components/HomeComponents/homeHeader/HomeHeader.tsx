"use client";
import { useStore } from "@/store";
import type React from "react";
import HomeHeaderButton from "../homeHeaderButton/HomeHeaderButton";
import HomeHeaderInterval from "../homeHeaderInterval/HomeHeaderInterval";
import HomeHeaderShowAllButton from "../homeHeaderShowAllButton/HomeHeaderShowAllButton";
import styles from "./HomeHeader.module.css";

const HomeHeader: React.FC = () => {
	const headerSearchValue = useStore((state) => state.headerSearchValue);
	return (
		<div className={styles.mainHeader}>
			{headerSearchValue.length < 1 && (
				<>
					<div className={styles.headerBtnsContainer}>
						<HomeHeaderButton />
						<HomeHeaderShowAllButton />
					</div>
					<HomeHeaderInterval />
				</>
			)}
		</div>
	);
};

export default HomeHeader;
