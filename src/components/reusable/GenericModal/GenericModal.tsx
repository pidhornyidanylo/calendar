import { Modal, ModalClose, Sheet } from "@mui/joy";
import type React from "react";
import type { GenericModalProps } from "./GenericModal.types";

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
