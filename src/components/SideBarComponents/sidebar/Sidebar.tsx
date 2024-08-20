"use client";
import GenericModal from "@/components/reusable/GenericModal/GenericModal";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { useStore } from "@/store";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import plus from "../../../../public/icons/home/plus.svg";
import Calendar from "../calendar/Calendar";
import CreateForm from "../createForm/CreateForm";
import Form from "../createForm/form/Form";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
	const [openModal, setOpenModal] = useState(false);
	const [mutateCreateButton, setMutateCreateButton] = useState(false);

	const expandedSideBar = useStore((state) => state.expandedSideBar);
	const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);
	const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);
	const showCreateForm = useStore((state) => state.showCreateForm);
	const toggleShowCreateForm = useStore((state) => state.toggleShowCreateForm);

	const handleMutateCreateButton = (value: boolean) => {
		setMutateCreateButton(value);
	};

	const handleClick = () => {
		if (!mutateCreateButton) {
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
				size={1220}
				setState={handleMutateCreateButton}
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
			<GenericModal open={openModal} setOpen={() => setOpenModal(!openModal)}>
				<Form
					handleCloseModal={() => setOpenModal(!openModal)}
					showCalendatInput={true}
				/>
			</GenericModal>
		</aside>
	);
};

export default Sidebar;
