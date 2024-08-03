"use client";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { apps, avatar, help, home, more, settings } from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";

const HeaderMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showTablet, setShowTablet] = useState(false);

	return (
		<>
			<GenericResize
				size={992}
				setState={setShowMenu}
				valueIf={true}
				valueElse={false}
			/>
			<GenericResize size={992} setState={setShowTablet} valueIf={false} />
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
					<div
						className={`${styles.headerMenuTablet} ${
							showTablet ? styles.visibleTablet : ""
						}`}
					>
						<Link type="button" className={styles.headerMenuLink} href="/">
							<Image src={home} alt="home" />
						</Link>
						<Link type="button" className={styles.headerMenuLink} href="/user">
							<Image src={avatar} alt="avatar" width={24} height={24} />
						</Link>
						<Link type="button" className={styles.headerMenuLink} href="/apps">
							<Image src={apps} alt="apps" />
						</Link>
						<Link className={styles.headerMenuLink} href="/settings">
							<Image src={settings} alt="settings" />
						</Link>
						<Link type="button" className={styles.headerMenuLink} href="/help">
							<Image src={help} alt="help" />
						</Link>
					</div>
				</>
			) : (
				<>
					<Link type="button" className={styles.headerMenuLink} href="/help">
						<Image src={help} alt="help" />
					</Link>
					<Link className={styles.headerMenuLink} href="/settings">
						<Image src={settings} alt="settings" />
					</Link>
					<Link type="button" className={styles.headerMenuLink} href="/apps">
						<Image src={apps} alt="apps" />
					</Link>
					<Link type="button" className={styles.headerMenuLink} href="/user">
						<Image src={avatar} alt="avatar" width={24} height={24} />
					</Link>
				</>
			)}
		</>
	);
};

export default HeaderMenu;
