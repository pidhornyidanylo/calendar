"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@mui/joy";
import React from "react";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
	return (
		<Button
			sx={{ marginTop: "50px" }}
			color="neutral"
			loading={false}
			size="lg"
			variant="outlined"
		>
			<LogoutLink className={styles.logoutLink}>Logout</LogoutLink>
		</Button>
	);
};

export default LogoutButton;
