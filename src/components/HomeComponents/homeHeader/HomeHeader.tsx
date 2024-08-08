"use client";
import { useStore } from "@/store";
import React from "react";
import HomeHeaderButton from "../homeHeaderButton/HomeHeaderButton";
import HomeHeaderInterval from "../homeHeaderInterval/HomeHeaderInterval";
import styles from "./HomeHeader.module.css";
import HomeHeaderShowAllButton from "../homeHeaderShowAllButton/HomeHeaderShowAllButton";

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
