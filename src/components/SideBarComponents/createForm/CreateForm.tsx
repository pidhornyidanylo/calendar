import React from "react";
import Image from "next/image";
import back from "../../../../public/icons/back.svg";
import styles from "./CreateForm.module.css";
import { useStore } from "@/store";
import Form from "./form/Form";
import GenericResize from "@/utils/GenericResize";

const CreateForm = () => {
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
        <Image className={styles.backIcon} src={back} alt={"back"} />
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
          {showCreateForm && <Form />}
        </div>
      </div>
    </>
  );
};

export default CreateForm;
