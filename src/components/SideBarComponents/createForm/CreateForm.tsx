import GenericResize from "@/components/reusable/GenericResize/GenericResize";
import { useStore } from "@/store";
import type React from "react";
import styles from "./CreateForm.module.css";
import Form from "./form/Form";
import PreFormInfo from "./preFormInfo/PreFormInfo";

type CreateFormPropType = {
  token: string;
};

const CreateForm: React.FC<CreateFormPropType> = ({
  token,
}: {
  token: string;
}) => {
  const dateToCreateTask = useStore((state) => state.dateToCreateTask);
  const showCreateForm = useStore((state) => state.showCreateForm);
  const setShowCreateForm = useStore((state) => state.setShowCreateForm);

  return (
    <>
      <PreFormInfo />
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
          {showCreateForm && <Form showCalendatInput={false} token={token} />}
        </div>
      </div>
    </>
  );
};

export default CreateForm;
