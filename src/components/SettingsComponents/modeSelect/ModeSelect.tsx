"use client";
import React, { useEffect, useState } from "react";
import styles from "./ModeSelect.module.css";

const ModeSelect = () => {
	const [mode, setMode] = useState("light");

	useEffect(() => {
		const savedMode = localStorage.getItem("mode") || "light";
		setMode(savedMode);
		if (savedMode === "dark") {
			document.documentElement.classList.add("dark-mode");
		}
	}, []);

	const handleDarkModeToggle = () => {
		const newMode = mode === "dark" ? "light" : "dark";
		setMode(newMode);
		localStorage.setItem("mode", newMode);
		document.documentElement.classList.toggle("dark-mode", newMode === "dark");
	};

	return (
		<>
			<h3>Enable Dark Mode</h3>
			<p>Switch between light and dark themes.</p>
			<button
				className={`${styles.settingsButton} ${
					mode === "dark" ? styles.active : ""
				}`}
				onClick={handleDarkModeToggle}
			>
				{mode === "dark" ? "Disable Dark Mode" : "Enable Dark Mode"}
			</button>
		</>
	);
};

export default ModeSelect;
