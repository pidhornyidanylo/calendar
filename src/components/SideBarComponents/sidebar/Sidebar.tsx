"use client";
import { useStore } from "@/store";
import Image from "next/image";
import React, { useEffect } from "react";
import plus from "../../../../public/icons/plus.svg";
import Calendar from "../calendar/Calendar";
import styles from "./Sidebar.module.css";
import CreateForm from "../createForm/CreateForm";

const Sidebar = () => {
	const expandedSideBar = useStore((state) => state.expandedSideBar);
	const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);

	const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);

	const showCreateForm = useStore((state) => state.showCreateForm);
	const toggleShowCreateForm = useStore((state) => state.toggleShowCreateForm);
	const setShowCreateForm = useStore((state) => state.setShowCreateForm);

	const handleClick = () => {
		setDateToCreateTask(null);
		toggleShowCreateForm();
	};

	useEffect(() => {
		if (showCreateForm) {
			setExpandedSideBar(true);
		}
		if (!expandedSideBar) {
			setShowCreateForm(false);
			setExpandedSideBar(false);
		}
		if (!expandedSideBar && showCreateForm) {
			setExpandedSideBar(true);
			setShowCreateForm(true);
		}
	}, [showCreateForm, expandedSideBar]);

	return (
		<aside
			className={`${styles.sidebar} ${expandedSideBar ? styles.expanded : ""} ${
				showCreateForm ? styles.expandedForCreate : ""
			} `}
		>
			<button
				type="button"
				className={styles.createBtn}
				onClick={() => handleClick()}
			>
				<Image src={plus} alt="plus" />
				<span>Create</span>
			</button>
			<Calendar />
			<CreateForm />
		</aside>
	);
};

export default Sidebar;
