"use client";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { IconButton, Sheet, Tooltip } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	apps,
	avatar,
	help,
	home,
	logout,
	more,
	settings,
} from "../HeaderIcons.index";
import styles from "./HeaderMenu.module.css";

const HeaderMenu: React.FC = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showTablet, setShowTablet] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest("[data-menu]")) {
				setShowTablet(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

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
					<Tooltip title="More">
						<IconButton
							data-menu="data-menu"
							variant="plain"
							className={styles.moreBtn}
							onClick={() => setShowTablet(!showTablet)}
						>
							<Image
								data-menu="data-menu"
								className="svgIcon"
								src={more}
								alt="more"
								width={24}
								height={24}
							/>
						</IconButton>
					</Tooltip>

					<Sheet
						data-menu="data-menu"
						variant="soft"
						className={`${styles.headerMenuTablet} ${
							showTablet ? styles.visibleTablet : ""
						}`}
						sx={{
							position: "fixed",
							top: 75,
							right: 0,
							width: 80,
							padding: "20px",
							backgroundColor: "transparent",
							backdropFilter: "blur(10px)",
							borderTopLeftRadius: "10px",
							borderBottomLeftRadius: "10px",
							transform: showTablet ? "translateX(0%)" : "translateX(120%)",
							transition: "transform 0.3s ease",
							zIndex: 4,
						}}
					>
						<Tooltip title="Home">
							<Link
								data-menu="data-menu"
								className={styles.headerMenuLink}
								href="/"
							>
								<Image
									data-menu="data-menu"
									src={home}
									alt="home"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</Link>
						</Tooltip>
						<Tooltip title="User">
							<Link
								data-menu="data-menu"
								className={styles.headerMenuLink}
								href="/user"
							>
								<Image
									data-menu="data-menu"
									src={avatar}
									alt="avatar"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</Link>
						</Tooltip>
						<Tooltip title="Apps">
							<Link
								data-menu="data-menu"
								className={styles.headerMenuLink}
								href="/apps"
							>
								<Image
									data-menu="data-menu"
									src={apps}
									alt="apps"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</Link>
						</Tooltip>
						<Tooltip title="Settings">
							<Link
								data-menu="data-menu"
								className={styles.headerMenuLink}
								href="/settings"
							>
								<Image
									data-menu="data-menu"
									src={settings}
									alt="settings"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</Link>
						</Tooltip>
						<Tooltip title="Help">
							<Link
								data-menu="data-menu"
								className={styles.headerMenuLink}
								href="/help"
							>
								<Image
									data-menu="data-menu"
									src={help}
									alt="help"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</Link>
						</Tooltip>
						<Tooltip title="Logout">
							<LogoutLink
								data-menu="data-menu"
								className={styles.headerMenuLink}
							>
								<Image
									data-menu="data-menu"
									src={logout}
									alt="logout"
									className="svgIcon"
									width={24}
									height={24}
								/>
							</LogoutLink>
						</Tooltip>
					</Sheet>
				</>
			) : (
				<>
					<Tooltip title="Help">
						<Link className={styles.headerMenuLink} href="/help">
							<Image
								src={help}
								alt="help"
								className="svgIcon"
								width={24}
								height={24}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="Settings">
						<Link className={styles.headerMenuLink} href="/settings">
							<Image
								src={settings}
								alt="settings"
								className="svgIcon"
								width={24}
								height={24}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="Apps">
						<Link className={styles.headerMenuLink} href="/apps">
							<Image
								src={apps}
								alt="apps"
								className="svgIcon"
								width={24}
								height={24}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="User">
						<Link className={styles.headerMenuLink} href="/user">
							<Image
								src={avatar}
								alt="avatar"
								className="svgIcon"
								width={24}
								height={24}
							/>
						</Link>
					</Tooltip>
					<Tooltip title="Logout">
						<LogoutLink className={styles.headerMenuLink}>
							<Image
								src={logout}
								alt="logout"
								className="svgIcon"
								width={24}
								height={24}
							/>
						</LogoutLink>
					</Tooltip>
				</>
			)}
		</>
	);
};

export default HeaderMenu;
