"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { apps, avatar, help, more, settings } from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";

const HeaderMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showTablet, setShowTablet] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 576) {
				setShowMenu(true);
				setShowTablet(false);
			} else {
				setShowMenu(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{showMenu ? (
				<>
					<button
						type="button"
						id="more"
						className={styles.moreBtn}
						onClick={() => setShowTablet(!showTablet)}
					>
						<Image src={more} alt="more" width={24} height={24} />
					</button>
					{showTablet && (
						<div className={styles.headerMenuTablet}>
							<button type="button" className={styles.headerMenuBtn}>
								<Image src={help} alt="help" />
							</button>
							<button type="button" className={styles.headerMenuBtn}>
								<Image src={settings} alt="settings" />
							</button>
							<button type="button" className={styles.headerMenuBtn}>
								<Image src={apps} alt="apps" />
							</button>
							<button type="button" className={styles.headerMenuBtn}>
								<Image src={avatar} alt="avatar" width={24} height={24} />
							</button>
						</div>
					)}
				</>
			) : (
				<>
					<button type="button" className={styles.headerMenuBtn}>
						<Image src={help} alt="help" />
					</button>
					<button type="button" className={styles.headerMenuBtn}>
						<Image src={settings} alt="settings" />
					</button>
					<button type="button" className={styles.headerMenuBtn}>
						<Image src={apps} alt="apps" />
					</button>
					<button type="button" className={styles.headerMenuBtn}>
						<Image src={avatar} alt="avatar" width={24} height={24} />
					</button>
				</>
			)}
		</>
	);
};

export default HeaderMenu;
