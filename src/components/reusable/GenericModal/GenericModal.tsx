import React from "react";
import { Modal, ModalClose, Sheet } from "@mui/joy";

type GenericModalProps = {
  open: boolean;
  setOpen: () => void;
  children: React.ReactNode;
};

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  setOpen,
  children,
}) => {
  return (
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
        {children}
      </Sheet>
    </Modal>
  );
};

export default GenericModal;
