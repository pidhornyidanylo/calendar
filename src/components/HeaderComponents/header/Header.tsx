import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { logo } from "../HeaderIcons.index";
import HeaderBurger from "../headerBurger/HeaderBurger";
import HeaderMenu from "../headerMenu/HeaderMenu";
import HeaderSearch from "../headerSearch/HeaderSearch";
import styles from "./Header.module.css";
import { Tooltip } from "@mui/joy";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <HeaderBurger />
        <Tooltip title="Home">
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
        </Tooltip>
        <Tooltip title="Home">
          <Link href={"/"}>
            <h3 className={styles.headerTitle}>Calendar</h3>
          </Link>
        </Tooltip>
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
