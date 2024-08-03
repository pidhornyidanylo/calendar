import { useStore } from "@/store";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import React from "react";
import Form from "../createForm/form/Form";

const ModalForm = () => {
	const openModal = useStore((state) => state.openModal);
	const setOpenModal = useStore((state) => state.setOpenModal);

	return (
		<>
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				open={openModal}
				onClose={() => setOpenModal(false)}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Sheet
					variant="outlined"
					sx={{
						backgroundColor: "transparent",
						border: "none",
						maxWidth: 500,
						p: 6,
					}}
				>
					<ModalClose variant="plain" sx={{ m: 1 }} />
					<Form showCalendatInput={true} />
				</Sheet>
			</Modal>
		</>
	);
};

export default ModalForm;
