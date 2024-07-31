"use client";
import { useStore } from "@/store";
import React from "react";
import Calendar from "../calendar/Calendar";
import styles from "./Sidebar.module.css";
import BasicModal from "../createModal/CreateModal";

const Sidebar = () => {
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  return (
    <aside
      className={`${styles.sidebar} ${expandedSideBar ? styles.expanded : ""}`}
    >
      <BasicModal />
      <Calendar />
    </aside>
  );
};

export default Sidebar;
