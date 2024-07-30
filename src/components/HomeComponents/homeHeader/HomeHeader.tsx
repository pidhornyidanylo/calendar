"use client";
import React from "react";
import styles from "./HomeHeader.module.css";
import HomeHeaderInterval from "../homeHeaderInterval/HomeHeaderInterval";
import HomeHeaderButton from "../homeHeaderButton/HomeHeaderButton";
import { useStore } from "@/store";

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
