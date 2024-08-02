"use client";
import { useStore } from "@/store";
import Image from "next/image";
import React, { useEffect } from "react";
import plus from "../../../../public/icons/plus.svg";
import Calendar from "../calendar/Calendar";
import styles from "./Sidebar.module.css";
import CreateForm from "../createForm/CreateForm";
import GenericResize from "@/utils/GenericResize";
import ModalForm from "../modalForm/ModalForm";

const Sidebar = () => {
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);

  const setDateToCreateTask = useStore((state) => state.setDateToCreateTask);

  const showCreateForm = useStore((state) => state.showCreateForm);
  const toggleShowCreateForm = useStore((state) => state.toggleShowCreateForm);
  const setShowCreateForm = useStore((state) => state.setShowCreateForm);

  const mutateCreateBtn = useStore((state) => state.mutateCreateBtn);
  const toggleMutateCreateBtn = useStore(
    (state) => state.toggleMutateCreateBtn
  );

  const setOpenModal = useStore((state) => state.setOpenModal);

  const handleClick = () => {
    if (!mutateCreateBtn) {
      setDateToCreateTask(null);
      toggleShowCreateForm();
    } else {
      console.log("show modal window xDDD");
      setOpenModal(true);
    }
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
        <Image src={plus} alt="plus" />
        <span>Create</span>
      </button>
      <Calendar />
      <CreateForm />
      <ModalForm />
    </aside>
  );
};

export default Sidebar;
