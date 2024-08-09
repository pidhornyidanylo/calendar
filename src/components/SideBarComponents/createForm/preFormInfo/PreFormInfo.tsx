"use client"
import React from "react";
import Image from "next/image";
import back from "../../../../../public/icons/home/back.svg";
import { useStore } from "@/store";
import styles from "./PreFormInfo.module.css";

const PreFormInfo = () => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  const showCreateForm = useStore((state) => state.showCreateForm);
  return (
    <div
      className={`${styles.startingSign} ${
        dateToCreateTask || !expandedSideBar || !showCreateForm
          ? styles.hidden
          : ""
      }`}
    >
      <h3 className={styles.createFormStarter}>Choose date first</h3>
      <Image className="svgIcon" src={back} alt={"back"} />
    </div>
  );
};

export default PreFormInfo;
