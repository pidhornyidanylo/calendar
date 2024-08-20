import CopyIcon from "@/components/UserComponents/copyIcon/CopyIcon";
import LogoutButton from "@/components/UserComponents/logoutButton/LogoutButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@mui/joy";
import type { Metadata } from "next";
import React from "react";
import styles from "./User.module.css";

export const metadata: Metadata = {
	title: "User",
};

const User = async () => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<>
			<h2 className={styles.userTitle}>User Information</h2>
			<p className={styles.userParagraph}>
				Here are the details associated with your account.
			</p>
			<div className={styles.userSection}>
				<p>
					<strong>Given Name:</strong> {user?.given_name}
					<CopyIcon field={user?.given_name as string} />
				</p>
				<p>
					<strong>Family Name:</strong> {user?.family_name}
					<CopyIcon field={user?.family_name as string} />
				</p>
				{user?.email && (
					<>
						<p>
							<strong>Email:</strong> {user?.email}
							<CopyIcon field={user?.email as string} />
						</p>
					</>
				)}
				<p>
					<strong>ID:</strong> {user?.id}
					<CopyIcon field={user?.id as string} />
				</p>
			</div>
			<LogoutButton />
		</>
	);
};

export default User;
