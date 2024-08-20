"use client";
import GenericModal from "@/components/reusable/GenericModal/GenericModal";
import { Button } from "@mui/joy";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Document from "../pdfDocument/PDFDocument";
import SettingsButton from "../settingsButton/SettingsButton";
import styles from "./CopyCalendarJson.module.css";

const CopyCalendarJson = ({ schedule }: { schedule: string }) => {
	const [showPreview, setShowPreview] = useState(false);
	const parsedSchedule = JSON.parse(schedule);
	return (
		<>
			<SettingsButton
				onClickHandler={() => setShowPreview(!showPreview)}
				textContent={"Get PDF Preview"}
			/>
			<GenericModal
				forPDFPreview={true}
				open={showPreview}
				setOpen={() => setShowPreview(!showPreview)}
			>
				<div className={styles.viewerContainer}>
					<div className={styles.viewerHeader}>
						<h2>Document Preview</h2>
						<Button
							onClick={() => {
								toast.success(
									"Your PDF has been successfully generated and downloaded.",
								);
							}}
							component={PDFDownloadLink}
							document={<Document data={parsedSchedule} />}
							fileName="document.pdf"
							color="primary"
						>
							Download PDF
						</Button>
					</div>
					<PDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
						<Document data={parsedSchedule} />
					</PDFViewer>
				</div>
			</GenericModal>
		</>
	);
};

export default CopyCalendarJson;
