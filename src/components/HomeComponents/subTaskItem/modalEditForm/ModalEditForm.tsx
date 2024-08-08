import { useStore } from "@/store";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import React from "react";
import EditForm from "../editForm/EditForm";
import { SubTaskItemType } from "../SubTaskItem.dto";

type ModalEditFormProps = {
  open: boolean;
  setOpen: () => void;
  subTask: SubTaskItemType;
};

const ModalEditForm: React.FC<ModalEditFormProps> = ({
  open,
  setOpen,
  subTask,
}: {
  open: boolean;
  setOpen: () => void;
  subTask: SubTaskItemType;
}) => {
  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen()}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            border: "none",
            maxWidth: 600,
            p: 1,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <EditForm subTask={subTask} />
        </Sheet>
      </Modal>
    </>
  );
};

export default ModalEditForm;
