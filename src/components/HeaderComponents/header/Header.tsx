import Image from "next/image";
import React from "react";
import { logo } from "../HeaderIcons.index";
import HeaderBurger from "../headerBurger/HeaderBurger";
import HeaderMenu from "../headerMenu/HeaderMenu";
import HeaderSearch from "../headerSearch/HeaderSearch";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerLogo}>
				<HeaderBurger />
				<Image src={logo} alt={"logo"} />
				<h3 className={styles.headerTitle}>Calendar</h3>
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
