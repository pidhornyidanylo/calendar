"use client";
import { useStore } from "@/store";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import React, { useEffect } from "react";
import plus from "../../../../public/icons/home/plus.svg";
import Calendar from "../calendar/Calendar";
import CreateForm from "../createForm/CreateForm";
import ModalForm from "../modalForm/ModalForm";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
	const expandedSideBar = useStore((state) => state.expandedSideBar);
	const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);
	const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);
	const showCreateForm = useStore((state) => state.showCreateForm);
	const toggleShowCreateForm = useStore((state) => state.toggleShowCreateForm);
	const setOpenModal = useStore((state) => state.setOpenModal);
	const mutateCreateBtn = useStore((state) => state.mutateCreateBtn);
	const toggleMutateCreateBtn = useStore(
		(state) => state.toggleMutateCreateBtn,
	);

	const handleClick = () => {
		if (!mutateCreateBtn) {
			setDateToCreateTask(null);
			toggleShowCreateForm();
		} else {
			setOpenModal(true);
		}
	};

	useEffect(() => {
		if (showCreateForm) {
			setExpandedSideBar(true);
		}
	}, [showCreateForm, expandedSideBar]);

	return (
		<aside
			className={`${styles.sidebar} ${expandedSideBar ? styles.expanded : ""} ${
				showCreateForm ? styles.expandedForCreate : ""
			} `}
		>
			<GenericResize
				size={992}
				setState={toggleMutateCreateBtn}
				valueIf={true}
			/>
			<button
				type="button"
				className={styles.createBtn}
				onClick={() => handleClick()}
			>
				<Image className="svgIcon" src={plus} alt="plus" />
				<span>Create</span>
			</button>
			<Calendar />
			<CreateForm />
			<ModalForm />
		</aside>
	);
};

export default Sidebar;
