"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logo } from "../HeaderIcons.index";
import HeaderBurger from "../headerBurger/HeaderBurger";
import HeaderMenu from "../headerMenu/HeaderMenu";
import HeaderSearch from "../headerSearch/HeaderSearch";
import styles from "./Header.module.css";

const Header = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const updateMode = () => {
      const savedMode = localStorage.getItem("mode") || "light";
      setMode(savedMode);
      if (savedMode === "dark") {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    };

    updateMode();
    window.addEventListener("storage", updateMode);

    return () => {
      window.removeEventListener("storage", updateMode);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <HeaderBurger />
        <Link
          href={"/"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="svgIcon"
            src={logo}
            alt={"logo"}
            width={40}
            height={40}
          />
        </Link>
        <Link href={"/"}>
          <h3 className={styles.headerTitle}>Calendar</h3>
        </Link>
      </div>
      <div
        className={`${styles.headerSearch} ${
          localStorage.getItem("mode") === "dark" ? styles.light : ""
        }`}
      >
        <HeaderSearch />
      </div>
      <div className={styles.headerMenu}>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
