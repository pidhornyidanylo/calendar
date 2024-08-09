"use client";
import { useStore } from "@/store";
import Image from "next/image";
import React from "react";
import burger from "../../../../public/icons/header/burger.svg";
import styles from "./HeaderBurger.module.css";
import GenericResize from "@/components/reusable/GenericResize/GenericResize";

const HeaderBurger: React.FC = () => {
  const toggleSideBar = useStore((state) => state.toggleExpandedSideBar);
  const setExpandedSideBar = useStore((state) => state.setExpandedSideBar);
  const setShowCreateForm = useStore((state) => state.setShowCreateForm);
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  const showCreateForm = useStore((state) => state.showCreateForm);

  const handleClick = () => {
    toggleSideBar();
    if (showCreateForm && expandedSideBar) {
      setExpandedSideBar(false);
      setShowCreateForm(false);
    }
  };

  return (
    <>
      {expandedSideBar && (
        <GenericResize
          size={768}
          setState={setExpandedSideBar}
          valueIf={false}
          valueElse={true}
        />
      )}
      {expandedSideBar && showCreateForm && (
        <GenericResize
          size={768}
          setState={setShowCreateForm}
          valueIf={false}
          valueElse={true}
        />
      )}
      <button
        type="button"
        className={styles.burger}
        onClick={() => handleClick()}
      >
        <Image
          className="svgIcon"
          width={25}
          height={25}
          src={burger}
          alt={"burger"}
        />
      </button>
    </>
  );
};

export default HeaderBurger;
