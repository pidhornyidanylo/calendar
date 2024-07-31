"use client";
import { useStore } from "@/store";
import React, { useEffect, useState } from "react";
import styles from "./HeaderBurger.module.css";

const HeaderBurger = () => {
  const toggleSideBar = useStore((state) => state.toggleExpandedSideBar);
  const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpandedSideBar(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <button className={styles.burger} onClick={() => toggleSideBar()}>
      <span />
      <span />
      <span />
    </button>
  );
};

export default HeaderBurger;
