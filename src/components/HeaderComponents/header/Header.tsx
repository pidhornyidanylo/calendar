import Image from "next/image";
import React from "react";
import { logo } from "../HeaderIcons.index";
import HeaderBurger from "../headerBurger/HeaderBurger";
import HeaderMenu from "../headerMenu/HeaderMenu";
import HeaderSearch from "../headerSearch/HeaderSearch";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <HeaderBurger />
        <Link href={"/"}>
          <Image src={logo} alt={"logo"} />
        </Link>
        <Link href={"/"}>
          <h3 className={styles.headerTitle}>Calendar</h3>
        </Link>
      </div>
      <div className={styles.headerSearch}>
        <HeaderSearch />
      </div>
      <div className={styles.headerMenu}>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
