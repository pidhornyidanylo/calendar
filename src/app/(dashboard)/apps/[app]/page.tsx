import type { Metadata } from "next";
import type React from "react";
import styles from "./App.module.css";

export const metadata: Metadata = {
	title: "app",
};

type AppItemProps = {
	params: {
		app: string;
	};
};

const AppItem: React.FC<AppItemProps> = ({
	params,
}: {
	params: { app: string };
}) => {
	return (
		<div className={styles.appContainer}>
			<h2 className={styles.appTitle}>{params.app}</h2>
			<p className={styles.appParagraph}>
				Page is currently in development 👩‍💻👨‍💻
				<br />
				Feel free to contact our support for {params.app} app infornation.
			</p>
		</div>
	);
};

export default AppItem;
