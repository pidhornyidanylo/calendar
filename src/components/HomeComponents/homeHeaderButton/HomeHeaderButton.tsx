"use client";
import React from "react";
import Image from "next/image";
import today from "../../../../public/icons/today.svg";
import styles from "./HomeHeaderButton.module.css";
import { useStore } from "@/store";

const HomeHeaderButton = () => {
  const updateSchedule = useStore((state) => state.updateSchedule);
  return (
    <button
      onClick={() => updateSchedule()}
      type="button"
      className={styles.todayBtn}
    >
      <Image src={today} alt={"today"} />
      <span>Today</span>
    </button>
  );
};

export default HomeHeaderButton;
