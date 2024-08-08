import { useStore } from "@/store";
import GenericResize from "@/utils/GenericResize";
import Image from "next/image";
import React from "react";
import back from "../../../../public/icons/home/back.svg";
import styles from "./CreateForm.module.css";
import Form from "./form/Form";

const CreateForm: React.FC = () => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const expandedSideBar = useStore((state) => state.expandedSideBar);
  const showCreateForm = useStore((state) => state.showCreateForm);
  const setShowCreateForm = useStore((state) => state.setShowCreateForm);

  return (
    <>
      <div
        className={`${styles.startingSign} ${
          dateToCreateTask || !expandedSideBar || !showCreateForm
            ? styles.hidden
            : ""
        }`}
      >
        <h3 className={styles.createFormStarter}>Choose date first</h3>
        <Image className="svgIcon" src={back} alt={"back"} />
      </div>
      <div
        className={`${styles.createFormContainer} ${
          dateToCreateTask ? styles.visible : ""
        }`}
      >
        <div className={styles.formContainer}>
          <GenericResize
            size={992}
            setState={setShowCreateForm}
            valueIf={false}
          />
          {showCreateForm && <Form showCalendatInput={false} />}
        </div>
      </div>
    </>
  );
};

export default CreateForm;
